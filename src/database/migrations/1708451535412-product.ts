import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1708451535412 implements MigrationInterface {
    name = 'Product1708451535412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token\` text NULL`);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
