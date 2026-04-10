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
    },
    {
      categoryId: "003",
      categoryName: "Mixed Age Men's Doubles",
      categoryType: "DOUBLES",
      isEnabled: true,
      categoryDescription: "At least one player should be above 40yrs as on 06/06/2026"
    },
    {
      categoryId: "004",
      categoryName: "Mixed Age Mixed doubles",
      categoryType: "DOUBLES",
      isEnabled: true,
      categoryDescription: "One male and one female, at least one player should be above 40yrs as on 06/06/2026"
    } 
  ]
};
