import Axios from "axios";
import React, { useEffect, useState } from "react";
import Merchs from "../../merchs/merchs";
import "./body.css";
const HomeBody = ({ merchs, setMerchs }) => {
  // const [merchs, setMerchs] = useState([]);

  useEffect(async () => {
    const result = await Axios.get("http://localhost:5000/merch/getMerch");
    setMerchs(result.data);
    return () => {};
  }, []);

  return (
    <div className="body-container">
      <Merchs merchs={merchs} setMerchs={setMerchs} />
    </div>
  );
};

export default HomeBody;
