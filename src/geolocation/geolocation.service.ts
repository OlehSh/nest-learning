import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { Geolocation } from './geolocation.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

type radiusFilterI = {
  radius: number;
  point: number[];
};

type pointFilterI = {
  polygon: number[];
};

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geolocation)
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
      const location: Geolocation = await this.locationRepository.create(locationData);
      await this.locationRepository.save(location);
      return this.locationRepository.findOne({ where: { id: location.id } });
    } catch (e) {
      throw new Error('Error on location save');
    }
  }
  find(fields: Partial<Geolocation>, filter?: radiusFilterI | pointFilterI): Promise<Geolocation[]> {
    try {
      let queryBuilder: SelectQueryBuilder<Geolocation> = this.locationRepository.createQueryBuilder('geolocations');
      if (fields) {
        queryBuilder = queryBuilder.where(fields);
      }
      if (filter) {
        if ('radius' in filter) {
          const [long, lat] = filter?.point;
          queryBuilder = queryBuilder.andWhere(
            `ST_DWithin(st_makepoint(${long}, ${lat}), location, ${filter.radius}) = true`,
          );
        } else if ('polygon' in filter) {
          queryBuilder = queryBuilder.andWhere(`ST_Intersects(
            ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [${JSON.stringify(filter.polygon)}]}'),
            location
          ) = true`);
        }
      }
      return queryBuilder.execute();
    } catch (e) {
      console.error(e);
      throw new Error('Error on location find');
    }
  }
  async update(id: string, data: Partial<CreateLocationBodyDto>): Promise<Geolocation> {
    try {
      const location = await this.locationRepository.findOne({ where: { id } });
      const { name, coordinates } = data;
      if (!location) {
        throw new Error('Location not found');
      }
      const partialEntry = {
        name,
        location: undefined,
      };
      if (coordinates) {
        partialEntry.location = {
          type: location.location_type,
          coordinates,
        };
      }
      await this.locationRepository.update({ id }, partialEntry);
      return this.locationRepository.findOne({ where: { id } });
    } catch (e) {
      throw new Error('Error on location update');
    }
  }
  delete(id: string): Promise<DeleteResult> {
    try {
      return this.locationRepository.delete({ id });
    } catch (e) {
      throw new Error('Error on location delete');
    }
  }
}
