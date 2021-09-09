import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
function ProjectTypeBuilder() {
  const [textInput, setTextInput] = useState("");
  const add = async (id) => {
    await setDoc(doc(db, "Projects", id), {
      ProjectType: textInput,
    });
  };
  return (
    <div>
      <InputBox>
        <CenterBlock>
          <form action="/action_page.php">
            <label for="fname">Project Type : </label>
            <Input
              type="text"
              id="project_type_input"
              name="project_type_input"
              onChange={(e) => {
                e.preventDefault();
                setTextInput(e.target.value);
              }}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                console.log(textInput);
                add(textInput);
                document.getElementById("project_type_input").value = "";
              }}
            >
              +
            </Button>
          </form>
        </CenterBlock>
      </InputBox>
    </div>
  );
}

export default ProjectTypeBuilder;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  background-color: #2a9d8e;
  width: 100%;
  height: 50px;
  border: 3px solid #264653;
  border-radius: 5px;
  line-height: 45px;
`;
const Button = styled.button`
  cursor: pointer;
  border: 1px solid white;
  font-size: 16px;
`;
const Input = styled.input`
  border: 1px solid white;
`;
const CenterBlock = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
