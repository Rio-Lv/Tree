import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function ProjectTypeBlock(props) {
  const remove = async () => {
    await deleteDoc(doc(db, "Projects", `${props.id}`));
  };
  return (
    <Block>
      {props.id}
      <Close
        onClick={() => {
          console.log("deleting");
          remove();
        }}
      >
        +
      </Close>
    </Block>
  );
}

export default ProjectTypeBlock;
const Block = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: #2a9d8e;
  width: 100%;
  height: 50px;
  border: 3px solid #264653;
  border-radius: 5px;
  line-height: 45px;
`;
const Close = styled.div`
  position: absolute;
  right: 10px;
  font-weight: 400;
  font-size: 24px;
  top: 50%;
  transform: translate(0, -50%) rotate(45deg);
  color: #ffffffc0;
  cursor: pointer;
  :hover {
    color: white;
  }
`;
