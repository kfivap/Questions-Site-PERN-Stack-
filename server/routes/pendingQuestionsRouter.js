const Router = require('express')
const router = new Router()
const pendingQuestionsController = require('../controllers/pendingQuestionsController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/ask', pendingQuestionsController.ask)
router.get('/show', pendingQuestionsController.show)
router.get('/showone', pendingQuestionsController.showOne)
router.delete('/delete', pendingQuestionsController.delete)
// router.post('/login', userController.login)
// router.get('/auth', authMiddleware, userController.check)



module.exports = router