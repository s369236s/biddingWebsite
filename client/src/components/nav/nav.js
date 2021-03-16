import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NavSearch from "./search";
import NavUser from "./navuser";
import "./nav.css";
import Axios from "axios";
const Nav = ({ setMerchs }) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [userLink, setUserLink] = useState("");

  const [over, setOver] = useState(false);
  const leaveEvent = (e) => {
    setOver(false);
  };
  const overEvent = (e) => {
    setOver(true);
  };
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user/auth",
    }).then((res) => {
      if (res.data === "Please log in") {
        // history.push("/");
      } else {
        // console.log(res.data);
      }
      setUsername(res.data.username);
      setUserLink(res.data.usersNumber);
      return () => {};
    });
  }, []);
  return (
    <div className="nav-container">
      <div className="nav-without-search">
        <div
          className="nav-user-container"
          onMouseOver={overEvent}
          onMouseLeave={leaveEvent}
        >
          <img className="nav-user-image" src="image/test1.jpg" />
          <p>{username}</p>
        </div>
        <NavUser
          isOver={over}
          setOver={setOver}
          leaveEvent={leaveEvent}
          overEvent={overEvent}
          history={history}
          userLink={userLink}
        />
      </div>
      <div className="nav-with-search">
        <Link to="./home">logo</Link>
        <NavSearch setMerchs={setMerchs} />
      </div>
    </div>
  );
};

export default Nav;
