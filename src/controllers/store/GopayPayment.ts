
interface GopayPaymentItems {
	type: "ITEM" // Položka
	| "DELIVERY" // Poštovný
	| "DISCOUNT"; // Sleva
	name: string;
	/**
	 * Částka v měně
	 */
	amount: number;
	// Není používaný jelikož CraftingStore posílá více itemů jako víc položek.
	count?: number;
	product_url?: string;
}

export interface CraftingStorePaymentItems {
	name: string;
	notes: null;
	price: number;
}

export class GopayPayment {
	
	private paymentObject: any; //TODO:

	constructor() {
		this.paymentObject = {};
	}

	/**
	 * It sets the payer object with predefined values.
	 * @param {string} payerEmail - The email address of the payer.
	 * @param {string} [payerFirstName] - The first name of the payer.
	 * @param {string} [payerLastName] - The last name of the payer.
	 * @returns The instance of the class.
	 */
	public setPayer(payerEmail: string) {
		this.paymentObject.payer = {
			email: payerEmail,
			allowed_payment_instruments: [
				'PAYMENT_CARD',
				'BANK_ACCOUNT',
				'GPAY',
				'APPLE_PAY',
				'GOPAY',
				'PAYPAL',
				'MPAYMENT',
				'PRSMS',
				'PAYSAFECARD',
				'BITCOIN',
				'CLICK_TO_PAY'
			],
		};
		return this;
	}

	/**
	 * It sets the target of the payment object.
	 * @param {number} gopayId - number - GoPay ID of the recipient
	 * @returns The instance of the class.
	 */
	public setTarget(gopayId: number) {
		this.paymentObject.target = {
			type: "ACCOUNT",
			goid: gopayId,
		};
		return this;
	}

	/**
	 * The above function is used to set the items that will be paid by the customer.
	 * @param {CraftingStorePaymentItems[]} paymentItems - CraftingStorePaymentItems[]
	 * @returns The instance of the class.
	 */
	public setItems(paymentItems: CraftingStorePaymentItems) {
		let finalGopayItems: GopayPaymentItems[] = [];
		finalGopayItems.push({
			type: "ITEM",
			name: paymentItems.name,
			amount: paymentItems.price,
		});
		this.paymentObject.items = finalGopayItems;
		this.paymentObject.amount = paymentItems.price;
		return this;
	}

	/**
	 * It sets the currency of the payment object.
	 * @param {string} currency - The currency of the payment.
	 * @returns The instance of the class.
	 */
	public setCurrency(currency: string) {
		this.paymentObject.currency = currency;
		return this;
	}

	/**
	 * It sets the order number of the payment object.
	 * @param {string} orderNumber - The order number of the payment.
	 * @returns The instance of the class.
	 */
	public setOrderNumber(orderNumber: string) {
		this.paymentObject.order_number = orderNumber;
		return this;
	}

	/**
	 * It sets the order description.
	 * @param {string} description - The description of the order.
	 * @returns The instance of the class.
	 */
	public setOrderDescription(description: string) {
		this.paymentObject.order_description = description;
		return this;
	}

	/**
	 * It sets the callback URLs for the payment
	 * @returns The instance of the class.
	 */
	public setCallbackUrls(appUrl: string) {
		this.paymentObject.callback = {
			return_url: "https://store.craftmania.cz/complete", // URL for returning from gopay
			// Notification URL for CraftMania API
			notification_url:
			`${appUrl}/store/completePayment?orderNumber=${this.paymentObject.order_number}`
		};
		return this;
	}

	/**
	 * This function overrides the price of the payment object
	 * @param {number} priceAmount - The amount you want to charge the user.
	 * @returns The instance of the class.
	 */
	public overridePrice(priceAmount: number) {
		this.paymentObject.amount = priceAmount;
		return this;
	}

	public getData() {
		return this.paymentObject;
	}
}
