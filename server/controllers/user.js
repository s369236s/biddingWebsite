const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth.js");

module.exports = {
  postRegister: async (req, res, next) => {
    const errors = validationResult(req);
    let alerts = [];
    const { username, email, password } = req.body;
    if (!errors.isEmpty()) {
      alerts = errors.array();
      res.send(alerts);
    } else {
      await User.findOne({ email: email }, async (err, user) => {
        if (user) {
          alerts.push({ msg: "Email already be used" });
          res.send(alerts);
        }
        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const Newuser = new User({
            email: email,
            username: username,
            password: hashedPassword,
          });
          await Newuser.save();
          res.send("create a new account");
        }
      });
    }
  },
  postLogin: async (req, res, next) => {
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
      const alert = vErr.array();
      res.send(alert);
    } else {
      await passport.authenticate(
        "local",
        { session: true },
        (err, user, info) => {
          if (err) throw err;
          if (!user) res.send(info);
          else {
            req.logIn(user, (err) => {
              if (err) console.log(err);
              // console.log(user);
              res.send("Successfully Authenticated");
              console.log(req.user);
            });
          }
        }
      )(req, res, next);
    }
  },
  auth: (req, res, next) => {
    ensureAuthenticated(req, res, next);
  },
};
