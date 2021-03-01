const express = require("express");
const router = express.Router();
const { multer, upload, fileFilter, stroage } = require("../config/upload");
const {
  postCreateNewMerch,
  getMerch,
  getAMerch,
  addBidMoney,
} = require("../controllers/merch");

router.post("/createNewMerch", upload.single("merchImg"), (req, res) => {
  postCreateNewMerch(req, res);
  // console.log(req.file.filename);

  res.send("?_?");
});
router.get("/getMerch", (req, res) => {
  getMerch(req, res);
});

router.post("/getAMerch", (req, res) => {
  getAMerch(req, res);
});

router.post("/bidAMerch", (req, res) => {
  addBidMoney(req, res);
});
module.exports = router;
