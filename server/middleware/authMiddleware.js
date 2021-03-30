const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer kfhdfjsjkakas
        if(!token){
            res.status(401).json({message: 'Unauthorized'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded )


        req.user = decoded

        next()

    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }

}