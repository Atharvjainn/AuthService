const { User,Role } = require('../models/index')
const ValidationError = require('../utils/validationerror')
const ClientError = require('../utils/clienterror');
const { StatusCodes } = require('http-status-codes');

class UserRepository{
    async CreateUser(data){
        try {
            const user = await User.create(data)
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw new ValidationError(error)
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async DeleteUser(userId){
        try {
            await User.destroy({
                where : {
                    id : userId
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getuserbyId(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes : ['email','id']
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getuserbyEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            })
            if(!user){
                throw new ClientError(
                    "AttributeNotFound",
                    "Invalid Email sent in the request",
                    "Please check the email... No record found of this email",
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const role = await Role.findOne({
                where : {
                    name : "ADMIN"
                }
            });
            console.log(await user.hasRole(role));
            
            return user.hasRole(role)
        } catch (error) {
           console.log("Something went wrong in the repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository