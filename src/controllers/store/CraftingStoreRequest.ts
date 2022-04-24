
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
	package: {
		name: string;
		notes: string | null;
		price: number;
	};
	webhook: {
		failedUrl: string;
		successUrl: string;
	};
}
