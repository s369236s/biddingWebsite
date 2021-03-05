import React from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./navuser.css";
const NavUser = ({ isOver, userLink, overEvent, leaveEvent, history }) => {
  const handleLogOut = async () => {
    await Axios.get("http://localhost:5000/user/logout", {
      withCredentials: true,
    }).then((res) => {
      history.push("./");
    });
  };
  return (
    <div
      className="nav-user-b-container"
      style={{ display: isOver ? "flex" : "none" }}
      onMouseOver={overEvent}
      onMouseLeave={leaveEvent}
    >
      <div className="nav-user-o-container">
        <Link to={`/user?user=${userLink}`}>我的帳戶</Link>
        <Link to="/createnewmerch" className="not-first">
          新增商品
        </Link>
        <Link to="/user/merch" className="not-first">
          編輯商品
        </Link>
        <Link
          to="/home"
          onClick={handleLogOut}
          className="not-first"
          style={{ color: "red" }}
        >
          帳號登出
        </Link>
      </div>
    </div>
  );
};

export default NavUser;
