require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(passport.initialize());
connectDB();

// 🔐 GitHub OAuth Setup
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.get("/", (req, res) => {
  res.send("Welcome to GitHub OAuth with JWT 🔐");
});

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
