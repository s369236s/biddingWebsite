const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  postRegister,
  postLogin,
  auth,
  getCheckUser,
  grabUser,
} = require("../controllers/user");

router.post(
  "/register",
  [
    check("email", "這不是正確的信箱").isEmail(),
    check("username", "用戶名稱至少6位以上").isLength({ min: 1 }),
    check("password", "密碼必須6位以上").isLength({ min: 6 }),
    check("conPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("重複密碼與密碼不同");
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
    check("email", "請輸入標準信箱").isEmail(),
    check("password", "請輸入密碼").notEmpty(),
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

router.get("/checkUser", (req, res) => {
  getCheckUser(req, res);
});

router.get("/grabUser", (req, res) => {
  grabUser(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("You are logged out");
});

module.exports = router;
