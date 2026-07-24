const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los compradores
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM compradores ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener compradores' });
  }
});

// Crear comprador
router.post('/', async (req, res) => {
  const { nombre, telefono, email, direccion, rfc } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  try {
    const { rows } = await db.query(
      'INSERT INTO compradores (nombre, telefono, email, direccion, rfc) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, telefono, email, direccion, rfc]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear comprador' });
  }
});

// Actualizar comprador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email, direccion, rfc } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE compradores SET nombre = $1, telefono = $2, email = $3, direccion = $4, rfc = $5 WHERE id = $6 RETURNING *',
      [nombre, telefono, email, direccion, rfc, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Comprador no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar comprador' });
  }
});

module.exports = router;
