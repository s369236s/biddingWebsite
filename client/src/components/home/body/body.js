import Axios from "axios";
import React, { useEffect, useRef } from "react";
import Merchs from "../../merchs/merchs";
import "./body.css";
const HomeBody = ({ merchs, setMerchs }) => {
  // const [merchs, setMerchs] = useState([]);
  const mountedRef = useRef(true);
  useEffect(async () => {
    await Axios.get("http://localhost:5000/merch/getMerch").then((res) => {
      setMerchs(res.data);
    });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="body-container">
      <Merchs merchs={merchs} setMerchs={setMerchs} />
    </div>
  );
};

export default HomeBody;
