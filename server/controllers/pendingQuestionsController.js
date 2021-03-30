const {Op} = require("sequelize");

const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const {PendingQuestions} = require('../models/models')




class PendingQuestionsController {
    async ask(req, res, next) {
        let {from, userId, questionText} = req.body

        if(!from){
            from = 0
        }
        from = parseInt(from)
        if(checkUserMiddleware(req).id !== from && from!==0) {
            return res.status(403).json('Not allowed')
        }


       let newQuestion =  await PendingQuestions.create({from, userId, questionText})

       return  res.json(newQuestion)

    }

    async show(req, res, next) {
        let {userId, limit, page} = req.query
        if(checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }

        page = page || 1
        limit = limit || 20

        let offset = page * limit - limit

        const pending =  await PendingQuestions.findAndCountAll(
           {where:{userId},
               limit, offset
           })

       return  res.json(pending)
    }

    async showOne(req, res, next) {
        let {userId, questionId} = req.query

        if(checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }

        const question = await PendingQuestions.findOne({
            where: {id: parseInt(questionId)}
        })

        return res.json(question)

    }

    async delete(req, res, next) {
        let {userId, questionId} = req.body
        console.log(req.body)

        if(!userId){
            return res.status(400).json('userId not stated')
        }
        if(!questionId){
            return res.status(400).json('questionId not stated')
        }



        if(checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }

        const question = await PendingQuestions.destroy({
            where: {id: parseInt(questionId)}
        })

        return res.json(question)


    }


}

module.exports = new PendingQuestionsController()