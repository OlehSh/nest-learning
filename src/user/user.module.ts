import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../dbConnection/db.module';

@Module({
  imports: [],
  providers: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
