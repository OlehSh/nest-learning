import { Request } from 'express';
import { JwtPayload } from './JwtPayload';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
