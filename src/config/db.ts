import path from 'path';

export default {
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT, 10) || 3000,
  username: process.env.TYPEORM_USERNAME || '',
  password: process.env.TYPEORM_PASSWORD || '',
  database: process.env.TYPEORM_DATABASE || 'db',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: process.env.TYPEORM_ENTITIES
    ? [process.env.TYPEORM_ENTITIES]
    : ['src/**/*.{ts,js}'],
  migrations: process.env.TYPEORM_MIGRATIONS
    ? [process.env.TYPEORM_MIGRATIONS]
    : ['src/**/*.ts'],
};
