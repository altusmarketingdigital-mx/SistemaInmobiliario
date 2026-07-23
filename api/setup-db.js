const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000, 
  idleTimeoutMillis: 30000,
});

module.exports = async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS proyectos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        ubicacion VARCHAR(255) NOT NULL,
        descripcion TEXT,
        logotipo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS lotes (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        superficie_m2 DECIMAL(10,2) NOT NULL,
        precio_m2 DECIMAL(10,2) NOT NULL,
        estado VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', ['admin@1k6.com']);
    if (rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await pool.query('INSERT INTO usuarios (email, password_hash) VALUES ($1, $2)', ['admin@1k6.com', hash]);
    }
    
    res.status(200).json({ status: 'exito', mensaje: 'Tablas e usuario admin creados correctamente en Neon DB desde Vercel Serverless Function.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
