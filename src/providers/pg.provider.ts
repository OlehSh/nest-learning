import { createConnection } from 'typeorm';
import conf from '../config/env';

const { typeORM } = conf;
export const pgProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        entities: ['dist/**/*.entity{.ts,.js}'],
        // synchronize: true,
        ...typeORM,
      }),
  },
];
