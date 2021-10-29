import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import constants from '../constants/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      return this.userRepository.save(newUser);
    } catch (e) {
      throw new HttpException(
        e.message || 'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginData: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findOne({ email: loginData.email });
    console.log(user);
    return 'token';
  }
}
