const UserService = require("./user.service");

class UserController {
  async createUser(req, res) {
    const user = await UserService.createUser(req.body);
    new CREATED({
      message: "User created successfully!",
      metadata: user,
    }).send(res);
  }

  async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    new OK({
      message: "Get all users successfully!",
      metadata: users,
    }).send(res);
  }

  async getUserById(req, res) {
    const user = await UserService.getUserById(req.params.userId);
    new OK({
      message: "Get user by ID successfully!",
      metadata: user,
    }).send(res);
  }

  async updateUserById(req, res) {
    const user = await UserService.updateUserById(req.params.userId, req.body);
    new OK({
      message: "Update user by ID successfully!",
      metadata: user,
    }).send(res);
  }

  async deleteUserById(req, res) {
    const user = await UserService.deleteUserById(req.params.userId);
    new OK({
      message: "Delete user by ID successfully!",
      metadata: user,
    }).send(res);
  }
}

module.exports = new UserController();
