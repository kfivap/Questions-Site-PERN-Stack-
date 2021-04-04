const Router = require('express')
const router = new Router()
const answeredQuestionsController = require('../controllers/answeredQuestionsController')


router.post('/answer', answeredQuestionsController.answer)
router.get('/show', answeredQuestionsController.show)
router.get('/showOne', answeredQuestionsController.showOne)
router.get('/recent', answeredQuestionsController.showRecent)
router.delete('/delete', answeredQuestionsController.delete)



module.exports = router