import React, { useState, useEffect } from "react";
import Axios from "axios";
import Nav from "../../components/nav/nav";
import Body from "../../components/home/body/body";
import Footer from "../../components/home/footer/footer";

const HomePage = () => {
  const [text, setText] = useState("");
  const [merchs, setMerchs] = useState([]);

  return (
    <div>
      <Nav setMerchs={setMerchs} />
      <Body merchs={merchs} setMerchs={setMerchs} />
      <Footer />
    </div>
  );
};

export default HomePage;
