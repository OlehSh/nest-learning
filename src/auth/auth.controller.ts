import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginData: LoginUserDto): any {
    return this.authService.login(loginData);
  }

  @Post('/signup')
  signup(@Body() createUserData: CreateUserDto): any {
    console.log('DTO: ', createUserData);
    // const data: any = this.authService.signUp(createUserDto);
    return this.authService.signUp(createUserData);
  }
}
