export interface TotalOrderAmount {
  orderAmount: number;
  platformFee: number;
}

export interface BaseItem {
  id: string;
  createdDate: string;
  amount: number;
  quantity: number;
  createdBy: string;
}

export interface RegistrationItem extends BaseItem {
  additionalAttributes: {
    categoryName: string;
    categoryCode: string;
    partnerDetails?: {
      fullName: string;
      playerId: string;
    };
  };
}

export interface ShirtItem extends BaseItem {
  additionalAttributes: {
    type: string;
    displayName: string;
    size: string;
    color: string;
  };
}

export interface SponsorshipItem extends BaseItem {
  additionalAttributes: Record<string, unknown>;
}

export interface Order {
  orderId: string;
  transactionId: string;
  paymentStatus: string;
  totalOrderAmount: TotalOrderAmount;
  registrations?: RegistrationItem[];
  shirts?: ShirtItem[];
  sponsorships?: SponsorshipItem[];
}
