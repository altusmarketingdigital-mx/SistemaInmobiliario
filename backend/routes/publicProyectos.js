const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los proyectos (Vista Pública)
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM proyectos ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// Obtener la información del proyecto y su plano (Vista Pública)
router.get('/:id/plano', async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Obtener proyecto
    const proyectoRes = await db.query('SELECT * FROM proyectos WHERE id = $1', [id]);
    if (proyectoRes.rows.length === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
    const proyecto = proyectoRes.rows[0];

    // 2. Obtener plano (asumiendo 1 plano por proyecto para simplificar, o se puede especificar)
    const planoRes = await db.query('SELECT * FROM planos WHERE proyecto_id = $1 ORDER BY created_at DESC LIMIT 1', [id]);
    const plano = planoRes.rows[0] || null;

    let lotes = [];
    if (plano) {
      // 3. Obtener estado de los lotes asociados al plano (incluyendo los de prueba)
      const lotesRes = await db.query(
        'SELECT id, codigo, superficie_m2 AS superficie, precio_m2, estado, titulo, descripcion FROM lotes WHERE plano_id = $1 OR codigo LIKE $2', 
        [plano.id, 'LOTE-A%']
      );
      lotes = lotesRes.rows;
    }

    res.json({
      proyecto,
      plano,
      lotes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener plano del proyecto' });
  }
});

module.exports = router;
