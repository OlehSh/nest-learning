import { USER_ROLE } from '../../user/userConstants';

export interface JwtPayload {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: USER_ROLE;
  iat: number;
  exp: number;
}
