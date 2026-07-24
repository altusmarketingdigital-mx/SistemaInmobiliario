require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testInsert() {
  try {
    const proy = await sql('SELECT * FROM proyectos LIMIT 1');
    if (proy.length === 0) {
      console.log("No hay proyectos.");
      return;
    }
    const pid = proy[0].id;
    console.log("Usando proyecto id:", pid);

    const res = await sql('INSERT INTO planos (proyecto_id, nombre_etapa, archivo_svg) VALUES ($1, $2, $3) RETURNING *', [pid, 'Prueba', '<svg>Test</svg>']);
    console.log("INSERT EXITOSO:", res);
  } catch(e) {
    console.error("ERROR DB:", e);
  }
}

testInsert();
