import React from "react";
import Merchs from "./merchs";
const UserProfileBuy = ({ biddingMerchs }) => {
  return (
    <div className="user-profile-sell-container">
      <div className="header">
        <p>販賣物品</p>
      </div>
      <div className="merchs">
        {biddingMerchs.map((merch) => (
          <Merchs key={merch.id} merch={merch} />
        ))}
      </div>
    </div>
  );
};

export default UserProfileBuy;
