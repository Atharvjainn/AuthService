const  UserRepository = require('../repositories/user-repository')
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt')
const { JWT_KEY } = require('../config/serverConfig')
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

    async signin(email,plainpassword){
        try {
            const user = await this.userRepository.getuserbyEmail(email)
            const passwordmatch = this.checkPassword(plainpassword,user.password)

            if (!passwordmatch){
                console.log("password not matched");
                throw {error : "Incorrect Password!"}
            }

            const newJWT = this.createToken({email : user.email , id : user.id})
            return newJWT;
        } catch (error) {
            console.log("cannot sign in (Service Layer)");
            throw error;
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn : '1d'});
            return token;
        } catch (error) {
            console.log("Something went wrong in the creation of token");
            throw error;
        }
    }

    verfiyToken(token){
        try {
            const result = jwt.verify(token,JWT_KEY)
            return result;
        } catch (error) {
            console.log("Something went wrong in the verification of token");
            throw error;
        }
    }

    checkPassword(userinputpwd,encryptedpwd){
        try {
            const response = bcrypt.compareSync(userinputpwd, encryptedpwd);
            return response;
        } catch (error) {
            console.log("Incorrect password");
            throw(error)
        }
    }
    
}

module.exports = UserService