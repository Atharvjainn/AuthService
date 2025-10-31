const  UserService  = require('../services/user-service')
const userService = new UserService()

const create = async (req,res) => {
    try {
        const userdata = {
            email : req.body.email,
            password : req.body.password
        }
        const response = await userService.create(userdata)
        return res.status(201).json({
            data : response,
            success : true,
            message : "Successfully created a user",
            err : {}
        })
    } catch (error) {
        console.log("Something went wrong in the controller");
        return res.status(500).json({
            data : {},
            success : false,
            message : "Cannot create a user",
            err : error
        })
    }
}

const destroy = async(req,res) => {
    try {
        const response = await userService.delete(req.params.id)
        return res.status(200).json({
            data : response,
            success : true,
            message : "Successfully deleted a user",
            err : {}
        })
    } catch (error) {
        console.log("Something went wrong in the controller");
        return res.status(500).json({
            data : {},
            success : false,
            message : "Cannot delete a user",
            err : error
        })
    }
}

module.exports = {
    create,destroy
}