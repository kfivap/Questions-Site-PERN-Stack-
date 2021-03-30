const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')


router.get('/', testController.testFunc)

module.exports = router