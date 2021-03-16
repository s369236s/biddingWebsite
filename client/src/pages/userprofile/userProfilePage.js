import React, { useEffect, useState } from "react";
import Axios from "axios";
import qs from "query-string";
import Nav from "../../components/nav/nav";
import UserProfileBody from "../../components/userprofile/body/body";

const UserProfilePage = ({ location }) => {
  const [info, setInfo] = useState({});
  const [sellMerchs, setSellMerchs] = useState([]);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const query = qs.parse(location.search);
  useEffect(async () => {
    const result = await Axios.get(`http://localhost:5000/user/checkUser`, {
      params: { user: query.user },
      withCredentials: true,
    });
    const result_ = await Axios.get(
      `http://localhost:5000/merch/getUserSellMerch`,
      {
        withCredentials: true,
      }
    );
    setSellMerchs(result_.data);
    setInfo(result.data);
  }, []);
  return (
    <div>
      <Nav />
      <UserProfileBody
        setUserName={setUserName}
        setEmail={setEmail}
        email={info.email}
        username={info.username}
        info={info}
        sellMerchs={sellMerchs}
      />
    </div>
  );
};

export default UserProfilePage;
