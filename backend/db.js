const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://dummy:dummy@dummy.neon.tech/dummy';
const sql = neon(connectionString);

module.exports = {
  query: async (text, params) => {
    // Usar la función query() del driver HTTP y envolver el resultado en { rows }
    // para mantener compatibilidad con el resto del backend.
    const result = await sql.query(text, params || []);
    return { rows: result };
  },
};
