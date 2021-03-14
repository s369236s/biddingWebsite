const Merch = require("../models/Merch");
const User = require("../models/User");

const { validationResult } = require("express-validator");
const { multer, upload, fileFilter, stroage } = require("../config/upload");

module.exports = {
  postCreateNewMerch: async (req, res) => {
    const errors = validationResult(req);
    let alerts = [];
    if (!errors.isEmpty() || req.user === undefined) {
      alerts = errors.array();
      if (req.user === undefined) alerts.push({ msg: "user error" });
      res.send(alerts);
    } else {
      let file;
      if (!req.file) file = "default.png";
      else file = req.file.filename;

      const merch = new Merch({
        name: req.body.name,
        price: req.body.price,
        // biddingTime: req.body.biddingTime,
        sellerName: req.user.username,
        sellerId: req.user.id,
        photo: file,
        detail: req.body.detail,
      });
      User.findByIdAndUpdate(
        req.user.id,
        {
          $push: { sellMerchs: merch._id },
        },
        (err, _user) => {
          if (err) throw err;
          console.log(_user);
        }
      );

      console.log(merch);
      await merch.save();
      res.send("merch created");
    }
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
  getUserSellMerch: async (req, res) => {
    if (req.user) {
      await User.find({ _id: req.user.id }, async (err, datas) => {
        if (err) throw err;
        let [a] = datas;
        let merchs = [];
        for (const sellMerch of a.sellMerchs) {
          await Merch.find({ _id: sellMerch }, (err, merch) => {
            if (err) throw err;
            let [b] = merch;
            if (b) {
              merchs.push({
                name: b.name,
                price: b.price,
                id: b._id,
                photo: b.photo,
              });
            }
          });
        }
        res.status(201).send(merchs);
      });
    }
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
