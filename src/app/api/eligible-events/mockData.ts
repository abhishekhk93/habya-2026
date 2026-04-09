import { EligibleEventsResponse } from "./types";

export const dummyEligibleCategories: EligibleEventsResponse = {
  eligibleCategories: [
    {
      categoryId: "001",
      categoryName: "Open Men's singles",
      categoryType: "SINGLES",
      isEnabled: true,
      categoryDescription: "Player should be below 35yrs as on 06/06/2026"
    },
    {
      categoryId: "002",
      categoryName: "Open Men's doubles",
      categoryType: "DOUBLES",
      isEnabled: true,
      categoryDescription: "Both players should be below 35yrs as on 06/06/2026"
    }
  ]
};
