import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import ImageManager from "./ImageManager";

const EditColor = "#0e76ec";
const DeleteColor = "#f13737";

function EditTools(props) {
  const [list, setList] = useState([]); // with in div and styled
  const [images, setImages] = useState();
  const [adding, setAdding] = useState(false);
  const [prevshow, setPrevshow] = useState(false);
  const [data, setData] = useState(props.info); // just the data

  const unique_class_input = `${props.path}_${props.id}_input_class`;
  const unique_class_name = `${props.path}_${props.id}_input_name`;

  const uniqueKeyAddPropertyName = `${props.path}_${props.id}_add_property_name`;
  const uniqueKeyAddPropertyValue = `${props.path}_${props.id}_add_property_value`;

  const add_title = document.getElementById(uniqueKeyAddPropertyName);
  const add_value = document.getElementById(uniqueKeyAddPropertyValue);

  const pushData = async () => {
    const ref = doc(db, props.path, props.id);
    await updateDoc(ref, data);
  };

  useEffect(() => {
    if (!props.deleting) {
      if (props.show === false && prevshow === true) {
        console.log("running push data", props.id);
        pushData();
      }
    }
    setPrevshow(props.show);
    return null;
  }, [props.show]);
  const pushProperty = async () => {
    if (adding) {
      if (add_title.value !== null && add_value.value !== null) {
        const ref = doc(db, props.path, props.id);
        var newProperty = {};

        newProperty[add_title.value] = add_value.value;
        await updateDoc(ref, newProperty);
      }
    }
  };

  const handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (
      ((event.ctrlKey || event.metaKey) && charCode === "s") ||
      event.keyCode === 13
    ) {
      event.preventDefault();
      pushData().then(() => {
        const input_elements =
          document.getElementsByClassName(unique_class_input);
        const name_elements =
          document.getElementsByClassName(unique_class_name);
        for (let i = 0; i < input_elements.length; i++) {
          input_elements[i].style.color = "black";
          name_elements[i].style.color = "black";
        }
        setAdding(false);
      });
      if (adding) {
        // after the plus is click, send that data or if save or enter
        if (add_title.value !== "" && add_value.value !== "") {
          pushProperty();
          add_title.value = "";
          add_value.value = "";
        }
      }
    }
  };

  const editableText = (key, value) => {
    if (typeof value === "string" || typeof value === "number") {
      const uniqueKeyInput = `${props.path}_${props.id}_${key}_input`;
      const uniqueKeyName = `${props.path}_${props.id}_${key}_name`;

      if (key === "id") {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontSize: "15px" }} id={uniqueKeyName}>
              {key} : &#160;
            </div>
            <Input
              style={{
                fontSize: value.length > 15 ? "12px" : "15px",
                height: value.length > 15 ? "300px" : "24px",
                marginBottom: "3px",
                backgroundColor: "white",
              }}
              id={uniqueKeyInput}
              key={uniqueKeyInput}
              type="text"
              name={uniqueKeyInput}
              defaultValue={value}
              readOnly
              onChange={(e) => {
                e.preventDefault();
                // console.log(e.target.value);
              }}
            ></Input>
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: value.length > 15 ? "column" : "row",
              marginBottom: value.length > 15 ? "3px" : "3px",
            }}
          >
            <div
              className={unique_class_name}
              style={{
                transition: ".3s",
                whiteSpace: "nowrap",
                fontSize: "15px",
                cursor: "default",
              }}
              id={uniqueKeyName}
            >
              {key} : &#160;
            </div>
            <Input
              style={{
                whiteSpace: "normal",
                // wordWrap: "break-word",
                backgroundColor: value.length > 15 ? "#f2f2f2" : "#f2f2f2",
                // how much space is needed for the text
                height:
                  value.length > 15
                    ? value.length > 25
                      ? value.length > 45
                        ? value.length > 75
                          ? "100px"
                          : "60px"
                        : "50px"
                      : "30px"
                    : "25px",
                width: value.length > 15 ? "170px" : "130px",
                fontSize: value.length > 15 ? "12px" : "15px",
                resize: value.length > 15 ? "vertical" : "none",
              }}
              id={uniqueKeyInput}
              className={unique_class_input}
              key={uniqueKeyInput}
              type="text"
              name={uniqueKeyInput}
              defaultValue={value}
              onChange={(e) => {
                document.getElementById(uniqueKeyInput).style.color = EditColor;
                e.preventDefault();

                if (e.target.value === "") {
                  document.getElementById(uniqueKeyName).style.color =
                    DeleteColor;
                  document.getElementById(uniqueKeyInput).style.color =
                    DeleteColor;
                  setData((oldData) => {
                    var newData = oldData;
                    if (key === "name") {
                      newData[key] = props.id;
                    } else {
                      newData[key] = deleteField();
                    }
                    return newData;
                  });
                } else {
                  setData((oldData) => {
                    var newData = oldData;
                    newData[key] = e.target.value;
                    return newData;
                  });
                  document.getElementById(uniqueKeyName).style.color =
                    "#000000";
                }
              }}
            ></Input>
          </div>
        );
      }
    }
  };
  // the plus button thing
  const addProperty = () => {
    const add_title = document.getElementById(uniqueKeyAddPropertyName);
    const add_value = document.getElementById(uniqueKeyAddPropertyValue);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            opacity: adding ? "100%" : "0%",
            transition: ".3s",
            fontSize: "15px",
          }}
        >
          <AddInput
            maxLength={"15"}
            style={{
              width: adding ? "60px" : "0",
              marginRight: adding ? "5px" : "-2px",
              marginLeft: "-7px",
              border: "none",
              backgroundColor: "#F2F2F2",
              textIndent: "5px",
              borderRadius: `${props.borderRadius}px`,
              fontSize: "15px",
            }}
            id={uniqueKeyAddPropertyName}
            placeholder={"Title"}
            type="text"
            onChange={(e) => {
              if (!add_value.value) {
                add_title.style.color = DeleteColor;
                // console.log("arga barg barg");
              } else {
                add_title.style.color = "black";
              }
            }}
          />
          <div
            style={{
              width: adding ? "4px" : "0px",
              fontSize: "14px",
            }}
          >
            :
          </div>
          <AddInput
            style={{
              width: adding ? "80px" : "0",
              marginLeft: adding ? "5px" : "0px",
              border: "none",
              backgroundColor: "#F2F2F2",
              color: EditColor,
              textIndent: "5px",
              borderRadius: `${props.borderRadius}px`,
              fontSize: "14px",
            }}
            id={uniqueKeyAddPropertyValue}
            placeholder={"Value"}
            type="text"
            onChange={(e) => {
              if (!add_value.value) {
                add_title.style.color = DeleteColor;
                // console.log("arga barg barg");
              } else {
                add_title.style.color = "black";
              }
            }}
          />
        </div>

        <div
          onClick={() => {
            if (adding) {
              // after the plus is click, send that data or if save or enter
              if (add_title.value !== "" && add_value.value !== "") {
                pushProperty().then(() => {
                  add_title.value = "";
                  add_value.value = "";
                });
              }
            }
            setAdding(!adding);
          }}
          style={{
            overflow: "hidden",
            height: "25px",
            fontSize: "30px",
            transition: ".3s",
            color: "black",
            cursor: "pointer",
            transform: adding ? "rotate(180deg)" : "",
          }}
        >
          +
        </div>
      </div>
    );
  };

  // this sorts the data, id and name on top, images bottom, rest alphabetical
  useEffect(() => {
    if (props.info) {
      const pushItems = () => {
        const array = [];
        var id;
        var name;
        var images;
        const orderedInfo = Object.keys(props.info)
          .sort()
          .reverse()
          .reduce((obj, key) => {
            obj[key] = props.info[key];
            return obj;
          }, {});
        for (const [key, value] of Object.entries(orderedInfo)) {
          if (key === "id") {
            id = editableText(key, value);
          } else if (key === "name") {
            name = editableText(key, value);
          } else if (key === "images") {
            // change this to another function
            console.log(typeof value);
            images = (
              <ImageManager
                key={`${props.path}_${props.id}_ImageManager`}
                borderRadius={props.borderRadius}
              />
            );
          } else {
            array.push(editableText(key, value));
          }
        }
        array.sort((a, b) =>
          a.constructor.name > b.constructor.name ? 1 : -1
        );

        array.splice(0, 0, id);
        if (name) {
          array.splice(1, 0, name);
        }
        setImages(images);
        setList(array);
      };

      pushItems();
    }
    return null;
  }, [props.info]);

  return (
    <Box style={{ margin: `${props.spacing}px` }}>
      <InfoBox
        style={{
          borderRadius: `${props.borderRadius}px`,
          opacity: props.show ? "100%" : "0%",
          // transform: `translate(0,  ${props.spacing}px)`,
          width: props.show ? "300px" : "0px",
          height: props.show ? "100px" : "0px",
        }}
      >
        {props.show ? (
          <div>
            <Info
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              {list}
              {addProperty()}
              {images}
            </Info>
            <div style={{ height: "50px" }} />
          </div>
        ) : null}
      </InfoBox>
    </Box>
  );
}

export default EditTools;

const Box = styled.div`
  position: relative;
  color: black;
  /* border: 3px solid black; */
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InfoBox = styled.div`
  position: relative;

  box-sizing: border-box;

  transition: 0.3s;
`;
const Info = styled.div`
  margin: 10px;
  /* margin-top: 10px; */
  line-height: 24px;
  cursor: auto;
`;

const Input = styled.textarea`
  /* height: 100%; */
  /* margin-top: 0px; */
  /* transform: translate(0px, -0px); */
  /* Align radii */
  margin-bottom: 0.5px;
  border-radius: 5px;

  transition: 0.3s;
  border: 0px solid white;
  box-sizing: border-box;
  text-indent: 0px;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    outline: none;
  }
`;
const AddInput = styled.input`
  transition: 0.3s;
  :focus {
    outline: none;
  }
`;
const addProperty = styled.input`
  border: 3px solid red;
`;
