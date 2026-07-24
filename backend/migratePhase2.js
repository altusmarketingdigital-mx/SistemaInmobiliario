require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const migrate = async () => {
  try {
    // 1. Create Agentes
    await sql.query(`
      CREATE TABLE IF NOT EXISTS agentes (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          telefono VARCHAR(50),
          email VARCHAR(255),
          jerarquia VARCHAR(50) DEFAULT 'Promotor', -- Gerente, Coordinador, Promotor, Influencer
          porcentaje_comision DECIMAL(5, 2) DEFAULT 0.00,
          jefe_id INTEGER REFERENCES agentes(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla agentes creada/verificada.");

    // 2. Create Inversionistas
    await sql.query(`
      CREATE TABLE IF NOT EXISTS inversionistas (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          telefono VARCHAR(50),
          email VARCHAR(255),
          total_invertido DECIMAL(15, 2) DEFAULT 0.00,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla inversionistas creada/verificada.");

    // 3. Alter Operaciones to include agente_id
    await sql.query(`
      ALTER TABLE operaciones ADD COLUMN IF NOT EXISTS agente_id INTEGER REFERENCES agentes(id);
    `);
    console.log("Tabla operaciones alterada con agente_id.");

    // 4. Create Comisiones
    await sql.query(`
      CREATE TABLE IF NOT EXISTS comisiones (
          id SERIAL PRIMARY KEY,
          operacion_id INTEGER REFERENCES operaciones(id) ON DELETE CASCADE,
          agente_id INTEGER REFERENCES agentes(id) ON DELETE RESTRICT,
          monto DECIMAL(12, 2) NOT NULL,
          estado VARCHAR(50) DEFAULT 'Pendiente', -- Pendiente, Pagada, Cancelada
          notas TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla comisiones creada/verificada.");

    process.exit(0);
  } catch (error) {
    console.error("Error durante la migracion fase 2:", error);
    process.exit(1);
  }
};

migrate();
