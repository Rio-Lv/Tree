import React from "react";
import styled from "styled-components";

function ColumnCenter(props) {
  return (
    <div>
      <Column
        style={{
          minWidth: props.show ? "200px" : "0px",
          height: props.show ? `calc(100% - ${props.spacing * 2}px)` : "0px",
          minHeight: props.show ? `200px` : "0px",
          margin: `${props.spacing}px`,
          borderRadius: `${props.borderRadius}px`,
        }}
      >
        <InfoBox
          style={{
            opacity: props.show ? "100%" : "0%",
            transform: `translate(0,  ${props.spacing}px)`,
          }}
        >
          <Info>
            <div>Title: cfdgsdfgdsfg</div>
            <div>Name: cat</div>
            <div>speciese: cats</div>
            <div>likes: cats</div>
            <div>cats: cats</div>
            <div>Title: cfdgsdfgdsfg</div>
            <div>Name: cat</div>
            <div>speciese: cats</div>
            <div>likes: cats</div>
            <div>cats: cats</div>
            <div>Title: cfdgsdfgdsfg</div>
            <div>Name: cat</div>
            <div>speciese: cats</div>
            <div>likes: cats</div>
            <div>cats: cats</div>
            <div>Title: cfdgsdfgdsfg</div>
            <div>Name: cat</div>
            <div>speciese: cats</div>
            <div>likes: cats</div>
            <div>cats: cats</div>
          </Info>
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
      </Column>
    </div>
  );
}

export default ColumnCenter;

const Column = styled.div`
  /* border: 3px solid blue; */
  position: relative;
  display: flex;
  flex-direction: column;

  margin-left: 0px;
  cursor: pointer;
  transition: 0.3s;

  background-color: #ffffff;
  color: black;
  overflow: hidden;
`;
const InfoBox = styled.div`
  position: absolute;
  width: 300px;
  height: 96%;
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
