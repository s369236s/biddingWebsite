const mongoose = require("mongoose");

const MerchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo: {
    required: false,
    type: String,
  },
  sellerId: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  biddingTime: {
    type: String,
    required: false,
  },
  highestId: {
    type: String,
    required: false,
  },
  highestName: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Merch = mongoose.model("Merch", MerchSchema, "merchs");

module.exports = Merch;
