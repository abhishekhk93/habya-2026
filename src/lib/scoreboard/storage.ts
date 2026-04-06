import { MatchData } from "./types";

export const getMatchKey = (matchId: string) => `match_${matchId}`;

export const getMatchData = (matchId: string): MatchData => {
  const defaultData: MatchData = {
    eventName: "",
    round: "",
    players: [{ name: "" }, { name: "" }],
    sets: [
      { p1: null, p2: null, winner: null },
      { p1: null, p2: null, winner: null },
      { p1: null, p2: null, winner: null },
    ],
    matchWinner: null,
    status: "LIVE",
  };

  if (typeof window === "undefined") {
    return defaultData;
  }

  try {
    const serialized = localStorage.getItem(getMatchKey(matchId));
    if (!serialized) {
      return defaultData;
    }
    const data = JSON.parse(serialized) as MatchData;
    return { ...defaultData, ...data };
  } catch (error) {
    console.error("Failed to parse match data from localStorage", error);
    return defaultData;
  }
};

export const saveMatchData = (matchId: string, data: MatchData): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(getMatchKey(matchId), JSON.stringify(data));
    // Need a custom event to notify same-window listeners, inasmuch as storage events only fire on OTHER windows!
    window.dispatchEvent(new CustomEvent("local-storage", { detail: { key: getMatchKey(matchId) }}));
  } catch (error) {
    console.error("Failed to save match data to localStorage", error);
  }
};

export const clearMatchData = (matchId: string): MatchData => {
  const defaultData: MatchData = {
    eventName: "",
    round: "",
    players: [{ name: "" }, { name: "" }],
    sets: [
      { p1: null, p2: null, winner: null },
      { p1: null, p2: null, winner: null },
      { p1: null, p2: null, winner: null },
    ],
    matchWinner: null,
    status: "LIVE",
  };
  saveMatchData(matchId, defaultData);
  return defaultData;
};
