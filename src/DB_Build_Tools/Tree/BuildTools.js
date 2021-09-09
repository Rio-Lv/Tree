import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function BuildTools(props) {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text);
  }, [text]);

  useEffect(() => {
    setAdd(props.me);
  }, [props.me]);

  return (
    <Tools
      onClick={() => {
        if (!open) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }}
      style={{
        backgroundColor: `${props.color1}`,
        height: props.show ? "50px" : "0px",
        opacity: props.show ? "100%" : "0%",
        marginTop: props.show ? "5px" : "0px",
      }}
    >
      <EditData
        style={{
          backgroundColor: `${props.color1}`,
          borderRadius: `${props.borderRadius}px`,
        }}
      >
        <img
          src="https://img.icons8.com/material-rounded/24/ffffff/edit--v1.png"
          alt=""
        />
      </EditData>
      <AddDocument
        style={{
          backgroundColor: `${props.color2}`,
          borderRadius: `${props.borderRadius}px`,
          width: add ? `200px` : `30px`,
        }}
      >
        <div>
          <TextInput
            show={add}
            id={props.name + props.index}
            setText={setText}
          />
        </div>
        <div
          onClick={() => {
            if (!add) {
              setAdd(true);
            } else {
              console.log(props.nextPath);
              const ref = doc(db, props.nextPath, text);
              setDoc(ref, { info: "cheese info" }, { merge: true });
              setAdd(false);
              setText("");
            }
          }}
          style={{
            fontSize: "30px",
            transform: add ? `translate(10px)` : `translate(0,0)`,
          }}
        >
          +
        </div>
      </AddDocument>
    </Tools>
  );
}

export default BuildTools;

const Tools = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;

  position: relative;
  overflow: hidden;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  transition: 0.3s;
`;

const AddDocument = styled.div`
  display: flex;
  flex-direction: row;
  width: 30px;
  height: 30px;
  font-weight: 600;
  font-size: 30px;
  line-height: 26px;
  margin-right: 10px;
  box-sizing: border-box;
  border: 2px solid white;
  transition: 0.3s;
`;
const EditData = styled.div`
  transition: 0.3s;
  font-weight: 200;
  line-height: 30px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  margin-right: 10px;
  box-sizing: border-box;
  border: 2px solid white;
  user-select: none;
`;
