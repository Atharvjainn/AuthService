const  UserRepository = require('../repositories/user-repository')

class UserService{  
    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
        try {
            const response = await this.userRepository.CreateUser(data)
            return response
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async delete(userId){
        try {
            const response = await this.userRepository.DeleteUser(userId)
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = UserService