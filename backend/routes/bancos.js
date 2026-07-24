const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los bancos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM bancos ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener bancos' });
  }
});

// Crear banco
router.post('/', async (req, res) => {
  const { nombre, cuenta, clabe, saldo } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  try {
    const { rows } = await db.query(
      'INSERT INTO bancos (nombre, cuenta, clabe, saldo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, cuenta, clabe, saldo || 0]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear banco' });
  }
});

module.exports = router;
