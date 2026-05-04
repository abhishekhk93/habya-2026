import { EligibleEventsResponse } from "./types";

export const dummyEligibleCategories: EligibleEventsResponse = {
  eligibleCategories: [
    {
      categoryId: "ad6b513a-19d4-47e4-9854-5609059315d6",
      categoryName: "<35 - Men’s Singles",
      categoryType: "SINGLES",
      isEnabled: true,
      categoryDescription: "Men who are born on or after June 8 1991 are eligible",
      entryFee: 500.0,
      minAge: 0,
      maxAge: 35,
      gender: "MALE",
      ageCutoffDate: null,
      isEligible: true,
      message: "Selected user has already registered this event",
      isRegistered: true,
      partnerDetails: null
    },
    {
      categoryId: "70e5d86e-c275-4e2c-a2ab-536bf8d6c327",
      categoryName: "<35 - Men’s Doubles",
      categoryType: "DOUBLES",
      isEnabled: true,
      categoryDescription: "Men who are born on or after June 8 1991 are eligible",
      entryFee: 1000.0,
      minAge: 0,
      maxAge: 35,
      gender: "MALE",
      ageCutoffDate: null,
      isEligible: true,
      message: "Selected user has already registered this event",
      isRegistered: true,
      partnerDetails: {
        fullName: "Kiran",
        playerId: "1026"
      }
    }
  ]
};
