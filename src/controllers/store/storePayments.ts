import { Request, Response } from "express";
import * as Res from "../../services/response";
import * as crypto from "crypto";
import { CraftingStoreRequest } from './CraftingStoreRequest';
import axios, { AxiosRequestConfig } from "axios";
import { GopayPayment } from "./GopayPayment";
import { Logger } from "../../utils/Logger";

const log = Logger('store:gopay');

import config = require("config");

const gopaySandboxApi = "https://gw.sandbox.gopay.com/api";
const gopayProductionApi = "https://gate.gopay.cz/api";

interface GopayTokenResponse {
	token_type: string;
	access_token: string;
	expires_in: string;
	refresh_token: string;
}

interface GopayPaymentCratedResponse {
	id: number;
	order_number: string;
	state: string;
	currency: string;
	payer: any;
	target: any;
	gw_url: string;
}

interface GopayPaymentStatus {
	id: number;
	order_number: string;
	state: string;
	payment_instrument: string;
	amount: number;
	currency: string;
	payer: any; //TODO
	target: any; //TODO
	gw_url: string;
	eet_code: {
		fik: string;
		bkp: string;
		pkp: string;
	};
}

namespace Payments {

	export async function createPayment(req: any, res: Response) {

		const isProductionActive: boolean = config.get("gopay.useProduction");

		// CraftingStore verification
		const xSignature = req.headers["x-signature"];
		if (xSignature === undefined) {
			res.status(400).json({success: false});
			return;
		}

		const bodyString = Buffer.from(req.rawBody, 'utf8');
		const bodyHash = crypto.createHmac('sha256', config.get("craftingstore.paymentKey"))
			.update(bodyString).digest("hex");

		if (bodyHash !== xSignature) {
			res.status(400).json({success: false});
			return;
		}

		const requestData = req.body as unknown as CraftingStoreRequest;
		log.debug(JSON.stringify(requestData));
		
		// Gopay - creating payment gateway based by craftingstore data
		try { 
			const gopayToken: GopayTokenResponse = await getToken(isProductionActive);
			log.debug("GoPay token: " + gopayToken.access_token);

			// Gopay object for payment
			const paymentObject = new GopayPayment()
			.setPayer(requestData.user.email)
			.setTarget(config.get("gopay.accountId"))
			.setItems(requestData.package)
			.setCurrency(requestData.currency.toLocaleUpperCase())
			.setOrderNumber(requestData.transactionId)
			.setOrderDescription(requestData.package.name)
			.setCallbackUrls(config.get("app.domain"))
			.getData();

			// Now get url for gateway from gopay and return it to craftingstore
			const paymentUrl = await createGopayPayment(isProductionActive, gopayToken.access_token, paymentObject);
			log.debug("GoPay Gateway URL: " + paymentUrl.gw_url);

			await markPaymentOnCraftingStore(requestData.transactionId, "pending");

			res.status(200).json({success: true, data: {url: paymentUrl.gw_url}});
		} catch (error) {
			log.error(error);
			res.status(500).json({success: false});
		}
	}

	export async function forwardPayment(req: Request, res: Response) {
		const isProductionActive: boolean = config.get("gopay.useProduction");

		let orderNumber: any = req.query.orderNumber;
		if (orderNumber === undefined) {
			res.status(400).json({success: false});
			return;
		}

		let gopayPaymentId: any = req.query.id;
		if (gopayPaymentId === undefined) {
			res.status(400).json({success: false});
			return;
		}

		await wait(3e3);

		const gopayToken: GopayTokenResponse = await getToken(isProductionActive);

		const gopayPayment = await getGopayTransactionStatus(isProductionActive, gopayToken.access_token, gopayPaymentId);
		if (gopayPayment.state === "PAID") {
			await markPaymentOnCraftingStore(orderNumber, "paid").then(() => {
				res.status(200).json({success: true});
			});
		} else {
			await markPaymentOnCraftingStore(orderNumber, "pending").then(() => {
				res.status(200).json({success: true});
			});
		}
	}

	/**
	 * It gets a token from GoPay API
	 * @param {boolean} production - boolean - if you want to use the production API or the sandbox API
	 * @returns Promise<GopayTokenResponse>
	 */
	async function getToken(production: boolean): Promise<GopayTokenResponse> {
		const apiUrl: string = production ? gopayProductionApi : gopaySandboxApi;
		
		const params = new URLSearchParams();
		params.append("grant_type", "client_credentials");
		params.append("scope", "payment-create");

		const bufferKey = new Buffer(config.get("gopay.clientId") + ":" + config.get("gopay.clientSecret")).toString('base64');

		const axiosConfig: AxiosRequestConfig = {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + bufferKey,
			}
		};
		
		return new Promise(async (resolve: any, reject: any) => {
			axios.post(apiUrl + "/oauth2/token", params, axiosConfig).then((data: any) => {
				resolve(data.data);
			}).catch((error: any) => {
				log.error(error);
				reject(error);
			});
		});
	}

	async function createGopayPayment(production: boolean, gopayToken: string, gopayPaymentObject: any): Promise<GopayPaymentCratedResponse> {
		const apiUrl: string = production ? gopayProductionApi : gopaySandboxApi;

		const axiosConfig: AxiosRequestConfig = {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + gopayToken,
			},
		};

		return new Promise(async (resolve: any, reject: any) => {
			axios.post(apiUrl + "/payments/payment", JSON.stringify(gopayPaymentObject), axiosConfig).then((data: any) => {
				resolve(data.data);
			}).catch((error: any) => {
				log.error(error);
				reject(error);
			});
		});
	}

	async function getGopayTransactionStatus(
		production: boolean,
		gopayToken: string,
		transactionId: string
	): Promise<GopayPaymentStatus> {
		log.info(`[GoPay] Getting transaction status for: ${transactionId}`);
		const apiUrl: string = production ? gopayProductionApi : gopaySandboxApi;

		const axiosConfig: AxiosRequestConfig = {
			headers: {
				"Accept": "application/json",
				"Authorization": "Bearer " + gopayToken,
			},
		};

		return new Promise(async (resolve: any, reject: any) => {
			axios.get(apiUrl + "/payments/payment/" + transactionId, axiosConfig).then((data: any) => {
				resolve(data.data);
			}).catch((error: any) => {
				log.error(error);
				reject(error);
			});
		});

	}

	async function markPaymentOnCraftingStore(transactionId: String, state: string): Promise<void> {
		log.info(`[CraftingStore] Making transaction ${transactionId} as ${state}.`);
		const body = {
			"type": state,
			"transactionId": transactionId,
		};
		const rawBody = JSON.stringify(body);

		const bodyString = new Buffer(rawBody, 'utf8');
		const bodyHash = crypto.createHmac('sha256', config.get("craftingstore.paymentKey"))
			.update(bodyString).digest("hex");

		const axiosConfig: AxiosRequestConfig = {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"X-Signature": bodyHash,
			},
		};

		return new Promise(async (resolve: any, reject: any) => {
			axios.post('https://api.craftingstore.net/callback/custom', rawBody, axiosConfig).then((data: any) => {
				resolve(data.data);
			}).catch((error: any) => {
				log.error(error);
				reject(error);
			});
		});
	}

	async function wait(timeout: number) {
		return new Promise<void>((resolve: () => void) => setTimeout(() => resolve(), timeout));
	}
	
}

export default Payments;
