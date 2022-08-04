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
    try {
      const { name, locationType, coordinates } = data;
      const locationData: Partial<Geolocation> = {
        name,
        location_type: locationType,
        location: { type: locationType, coordinates },
      };
      //   .execute();
      const location: Geolocation = await this.locationRepository.create(locationData);
      await this.locationRepository.save(location);
      return this.locationRepository.findOne({ where: { id: location.id } });
    } catch (e) {
      // console.error(e);
      throw new Error('Error on location save');
    }
  }
}
