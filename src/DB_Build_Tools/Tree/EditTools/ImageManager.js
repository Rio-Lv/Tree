import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function ImageManager(props) {
  const submitImage = (file, index) => {
    console.log(props.uid);
    // const storage = getStorage();
    // const reference = ref(storage, file);
    console.log(props.directory);

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${props.directory}/${props.id}_${uuidv4()}`
    );

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(storageRef)
        .then((url) => {
          const docRef = doc(db, props.path, props.id);
          updateDoc(docRef, {
            images: arrayUnion(url),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const createSubmitImage = () => {
    const imageStyle = {
      position: "absolute",
      right: "0px",
      bottom: "-3px",
      width: "25px",
      height: "25px",
      borderRadius: `${props.borderRadius}px`,

      backgroundColor: "#F2F2F2",
      boxSizing: "border-box",
      marginLeft: "6px",
      marginBottom: "3px",
      marginTop: "3px",
      textAlign: "center",
      fontSize: "30px",
      lineHeight: "25px",
      cursor: "pointer",
    };
    const inputId = `${props.path}_${props.id}_Submit_Images_input`;
    return (
      <div>
        <input
          style={{ display: "none" }}
          id={inputId}
          name="input_images"
          accept="image/png, image/gif, image/jpeg"
          type="file"
          multiple
          onChange={(e) => {
            const ref = doc(db, props.path, props.id);

            const Images = Array.from(e.target.files);

            for (let i = 0; i < Images.length; i++) {
              submitImage(Images[i], i);
            }
          }}
        />

        <label htmlFor={inputId} style={imageStyle}>
          +
        </label>
      </div>
    );
  };

  const createImage = (url, index, keyPart) => {
    const imageStyle = {
      position: "relative",
      width: "75px",
      height: "75px",
      borderRadius: "3px",
      backgroundColor: "#a2a2a2",
      boxSizing: "border-box",
      marginLeft: "6px",
      marginBottom: "3px",
      marginTop: "3px",
      backgroundSize: "cover",
      backgroundImage: `url(${url})`,
    };
    const closeButtonStyle = {
      position: "absolute",
      top: "0px",
      right: "-5px",
      height: "15px",
      width: "15px",
      transform: "rotate(45deg)",
      cursor: "pointer",
    };
    return (
      <div key={keyPart + "_" + index} style={imageStyle}>
        <div
          style={closeButtonStyle}
          onClick={() => {
            console.log(url);
            const reference = doc(db, props.path, props.id);
            updateDoc(reference, {
              images: arrayRemove(url),
            });
            const httpsReference = ref(storage, url);
            deleteObject(httpsReference)
              .then(() => console.log("deleted"))
              .catch((err) => console.log(err));
          }}
        >
          +
        </div>
      </div>
    );
  };
  const createRow = (index, urlList) => {
    const row = [];
    if (urlList.length > 0) {
      // console.log(urlList);
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
    // console.log(list);
    var row = [];
    for (let i = 0; i < list.length; i++) {
      // console.log(list[i]);
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
    // console.log(split, "split");

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
          position: "relative",
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
        {createGrid(props.images)}
        {createSubmitImage()}
      </div>
    </div>
  );
}

export default ImageManager;
