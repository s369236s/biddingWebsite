import React, { useEffect, useState } from "react";
import "./info.css";
const UserProfileInfo = ({ info }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="user-profile-info-container">
      <p>帳號資訊</p>{" "}
      <div className="editContainer">
        <p
          className="edit"
          onClick={() => {
            setToggle(true);
          }}
        >
          編輯
        </p>
      </div>
      <div className="info-name">
        <p>使用者名稱</p>
      </div>
      <input
        value={info?.username || "讀取中"}
        readOnly={toggle === true ? false : true}
        className="info-email"
      />
      <div className="info-name">
        <p>信箱</p>
      </div>
      <input
        value={info?.email || "讀取中"}
        readOnly={toggle === true ? false : true}
        className="info-email"
      />
      <div className="info-name">
        <p>生日</p>
      </div>
      <p className="info-email">{`${info?.birthYear || "0"}年 ${
        info?.birthMonth || "0"
      }月 ${info?.birthDay || "0"}日`}</p>
    </div>
  );
};

export default UserProfileInfo;
