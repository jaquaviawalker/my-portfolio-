import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: Number(process.env.POSTGRES_DB_PORT) || 5432,
  database: process.env.POSTGRES_DB_NAME,
  user: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
});

export default pool;
