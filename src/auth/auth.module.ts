import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from '../dbConnection/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...userProviders, UserService],
})
export class AuthModule {}
