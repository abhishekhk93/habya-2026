import { LoginRequest, LoginResponse } from "./types";

// ── Hardcoded Users (mock DB) ────────────────────────────────────────────────

interface UserRecord {
  password: string;
  profileId: number;
  role: "player" | "admin";
}

const USERS: Record<string, UserRecord> = {
  abhishek: {
    password: "Hji@5004",
    profileId: 1000,
    role: "player",
  },
  admin: {
    password: "Hji@5004",
    profileId: 1001,
    role: "admin",
  },
};

// ── Service ──────────────────────────────────────────────────────────────────

export function authenticate(body: LoginRequest): LoginResponse {
  const user = USERS[body.name];

  if (!user || user.password !== body.password) {
    throw new Error("Invalid credentials");
  }

  return {
    profileId: user.profileId,
    name: body.name,
    role: user.role,
  };
}
