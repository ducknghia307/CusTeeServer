const bcrypt = require('bcrypt');   
const UserModel = require('./user.model');
class UserService {
  static async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserModel.create({
      email: userData.email,
      username: userData.username,
      password: hashedPassword,
      phone:userData.phone,
      role:userData.role,
      avatar:userData.avatar,
      address:userData.address
    });
    return user;
  }

  static async getAllUsers() {
    const users = await UserModel.find({ role: "user" });
    return users;
  }

  static async getUserById(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  static async updateUserById(userId, updatedUserData) {
    const user = await UserModel.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (updatedUserData.password) {
      const hashedPassword = await bcrypt.hash(
        updatedUserData.password,
        10
      );
      user.password = hashedPassword;
      await user.save();
    }

    return user;
  }

  static async deleteUserById(userId) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { new: true }
    );
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
module.exports = UserService;
