export type CheckoutItemType = "REGISTRATION" | "TSHIRT" | "SPONSORSHIP";

export interface RegistrationItemAttributes {
  categoryId: string;
  partnerPlayerId: string | null;
}

export interface TShirtItemAttributes {
  type: string;
  displayName: string;
  size: string;
}

export type SponsorshipItemAttributes = Record<string, never>;

export type CheckoutCartItem =
  | {
    itemType: "REGISTRATION";
    itemAmount: null;
    itemQuantity: 1;
    itemAttributes: RegistrationItemAttributes;
  }
  | {
    itemType: "TSHIRT";
    itemAmount: null;
    itemQuantity: 1;
    itemAttributes: TShirtItemAttributes;
  }
  | {
    itemType: "SPONSORSHIP";
    itemAmount: number;
    itemQuantity: 1;
    itemAttributes: SponsorshipItemAttributes;
  };

export interface CheckoutCartRequest {
  items: CheckoutCartItem[];
}

export interface TotalOrderAmount {
  orderAmount: number;
  platformFee: number;
}

export interface CheckoutResponseItem {
  itemId: string;
  itemType: CheckoutItemType;
  itemAmount: number;
  itemQuantity: 1;
  itemAttributes:
  | RegistrationItemAttributes
  | TShirtItemAttributes
  | SponsorshipItemAttributes;
}

export interface CheckoutResponse {
  orderId: string;
  razorpayOrderId: string;
  orderStatus: "PENDING" | "SUCCESS" | "FAILED";
  transactionId: string | null;
  totalOrderAmount: TotalOrderAmount;
  items: CheckoutResponseItem[];
}
