import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function BuildTools(props) {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");

  // make the ids unique
  const inputId = `${props.path}_${props.id}_input`;
  const buttonId = `${props.path}_${props.id}_button`;

  // simulate add button click on enter key
  useEffect(() => {
    var input = document.getElementById(inputId);
    input.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        console.log(buttonId);
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById(buttonId).click();
      }
    });
  }, [buttonId, inputId]);

  const createDoc = () => {
    console.log(props.nextPath);
    if (text !== "") {
      const ref = doc(db, props.nextPath, text);
      setDoc(ref, { info: "cheese info" }, { merge: true });
    }
    setAdd(false);
    setText("");
    document.getElementById(inputId).value = "";
  };

  useEffect(() => {
    if (!props.show) {
      setAdd(false);
    }
  }, [props.show]);

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
      {/* <EditData
        style={{
          backgroundColor: `${props.color1}`,
          borderRadius: `${props.borderRadius}px`,
        }}
      >
        <img
          src="https://img.icons8.com/material-rounded/24/ffffff/edit--v1.png"
          alt=""
        />
      </EditData> */}
      <AddDocument
        style={{
          backgroundColor: `${props.color2}`,
          borderRadius: `${props.borderRadius}px`,
          width: add ? `230px` : `30px`,
        }}
      >
        <div>
          <InputBox>
            <CenterBlock>
              <Input
                style={{
                  width: add ? "170px" : "0px",
                  opacity: add ? "100%" : "0%",
                }}
                type="text"
                id={inputId}
                name="project_type_input"
                onChange={(e) => {
                  e.preventDefault();
                  // console.log(e.target.value);
                  setText(e.target.value);
                }}
              />
            </CenterBlock>
          </InputBox>
        </div>
        <div
          id={buttonId}
          onClick={() => {
            if (!add) {
              setAdd(true);
            } else {
              createDoc();
            }
          }}
          style={{
            userSelect: "none",
            fontSize: "30px",
            transform: add ? `translate(4px)` : `translate(-2px,0)`,
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
  margin: 4px;

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
  margin-right: 0px;
  box-sizing: border-box;
  border: 2px solid white;
  transition: 0.3s;
  overflow: hidden;
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

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  transition: 0.3s;
`;

const Input = styled.input`
  width: 180px;
  height: 100%;
  margin-top: 1px;
  transform: translate(1px, 0px);
  /* Align radii */
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  transition: 0.3s;
  border: 1px solid white;
  box-sizing: border-box;
`;

const CenterBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
