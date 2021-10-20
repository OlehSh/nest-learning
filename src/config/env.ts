import path from 'path';
import dotenv from 'dotenv';

const inTest = typeof global.it === 'function';
const dotenvPath = inTest
  ? path.join(__dirname, '../../tests', '.env')
  : path.join(__dirname, '../..', '.env');
dotenv.config({ path: dotenvPath });
export default {
  saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 16,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || 'default_secret',
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || '1d',
  typeORM: {
    // type: process.env.TYPEORM_CONNECTION || 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    entities: [process.env.TYPEORM_ENTITIES] || ['src/**/*.{ts,js}'],
    migrations: [process.env.TYPEORM_MIGRATIONS] || ['src/**/*.ts'],
    // cli: {
    //   migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR || 'migrations',
    // },
  },
};
