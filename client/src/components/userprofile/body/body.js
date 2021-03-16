import React from "react";
import UserProfileBuy from "./buy";
import UserProfileSell from "./sell";
import UserProfileInfo from "./info";
import "./body.css";
const UserProfileBody = ({
  sellMerchs,
  info,
  username,
  email,
  setEmail,
  setUserName,
}) => {
  return (
    <div className="user-profile-body-container">
      <UserProfileInfo
        info={info}
        setUserName={setUserName}
        setEmail={setEmail}
        email={email}
        username={username}
      />
      <UserProfileBuy />
      <UserProfileSell sellMerchs={sellMerchs} />
    </div>
  );
};

export default UserProfileBody;
