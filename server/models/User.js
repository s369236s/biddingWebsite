const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userNumber: {
    type: String,
    required: true,
  },
  birthYear: {
    type: String,
    required: true,
  },
  birthMonth: {
    type: String,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  sellMerchs: {
    type: Array,
    required: false,
  },
  biddingMerchs: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
