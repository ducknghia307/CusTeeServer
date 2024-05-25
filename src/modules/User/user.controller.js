// controllers/userController.js
const { CREATED, OK } = require('../../core/success.response');
const UserService = require("./user.service");
const asyncHandler = require('../../utils/asynchandler');

class UserController {
  createUser = asyncHandler(async (req, res) => {
    const user = await UserService.createUser(req.body);
    new CREATED({
      message: "User created successfully!",
      metadata: user,
    }).send(res);
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers();
    new OK({
      message: "Get all users successfully!",
      metadata: users,
    }).send(res);
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    new OK({
      message: "Get user by ID successfully!",
      metadata: user,
    }).send(res);
  });

  updateUserById = asyncHandler(async (req, res) => {
    const user = await UserService.updateUserById(req.params.id, req.body);
    new OK({
      message: "Update user by ID successfully!",
      metadata: user,
    }).send(res);
  });

  deleteUserById = asyncHandler(async (req, res) => {
    const user = await UserService.deleteUserById(req.params.id);
    new OK({
      message: "Delete user by ID successfully!",
      metadata: user,
    }).send(res);
  });

   changePassword = asyncHandler(async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await UserService.changePassword(userId, oldPassword, newPassword);
    new OK({
      message: "Password changed successfully!",
      metadata: user,
    }).send(res);
  });
}



module.exports = new UserController();
