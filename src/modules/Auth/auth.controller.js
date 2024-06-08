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

  if (foundUser.status === "Non-Available") {
    return res.status(403).json({ message: "Account is banned" });
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

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
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

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      accessToken,
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
