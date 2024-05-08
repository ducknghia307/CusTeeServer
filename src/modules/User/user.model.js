const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [
    {
      type: String,
      enum: ['user', 'admin'],
      default: "user",
    },
  ],
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
//   userStatus: {
//     type: Boolean,
//   },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
