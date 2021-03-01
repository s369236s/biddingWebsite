const Merch = require("../models/Merch");
const { multer, upload, fileFilter, stroage } = require("../config/upload");

module.exports = {
  postCreateNewMerch: async (req, res) => {
    console.log(req.user);
    console.log(req.file);
    let file;
    if (!req.file) file = "default.png";
    else file = req.file.filename;

    const merch = new Merch({
      name: req.body.name,
      price: req.body.price,
      // biddingTime: req.body.biddingTime,
      sellerId: req.user.username,
      photo: file,
      detail: req.body.detail,
    });
    console.log(merch);
    await merch.save();
  },
  getMerch: async (req, res) => {
    Merch.find({}, (err, datas) => {
      if (err) throw err;
      res.send(datas);
    });
  },
  getAMerch: async (req, res) => {
    Merch.find({ _id: req.body.id }, (err, datas) => {
      if (err) throw err;
      res.send(...datas);
    });
  },
  addBidMoney: async (bidNumber, merchId) => {
    // console.log(bidNumber);
    if (isNaN(bidNumber)) {
      return false;
    } else {
      let current;
      let error;
      await Merch.findOne({ _id: merchId }, (err, datas) => {
        if (err) throw err;
        if (datas) {
          current = datas.price;
        } else {
          error = "not found";
        }
      });
      if (error === "not found") console.log("not such data");
      // console.log(bidNumber, current);
      const parsemoney = parseInt(bidNumber, 10);
      const currentmoney = parseInt(current, 10);
      if (parsemoney > current) {
        // console.log(parsemoney, currentmoney);
        await Merch.updateOne(
          { _id: merchId },
          { price: bidNumber },
          (err, docs) => {
            if (err) throw err;
          }
        );
        return true;
      } else {
        return false;
      }
    }
  },
};
