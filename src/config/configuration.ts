export default () => ({
  port: process.env.PORT || 3000,
  mode: process.env.MODE || 'PRODUCTION',
  saltRounds: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 12,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  db: {
    type: process.env.TYPEORM_CONNECTION || 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432,
    installExtensions: process.env.TYPEORM_INSTALL_EXTENSIONS === 'true',
    username: process.env.TYPEORM_USERNAME || 'user',
    password: process.env.TYPEORM_PASSWORD || '',
    database: process.env.TYPEORM_DATABASE || '',
    synchronize:
      process.env.TYPEORM_SYNCHRONIZE &&
      process.env.TYPEORM_SYNCHRONIZE.toLowerCase() === 'true',
    logging:
      process.env.TYPEORM_LOGGING &&
      process.env.TYPEORM_LOGGING.toLowerCase() === 'true',
    entities: process.env.TYPEORM_ENTITIES
      ? [process.env.TYPEORM_ENTITIES]
      : ['dist/**/*.entity.js'],
    migrations: process.env.TYPEORM_MIGRATIONS
      ? [process.env.TYPEORM_MIGRATIONS]
      : ['dist/migrations/*.js'],
  },
});
