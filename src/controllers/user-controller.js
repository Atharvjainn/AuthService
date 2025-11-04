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
            message : error.message,
            err : error.description
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

const signin = async(req,res) => {
    try {
        const user = await userService.signin(req.body.email,req.body.password)
        return res.status(200).json({
            data : user,
            success : true,
            message : "Successfully signed in !",
            err : {}
        })
    } catch (error) {
        console.log("Something went wrong in the controller");
        return res.status(error.statusCode).json({
            data : {},
            success : false,
            message : error.message,
            err : error.description
        })
    }
}

const isAuthenticated = async(req,res) => {
     try {
        const token = req.headers["x-access-token"];
        const user = await userService.isAuthenticated(token)
        return res.status(200).json({
            data : user,
            success : true,
            message : "Successfully authenticated!",
            err : {}
        })
    } catch (error) {
        console.log("Something went wrong in the controller");
        return res.status(500).json({
            data : {},
            success : false,
            message : "Cannot authenticate",
            err : error
        })
    }
}

const isAdmin = async(req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id)
        return res.status(200).json({
            data : response,
            success : true,
            message : "Role Authenticated!",
            err : {}
        })
    } catch (error) {
         console.log("Something went wrong in the controller");
        return res.status(500).json({
            data : {},
            success : false,
            message : "Cannot authenticate role",
            err : error
        })
    }
}

module.exports = {
    create,destroy,signin,isAuthenticated,isAdmin
}