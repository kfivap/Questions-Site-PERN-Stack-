const Router = require('express')
const router = new Router()
const likesController = require('../controllers/likesController')


router.post('/setLike', likesController.setLike)
router.get('/count', likesController.countLikes)
router.get('/detail', likesController.detailLikes)
router.delete('/delete', likesController.delete)




module.exports = router