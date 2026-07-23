const express = require('express');
const cors = require('cors');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const authMiddleware = require('./middleware/auth');

// Public routes
app.use('/api/health', (req, res) => res.json({ status: 'ok' }));

// RECURSO TEMPORAL PARA CREAR LAS TABLAS DESDE VERCEL
app.get('/api/setup-db', async (req, res) => {
  try {
    const db = require('./db');
    const bcrypt = require('bcryptjs');

    const queries = [
      `CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS proyectos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        ubicacion VARCHAR(255) NOT NULL,
        descripcion TEXT,
        logotipo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS planos (
        id SERIAL PRIMARY KEY,
        proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
        archivo_svg TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS lotes (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        superficie_m2 DECIMAL(10,2) NOT NULL,
        precio_m2 DECIMAL(10,2) NOT NULL,
        estado VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS plano_id INTEGER REFERENCES planos(id) ON DELETE CASCADE`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS manzana VARCHAR(50)`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS numero_lote VARCHAR(50)`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS data_lote_ref VARCHAR(100)`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS enganche_minimo_pct DECIMAL(5,2)`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS apartado_minimo DECIMAL(10,2)`,
      `ALTER TABLE lotes ADD COLUMN IF NOT EXISTS plazos_autorizados VARCHAR(255)`
    ];

    for (const q of queries) {
      await db.query(q);
    }

    // Crear usuario admin si no existe
    const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', ['admin@1k6.com']);
    if (rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await db.query('INSERT INTO usuarios (email, password_hash) VALUES ($1, $2)', ['admin@1k6.com', hash]);
    }
    
    res.json({ status: 'exito', mensaje: 'Tablas e usuario admin creados correctamente en Neon DB.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/publicProyectos'));

// Protected Admin Routes
app.use('/api/admin/proyectos', authMiddleware, require('./routes/proyectos'));
app.use('/api/admin/planos', authMiddleware, require('./routes/planos'));
app.use('/api/admin/lotes', authMiddleware, require('./routes/lotes'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Exportar la app para Vercel Serverless
module.exports = app;
