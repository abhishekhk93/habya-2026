export type Player = {
  name: string;
};

export type SetScore = {
  p1: number | null;
  p2: number | null;
  winner: 1 | 2 | null;
};

export type MatchData = {
  eventName: string;
  round: string;
  players: [Player, Player];
  sets: [SetScore, SetScore, SetScore];
  matchWinner: 1 | 2 | null;
  status: "LIVE" | "FINISHED";
};
