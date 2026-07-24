require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
});

async function testCheck() {
  try {
    const res = await pool.query("SELECT id, nombre FROM proyectos");
    console.log("PROYECTOS EN DB:", res.rows);
  } catch(e) {
    console.error("ERROR:", e);
  } finally {
    pool.end();
  }
}

testCheck();
