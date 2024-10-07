import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();
export default mysql.createPool({
  connectionLimit : 10,
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB
});
