const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener empleados
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM empleados ORDER BY nombre ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Crear empleado
router.post('/', async (req, res) => {
  const { nombre, rfc, puesto, salario_base, fecha_ingreso } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  try {
    const { rows } = await db.query(
      'INSERT INTO empleados (nombre, rfc, puesto, salario_base, fecha_ingreso) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, rfc, puesto, salario_base || 0, fecha_ingreso || new Date()]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
});

module.exports = router;
