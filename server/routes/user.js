const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { postRegister, postLogin, auth } = require("../controllers/user");

router.post(
  "/register",
  [
    check("email", "This is not a standard email").isEmail(),
    check("username", "Username has to be 6+ character long")
      .notEmpty()
      .isLength({ min: 1 }),
    check("password", "Password has to be 6+ character long")
      .notEmpty()
      .isLength({ min: 6 }),
    check("conPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("not same with password");
      }
      return true;
    }),
  ],
  (req, res) => {
    postRegister(req, res);
  }
);

router.post(
  "/login",
  [
    check("email", "This is not a standard email").isEmail(),
    check("password", "Password can't not be empty").notEmpty(),
  ],
  (req, res, next) => {
    postLogin(req, res, next);
  }
);

router.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else res.send("Please log in");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("You are logged out");
});

module.exports = router;
