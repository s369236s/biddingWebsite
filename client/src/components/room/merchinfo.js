import React from "react";
import "./merchinfo.css";
const MerchInfo = ({ socket, sellerName, name, price, image, detail }) => {
  return (
    <div className="room-merch-info-container">
      <img src={`uploads/${image}`} />
      <div className="room-merch-text-info">
        <div className="info-name">名稱</div>
        <p className="merchName">{name}</p>
        <div className="info-name">賣家</div>
        <p className="sellerName">{sellerName}</p>
        <div className="info">詳細資料</div>
        <div className="detail">
          <p>{detail}</p>
        </div>
      </div>
    </div>
  );
};

export default MerchInfo;
