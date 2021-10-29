import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import constants from '../constants/constants';
export const pgProvider = [
  {
    provide: constants.DATABASE_CONNECTION,
    useFactory: async (service: ConfigService) => {
      return await createConnection(service.get('db') as ConnectionOptions);
    },
    inject: [ConfigService],
  },
];
