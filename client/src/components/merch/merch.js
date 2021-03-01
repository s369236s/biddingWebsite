import React from "react";
import { Link } from "react-router-dom";
import "./merch.css";
const Merch = ({ merch }) => {
  const imgStyle = {
    backgroundImage: `url('./uploads/${merch.photo}')`,
  };
  return (
    <Link className="merch-container" to={`/Room?room=${merch._id}`}>
      <div style={imgStyle} className="test"></div>
      <div className="merch-info-container">
        <p className="merch-info-text">{merch.name}</p>
        <p className="merch-info-text">價格 : {merch.price}</p>
      </div>
    </Link>
  );
};

export default Merch;
