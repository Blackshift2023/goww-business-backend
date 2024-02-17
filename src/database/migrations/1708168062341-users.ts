import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1708168062341 implements MigrationInterface {
    name = 'Users1708168062341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NULL, \`firstname\` varchar(255) NULL, \`lastname\` varchar(255) NULL, \`date_of_birth\` date NULL, \`phone_number\` varchar(255) NULL, \`gender\` enum ('M', 'F', 'O') NULL, \`email\` varchar(255) NULL, \`last_login\` datetime NULL, \`token\` text NULL, \`status\` tinyint NULL DEFAULT 0, \`company_name\` varchar(255) NULL, \`user_type\` enum ('super_owner', 'admin', 'owner', 'customer') NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
