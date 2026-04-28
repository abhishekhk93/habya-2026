import { SearchPlayerResponse } from "./types";

export function getMockSearchResponse(playerId: string, categoryCode: string): SearchPlayerResponse {
  // Using explicit strings or numbers to trigger the requested errors
  if (playerId === "1111") {
    return {
      isEligible: false,
      message: "Selected user doesn't satisfy the age criteria"
    };
  }
  
  if (playerId === "2222") {
    return {
      isEligible: false,
      message: "Selected user has already registered for this event"
    };
  }

  if (playerId === "3333") {
    return {
      isEligible: false,
      message: "Selected user has already registered for 2 events"
    };
  }

  // Fallback / Success condition requested by user:
  // playerId: 3344
  return {
    isEligible: true,
    playerDetails: {
      fullName: "Abhi",
      playerId: Number(playerId) || 3344
    }
  };
}
