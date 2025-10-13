const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const ms = require("ms"); // optional if you'd like, but not required

// helper to create tokens
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" });
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hash, role: role === "admin" ? "admin" : "user" });
    return res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: "Signup error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id);
    const refreshTokenValue = createRefreshToken(user._id);

    // calculate expiresAt for storage
    const refreshPayload = jwt.decode(refreshTokenValue);
    const expiresAt = new Date(refreshPayload.exp * 1000);

    // store refresh token
    await RefreshToken.create({ user: user._id, token: refreshTokenValue, expiresAt });

    res.json({
      accessToken,
      refreshToken: refreshTokenValue,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m"
    });
  } catch (err) {
    return res.status(500).json({ message: "Login error", error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    // verify token signature
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // check existence in DB
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) return res.status(403).json({ message: "Refresh token revoked or invalid" });

    // optionally rotate: delete old refresh token and issue a new one
    await RefreshToken.deleteOne({ _id: tokenDoc._id });

    const newAccessToken = createAccessToken(payload.userId);
    const newRefreshToken = createRefreshToken(payload.userId);

    const newPayload = jwt.decode(newRefreshToken);
    const expiresAt = new Date(newPayload.exp * 1000);
    await RefreshToken.create({ user: payload.userId, token: newRefreshToken, expiresAt });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token", error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    await RefreshToken.deleteOne({ token: refreshToken });
    res.json({ message: "Logged out (refresh token revoked)" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};
