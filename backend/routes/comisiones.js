const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las comisiones
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT c.*, 
             a.nombre as agente_nombre, 
             a.jerarquia as agente_jerarquia,
             o.tipo_operacion,
             l.codigo as lote_codigo
      FROM comisiones c
      LEFT JOIN agentes a ON c.agente_id = a.id
      LEFT JOIN operaciones o ON c.operacion_id = o.id
      LEFT JOIN lotes l ON o.lote_id = l.id
      ORDER BY c.created_at DESC
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comisiones' });
  }
});

// Pagar comision (actualizar estado)
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE comisiones SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Comisión no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar comisión' });
  }
});

module.exports = router;
