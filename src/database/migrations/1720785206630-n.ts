import { MigrationInterface, QueryRunner } from 'typeorm';

export class N1720785206630 implements MigrationInterface {
  name = 'N1720785206630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mail_log" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "mailLogId" SERIAL NOT NULL, "to" character varying NOT NULL, "subject" character varying NOT NULL, "html" text NOT NULL, "status" "public"."mail_log_status_enum" NOT NULL DEFAULT 'PENDING', "sender_id" uuid, CONSTRAINT "PK_346723c88a8ef16be058f4ad134" PRIMARY KEY ("mailLogId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying(200) NOT NULL, "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mail_template" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "mailTemplateId" SERIAL NOT NULL, "title" character varying NOT NULL, "subject" character varying NOT NULL, "html" text NOT NULL, CONSTRAINT "PK_4be27ee304ca95da94cf36da237" PRIMARY KEY ("mailTemplateId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_log" ADD CONSTRAINT "FK_1aad05934c14539f35746b76212" FOREIGN KEY ("sender_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mail_log" DROP CONSTRAINT "FK_1aad05934c14539f35746b76212"`,
    );
    await queryRunner.query(`DROP TABLE "mail_template"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "mail_log"`);
  }
}
