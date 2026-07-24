require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testCheck() {
  try {
    const res = await sql.query("SELECT id, nombre FROM proyectos");
    console.log("PROYECTOS EN DB:", res.rows || res);
  } catch(e) {
    console.error("ERROR DB:", e);
  }
}

testCheck();
