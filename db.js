import 'dotenv/config';
import { Pool } from "pg";
console.log("Host:", typeof process.env.DB_HOST);
const databaseCheck = new Pool({
  user: process.env.DB_USERS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
  ssl: {
    rejectUnauthorized : false
  }
});

export default databaseCheck;
