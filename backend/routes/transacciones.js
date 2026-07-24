const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener transacciones con datos del banco
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT t.*, b.nombre as banco_nombre 
      FROM transacciones t
      LEFT JOIN bancos b ON t.banco_id = b.id
      ORDER BY t.fecha DESC, t.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

// Crear transaccion (Ingreso o Egreso) y actualizar saldo del banco
router.post('/', async (req, res) => {
  const { tipo, monto, concepto, banco_id, fecha } = req.body;
  if (!tipo || !monto || !concepto) return res.status(400).json({ error: 'Faltan campos requeridos' });

  try {
    await db.query('BEGIN');
    
    // 1. Insertar transacción
    const insertRes = await db.query(
      'INSERT INTO transacciones (tipo, monto, concepto, banco_id, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tipo, monto, concepto, banco_id || null, fecha || new Date()]
    );
    const transaccion = insertRes.rows[0];

    // 2. Actualizar saldo del banco si aplica
    if (banco_id) {
      if (tipo === 'Ingreso') {
        await db.query('UPDATE bancos SET saldo = saldo + $1 WHERE id = $2', [monto, banco_id]);
      } else if (tipo === 'Egreso') {
        await db.query('UPDATE bancos SET saldo = saldo - $1 WHERE id = $2', [monto, banco_id]);
      }
    }
    
    await db.query('COMMIT');
    res.status(201).json(transaccion);
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Error al registrar transaccion' });
  }
});

module.exports = router;
