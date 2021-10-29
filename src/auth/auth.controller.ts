import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/CreateUser.dto';
import { LoginUserDto } from '../user/dto/LoginUser.dto';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/login')
  login(@Body() loginData: LoginUserDto): any {
    return this.userService.login(loginData);
  }

  @Post('/signup')
  signup(@Body() createUserData: CreateUserDto): any {
    console.log('DTO: ', createUserData);
    return this.userService.createUser(createUserData);
  }
}
