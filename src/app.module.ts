import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './dbConnection/db.module';
import { CryptoModule } from './crypto/crypto.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import configuration from './config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PassportModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    CryptoModule,
    GeolocationModule,
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [DatabaseModule],
})
export class AppModule {}
