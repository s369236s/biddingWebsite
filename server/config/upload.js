const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },

  // filename: function (req, file, cb) {
  //   cb(null, new Date().toISOString() + file.originalname);
  // },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: stroage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = { multer, upload, fileFilter, stroage };
