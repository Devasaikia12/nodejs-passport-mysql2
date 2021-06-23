const router = require('express').Router()
const { auth } = require('../middleware/auth')
router.get('/', auth, (req, res) => {
  res.render('dashboard')
})

module.exports = router
