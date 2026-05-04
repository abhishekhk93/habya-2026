export interface EligibleCategory {
  categoryId: string;
  categoryName: string;
  categoryType: string;
  isEnabled: boolean;
  isEligible: boolean;
  isRegistered: boolean;
  categoryDescription: string;
  entryFee: number;
  minAge: number;
  maxAge: number;
  gender: string;
  ageCutoffDate: string | null;
  message: string | null;
  partnerDetails: {
    playerId: string;
    fullName: string;
  } | null;
}

export interface EligibleEventsResponse {
  eligibleCategories: EligibleCategory[];
}
