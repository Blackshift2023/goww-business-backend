import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1708767411422 implements MigrationInterface {
    name = 'Product1708767411422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`categoryId\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token\` text NULL`);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
