const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener cobranza con detalles de la operacion
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT c.*, 
             o.monto as operacion_monto,
             o.tipo_operacion,
             l.codigo as lote_codigo,
             comp.nombre as comprador_nombre
      FROM cobranza c
      JOIN operaciones o ON c.operacion_id = o.id
      JOIN lotes l ON o.lote_id = l.id
      JOIN compradores comp ON o.comprador_id = comp.id
      ORDER BY c.fecha_vencimiento ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cobranza' });
  }
});

// Pagar un registro de cobranza (opcionalmente registrarlo como Ingreso)
router.put('/:id/pagar', async (req, res) => {
  const { id } = req.params;
  const { banco_id } = req.body;
  
  try {
    await db.query('BEGIN');
    
    // 1. Obtener la cobranza
    const cobRes = await db.query('SELECT * FROM cobranza WHERE id = $1', [id]);
    if (cobRes.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(404).json({ error: 'Registro de cobranza no encontrado' });
    }
    const cob = cobRes.rows[0];
    
    // 2. Marcar como pagado
    await db.query("UPDATE cobranza SET estado = 'Pagado' WHERE id = $1", [id]);
    
    // 3. Crear el Ingreso si se seleccionó banco
    if (banco_id) {
      await db.query(
        "INSERT INTO transacciones (tipo, monto, concepto, banco_id, fecha) VALUES ('Ingreso', $1, $2, $3, CURRENT_DATE)",
        [cob.monto_esperado, `Pago de cobranza ID: ${id}`, banco_id]
      );
      await db.query('UPDATE bancos SET saldo = saldo + $1 WHERE id = $2', [cob.monto_esperado, banco_id]);
    }
    
    await db.query('COMMIT');
    res.json({ message: 'Cobro registrado exitosamente' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Error al pagar cobranza' });
  }
});

// Crear registro de cobranza manual
router.post('/', async (req, res) => {
  const { operacion_id, monto_esperado, fecha_vencimiento, notas } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO cobranza (operacion_id, monto_esperado, fecha_vencimiento, notas) VALUES ($1, $2, $3, $4) RETURNING *',
      [operacion_id, monto_esperado, fecha_vencimiento || null, notas]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cobranza' });
  }
});

module.exports = router;
