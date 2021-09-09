import React, { useEffect, useState } from "react";
import styled from "styled-components";

import BuildTools from "./BuildTools";

import ColumnCenter from "./ColumnCenter";

import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const spacing = 4;
const borderRadius = 7;

const colors = [
  "#264653",
  "#2A9D8E",
  "#E9C46B",
  "#F3A261",
  "#E66F51",
  "#264653",
  "#2A9D8E",
  "#E9C46B",
  "#F3A261",
  "#E66F51",
];
// can add more colors to go for deeper layers
function Branch(props) {
  const [me, setMe] = useState(false);
  const [directory, setDirectory] = useState(props.directory);
  const [branchOut, setBranchOut] = useState(true);
  const [branches, setBranches] = useState([]);
  const [add, setAdd] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDirectory(props.directory);
  }, [props.directory]);

  // this document
  useEffect(() => {
    onSnapshot(doc(db, props.path, props.id), (doc) => {
      console.log("Branch => Current data: ", doc.data());
    });
  }, []);

  useEffect(() => {
    const newPath = `${props.path}/${props.id}/${props.id}`;
    const q = query(collection(db, newPath));
    onSnapshot(q, (collection) => {
      console.log(newPath);
      // console.log("Branch => Collection size: ", collection.size);
      const list = [];
      collection.forEach((doc) => {
        list.push(
          <Branch
            name={doc.id}
            key={doc.id}
            id={doc.id}
            path={newPath}
            index={props.index + 1}
          ></Branch>
        );
      });
      setBranches(list);
    });
  }, [props]);

  //close Add

  useEffect(() => {
    setMe(props.Add);
  }, [props.Add]);

  return (
    <div>
      <Box
        style={{
          backgroundColor: `${colors[props.index]}`,
          zIndex: `${props.index}`,
        }}
      >
        <Row>
          <ColumnLeft
            style={{
              minWidth: me ? "100px" : "50px",
            }}
            onClick={() => {
              // console.log(props.name);
              setAdd(false);
              if (me) {
                setMe(false);
              } else {
                setMe(true);
              }
            }}
          >
            <CentralBox>
              <This>{props.name}</This>
            </CentralBox>
          </ColumnLeft>
          <ColumnCenter
            show={me}
            spacing={spacing}
            borderRadius={borderRadius}
          />
          <ColumnRight
            style={{
              minWidth: me ? "70px" : "0px",
            }}
          >
            {/* {props.children} */}
            {branchOut ? branches : null}
            <BuildTools
              index={props.index}
              name={props.name}
              borderRadius={borderRadius}
              nextPath={`${props.path}/${props.id}/${props.id}`}
              id={props.id}
              path={props.path}
              color1={colors[props.index + 0]}
              color2={colors[props.index + 1]}
              color3={colors[props.index + 2]}
              show={me}
            />

            {/* <TextInput /> */}
          </ColumnRight>
        </Row>
        {me ? (
          <DeleteDocument
            onClick={() => {
              console.log(`Deleting: ${props.path}/${props.id}`);
              setDeleting(true);
              setTimeout(() => {
                deleteDoc(doc(db, `${props.path}`, `${props.id}`));
              }, 300);
            }}
          >
            +
          </DeleteDocument>
        ) : null}
      </Box>
    </div>
  );
}

export default Branch;
const Box = styled.div`
  position: relative;
  margin: ${spacing}px;
  border-radius: ${borderRadius}px;
  transition: 0.3s;
  overflow: hidden;
`;
const Row = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  color: white;
`;
// left ================================
const ColumnLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${spacing}px;
  padding-left: 15px;
  cursor: pointer;
  transition: 0.3s;
`;
const CentralBox = styled.div`
  position: relative;
  text-align: center;
  margin: auto;
`;
const This = styled.div`
  transition: 0.5s;
  cursor: pointer;
  user-select: none;
`;
// center ===============================

// right ================================
const ColumnRight = styled.div`
  position: relative;
  margin-bottom: -5px;
  overflow: hidden;
`;

const DeleteDocument = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-weight: 200;
  line-height: 32px;
  font-size: 30px;
  margin-right: 10px;
  box-sizing: border-box;
  transform: rotate(45deg);
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
  :hover {
    color: #000000;
  }
`;

//======= build tools
