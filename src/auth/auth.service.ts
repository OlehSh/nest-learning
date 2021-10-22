import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Injectable()
export class AuthService {
  signUp(user: CreateUserDto) {
    console.log('USER: ', user);
    return user;
  }

  login(data: LoginUserDto) {
    console.log('LOGIN: ', data);
    return { message: 'token' };
  }
}
