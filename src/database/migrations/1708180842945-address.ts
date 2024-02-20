import { MigrationInterface, QueryRunner } from "typeorm";

export class Address1708180842945 implements MigrationInterface {
    name = 'Address1708180842945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mobile\` varchar(15) NULL, \`fullName\` varchar(100) NOT NULL, \`address\` varchar(200) NOT NULL, \`city\` varchar(40) NOT NULL, \`state\` varchar(40) NOT NULL, \`country\` varchar(40) NOT NULL, \`type\` enum ('shipping', 'billing') NOT NULL DEFAULT 'shipping', \`zipCode\` int NOT NULL, \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
