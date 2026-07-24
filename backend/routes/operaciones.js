const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener operaciones con joins
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT o.*, 
             l.codigo as lote_codigo, 
             c.nombre as comprador_nombre 
      FROM operaciones o
      LEFT JOIN lotes l ON o.lote_id = l.id
      LEFT JOIN compradores c ON o.comprador_id = c.id
      ORDER BY o.created_at DESC
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener operaciones' });
  }
});

// Crear operacion
router.post('/', async (req, res) => {
  const { lote_id, comprador_id, tipo_operacion, monto, estado, notas } = req.body;
  if (!lote_id || !comprador_id || !tipo_operacion || !monto) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  
  try {
    // 1. Crear la operación
    const { rows } = await db.query(
      'INSERT INTO operaciones (lote_id, comprador_id, tipo_operacion, monto, estado, notas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [lote_id, comprador_id, tipo_operacion, monto, estado || 'Activa', notas]
    );
    
    // 2. Actualizar el estado del lote asociado según el tipo de operación
    let loteEstado = 'Apartado';
    if (tipo_operacion === 'Venta') loteEstado = 'Vendido';
    if (tipo_operacion === 'Renta') loteEstado = 'Rentado';
    
    await db.query('UPDATE lotes SET estado = $1 WHERE id = $2', [loteEstado, lote_id]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear operacion' });
  }
});

// Actualizar estado de operacion
router.put('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE operaciones SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Operacion no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estado operacion' });
  }
});

module.exports = router;
