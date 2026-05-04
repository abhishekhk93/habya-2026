export type ItemType = "REGISTRATION" | "TSHIRT" | "SPONSORSHIP";

export interface RegistrationAttributes {
  categoryId: string;
  partnerPlayerId?: string | null;
  categoryName: string;
  partnerName?: string | null;
}

export interface TShirtAttributes {
  name: string;
  displayName: string;
  size: string;
  type: string;
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
