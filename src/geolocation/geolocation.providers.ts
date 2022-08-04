import { Connection } from 'typeorm';
import constants from '../constants/constants';
import { Geolocation } from './geolocation.entity';

export const GeolocationProviders = [
  {
    provide: constants.GEOLOCATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Geolocation),
    inject: [constants.DATABASE_CONNECTION],
  },
];
