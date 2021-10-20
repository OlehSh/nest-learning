import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class addGeoPointTable1634738785543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'geolocation_points',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'point',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'collections',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'geopoints-collections',
        columns: [
          {
            name: 'collection_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'geolocation_point_id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'collections',
      new TableForeignKey({
        name: 'fk_collections_users_user_id',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    );
    await queryRunner.createForeignKey(
      'geopoints-collections',
      new TableForeignKey({
        name: 'fk_geolocation_collections_point_id',
        referencedTableName: 'geolocation_points',
        referencedColumnNames: ['id'],
        columnNames: ['geolocation_point_id'],
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    );
    await queryRunner.createForeignKey(
      'geopoints-collections',
      new TableForeignKey({
        name: 'fk_geolocation_collections_collection_id',
        referencedTableName: 'collections',
        referencedColumnNames: ['id'],
        columnNames: ['collection_id'],
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('geopoints-collections');
    await queryRunner.dropTable('collections');
    await queryRunner.dropTable('geolocation_points');
  }
}
