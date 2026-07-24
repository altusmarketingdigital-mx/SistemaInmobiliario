const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener registros de nómina con info del empleado
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT n.*, e.nombre as empleado_nombre, e.puesto, b.nombre as banco_nombre
      FROM nomina n
      JOIN empleados e ON n.empleado_id = e.id
      LEFT JOIN bancos b ON n.banco_id = b.id
      ORDER BY n.fecha_pago DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener nómina' });
  }
});

// Generar pago de nómina
router.post('/', async (req, res) => {
  const { empleado_id, periodo, monto_pagado, banco_id, fecha_pago } = req.body;
  
  if (!empleado_id || !periodo || !monto_pagado) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    await db.query('BEGIN');
    
    // 1. Insertar el pago de nómina
    const { rows } = await db.query(
      'INSERT INTO nomina (empleado_id, periodo, monto_pagado, banco_id, fecha_pago) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [empleado_id, periodo, monto_pagado, banco_id || null, fecha_pago || new Date()]
    );
    const nomina = rows[0];

    // 2. Si se eligió un banco, generar Egreso y actualizar saldo
    if (banco_id) {
      await db.query(
        "INSERT INTO transacciones (tipo, monto, concepto, banco_id, fecha) VALUES ('Egreso', $1, $2, $3, $4)",
        [monto_pagado, `Pago de Nómina: ${periodo}`, banco_id, fecha_pago || new Date()]
      );
      await db.query('UPDATE bancos SET saldo = saldo - $1 WHERE id = $2', [monto_pagado, banco_id]);
    }
    
    await db.query('COMMIT');
    res.status(201).json(nomina);
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Error al registrar nómina' });
  }
});

module.exports = router;
