import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function BuildTools(props) {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState(null);

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
        // console.log(buttonId);
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById(buttonId).click();
      }
    });
  }, [buttonId, inputId]);

  const createDoc = () => {
    // console.log(props.nextPath);
    if (text !== "") {
      const ref = doc(db, props.nextPath, text);
      setDoc(
        ref,
        {
          id: text,
          name: text,
          images: "",
        },
        { merge: true }
      );
    }
    // setAdd(false);
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
        minWidth: add ? "160px" : "0px",
        height: props.show ? "29px" : "0px",
        // this height is sort of like a margin from the bottom
        opacity: props.show ? "100%" : "0%",
        marginTop: props.show ? `0px` : "0px",
        color: "white",
      }}
    >
      <AddDocument
        style={{
          backgroundColor: `${props.color2}`,
          borderRadius: `${props.borderRadius}px`,
          width: add ? `160px` : `23px`,
          marginRight: props.show ? `${props.spacing}px` : "0px",
        }}
      >
        <div>
          <InputBox>
            <CenterBlock>
              <Input
                style={{
                  width: add ? "137px" : "0px",
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
              props.setCollectionEmpty(false);
              document.getElementById(inputId).focus();
            } else {
              createDoc();
            }
          }}
          style={{
            userSelect: "none",
            fontSize: "37px",
            fontWeight: "400",
            transform: add ? `translate(1px,-2px)` : `translate(-7.3px,-1.5px)`,
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

  position: relative;
  overflow: hidden;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  transition: 0.3s;
`;

const AddDocument = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;

  line-height: 26px;
  margin-right: 0px;
  box-sizing: border-box;
  /* border: 1px solid white; */
  transition: 0.3s;
  overflow: hidden;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  transition: 0.3s;
`;

const Input = styled.input`
  height: 100%;
  margin-top: 0px;
  transform: translate(0px, 0px);
  /* Align radii */
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  transition: 0.3s;
  border: 2px solid white;
  box-sizing: border-box;
  text-indent: 12px;
  :focus {
    outline: none;
  }
`;

const CenterBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
