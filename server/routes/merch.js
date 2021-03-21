const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { multer, upload, fileFilter, stroage } = require("../config/upload");
const {
  postCreateNewMerch,
  getMerch,
  getAMerch,
  addBidMoney,
  getUserSellMerch,
  getUserBiddingMerch,
} = require("../controllers/merch");

router.post(
  "/createNewMerch",
  upload.single("merchImg"),
  [
    check("name", "type of name is wrong").notEmpty().isLength({ max: 10 }),
    check("price", "price must be number").isNumeric(),
  ],
  (req, res) => {
    postCreateNewMerch(req, res);
    // console.log(req.file.filename);
  }
);

router.get("/getMerch", (req, res) => {
  getMerch(req, res);
});

router.get("/getUserSellMerch", (req, res) => {
  getUserSellMerch(req, res);
});

router.get("/getUserBiddingMerch", (req, res) => {
  getUserBiddingMerch(req, res);
});

router.post("/getAMerch", (req, res) => {
  getAMerch(req, res);
});

router.post("/bidAMerch", (req, res) => {
  addBidMoney(req, res);
});
module.exports = router;
