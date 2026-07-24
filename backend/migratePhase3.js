require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const migrate = async () => {
  try {
    // 1. Create Bancos
    await sql.query(`
      CREATE TABLE IF NOT EXISTS bancos (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          cuenta VARCHAR(50),
          clabe VARCHAR(50),
          saldo DECIMAL(15, 2) DEFAULT 0.00,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla bancos creada/verificada.");

    // 2. Create Transacciones (Ingresos y Egresos)
    await sql.query(`
      CREATE TABLE IF NOT EXISTS transacciones (
          id SERIAL PRIMARY KEY,
          tipo VARCHAR(50) NOT NULL, -- 'Ingreso' o 'Egreso'
          monto DECIMAL(15, 2) NOT NULL,
          concepto VARCHAR(255) NOT NULL,
          banco_id INTEGER REFERENCES bancos(id) ON DELETE SET NULL,
          fecha DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla transacciones creada/verificada.");

    // 3. Create Cobranza (linked to operaciones)
    await sql.query(`
      CREATE TABLE IF NOT EXISTS cobranza (
          id SERIAL PRIMARY KEY,
          operacion_id INTEGER REFERENCES operaciones(id) ON DELETE CASCADE,
          monto_esperado DECIMAL(15, 2) NOT NULL,
          fecha_vencimiento DATE,
          estado VARCHAR(50) DEFAULT 'Pendiente', -- Pendiente, Pagado, Atrasado
          notas TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla cobranza creada/verificada.");

    process.exit(0);
  } catch (error) {
    console.error("Error durante la migracion fase 3:", error);
    process.exit(1);
  }
};

migrate();
