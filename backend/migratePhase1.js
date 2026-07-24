require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const migrate = async () => {
  try {
    // 1. Create Propietarios
    await sql.query(`
      CREATE TABLE IF NOT EXISTS propietarios (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          telefono VARCHAR(50),
          email VARCHAR(255),
          direccion TEXT,
          rfc VARCHAR(20),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla propietarios creada/verificada.");

    // 2. Create Compradores
    await sql.query(`
      CREATE TABLE IF NOT EXISTS compradores (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          telefono VARCHAR(50),
          email VARCHAR(255),
          direccion TEXT,
          rfc VARCHAR(20),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla compradores creada/verificada.");

    // 3. Alter Lotes to support expanded real estate types
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS tipo_inmueble VARCHAR(50) DEFAULT 'Terreno';`);
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS operacion_tipo VARCHAR(50) DEFAULT 'Venta';`);
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS propietario_id INTEGER REFERENCES propietarios(id);`);
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS titulo VARCHAR(255);`);
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS descripcion TEXT;`);
    await sql.query(`ALTER TABLE lotes ADD COLUMN IF NOT EXISTS imagenes JSONB;`);
    console.log("Tabla lotes alterada/verificada con nuevas columnas.");

    // 4. Create Operaciones
    await sql.query(`
      CREATE TABLE IF NOT EXISTS operaciones (
          id SERIAL PRIMARY KEY,
          lote_id INTEGER REFERENCES lotes(id) ON DELETE RESTRICT,
          comprador_id INTEGER REFERENCES compradores(id),
          tipo_operacion VARCHAR(50) NOT NULL, -- 'Venta', 'Renta', 'Reservacion'
          monto DECIMAL(12, 2) NOT NULL,
          fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          estado VARCHAR(50) DEFAULT 'Activa',
          notas TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla operaciones creada/verificada.");

    process.exit(0);
  } catch (error) {
    console.error("Error durante la migracion:", error);
    process.exit(1);
  }
};

migrate();
