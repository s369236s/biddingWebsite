import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import qs from "query-string";
import Nav from "../../components/nav/nav";
import UserProfileBody from "../../components/userprofile/body/body";

const UserProfilePage = ({ location }) => {
  const [info, setInfo] = useState({});
  const [sellMerchs, setSellMerchs] = useState([]);
  const [biddingMerchs, setBiddingMerchs] = useState([]);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const mountedRef = useRef(true);
  const query = qs.parse(location.search);
  useEffect(async () => {
    await Axios.get(`http://localhost:5000/user/checkUser`, {
      params: { user: query.user },
      withCredentials: true,
    })
      .then((res) => {
        setInfo(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setInfo([]);
      });
    await Axios.get(`http://localhost:5000/merch/getUserSellMerch`, {
      withCredentials: true,
    })
      .then((res) => {
        setSellMerchs(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setSellMerchs([]);
      });
    await Axios.get(`http://localhost:5000/merch/getUserBiddingMerch`, {
      withCredentials: true,
    })
      .then((res) => {
        setSellMerchs(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setSellMerchs([]);
      });
    await Axios.get(`http://localhost:5000/merch/getUserSellMerch`, {
      withCredentials: true,
    })
      .then((res) => {
        setBiddingMerchs(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setBiddingMerchs([]);
      });
    return () => {
      mountedRef.current = false;
    };
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
        biddingMerchs={biddingMerchs}
      />
    </div>
  );
};

export default UserProfilePage;
