import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserService } from '../user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { FindOneOptions } from 'typeorm';

@Controller('/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginData: LoginUserDto): Promise<{ accessToken: string; user: Partial<User> }> {
    const { email, password } = loginData;
    const options: FindOneOptions = {
      where: { email },
      select: ['id', 'email', 'password', 'firstname', 'lastname'],
    };
    const user = await this.userService.getOne(options);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const { password: passwordHash, ...userData } = user;
    if (!this.cryptoService.validateHash(password, passwordHash)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return { accessToken: this.authService.getToken(userData), user: userData };
  }

  @Post('/signup')
  signup(@Body() createUserData: CreateUserDto): Promise<Partial<User>> {
    createUserData.password = this.cryptoService.getHash(createUserData.password);
    return this.userService.createUser(createUserData);
  }
}
