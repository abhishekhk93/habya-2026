import jwt from "jsonwebtoken";

// ── Constants ────────────────────────────────────────────────────────────────

const JWT_SECRET = "habya-2026-temp-secret-key";

export const COOKIE_NAME = "jwt";
export const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

// ── Types ────────────────────────────────────────────────────────────────────

export interface TokenPayload {
  phone: string;
  playerId: string;
  fullName: string;
  dob: string;
  gender: string;
  role: "player" | "admin";
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
