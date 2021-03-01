import React, { useState, useEffect } from "react";

import "./form.css";

const RoomForm = ({ socket, room, price }) => {
  const [bidmoney, setBidmoney] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [flash, setFlash] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send", { bidmoney, room });
    setShowFlash(true);
  };
  useEffect(() => {
    socket.on("is-update-merch-money", (data) => {
      if (!data) {
        setFlash("出價失敗");
      } else {
        setFlash("出價成功");
      }
    });
  }, [flash]);
  // useEffect(() => {
  //   socket.on("update-merch-money", (data) => {
  //     setMoney(data);
  //     console.log();
  //   });
  // }, [socket]);
  return (
    <form className="room-form-container">
      <h1>價格 : ${price}</h1>
      <input
        name="biddingMoney"
        value={bidmoney}
        onChange={(e) => setBidmoney(e.target.value)}
        placeholder="出價金額"
      />
      <button onClick={handleSubmit}>出價</button>
      <div
        className="info-flash"
        style={{ display: showFlash ? "flex" : "none" }}
      >
        {flash}
      </div>
    </form>
  );

  // const handleSubmit_ = async (e) => {
  //   e.preventDefault();
  //   const parseMoney = parseInt(money);
  //   const result = await Axios.post("http://localhost:5000/merch/bidAMerch", {
  //     parseMoney,
  //   });
  //   if (result.data === "error") {
  //   } else {
  //     console.log(result);
  //   }
  // };
};

export default RoomForm;
