import React from "react";
import { Link } from "react-router-dom";
import "./merch.css";
const Merchs = ({ merch }) => {
  return (
    <Link className="profile-merch-container" to={`/Room?room=${merch.id}`}>
      <div
        className="profile-merch-img"
        style={{ backgroundImage: `url("uploads/${merch.photo}")` }}
      />
      <div className="profile-merch-info-container">
        <p className="name">{merch.name}</p>
        <p className="price">$ {merch.price}</p>
      </div>
    </Link>
  );
};

export default Merchs;
