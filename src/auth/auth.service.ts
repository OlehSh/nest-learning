import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getToken(user: Partial<User>): string {
    return this.jwtService.sign({ ...user });
  }
}
