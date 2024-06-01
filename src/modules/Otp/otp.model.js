const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
    },
    expiredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
