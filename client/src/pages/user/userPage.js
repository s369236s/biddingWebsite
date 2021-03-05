import React, { useEffect } from "react";
import Axios from "axios";
import qs from "query-string";
import Nav from "../../components/nav/nav";

const UserPage = ({ location }) => {
  const query = qs.parse(location.search);
  useEffect(async () => {
    const result = await Axios.get("http://localhost:5000/user/checkUser", {
      withCredentials: true,
    });
    console.log(result);
  }, []);
  return (
    <div>
      <Nav />
    </div>
  );
};

export default UserPage;
