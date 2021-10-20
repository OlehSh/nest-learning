import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class userTableAddTimestampColumns1634740745800 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['createdAt', 'updatedAt']);
  }
}
