import React from "react";
import "./info.css";
const UserProfileInfo = ({ info }) => {
  console.log(info);
  return (
    <div className="user-profile-info-container">
      <p>帳號資訊</p> <p className="edit">編輯</p>
      <div className="info-name">
        <p>使用者名稱</p>
      </div>
      <p>{info.username}</p>
      <div className="info-name">
        <p>信箱</p>
      </div>
      <p className="info-email">{info.email}</p>
      <div className="info-name">
        <p>生日</p>
      </div>
      <p className="info-email">{`${info.birthYear}年 ${info.birthMonth}月 ${info.birthDay}日`}</p>
    </div>
  );
};

export default UserProfileInfo;
