const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener operaciones con joins
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT o.*, 
             l.codigo as lote_codigo, 
             c.nombre as comprador_nombre,
             a.nombre as agente_nombre 
      FROM operaciones o
      LEFT JOIN lotes l ON o.lote_id = l.id
      LEFT JOIN compradores c ON o.comprador_id = c.id
      LEFT JOIN agentes a ON o.agente_id = a.id
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
  const { lote_id, comprador_id, agente_id, tipo_operacion, monto, estado, notas } = req.body;
  if (!lote_id || !comprador_id || !tipo_operacion || !monto) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  
  try {
    // 1. Crear la operación
    const { rows } = await db.query(
      'INSERT INTO operaciones (lote_id, comprador_id, agente_id, tipo_operacion, monto, estado, notas) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [lote_id, comprador_id, agente_id || null, tipo_operacion, monto, estado || 'Activa', notas]
    );
    
    const operacion = rows[0];

    // 2. Actualizar el estado del lote asociado según el tipo de operación
    let loteEstado = 'Apartado';
    if (tipo_operacion === 'Venta') loteEstado = 'Vendido';
    if (tipo_operacion === 'Renta') loteEstado = 'Rentado';
    
    await db.query('UPDATE lotes SET estado = $1 WHERE id = $2', [loteEstado, lote_id]);

    // 3. Generar Comisión si hay agente
    if (agente_id) {
      const agenteRes = await db.query('SELECT porcentaje_comision FROM agentes WHERE id = $1', [agente_id]);
      if (agenteRes.rows.length > 0) {
        const porcentaje = parseFloat(agenteRes.rows[0].porcentaje_comision);
        if (porcentaje > 0) {
          const comisionMonto = (parseFloat(monto) * porcentaje) / 100;
          await db.query(
            'INSERT INTO comisiones (operacion_id, agente_id, monto) VALUES ($1, $2, $3)',
            [operacion.id, agente_id, comisionMonto]
          );
        }
      }
    }
    
    res.status(201).json(operacion);
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
