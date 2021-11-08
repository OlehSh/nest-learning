import { Injectable, Inject } from '@nestjs/common';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { Geolocation } from './geolocation.entity';
import { Repository } from 'typeorm';
import constants from '../constants/constants';

@Injectable()
export class GeolocationService {
  constructor(
    @Inject(constants.GEOLOCATION_REPOSITORY)
    private locationRepository: Repository<Geolocation>,
  ) {}

  async createLocation(data: CreateLocationBodyDto): Promise<Geolocation> {
    const locationData: Partial<Geolocation> = {
      location_type: data.locationType,
    };
    const location: Geolocation = this.locationRepository.create(locationData);
    await this.locationRepository.save(location);
    return this.locationRepository.findOne(location.id);
  }
}
