const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener planos de un proyecto
router.get('/', async (req, res) => {
  const { proyecto_id } = req.query;
  try {
    const query = proyecto_id 
      ? 'SELECT * FROM planos WHERE proyecto_id = $1 ORDER BY created_at DESC' 
      : 'SELECT * FROM planos ORDER BY created_at DESC';
    const params = proyecto_id ? [proyecto_id] : [];
    
    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener planos' });
  }
});

// Subir un plano y asociarlo a un proyecto
router.post('/', async (req, res) => {
  const { proyecto_id, nombre_etapa, archivo_svg } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO planos (proyecto_id, nombre_etapa, archivo_svg) VALUES ($1, $2, $3) RETURNING *',
      [proyecto_id, nombre_etapa, archivo_svg]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error al subir el plano' });
  }
});

module.exports = router;
