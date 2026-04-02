export type ItemType = "REGISTRATION" | "TSHIRT" | "SPONSORSHIP";

export interface RegistrationAttributes {
  categoryCode: string;
  partnerPlayerId?: string | null;
}

export interface TShirtAttributes {
  type: string;
  displayName: string;
  size: string;
  color: string;
}

export type SponsorshipAttributes = Record<string, never>;

export type CartItem =
  | {
    itemType: "REGISTRATION";
    itemAmount: null;
    itemQuantity: null;
    itemAttributes: RegistrationAttributes;
  }
  | {
    itemType: "TSHIRT";
    itemAmount: null;
    itemQuantity: 1;
    itemAttributes: TShirtAttributes;
  }
  | {
    itemType: "SPONSORSHIP";
    itemAmount: number;
    itemQuantity: null;
    itemAttributes: SponsorshipAttributes;
  };

export interface Cart {
  items: CartItem[];
}
