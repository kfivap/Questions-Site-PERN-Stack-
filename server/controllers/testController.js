// const {Brand} = require('../models/models')


class TestController {
    async testFunc(req, res){
        return res.json('It works!')
    }



}
module.exports = new TestController()