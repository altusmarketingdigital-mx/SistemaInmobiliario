const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener lotes
router.get('/', async (req, res) => {
  const { plano_id } = req.query;
  try {
    let query = 'SELECT * FROM lotes';
    let params = [];
    if (plano_id) {
      query += ' WHERE plano_id = $1';
      params.push(plano_id);
    }
    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener lotes' });
  }
});

// Actualizar el estado de un lote
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE lotes SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Lote no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estado del lote' });
  }
});

// Crear un nuevo lote
router.post('/', async (req, res) => {
  const { plano_id, codigo, superficie_m2, precio_m2 } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO lotes (plano_id, codigo, superficie_m2, precio_m2) VALUES ($1, $2, $3, $4) RETURNING *',
      [plano_id || null, codigo, superficie_m2, precio_m2]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El código del lote ya existe' });
    }
    res.status(500).json({ error: 'Error al crear el lote' });
  }
});

module.exports = router;
