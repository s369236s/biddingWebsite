import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./form.css";

const RoomForm = ({ socket, room, price }) => {
  const [bidmoney, setBidmoney] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [flash, setFlash] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/user/grabUser", {
      withCredentials: true,
    }).then((res) => {
      setUid(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send", { bidmoney, room, uid });
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
    // return () => {
    //   socket.off();
    // };
  }, [flash]);

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
};

export default RoomForm;
