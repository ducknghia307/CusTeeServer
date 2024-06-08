const User = require("../User/user.model");
const Otp = require("./otp.model");
const generateOTP = require("../../utils/otpGenerator");
const sendMail = require("../../utils/nodemailer");
const bcrypt = require("bcrypt");

const requestOTP = async (req, res) => {
  const { email } = req.body;
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
      ` 
      <img 
      src="https://firebasestorage.googleapis.com/v0/b/custee-1669e.appspot.com/o/images%2Flogo.jpg?alt=media&token=90996091-37d1-4325-90d2-8866b1c34b18" 
      style="height: 200px; width: 1000px; max-width: 100%; display: block; margin: 0 auto 20px;"
      alt="Pretty Picture"
    />
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
  const { email, password } = req.body;
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
