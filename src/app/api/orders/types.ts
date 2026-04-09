export interface BaseOrder {
  id: string;
  createdDate: string;
  amount: number;
  quantity: number;
  paymentStatus: string;
  createdBy: string;
}

export interface RegistrationOrder extends BaseOrder {
  additionalAttributes: {
    categoryName: string;
    categoryCode: string;
    partnerDetails?: {
      fullName: string;
      playerId: string;
    };
  };
}

export interface TshirtOrder extends BaseOrder {
  additionalAttributes: {
    type: string;
    displayName: string;
    size: string;
    color: string;
  };
}

export interface SponsorshipOrder extends BaseOrder {
  additionalAttributes: Record<string, unknown>;
}

export interface OrdersResponse {
  registrations?: RegistrationOrder[];
  tshirts?: TshirtOrder[];
  sponsorships?: SponsorshipOrder[];
}
