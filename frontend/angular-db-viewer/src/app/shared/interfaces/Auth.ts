export interface User {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}