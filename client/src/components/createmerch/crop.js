import React, { useRef } from "react";
import Cropper from "react-cropper";
import "./crop.css";
import "cropperjs/dist/cropper.css";

const CreateImageCrop = ({ preview, onCrop, cropperRef }) => {
  return (
    <div className="create-crop-container">
      <Cropper
        src={preview}
        style={{
          height: 300,
          width: 300,
          alignSelf: "center",
        }}
        ref={cropperRef}
        onCrop={onCrop}
        aspectRatio={1}
        background={false}
        scalable={true}
        setDragMode={"none"}
        dragMode={"none"}
        zoomable={false}
        // highlight={false}
        // draggable={false}
        // autoCropArea={0}
        // initialAspectRatio={1}
        // guides={false}
        // cropBoxResizable={true}
        // draggable={false}
        // // Cropper.js options
        // scalable={false}
        // cropBoxMovable={true}
        // cropmove={true}
      />
    </div>
  );
};

export default CreateImageCrop;
