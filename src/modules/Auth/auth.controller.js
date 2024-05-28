const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../../middlewares/logger");
const generateOTP = require("../../utils/otpGenerator");
const sendMail = require("../../utils/nodemailer");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" } // Adjusted to 15 minutes for consistency
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = generateAccessToken(foundUser);
  const refreshToken = generateRefreshToken(foundUser);

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    user: {
      id: foundUser._id,
      username: foundUser.username,
      role: foundUser.role,
      email: foundUser.email,
    },
  });
  console.log(foundUser);
};

const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ username: decoded.username }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = generateAccessToken(foundUser);
      res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  
  res.clearCookie("jwt", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: "Cookie cleared" });
};

const register = async (req, res) => {
  const { email, username, password, phone } = req.body;

  if (!email || !username || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      phone,
    });

    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and save it in the user's document
    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.otpExpires = Date.now() + 60000; // OTP expires in 1 minute
    await user.save();

    // Send OTP via email
    await sendMail(email, "Password Reset OTP", `<h3>From: CusTee</h3>
      <p>We hope this email finds you well. We are reaching out to you to verify the OTP associated with your account. As part of our commitment to ensuring the security of your information, we kindly request your cooperation in completing this verification process.</p>
      <h3>OTP: ${otp}</h3>
      <p>This OTP is valid for only 1 minute.</p>`);

    res.status(200).json({ message: "OTP sent to email", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetPasswordOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetPasswordOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password and save it
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOTP = undefined;
    user.otpExpires = undefined;
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
  login,
  refresh,
  logout,
  register,
};
