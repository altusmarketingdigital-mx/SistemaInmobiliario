const db = require('./db');

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS proyectos (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          ubicacion VARCHAR(255),
          descripcion TEXT,
          logotipo_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS planos (
          id SERIAL PRIMARY KEY,
          proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
          nombre_etapa VARCHAR(100),
          archivo_svg TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS lotes (
          id SERIAL PRIMARY KEY,
          plano_id INTEGER REFERENCES planos(id) ON DELETE CASCADE,
          codigo VARCHAR(50) UNIQUE NOT NULL,
          manzana VARCHAR(20),
          numero_lote VARCHAR(20),
          superficie_m2 DECIMAL(10, 2) NOT NULL,
          precio_m2 DECIMAL(12, 2) NOT NULL,
          estado VARCHAR(20) DEFAULT 'Disponible',
          enganche_minimo_pct DECIMAL(5, 2),
          apartado_minimo DECIMAL(12, 2),
          plazos_autorizados JSONB,
          data_lote_ref VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS historial_apartados (
          id SERIAL PRIMARY KEY,
          lote_id INTEGER REFERENCES lotes(id) ON DELETE RESTRICT,
          cliente_nombre VARCHAR(255),
          cliente_telefono VARCHAR(50),
          monto_pagado DECIMAL(12, 2),
          fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          tipo_operacion VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          rol VARCHAR(50) DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear usuario admin si no existe
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('admin123', 10);
    
    const adminCheck = await db.query("SELECT * FROM usuarios WHERE email = 'admin@1k6.com'");
    if(adminCheck.rows.length === 0) {
      await db.query("INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3)", 
        ['Administrador 1K6', 'admin@1k6.com', hash]
      );
    }
    console.log("Tablas creadas exitosamente en Neon.");
    process.exit(0);
  } catch (err) {
    console.error("Error al crear tablas:", err);
    process.exit(1);
  }
};

createTables();
