import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from './geolocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geolocation])],
  providers: [GeolocationService],
  controllers: [GeolocationController],
})
export class GeolocationModule {}
