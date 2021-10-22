import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm';
import conf from '../config/db';

export const pgProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(conf as ConnectionOptions),
  },
];
