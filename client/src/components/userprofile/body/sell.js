import React from "react";
import Merchs from "./merchs";
import "./sell.css";
const UserProfileSell = ({ sellMerchs }) => {
  return (
    <div className="user-profile-sell-container">
      <div className="header">
        <p>販賣物品</p>
      </div>
      <div className="merchs">
        {sellMerchs.map((merch) => (
          <Merchs key={merch.id} merch={merch} />
        ))}
      </div>
    </div>
  );
};

export default UserProfileSell;
