const {Op} = require("sequelize");

const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const {Likes, AnsweredQuestions} = require('../models/models')




class LikesController {
    async setLike(req, res, next) {
        let {questionId, userId} = req.body


        if(!questionId){
            return res.status(400).json('questionId not stated')
        }

        if(!userId){
            return res.status(400).json('userId not stated')
        }

        if(checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }

        const candidateLike = await Likes.findOne({
            where: {answeredQuestionId: questionId, userId}
        })
        if(candidateLike){
            return res.status(200).json('Like already exist')
        }

        const existedQuestion = await AnsweredQuestions.findOne({
            where:{id: questionId}
        })
        if(!existedQuestion){return res.status(404).json('Question doesn`t exist')}


        const newLike = await Likes.create({
            answeredQuestionId: questionId,
            userId
        })

        return  res.json(newLike)

    }

    async countLikes(req, res, next) {
        let {questionId} = req.query
        if(!questionId){
            return res.status(400).json('questionId not stated')
        }

        const likesCount = await Likes.count({where: {answeredQuestionId: questionId}})




        return  res.json(likesCount)
    }

    async detailLikes(req, res, next) {
        let {questionId} = req.query
        if(!questionId){
            return res.status(400).json('questionId not stated')
        }
        const likesDetailed = await Likes.findAll({where: {answeredQuestionId: questionId}})

        return  res.json(likesDetailed)

    }

    async delete(req, res, next) {
        let {userId, questionId} = req.body

        if(!userId){
            return res.status(400).json('Profile Id not stated')
        }
        if(!questionId){
            return res.status(400).json('questionId not stated')
        }

        if(checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }



        const like = await Likes.destroy({
            where: {userId: parseInt(userId),
                answeredQuestionId: questionId
            }
        })

        return res.json(like)


    }


}

module.exports = new LikesController()