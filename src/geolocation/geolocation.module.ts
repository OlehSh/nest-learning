import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationProviders } from './geolocation.providers';
import { GeolocationController } from './geolocation.controller';

@Module({
  imports: [],
  providers: [GeolocationService, ...GeolocationProviders],
  controllers: [GeolocationController],
})
export class GeolocationModule {}
