const router = require('express').Router()
const { getqoutes } = require('../controllers/indexController')
//---@method : GET
//---Desc : initial route
router.get('/', getqoutes)

module.exports = router
