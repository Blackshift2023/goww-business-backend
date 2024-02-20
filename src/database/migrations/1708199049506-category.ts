import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1708199049506 implements MigrationInterface {
    name = 'Category1708199049506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
