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
      console.log("props.info", props.info);
      const array = [];
      var id;
      var name;
      const orderedInfo = Object.keys(props.info)
        .sort()
        .reverse()
        .reduce((obj, key) => {
          obj[key] = props.info[key];
          return obj;
        }, {});
      for (const [key, value] of Object.entries(orderedInfo)) {
        if (key === "id") {
          id = <div>{editable(key, value)}</div>;
        } else if (key === "name") {
          name = <div>{editable(key, value)}</div>;
        } else {
          array.push(<div>{editable(key, value)}</div>);
        }
        console.log(`${key}: ${value}`);
      }
      array.sort((a, b) => (a.constructor.name > b.constructor.name ? 1 : -1));
      console.log(array[0]);
      array.splice(0, 0, id);
      array.splice(1, 0, name);
      setList(array);
    };
    pushItems();
  }, [props.info]);

  return (
    <Box style={{ margin: `${props.spacing}px` }}>
      <InfoBox
        style={{
          borderRadius: `${props.borderRadius}px`,
          opacity: props.show ? "100%" : "0%",
          // transform: `translate(0,  ${props.spacing}px)`,
          width: props.show ? "300px" : "0px",
          height: props.show ? "200px" : "0px",
        }}
      >
        <Info>{list}</Info>
      </InfoBox>
      <EditData style={{}}>
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
  margin: 10px;
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
`;
const Input = styled.input`
  /* height: 100%; */
  margin-top: 0px;
  transform: translate(0px, -1px);
  /* Align radii */
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  transition: 0.3s;
  border: 0px solid white;
  box-sizing: border-box;
  text-indent: 5px;
  :focus {
    outline: none;
  }
`;
