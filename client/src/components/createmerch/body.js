import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import Axios from "axios";
import "./body.css";
const CreateMerchBody = () => {
  let history = useHistory();
  const [name, setMerchName] = useState("");
  const [price, setMerchPrice] = useState("");
  const [file, setFile] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [detail, setDetail] = useState("");
  let [preview, setPreview] = useState("");

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setWidth(100);
    setHeight(100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("merchImg", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("detail", detail);
    Axios.post("http://localhost:5000/merch/createNewMerch", formData, {
      withCredentials: true,
    }).then((res) => history.push("/home"));
  };

  return (
    <div className="createMerch-container">
      <h1>商品資料</h1>
      <div className="createMerch-info merch-name">
        <p>名稱</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setMerchName(e.target.value);
          }}
          className="createMerch-input"
        />
      </div>
      <div className="createMerch-info merch-detail">
        <p>描述</p>
        <textarea
          name="detail"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          className="createMerch-input"
        />
      </div>
      <div className="createMerch-info merch-price">
        <p>價格</p>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => {
            setMerchPrice(e.target.value);
          }}
          className="createMerch-input"
        />
      </div>
      <div className="createMerch-info merch-image">
        <p>封面圖片</p>

        <label className="createMerch-upload-input">
          <input
            style={{ display: "none" }}
            onChange={handleOnChange}
            type="file"
            name="merchImg"
          />
          <PlusCircle />
        </label>
        <div className="create-preview-container">
          <p style={{ display: width === 100 ? "none" : "flex" }}>預覽</p>
          <img
            className="create-preview"
            src={preview}
            width={width}
            height={height}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className="createMerch-button">
        送出
      </button>
    </div>
  );
};

export default CreateMerchBody;
