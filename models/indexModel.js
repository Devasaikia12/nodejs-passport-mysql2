const db = require('../uttils/db')

const findMany = async (table, fields, wherekey, wherevalue) => {
  const data = await db.query(
    `SELECT ${fields} FROM ${table} WHERE ${wherekey}`,
    [wherevalue]
  )
  return data
}

module.exports = { findMany }
