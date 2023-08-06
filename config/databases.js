import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// DATABASES LOCAL POSGRESQL
const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DABASTE_DIALECT,
  }
);

export default db;