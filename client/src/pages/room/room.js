import React, { useEffect, useState } from "react";
import qs from "query-string";
import Axios from "axios";
import io from "socket.io-client";
import Nav from "../../components/nav/nav";
import RoomBody from "../../components/room/body";
let socket;
const ENDPOINT = "http://localhost:5000";
socket = io(ENDPOINT);
const RoomPage = ({ location }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [sellerName, setSellerName] = useState("");

  const room = qs.parse(location.search);

  useEffect(() => {
    socket.on("join-room-money", (data) => {
      setPrice(data);
    });
  }, [price]);
  useEffect(() => {
    socket.on("update-merch-money", (data) => {
      setPrice(data);
    });
  }, [price]);
  useEffect(async () => {
    const id = room.room;
    const result = await Axios.post("http://localhost:5000/merch/getAMerch", {
      id,
    });
    if (result.data === "error") {
    } else {
      setName(result.data.name);
      setImage(result.data.photo);
      setPrice(result.data.price);
      setDetail(result.data.detail);
      setSellerName(result.data.sellerId);
      console.log(result);
    }
    socket.emit("join", room.room);
  }, [location.search]);

  return (
    <div>
      <Nav />
      <RoomBody
        socket={socket}
        room={room.room}
        name={name}
        price={price}
        image={image}
        detail={detail}
        sellerName={sellerName}
      />
    </div>
  );
};

export default RoomPage;
