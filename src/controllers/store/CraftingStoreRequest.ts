import { CraftingStorePaymentItems } from "./GopayPayment";

export interface CraftingStoreRequest {
	type: "PAID" | "PENDING" | "CHARGE-BACK";
	transactionId: string;
	currency: string;
	user: {
		identifier: string; // Basket ID
		email: string;
		firstName: string | null;
		lastName: string | null;
		billingAddressLineOne: string | null;
		billingAddressLineTwo: string | null;
		billingCity: string | null;
		billingZipCode: string | null;
		billingCountry: {
			name: string;
			code: string;
			currency: string;
		} | null;
	};
	package: CraftingStorePaymentItems;
	webhook: {
		failedUrl: string;
		successUrl: string;
	};
}
