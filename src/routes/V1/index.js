const express = require('express')
const router = express.Router()
const { AuthRequestValidate } = require('../../middlewares/index')
const UserController = require('../../controllers/user-controller')


router.post('/signup',AuthRequestValidate.validateUserAuth,UserController.create)
router.delete('/signup/:id',UserController.destroy)
router.post('/signin',AuthRequestValidate.validateUserAuth,UserController.signin)



module.exports = router