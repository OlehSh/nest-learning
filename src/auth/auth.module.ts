import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from '../dbConnection/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    CryptoModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get('jwt');
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, UserService, AuthService],
})
export class AuthModule {}
