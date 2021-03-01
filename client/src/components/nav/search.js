import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { Search } from "react-bootstrap-icons";
import "./search.css";
const NavSearch = ({ setMerchs }) => {
  const [text, setText] = useState("");
  let history = useHistory();
  const handleSearch = async () => {
    await Axios.post(
      "http://localhost:5000/search/searchMerch",
      { merchName: text },
      {
        withCredentials: true,
      }
    ).then((res) => {
      if (res.data !== "error") setMerchs(res.data);
    });
  };
  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="search-icon-container">
        {" "}
        <Link to="./home" onClick={handleSearch}>
          <Search className="search-icon" />
        </Link>
      </div>
    </div>
  );
};

export default NavSearch;
