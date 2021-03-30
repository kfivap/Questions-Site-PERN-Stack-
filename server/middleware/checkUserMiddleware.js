const jwt = require('jsonwebtoken')

module.exports = function (req) {

    try {

        const headersToken = req.headers.authorization || req.headers.Authorization || req.body.Authorization

       // console.log(req.body)

        if(!headersToken){
            return false
        }

        const token = headersToken.split(' ')[1] //Bearer kfhdfjsjkakas
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded


    } catch (e) {
        console.log(e.message)
        return e.message
    }

}