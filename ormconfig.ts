
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['src/../**/*.entity.{js,ts}'],
  migrations: ['src/database/migrations/*.{js,ts}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
});
