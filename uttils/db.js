const mysql = require('mysql2/promise')
// create the connection to database
const pool = mysql.createPool({
  host: process.env.localhost || 'localhost',
  user: process.env.localhost || 'root',
  password: process.env.password || '',
  database: process.env.DB_NAME || 'test',
  connectionLimit: process.env.DB_CONN_LIMIT || 2,
  waitForConnections: true,
})

const query = async (sql, params) => {
  const [rows, fields] = await pool.execute(sql, params)
  return rows
}

module.exports = { query, pool }
