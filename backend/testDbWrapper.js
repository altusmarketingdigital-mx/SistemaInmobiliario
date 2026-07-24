const db = require('./db.js');

async function test() {
  try {
    const { rows } = await db.query('SELECT * FROM proyectos WHERE id = $1', [1]);
    console.log("SELECT EXITOSO:", rows);

    const { rows: insertRows } = await db.query(
      'INSERT INTO proyectos (nombre, ubicacion, descripcion, logotipo_url) VALUES ($1, $2, $3, $4) RETURNING *',
      ['Test', 'Loc', 'Desc', '']
    );
    console.log("INSERT EXITOSO:", insertRows);
  } catch(e) {
    console.error("ERROR EN DB.QUERY:", e);
  }
}

test();
