const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM proyectos ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// Crear un proyecto
router.post('/', async (req, res) => {
  const { nombre, ubicacion, descripcion, logotipo_url } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO proyectos (nombre, ubicacion, descripcion, logotipo_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ubicacion, descripcion, logotipo_url]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
});

module.exports = router;
