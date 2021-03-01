import React from "react";
import RoomForm from "./form";
import MerchInfo from "./merchinfo";
import "./body.css";

const RoomBody = ({ socket, room, name, price, image, detail, sellerName }) => {
  return (
    <div className="room-body-container">
      <MerchInfo
        socket={socket}
        name={name}
        price={price}
        image={image}
        detail={detail}
        sellerName={sellerName}
      />
      <RoomForm socket={socket} room={room} price={price} />
    </div>
  );
};

export default RoomBody;
