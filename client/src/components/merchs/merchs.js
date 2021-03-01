import { Link } from "react-router-dom";
import Merch from "../merch/merch";
import "./merchs.css";
const Merchs = ({ merchs, setMerchs }) => {
  return (
    <div className="merchs-container">
      {merchs.map((merch) => (
        <Merch key={merch._id} merch={merch}></Merch>
      ))}
    </div>
  );
};

export default Merchs;
<div></div>;
