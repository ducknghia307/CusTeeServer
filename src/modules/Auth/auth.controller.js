const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../../middlewares/logger");
const {
  ConflictRequestError,
  InternalError,
} = require("../../core/error.response");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "50m" } // Adjusted to 15 minutes for consistency
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

  if (foundUser.status === "Non-Available") {
    return res.status(403).json({ message: "Account is banned" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = generateAccessToken(foundUser);
  const refreshToken = generateRefreshToken(foundUser);

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: foundUser._id,
      username: foundUser.username,
      role: foundUser.role,
      email: foundUser.email,
    },
  });
};

const refresh = (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      if (foundUser.status === "Non-Available") {
        return res.status(403).json({ message: "Account is banned" });
      }

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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginWithGoogle = async (req, res) => {
  const { username, email, avatar } = req.body;
  console.log(username, email, avatar);
  let foundUser = await User.findOne({ email }).lean();

  if (foundUser) {
    // User exists, proceed to login
    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    foundUser.refreshToken = refreshToken;
    await User.findByIdAndUpdate(foundUser._id, { refreshToken });

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
        email: foundUser.email,
      },
    });
  } else {
    // New user, proceed to sign up
    const newUser = await User.create({
      username,
      email,
      avatar,
    });

    if (!newUser) {
      throw new InternalError("Cannot create new user");
    }

    foundUser = newUser;

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    return res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
        email: foundUser.email,
      },
    });
  }
};

module.exports = {
  login,
  refresh,
  logout,
  register,
  loginWithGoogle,
};
