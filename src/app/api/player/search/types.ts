export interface PlayerDetails {
  fullName: string;
  playerId: number;
}

export interface SearchPlayerSuccessResponse {
  isEligible: true;
  playerDetails: PlayerDetails;
}

export interface SearchPlayerErrorResponse {
  isEligible: false;
  message: string;
}

export type SearchPlayerResponse = SearchPlayerSuccessResponse | SearchPlayerErrorResponse;
