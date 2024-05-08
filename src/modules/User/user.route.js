const express = require('express')
const router = express.Router()
const usersController = require('./user.controller')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUserById)
    .delete(usersController.deleteUserById)

module.exports = router