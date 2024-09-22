const pool = require('./connection');

async function queryExecution(query, values) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(query, values);
      return [rows];
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  }
  
  module.exports = { queryExecution };