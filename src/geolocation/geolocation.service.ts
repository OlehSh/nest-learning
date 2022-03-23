import { Injectable, Inject } from '@nestjs/common';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { Geolocation } from './geolocation.entity';
import { Repository } from 'typeorm';
import constants from '../constants/constants';
import { GEOLOCATION_TYPE } from './geoloaction.constants';

@Injectable()
export class GeolocationService {
  constructor(
    @Inject(constants.GEOLOCATION_REPOSITORY)
    private locationRepository: Repository<Geolocation>,
  ) {}

  async createLocation(data: CreateLocationBodyDto): Promise<Geolocation> {
    const { name, locationType, coordinates } = data;
    const joinSeparator = locationType === GEOLOCATION_TYPE.POLYGON ? ' ' : ',';
    const locationData: Partial<Geolocation> = {
      name,
      location_type: data.locationType,
      // location: `${data.locationType}(${data.coordinates.join(joinSeparator)})`,
      location: "{ type: 'point', coordinates: ['36.231200', '50.006015'] }",
    };
    const location: Geolocation = this.locationRepository.create(locationData);
    await this.locationRepository.save(location);
    return this.locationRepository.findOne(location.id);
  }
}
