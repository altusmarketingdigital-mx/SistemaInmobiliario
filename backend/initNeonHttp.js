require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

const sql = neon(process.env.DATABASE_URL);

async function initDbHttp() {
  try {
    console.log("Creando tablas sobre HTTP...");
    await sql.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await sql.query(`
      CREATE TABLE IF NOT EXISTS proyectos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        ubicacion VARCHAR(255) NOT NULL,
        descripcion TEXT,
        logotipo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await sql.query(`
      CREATE TABLE IF NOT EXISTS lotes (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        superficie_m2 DECIMAL(10,2) NOT NULL,
        precio_m2 DECIMAL(10,2) NOT NULL,
        estado VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS planos (
        id SERIAL PRIMARY KEY,
        proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
        nombre_etapa VARCHAR(255) NOT NULL,
        archivo_svg TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tablas creadas, verificando usuario admin...");
    try {
      const hash = await bcrypt.hash('admin123', 10);
      await sql.query('INSERT INTO usuarios (email, password_hash) VALUES ($1, $2)', ['admin@1k6.com', hash]);
      console.log("Usuario admin creado exitosamente.");
    } catch(err) {
      console.log("El usuario admin ya existia o error:", err.message);
    }
    
    console.log("COMPLETADO CON EXITO");
  } catch(e) {
    console.error("ERROR DB HTTP:", e);
  }
}

initDbHttp();
