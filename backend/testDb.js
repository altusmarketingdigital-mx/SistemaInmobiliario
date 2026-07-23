require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const res = await pool.query('SELECT * FROM usuarios');
    console.log("Usuarios en BD:", res.rows);
  } catch(e) {
    console.error("Error BD:", e.message);
  } finally {
    pool.end();
  }
}

test();
