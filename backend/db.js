const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

module.exports = {
  query: async (text, params) => {
    // Usar la función query() del driver HTTP y envolver el resultado en { rows }
    // para mantener compatibilidad con el resto del backend.
    const result = await sql.query(text, params || []);
    return { rows: result };
  },
};
