import React, { useState, useEffect } from "react";
import styled from "styled-components";

function EditTools(props) {
  const [list, setList] = useState([]);

  const editable = (key, value) => {
    const uniqueKey = `${props.path}_${props.id}_${key}`;
    if (key === "id") {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>{key}:</div>
          <Input
            id={uniqueKey}
            key={uniqueKey}
            type="text"
            name={uniqueKey}
            defaultValue={value}
            readOnly
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
            }}
          ></Input>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>{key}:</div>
          <Input
            id={uniqueKey}
            key={uniqueKey}
            type="text"
            name={uniqueKey}
            defaultValue={value}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
            }}
          ></Input>
        </div>
      );
    }
  };

  useEffect(() => {
    console.log(props.info);
    const pushItems = () => {
      const array = [];
      for (const [key, value] of Object.entries(props.info)) {
        if (key === "id") {
          array.splice(0, 0, <div>{editable(key, value)}</div>);
        } else if (key === "name") {
          array.splice(1, 0, <div>{editable(key, value)}</div>);
        } else {
          array.push(<div>{editable(key, value)}</div>);
        }
        console.log(`${key}: ${value}`);
      }
      setList(array);
    };
    pushItems();
  }, [props.info]);

  return (
    <Box>
      <InfoBox
        style={{
          opacity: props.show ? "100%" : "0%",
          transform: `translate(0,  ${props.spacing}px)`,
        }}
      >
        <Info>{list}</Info>
      </InfoBox>
      <EditData
        style={{
          borderRadius: `${props.borderRadius}px`,
        }}
      >
        <img
          src="https://img.icons8.com/material-outlined/24/000000/edit--v4.png"
          alt=""
        />
      </EditData>
    </Box>
  );
}

export default EditTools;

const Box = styled.div`
  background-color: white;
  color: black;
`;

const InfoBox = styled.div`
  position: relative;

  box-sizing: border-box;
  /* border: 3px solid blue; */

  overflow: scroll;
  transition: 0.3s;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Info = styled.div`
  margin: 20px;
  margin-top: 10px;
  line-height: 24px;
  cursor: auto;
`;
const EditData = styled.div`
  position: absolute;
  right: -5px;
  bottom: 5px;
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
  /* background-color: black; */
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
  text-indent: 5px;
  :focus {
    outline: none;
  }
`;
