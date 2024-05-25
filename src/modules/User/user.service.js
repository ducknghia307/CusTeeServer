const bcrypt = require('bcrypt');   
const UserModel = require('./user.model');
class UserService {
  static async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await UserModel.create({
        email: userData.email,
        username: userData.username,
        password: hashedPassword,
        phone: userData.phone,
        role: userData.role,
        avatar: userData.avatar,
        address: userData.address
      });
      return user;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Duplicate email error
        throw new Error("Email already exists");
      } else {
        // Other errors
        throw new Error("Failed to create user");
      }
    }
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
    console.log(userId);
    const user = await UserModel.findByIdAndDelete(
      userId,
    );
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Incorrect old password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return user;
  }
}
module.exports = UserService;
