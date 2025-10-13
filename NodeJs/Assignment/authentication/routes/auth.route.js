const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.post("/refresh", authCtrl.refresh);
router.post("/logout", authCtrl.logout);

// optional: a protected test route
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
