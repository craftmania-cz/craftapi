import { Request, Response } from "express";
import * as Res from "../../services/response";
import * as crypto from "crypto";
import { CraftingStoreRequest } from './CraftingStoreRequest';
import axios, { AxiosRequestConfig } from "axios";
import { GopayPayment } from "./GopayPayment";

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
	state: string; //TODO: hodnoty + oveření
	currency: string;
	payer: any; //TODO:
	target: any; //TODO:
	gw_url: string;
}

namespace Payments {

	export async function createPayment(req: Request, res: Response) {

		// Verifikace CraftingStore requestu
		// Zde se ověřuje, zda request body souhlasí s klíčem z CraftingStoru,
		// aby někdo nemohl poslat svůj request.
		const xSignature = req.headers["x-signature"];
		if (xSignature === undefined) {
			Res.errorWithText(res, "Missing x-signature key");
			return;
		}

		const bodyHash = await crypto.createHmac('sha256', config.get("craftingstore.paymentKey"))
			.update(JSON.stringify(req.body)).digest('hex');

		/* //TODO: Aktivovat na produkci
		if (bodyHash !== xSignature) {
			Res.errorWithText(res, "Hash signature is not same.");
			return;
		}
		*/

		const requestData = req.body as unknown as CraftingStoreRequest;
		
		// Gopay vytvoření platby
		// 1. Je potřeba získat aktuální token s právy
		const gopayToken: GopayTokenResponse = await getToken(false); //TODO: Try?
		console.log("gopay token: " + gopayToken.access_token);

		console.log("package items: " + requestData.package);

		// 2. Vytvoření gopay platby podle craftingstore requestu
		const paymentObject = new GopayPayment()
			.setPayer(requestData.user.email)
			.setTarget(config.get("gopay.accountId")) //TODO: Odebrat
			.setItems([{name: "CraftToken", price: 300}, {name: "Obsidian VIP - Skyblock", price: 1500}]) //TODO: čstky musí být *100
			.setCurrency("EUR") //TODO: Type
			.setOrderNumber(requestData.transactionId)
			.setOrderDescription("CraftMania Store - ?")
			.setCallbackUrls()
			.getData();

		console.log(paymentObject);
		
		// 3. get URL na redirect
		const paymentUrl = await createGopayPayment(false, gopayToken.access_token, paymentObject);
		console.log("paymentUrl: " + paymentUrl.gw_url);

		Res.success(res, paymentUrl.gw_url);
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
				console.log(error);
				reject(error);
			});
		});

	}
}

export default Payments;
