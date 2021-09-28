import React, { useEffect } from "react";
import { setDoc } from "firebase/firestore";

function ImageManager(props) {
  useEffect(() => {
    console.log(props.id);
    console.log(props.path);
    console.log(props.value);
  }, []);
  const createImage = (url, index, keyPart) => {
    const imageStyle = {
      width: "75px",
      height: "75px",
      borderRadius: "3px",
      backgroundColor: "#a2a2a2",
      boxSizing: "border-box",
      marginLeft: "6px",
      marginBottom: "3px",
      marginTop: "3px",
    };
    return <div key={keyPart + "_" + index} style={imageStyle}></div>;
  };

  const createRow = (index, urlList) => {
    const row = [];
    if (urlList.length > 0) {
      console.log(urlList);
      for (let i = 0; i < urlList.length; i++) {
        const keyPart = props.id + "_" + index;
        row.push(createImage(urlList[i], i, keyPart));
      }

      return (
        <div
          key={props.id + "_" + index}
          style={{
            width: "170px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {row}
        </div>
      );
    }
  };
  const splitter = (list, rowLength) => {
    const fullArray = [];
    console.log(list);
    var row = [];
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (row.length === rowLength - 1 || i === list.length - 1) {
        row.push(list[i]);
        fullArray.push(row);
        row = [];
      } else {
        row.push(list[i]);
      }
    }
    return fullArray;
  };

  const createGrid = (inputList) => {
    const split = splitter(inputList, 2);
    console.log(split, "split");

    const grid = [];
    for (let i = 0; i < split.length; i++) {
      grid.push(createRow(i, split[i]));
    }
    return grid;
  };

  return (
    <div>
      <div style={{ fontSize: "15px" }}>Images</div>
      <div
        style={{
          width: "170px",
          // height: "200px",
          backgroundColor: "#f2f2f2",
          paddingTop: "6px",
          paddingBottom: "6px",
          borderRadius: `${props.borderRadius}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {createGrid(["a", "b", "c", "d", "e", "f", "g"])}
      </div>
    </div>
  );
}

export default ImageManager;
