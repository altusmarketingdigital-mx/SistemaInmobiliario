const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los agentes
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT a.*, j.nombre as jefe_nombre 
      FROM agentes a
      LEFT JOIN agentes j ON a.jefe_id = j.id
      ORDER BY a.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener agentes' });
  }
});

// Crear agente
router.post('/', async (req, res) => {
  const { nombre, telefono, email, jerarquia, porcentaje_comision, jefe_id } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  
  try {
    const { rows } = await db.query(
      'INSERT INTO agentes (nombre, telefono, email, jerarquia, porcentaje_comision, jefe_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, telefono, email, jerarquia || 'Promotor', porcentaje_comision || 0, jefe_id || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear agente' });
  }
});

module.exports = router;
