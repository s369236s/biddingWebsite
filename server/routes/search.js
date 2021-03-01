const express = require("express");
const router = express.Router();
const { postSearch } = require("../controllers/search");

router.post("/searchMerch", (req, res) => {
  //   console.log(req.body);
  postSearch(req, res);
});

module.exports = router;
