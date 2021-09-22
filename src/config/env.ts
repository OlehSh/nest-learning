import path from 'path';
import dotenv from 'dotenv';

const inTest = typeof global.it === 'function';
console.log('PATH ****', path);
console.log('DIR', __dirname);
const dotenvPath = inTest
  ? path.join(__dirname, '../../tests', '.env')
  : path.join(__dirname, '../..', '.env');
dotenv.config({ path: dotenvPath });
export default {
  saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 16,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || 'default_secret',
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || '1d',
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    dbName: process.env.PG_DATRABASE,
  },
};
