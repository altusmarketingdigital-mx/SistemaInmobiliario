require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testInsert() {
  try {
    const res = await sql.query("SELECT * FROM proyectos LIMIT 1");
    if (res.rows.length === 0) {
      console.log("No hay proyectos.");
      return;
    }
    const pid = res.rows[0].id;
    console.log("Usando proyecto id:", pid);

    await sql.query(
      'INSERT INTO planos (proyecto_id, nombre_etapa, archivo_svg) VALUES ($1, $2, $3) RETURNING *',
      [pid, 'Prueba', '<svg></svg>']
    );
    console.log("INSERT EXITOSO");
  } catch(e) {
    console.error("ERROR:", e);
  }
}

testInsert();
