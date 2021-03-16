import React, { useEffect, useState } from "react";
import "./info.css";
const UserProfileInfo = ({ info, setUserName, email, username, setEmail }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="user-profile-info-container">
      <p>帳號資訊</p>{" "}
      <div className="editContainer">
        <p
          style={{ display: toggle === true ? "none" : "inline" }}
          className="edit"
          onClick={() => {
            setToggle(true);
            setEmail("");
            setUserName("");
          }}
        >
          編輯
        </p>
        <p
          style={{ display: toggle === false ? "none" : "inline" }}
          className="edit true"
          onClick={() => {
            setToggle(false);
          }}
        >
          確定
        </p>{" "}
        <p
          style={{ display: toggle === false ? "none" : "inline" }}
          className="edit false"
          onClick={() => {
            setToggle(false);
          }}
        >
          取消
        </p>
      </div>
      <div className="info-name">
        <p>使用者名稱</p>
      </div>
      <input
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        readOnly={toggle === true ? false : true}
        className="info-email"
      />
      <div className="info-name">
        <p>信箱</p>
      </div>
      <input
        value={email}
        readOnly={toggle === true ? false : true}
        className="info-email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{
          backgroundColor: toggle === true ? "white" : "rgb(241, 241, 241)",
        }}
      />
      <div className="info-name">
        <p>生日</p>
      </div>
      <p className="info-email">{`${info.birthYear}年 ${info.birthMonth}月 ${info.birthDay}日`}</p>
    </div>
  );
};

export default UserProfileInfo;
