export interface EligibleCategory {
  categoryId: string;
  categoryName: string;
  categoryType: string;
  isEnabled: boolean;
  categoryDescription: string;
}

export interface EligibleEventsResponse {
  eligibleCategories: EligibleCategory[];
}
