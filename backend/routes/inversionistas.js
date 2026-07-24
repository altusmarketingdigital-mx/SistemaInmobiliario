const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los inversionistas
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM inversionistas ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener inversionistas' });
  }
});

// Crear inversionista
router.post('/', async (req, res) => {
  const { nombre, telefono, email, total_invertido } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  try {
    const { rows } = await db.query(
      'INSERT INTO inversionistas (nombre, telefono, email, total_invertido) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, telefono, email, total_invertido || 0]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear inversionista' });
  }
});

module.exports = router;
