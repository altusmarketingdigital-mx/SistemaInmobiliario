const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener configuraciones como objeto {clave: valor}
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT clave, valor FROM configuracion');
    const configObj = {};
    rows.forEach(r => configObj[r.clave] = r.valor);
    res.json(configObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener configuraciones' });
  }
});

// Actualizar o crear una configuracion
router.put('/:clave', async (req, res) => {
  const { clave } = req.params;
  const { valor } = req.body;
  try {
    await db.query(`
      INSERT INTO configuracion (clave, valor) 
      VALUES ($1, $2)
      ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor
    `, [clave, valor]);
    res.json({ message: 'Configuracion guardada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar configuracion' });
  }
});

module.exports = router;
