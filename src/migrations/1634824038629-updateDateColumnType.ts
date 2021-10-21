import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateDateColumnType1634824038629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const changedColumns: { oldColumn: TableColumn; newColumn: TableColumn }[] =
      [
        {
          oldColumn: new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
          }),
          newColumn: new TableColumn({
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          }),
        },
        {
          oldColumn: new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
          }),
          newColumn: new TableColumn({
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          }),
        },
      ];
    await queryRunner.changeColumns('users', changedColumns);
    await queryRunner.changeColumns('collections', changedColumns);
    await queryRunner.changeColumns('geolocation_points', changedColumns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const changedColumns: { oldColumn: TableColumn; newColumn: TableColumn }[] =
      [
        {
          oldColumn: new TableColumn({
            name: 'createdAt',
            type: 'timestamptz',
          }),
          newColumn: new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          }),
        },
        {
          oldColumn: new TableColumn({
            name: 'updatedAt',
            type: 'timestamptz',
          }),
          newColumn: new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          }),
        },
      ];
    await queryRunner.changeColumns('users', changedColumns);
    await queryRunner.changeColumns('collections', changedColumns);
    await queryRunner.changeColumns('geolocation_points', changedColumns);
  }

}
