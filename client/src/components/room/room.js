import React, { useState, useEffect } from "react";
import qs from "query-string";
import io from "socket.io-client";
import "./room.css";
let socket;
const ENDPOINT = "http://localhost:5000";
socket = io(ENDPOINT);

const Room = ({ location }) => {
  const [value, setValue] = useState("");
  const [id, setId] = useState(0);
  const room = qs.parse(location.search);
  // console.log(useQuery());
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send", { value, room });
  };

  useEffect(() => {
    console.log(room);
    socket.emit("join", room);
  }, []);

  useEffect(() => {
    socket.on("join-room-message", (data) => {
      setId(data);
      console.log(data);
    });
    // socket.on("join-room-message", (data) => {
    //   console.log(data.value);
    //   setId(data.value);
    // });
  }, []);

  return (
    <form>
      <h1>{id}</h1>
      <input onChange={(e) => setValue(e.target.value)}></input>
      <button onClick={handleSubmit}>sumbit</button>
    </form>
  );
};

export default Room;
