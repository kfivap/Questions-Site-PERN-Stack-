const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, UserBio} = require('../models/models')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize");


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nickRegExp = /^[\w.-]{0,19}[0-9a-zA-Z]$/i

class UserController {
    async registration(req, res, next) {
        let {email, password, nick, role, name} = req.body
        if (!email || !password || !nick) {
            return res.status(400).json({message:"Not stated email or password or nick"})
        }



        if (!email.match(emailRegExp)) {
          return  res.status(400).json({message:'wrong email format'})
        }


        if (!nick.match(nickRegExp)) {
            return  res.status(400).json({message:'wrong nick format'})
        }

        const candidateEmail = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {nick}
                ]
            }
        })

        if (candidateEmail) {
            let errorFields = []
            if (candidateEmail.dataValues.email === email) {
                errorFields.push('email')
            }
            if (candidateEmail.dataValues.nick === nick) {
                errorFields.push('nick')
            }

            return res.status(400).json({message: `${errorFields} already registered`})
        }


        /////////// edit
        if (!role) {
            role = 'USER'
        }


        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, nick, password: hashPassword})

        await UserBio.create({
            userId: user.id,
            name: (name ? name : nick)
        })


        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, userId: user.id})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return res.status(404).json({message:'email not found'})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({message:'wrong password'})
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, userId: user.id})


    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token, userId: req.user.id})

    }


    async getBio(req, res, next){
        const {userId} = req.query

        if(!userId){
            return res.status(400).json({message: 'Profile not stated'})
        }

        const userBio = await UserBio.findOne({where: {userId}})

        if(!userBio){
            return res.status(404).json({message: 'Profile not found'})
        }

        return res.json(userBio)

    }


}

module.exports = new UserController()