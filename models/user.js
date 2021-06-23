const db = require('../uttils/db')

const findOne = async (table, fields, wherekey, wherevalue) => {
  const data = await db.query(
    `SELECT ${fields} FROM ${table} WHERE ${wherekey} limit 1`,
    [wherevalue]
  )
  return data[0]
}
const create = async (table, data, cb) => {
  let keys = []
  let values = []
  Object.entries(data).forEach(([key, value]) => {
    keys.push(key)
    values.push(`'${value}'`.toString())
  })
  try {
    const result = await db.query(
      `INSERT INTO ${table} (${keys}) VALUES (${values})`
    )
    if (result) {
      return result
    } else {
      throw new Error('A database error occurred')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { findOne, create }
