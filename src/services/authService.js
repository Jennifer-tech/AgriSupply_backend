const userModel = require('../models/userModel')

class userService {
    // register a user
    async createUser(user) {
        return await userModel.create(user)
    }

    // find a user by their id
    async findOne(filter){
        return await userModel.findOne(filter)
    } 
}

module.exports = new userService()