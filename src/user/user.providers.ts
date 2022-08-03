import { Connection } from 'typeorm';
import { User } from './user.entity';
import constants from '../constants/constants';

export const userProviders = [
  {
    provide: constants.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [constants.DATABASE_CONNECTION],
  },
];
