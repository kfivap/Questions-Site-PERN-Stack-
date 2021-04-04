const {Op} = require("sequelize");

const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const {PendingQuestions, AnsweredQuestions, UserBio, User} = require('../models/models')
const models = require('../models/models')


class AnsweredQuestionsController {
    async answer(req, res, next) {
        let {userId, pendingId, answerText} = req.body

        console.log(req.body)

        if (!pendingId || !userId || !answerText) {
            return res.status(400).json('some fields not stated')
        }

        if (checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }


        const pendingQuestion = await PendingQuestions.findOne({
            where: {id: parseInt(pendingId)}
        })

        if (!pendingQuestion) {
            return res.status(400).json('pending question does not exist')
        }

        const answeredQuestion = await AnsweredQuestions.create({
            from: pendingQuestion.from,
            questionText: pendingQuestion.questionText,
            answerText: answerText,
            userId: pendingQuestion.userId,
            userBioId: pendingQuestion.userId

        })

        await PendingQuestions.destroy({
            where: {id: parseInt(pendingId)}
        })


        return res.json(answeredQuestion)

    }

    async show(req, res, next) {
        let {userId, limit, page} = req.query

        if (!userId) {
            return res.status(400).json('Profile Id not stated')
        }

        page = page || 1
        limit = limit || 20


        let offset = page * limit - limit


        const answered= await AnsweredQuestions.findAndCountAll({
                where: {userId},
                limit,
                offset,
                order: [
                    ['id', 'DESC']
                ],
            },
        )


        return res.json(answered)

    }


    async showRecent(req, res, next) {
        let {limit, page} = req.query


        page = page || 1
        limit = limit || 4


        let offset = page * limit - limit


        const answered= await AnsweredQuestions.findAndCountAll({
                limit,
                offset,
                order: [
                    ['id', 'DESC']
                ],
            },
        )


        return res.json(answered)

    }

    async showOne(req, res, next) {
        let {questionId} = req.query

        if (!questionId) {
            return res.status(400).json('questionId not stated')
        }

        const question = await AnsweredQuestions.findOne({
            where: {id: parseInt(questionId)}
        })

        return res.json(question)

    }

    async delete(req, res, next) {
        let {userId, questionId} = req.body

        if (!userId) {
            return res.status(400).json('Profile Id not stated')
        }
        if (!questionId) {
            return res.status(400).json('questionId not stated')
        }

        if (checkUserMiddleware(req).id !== parseInt(userId)) {
            console.log(checkUserMiddleware(req).id)
            return res.status(403).json('Not allowed')
        }

        const question = await AnsweredQuestions.destroy({
            where: {id: parseInt(questionId)}
        })

        return res.json(question)

    }


}

module.exports = new AnsweredQuestionsController()