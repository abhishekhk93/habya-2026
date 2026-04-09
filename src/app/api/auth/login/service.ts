import { LoginRequest, LoginResponse } from "./types";

// ── Hardcoded Users (mock DB) ────────────────────────────────────────────────

interface UserRecord {
  password: string;
  playerId: string;
  fullName: string;
  dob: string;
  gender: string;
  role: "player" | "admin";
}

const USERS: Record<string, UserRecord> = {
  "9740379533": {
    password: "343406061993",
    playerId: "3434",
    fullName: "Nahusha",
    dob: "06/06/1993",
    gender: "M",
    role: "player",
  },
  "admin": {
    password: "Hji@5004",
    playerId: "1001",
    fullName: "Admin User",
    dob: "01/01/1970",
    gender: "M",
    role: "admin",
  },
};

// ── Service ──────────────────────────────────────────────────────────────────

export function authenticate(body: LoginRequest): LoginResponse {
  const user = USERS[body.phone];

  if (!user || user.password !== body.password) {
    throw new Error("Invalid credentials");
  }

  return {
    phone: body.phone,
    playerId: user.playerId,
    fullName: user.fullName,
    dob: user.dob,
    gender: user.gender,
    role: user.role,
  };
}
