export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  phone: string;
  playerId: string;
  fullName: string;
  dob: string;
  gender: string;
  role?: "player" | "admin";
}
