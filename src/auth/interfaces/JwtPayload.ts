export interface JwtPayload {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  iat: number;
  exp: number;
}
