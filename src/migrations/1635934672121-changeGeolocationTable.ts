import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeGeolocationColumnType1635934672121
  implements MigrationInterface
{
  private oldColumn = new TableColumn({
    name: 'location',
    type: 'point',
    isNullable: false,
  });

  private newColumn = new TableColumn({
    name: 'location',
    type: 'geography',
    isNullable: false,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'geolocation_points',
      this.oldColumn,
      this.newColumn,
    );
    await queryRunner.addColumn(
      'geolocation_points',
      new TableColumn({
        name: 'location_type',
        type: 'varchar(100)',
        isNullable: false,
      }),
    );
    await queryRunner.renameTable('geolocation_points', 'geolocations');
    await queryRunner.renameColumn(
      'geopoints-collections',
      'geolocation_point_id',
      'geolocation_id',
    );
    await queryRunner.renameTable(
      'geopoints-collections',
      'geolocation_collections',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('geolocations', 'geolocation_points');
    await queryRunner.renameTable(
      'geolocation_collections',
      'geopoints-collections',
    );
    await queryRunner.renameColumn(
      'geopoints-collections',
      'geolocation_id',
      'geolocation_point_id',
    );
    await queryRunner.changeColumn(
      'geolocation_points',
      this.newColumn,
      this.oldColumn,
    );
    await queryRunner.dropColumn('geolocation_points', 'location_type');
  }
}
