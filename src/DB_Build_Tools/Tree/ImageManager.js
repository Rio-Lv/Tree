import React from "react";

function ImageManager(props) {
  return (
    <div>
      <div style={{ fontSize: "15px" }}>Images</div>
      <div
        style={{
          width: "170px",
          height: "200px",
          backgroundColor: "#f2f2f2",
          marginTop: "5px",
          borderRadius: `${props.borderRadius}px`,
        }}
      ></div>
    </div>
  );
}

export default ImageManager;
