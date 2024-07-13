const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: false, 
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["Available", "Non-Available"],
    default: "Available",
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    
  },
  refreshToken:{
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
