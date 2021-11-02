
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## ENV Variables

|Var name     | Default value | Description           |
|---------------------------|---------------|-----------------------|
| TYPEORM_CONNECTION        | postgres      | typeorm connection db type      |
| TYPEORM_HOST              | localhost     | db host      |
| TYPEORM_PORT              | 5432          | db port      |
| TYPEORM_USERNAME          | nest_learning | db username  | 
| TYPEORM_PASSWORD          | qwerty        | db password  |
| TYPEORM_DATABASE          | gis_db        | Database name         |
| TYPEORM_SYNCHRONIZE       | false         | synchronize entity with db      |
| TYPEORM_LOGGING           | false         | typeorm query logging      |
| TYPEORM_ENTITIES          |  'dist/entities/*.js' | entities directory after build     |
| TYPEORM_MIGRATIONS        |  'dist/migrations/*.js' | migrations directory after build   |
| TYPEORM_MIGRATIONS_DIR    |  'src/migrations' | migrations directory    |
| PORT                      | 3000          |  app port             |
| MODE                      | PRODUCTION    | App Mode (not using for now) |

## .seeds.env Variables

|Var name     | Default value | Description           |
|---------------------------|---------------|-----------------------|
| TYPEORM_CONNECTION        | postgres      | typeorm connection db type      |
| TYPEORM_HOST              | localhost     | db host      |
| TYPEORM_PORT              | 5432          | db port      |
| TYPEORM_USERNAME          | nest_learning | db username  | 
| TYPEORM_PASSWORD          | qwerty        | db password  |
| TYPEORM_DATABASE          | gis_db        | Database name         |
| TYPEORM_SYNCHRONIZE       | false         | synchronize entity with db      |
| TYPEORM_LOGGING           | false         | typeorm query logging      |
| TYPEORM_ENTITIES          |  'dist/entities/*.js' | entities directory after build     |
| TYPEORM_MIGRATIONS        |  'dist/seeds/*.js' | migrations directory after build   |
| TYPEORM_MIGRATIONS_DIR    |  'src/seeds' | seeds directory    |
| TYPEORM_MIGRATIONS_TABLE  |  'seeds' | seeds table    |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
