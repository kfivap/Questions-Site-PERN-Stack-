const Router = require('express')
const router = new Router()
const testRouter = require('./TestRouter')
const userRouter = require('./userRouter')
const pendingQuestionsRouter = require('./pendingQuestionsRouter')
const answeredQuestionsRouter = require('./answeredQuestionsRouter')
const likesRouter = require('./likesRouter')


router.use('/test', testRouter)
router.use('/user', userRouter)
router.use('/questions/pending', pendingQuestionsRouter)
router.use('/questions/answered', answeredQuestionsRouter)
router.use('/likes', likesRouter)



module.exports = router