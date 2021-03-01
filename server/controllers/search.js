const Merch = require("../models/Merch");

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
  postSearch: (req, res) => {
    if (req.body.merchName == "") {
      res.send("error");
    } else {
      const regex = new RegExp(escapeRegex(req.body.merchName), "gi");
      Merch.find({ name: regex }, (err, datas) => {
        if (err) throw err;
        if (datas) res.send(datas);
        else {
          res.send("error");
        }
      });
    }
  },
};
