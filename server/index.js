const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 5000;

const url = "mongodb://127.0.0.1:27017";

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected the db");
  }
);

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

const { addBidMoney } = require("./controllers/merch");
const Merch = require("./models/Merch");
io.on("connection", (socket) => {
  socket.on("join", async (roomId) => {
    socket.join(roomId);
    let merchPrice = 0;
    await Merch.find({ _id: roomId }, (err, datas) => {
      if (err) throw err;
      merchPrice = datas[0].price;
    });
    io.sockets.to(roomId).emit("join-room-money", merchPrice);
    socket.on("send", (data) => {
      const MerchId = data.room;
      const parseBidmoney = parseInt(data.bidmoney);
      addBidMoney(parseBidmoney, MerchId).then((sucess) => {
        let isUpdate = false;
        if (sucess) {
          isUpdate = true;
          socket.join(data.room);
          io.sockets.to(data.room).emit("update-merch-money", parseBidmoney);
        }
        io.sockets.to(data.room).emit("is-update-merch-money", isUpdate);
      });
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "nksnfoiehhrekwqnrlkje",
    resave: "false",
    saveUninitialized: "false",
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

const userRouter = require("./routes/user");
app.use("/user", userRouter);
const merchRouter = require("./routes/merch");
app.use("/merch", merchRouter);
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
