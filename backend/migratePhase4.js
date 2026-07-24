require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const migrate = async () => {
  try {
    // 1. Create Empleados
    await sql.query(`
      CREATE TABLE IF NOT EXISTS empleados (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          rfc VARCHAR(20),
          puesto VARCHAR(100),
          salario_base DECIMAL(15, 2) DEFAULT 0.00,
          fecha_ingreso DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla empleados creada/verificada.");

    // 2. Create Nomina
    await sql.query(`
      CREATE TABLE IF NOT EXISTS nomina (
          id SERIAL PRIMARY KEY,
          empleado_id INTEGER REFERENCES empleados(id) ON DELETE CASCADE,
          periodo VARCHAR(100) NOT NULL,
          monto_pagado DECIMAL(15, 2) NOT NULL,
          banco_id INTEGER REFERENCES bancos(id) ON DELETE SET NULL,
          fecha_pago DATE DEFAULT CURRENT_DATE,
          estado VARCHAR(50) DEFAULT 'Pagado',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla nomina creada/verificada.");

    // 3. Create Configuracion
    await sql.query(`
      CREATE TABLE IF NOT EXISTS configuracion (
          id SERIAL PRIMARY KEY,
          clave VARCHAR(100) UNIQUE NOT NULL,
          valor TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabla configuracion creada/verificada.");

    process.exit(0);
  } catch (error) {
    console.error("Error durante la migracion fase 4:", error);
    process.exit(1);
  }
};

migrate();
