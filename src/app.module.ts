import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
