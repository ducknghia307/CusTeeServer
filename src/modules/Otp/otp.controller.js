const User = require("../User/user.model");
const Otp = require("./otp.model");
const generateOTP = require("../../utils/otpGenerator");
const sendMail = require("../../utils/nodemailer");
const bcrypt = require("bcrypt");

const requestOTP = async (req, res) => {
  const { email } = req.body
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = Date.now() + 60000; // OTP expires in 1 minute

    // Save or update OTP details in the Otp model
    await Otp.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        email: user.email,
        otp,
        expiredAt: otpExpires,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Send OTP via email
    await sendMail(
      email,
      "Password Reset OTP",
      `<h3>From: CusTee</h3>
        <p>We hope this email finds you well. We are reaching out to you to verify the OTP associated with your account. As part of our commitment to ensuring the security of your information, we kindly request your cooperation in completing this verification process.</p>
        <h3>OTP: ${otp}</h3>
        <p>This OTP is valid for only 1 minute.</p>`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ otp });
    if (!otpRecord || otpRecord.expiredAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const {email, password } = req.body;
  try {
    // const otpRecord = await Otp.findOne({ email, otp });
    // if (!otpRecord || otpRecord.expiredAt < Date.now()) {
    //   return res.status(400).json({ message: "Invalid or expired OTP" });
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    await user.save();
   
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  requestOTP,
  verifyOTP,
  resetPassword,
};
