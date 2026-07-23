const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/auth');

// Public routes
app.use('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/publicProyectos'));

// Protected Admin Routes
app.use('/api/admin/proyectos', authMiddleware, require('./routes/proyectos'));
app.use('/api/admin/planos', authMiddleware, require('./routes/planos'));
app.use('/api/admin/lotes', authMiddleware, require('./routes/lotes'));

// Solo iniciar el servidor si no estamos en un entorno Serverless (Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Exportar la app para Vercel Serverless
module.exports = app;
