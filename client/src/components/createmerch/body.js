import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { PlusCircle, XSquare } from "react-bootstrap-icons";
import CreateImageCrop from "./crop";
import Axios from "axios";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import "./body.css";

const CreateMerchBody = () => {
  let history = useHistory();
  const [name, setMerchName] = useState("");
  const [price, setMerchPrice] = useState("");
  const [file, setFile] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [detail, setDetail] = useState("");
  let [errors, setErrors] = useState([]);
  let [preview, setPreview] = useState("");
  let [cropResult, setCropResult] = useState(null);
  const [flashName, setFlashName] = useState(false);
  const [flashPrice, setFlashPrice] = useState(false);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setWidth(100);
    setHeight(100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("merchImg", file);

    formData.append("merchImg", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("detail", detail);
    Axios.post("http://localhost:5000/merch/createNewMerch", formData, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data === "merch created") history.push("/home");
        else {
          let results = res.data;
          console.log(res.data);
          results = results.map((foo) => foo.msg);

          const name = (element) => element === "type of name is wrong";
          const price = (element) => element === "price must be number";

          if (results.some(name)) setFlashName(true);
          else setFlashName(false);
          if (results.some(price)) setFlashPrice(true);
          else setFlashPrice(false);
        }
      })
      .catch((res) => {});
  };

  const cropperRef = useRef(null);
  const imageElement = cropperRef?.current;
  const cropper = imageElement?.cropper;
  const onCrop = () => {
    if (preview !== "") {
      setCropResult(cropper.getCroppedCanvas().toDataURL());
      cropper.getCroppedCanvas().toBlob((blob) => {
        setFile(blob);
      });
    }
    setPreview("");
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
        <p
          className="flash"
          style={{ display: flashName === false ? "none" : "inline" }}
        >
          名稱不可為空白
        </p>
      </div>
      <div className="createMerch-info merch-detail">
        <p>描述</p>
        <textarea
          maxLength="100"
          name="detail"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          className="createMerch-textarea"
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
        />{" "}
        <p
          className="flash"
          style={{ display: flashPrice === false ? "none" : "inline" }}
        >
          價格不得為空
        </p>
      </div>
      <div className="createMerch-info merch-image">
        <p>封面圖片</p>

        <Popup
          trigger={
            <button className="createMerch-upload-input">
              <PlusCircle />
            </button>
          }
          closeOnDocumentClick={false}
          className="createMerch-popup"
          position="center center"
          modal
          nested
        >
          {(close) => (
            <div className="createMerch-popup-container">
              <XSquare
                className="Xicon"
                onClick={() => {
                  close();
                }}
              />
              <div className="createMerch-button-container">
                <label className="createMerch-upload-input-pop">
                  <input
                    style={{ display: "none" }}
                    onChange={handleOnChange}
                    type="file"
                    name="merchImg"
                  />
                  <PlusCircle />
                </label>
                <button
                  className="createMerch-pop-button"
                  onClick={() => {
                    onCrop();
                    close();
                  }}
                >
                  裁剪
                </button>
              </div>
              <CreateImageCrop
                cropperRef={cropperRef}
                preview={preview}
                onCrop={onCrop}
              />
            </div>
          )}
        </Popup>

        {/* <label className="createMerch-upload-input">
          <input
            style={{ display: "none" }}
            onChange={handleOnChange}
            type="file"
            name="merchImg"
          />
          <PlusCircle />
        </label> */}
        <div className="create-preview-container">
          <p style={{ display: width === 100 ? "none" : "flex" }}>預覽</p>
          <img
            className="create-preview"
            src={cropResult}
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
