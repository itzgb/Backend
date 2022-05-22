import { MigrationInterface, QueryRunner } from "typeorm";

export class changes1652084052734 implements MigrationInterface {
    name = 'changes1652084052734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_ea293f5f133e37b6eb6a06dd1c5"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "REL_ea293f5f133e37b6eb6a06dd1c"`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_ea293f5f133e37b6eb6a06dd1c5" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_ea293f5f133e37b6eb6a06dd1c5"`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "REL_ea293f5f133e37b6eb6a06dd1c" UNIQUE ("bookIdId")`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_ea293f5f133e37b6eb6a06dd1c5" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
