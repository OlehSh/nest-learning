import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      const savedUser: User = await this.userRepository.save(newUser);
      return this.userRepository.findOne({ where: { id: savedUser.id } });
    } catch (e) {
      throw new HttpException(e.message || 'Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(options: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(options);
  }
}
