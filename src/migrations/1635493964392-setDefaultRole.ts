import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultRole1635493964392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role" TYPE varchar(50)
      USING CASE WHEN "role" = 1 THEN 'editor' ELSE 'admin' END, ALTER COLUMN "role" SET DEFAULT 'editor'
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT,
      ALTER COLUMN "role" TYPE smallint USING CASE WHEN "role" = 'editor' THEN 1 ELSE 0 END `);
  }
}
