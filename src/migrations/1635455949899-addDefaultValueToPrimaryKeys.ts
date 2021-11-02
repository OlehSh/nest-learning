import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultValueToPrimaryKeys1635455949899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "geolocation_points" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "collections" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "geolocation_points" ALTER COLUMN "id" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "collections" ALTER COLUMN "id" DROP DEFAULT',
    );
  }
}
