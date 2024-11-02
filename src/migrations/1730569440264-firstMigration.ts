import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1730569440264 implements MigrationInterface {
  name = 'FirstMigration1730569440264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."ticket_ticketstatus_enum" AS ENUM('sold', 'locked', 'unsold')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, "summary" character varying(1024) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ticketStatus" "public"."ticket_ticketstatus_enum" NOT NULL DEFAULT 'unsold', "lockedAt" TIMESTAMP, "eventId" integer, "ownerId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_category_enum" AS ENUM('music', 'conference', 'festivals', 'parties', 'echibitions', 'theater', 'classes', 'sports')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_pricetype_enum" AS ENUM('free', 'paid')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_attendancemode_enum" AS ENUM('in-person', 'online')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying(96), "category" "public"."event_category_enum" NOT NULL, "priceType" "public"."event_pricetype_enum" NOT NULL, "attendanceMode" "public"."event_attendancemode_enum" NOT NULL, "description" character varying(2560) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying(1024), "venue" character varying(1024), "address" character varying(1024), "virtualLink" character varying(1024), "eventStartDate" TIMESTAMP NOT NULL, "eventStartTime" character varying(5) NOT NULL, "eventEndTime" character varying(5) NOT NULL, "eventEndDate" TIMESTAMP, "ownerId" integer, CONSTRAINT "UQ_b535fbe8ec6d832dde22065ebdb" UNIQUE ("name"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_accounttype_enum" AS ENUM('eventOrganiser', 'ticketPurchaser')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'eventOrganiser', 'ticketPurchaser')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(96) NOT NULL, "lastName" character varying(96) NOT NULL, "email" character varying(96) NOT NULL, "password" character varying(96), "accountType" "public"."user_accounttype_enum" NOT NULL, "role" "public"."user_role_enum" NOT NULL, "resetOtp" character varying(96), "resetOtpExpire" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscriber" ("id" SERIAL NOT NULL, "email" character varying(96) NOT NULL, CONSTRAINT "UQ_073600148a22d05dcf81d119a6a" UNIQUE ("email"), CONSTRAINT "PK_1c52b7ddbaf79cd2650045b79c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'success', 'failed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "provider" character varying NOT NULL, "providerReference" character varying NOT NULL, "authorizationUrl" character varying, "amount" numeric(10,2) NOT NULL, "eventId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_99ae21d9c3b1f8972f6ebd5976f" UNIQUE ("providerReference"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_tickets" ("paymentId" integer NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "PK_6d99cfaabd74a277dbcffd618a2" PRIMARY KEY ("paymentId", "ticketId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6809e73f1e3064b23d2512db78" ON "payment_tickets" ("paymentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67e6c055e278378f54af5f7bf6" ON "payment_tickets" ("ticketId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_79f2353f877e8bc35dd0101388a" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_tickets" ADD CONSTRAINT "FK_6809e73f1e3064b23d2512db78b" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_tickets" ADD CONSTRAINT "FK_67e6c055e278378f54af5f7bf63" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_tickets" DROP CONSTRAINT "FK_67e6c055e278378f54af5f7bf63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_tickets" DROP CONSTRAINT "FK_6809e73f1e3064b23d2512db78b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_79f2353f877e8bc35dd0101388a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_67e6c055e278378f54af5f7bf6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6809e73f1e3064b23d2512db78"`,
    );
    await queryRunner.query(`DROP TABLE "payment_tickets"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(`DROP TABLE "subscriber"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_accounttype_enum"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "public"."event_attendancemode_enum"`);
    await queryRunner.query(`DROP TYPE "public"."event_pricetype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."event_category_enum"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TYPE "public"."ticket_ticketstatus_enum"`);
  }
}
