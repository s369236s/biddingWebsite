const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth.js");

module.exports = {
  postRegister: async (req, res, next) => {
    const errors = validationResult(req);
    let alerts = [];
    const { username, email, password, year, month, day } = req.body;
    if (!errors.isEmpty()) {
      alerts = errors.array();
      res.send(alerts);
    } else {
      await User.findOne({ email: email }, async (err, user) => {
        if (user) {
          alerts.push({ msg: "信箱已被使用" });
          res.send(alerts);
        }
        if (!user) {
          let usersId = crypto.randomBytes(10).toString("hex");
          let userIdIsRepeated = true;
          while (!userIdIsRepeated) {
            User.findOne({ userNumber: usersId }),
              (err, user) => {
                if (!user) {
                  userIdIsRepeated = false;
                }
              };
            usersId = crypto.randomBytes(10).toString("hex");
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const Newuser = new User({
            email: email,
            username: username,
            password: hashedPassword,
            userNumber: usersId,
            birthYear: year,
            birthMonth: month,
            birthDay: day,
          });
          await Newuser.save();
          res.status(201).send("create a new account");
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
          if (!user) res.send([info]);
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              // console.log(user);
              res.status(200).send("Successfully Authenticated");
              // console.log(req.user);
            });
          }
        }
      )(req, res, next);
    }
  },
  auth: (req, res, next) => {
    ensureAuthenticated(req, res, next);
  },
  getCheckUser: (req, res) => {
    if (req.user !== undefined) {
      User.findById(req.user.id, (err, user) => {
        const userInfo = {
          username: req.user.username,
          email: req.user.email,
          birthYear: user.birthYear,
          birthMonth: user.birthMonth,
          birthDay: user.birthDay,
        };
        res.send(userInfo);
      });
    } else {
      res.send("error");
    }
  },
};
