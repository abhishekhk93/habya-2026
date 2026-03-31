export interface LoginRequest {
  name: string;
  password: string;
}

export interface LoginResponse {
  profileId: number;
  name: string;
  role: "player" | "admin";
}
