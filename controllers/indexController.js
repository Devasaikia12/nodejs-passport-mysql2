const indexModel = require('../models/indexModel')
const getqoutes = async (req, res) => {
  try {
    const qoutes = await indexModel.findMany(
      'quote',
      'id,quote,author',
      'id > ?',
      10
    )
    res.render('welcome')
  } catch (err) {
    console.error(`Error while getting quotes `, err.message)
  }
}

module.exports = { getqoutes }
