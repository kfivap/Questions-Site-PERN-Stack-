const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/getBio', userController.getBio)
router.get('/getManyBios', userController.getManyBios)
router.put('/setBio', userController.setBio)



module.exports = router