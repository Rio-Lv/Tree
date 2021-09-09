import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
function TextInput(props) {
  return (
    <div>
      <InputBox>
        <CenterBlock>
          <Input
            style={{
              width: props.show ? "160px" : "0px",
              opacity: props.show ? "100%" : "0%",
            }}
            type="text"
            id={`${props.id}_textinput`}
            name="project_type_input"
            onChange={(e) => {
              e.preventDefault();
              // console.log(e.target.value);
              props.setText(e.target.value);
              var rando;
            }}
          />
        </CenterBlock>
      </InputBox>
    </div>
  );
}

export default TextInput;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  border-radius: 7px;
  transition: 0.3s;
`;

const Input = styled.input`
  width: 160px;
  height: 15px;
  transform: translate(5px, 4px);
  /* border: 2px solid white; */
  border-radius: 7px;
  transition: 0.3s;
`;

const CenterBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
