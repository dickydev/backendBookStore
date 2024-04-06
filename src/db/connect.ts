import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '1234',
  port: 5433
})

export default pool
