export interface User {
  login: string;
  password: string;
}

export interface ChangePassword {
  user: User;
  newPassword; string;
}

export interface AuthResponse {
  token: string;
}
