import React, { useEffect, useState } from "react";
import styled from "styled-components";

import BuildTools from "./BuildTools";

import EditTools from "./EditTools";

import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

const spacing = 4;
const borderRadius = 7;

const neatMode = true;

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
  const [info, setInfo] = useState({});

  useEffect(() => {
    setDirectory(props.directory);
  }, [props.directory]);

  // this document
  useEffect(() => {
    onSnapshot(doc(db, props.path, props.id), (doc) => {
      if (doc.exists) {
        // console.log("Branch => Current data: ", doc.data());
        setInfo(doc.data());
      }
    });
  }, [props.path, props.id]);

  useEffect(() => {
    const newPath = `${props.path}/${props.id}/${props.id}`;
    const q = query(collection(db, newPath), orderBy("name"));
    onSnapshot(q, (collection) => {
      // console.log(newPath);
      // console.log("Branch => Collection size: ", collection.size);
      const list = [];
      const standard = { display: "flex", flexDirection: "row" };
      const neat = {};

      const whichMode = () => {
        if (neatMode) {
          return neat;
        } else {
          return standard;
        }
      };
      collection.forEach((doc) => {
        list.push(
          <div style={whichMode()}>
            <Branch
              name={doc.id}
              key={doc.id}
              id={doc.id}
              path={newPath}
              index={props.index + 1}
            ></Branch>
          </div>
        );
      });
      setBranches(list);
    });
  }, [props]);

  //close Add

  // useEffect(() => {
  //   setMe(props.Add);
  // }, [props.Add]);

  return (
    <div>
      <Box
        id={`${props.path}_${props.id}_branch`}
        style={{
          backgroundColor: `${colors[props.index]}`,
          zIndex: `${props.index}`,
        }}
      >
        <Row>
          <ColumnLeft
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
            id={props.colId}
            style={{
              margin: `${props.spacing}px`,
              borderRadius: `${props.borderRadius}px`,
              width: me ? "200px" : "0px",
            }}
          >
            <EditTools
              show={me}
              spacing={spacing}
              borderRadius={borderRadius}
              info={info}
              id={props.id}
              path={props.path}
            />
          </ColumnCenter>
          <ColumnRight>
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
              spacing={spacing}
            />

            {/* <TextInput /> */}
          </ColumnRight>
          {me ? (
            <DeleteDocument
              onClick={() => {
                // console.log(`Deleting: ${props.path}/${props.id}`);
                setDeleting(true);
                // setTimeout(() => {
                deleteDoc(doc(db, `${props.path}`, `${props.id}`));
                // }, 300);
              }}
            >
              +
            </DeleteDocument>
          ) : null}
        </Row>
      </Box>
    </div>
  );
}

export default Branch;
const Box = styled.div`
  /* position: relative; */

  margin-bottom: ${spacing}px;
  margin-right: ${spacing}px;
  border-radius: ${borderRadius}px;
  transition: 0.3s;
  overflow: hidden;
`;
const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  color: white;
  transition: 0.3s;
  /* border: 3px solid black; */
`;
// left ================================
const ColumnLeft = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  padding: ${spacing}px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  transition: 0.3s;
  /* border: 3px solid black; */
`;
const CentralBox = styled.div`
  position: relative;
  text-align: left;
  margin: auto;
  white-space: nowrap;
`;
const This = styled.div`
  transition: 0.5s;
  cursor: pointer;
  user-select: none;
`;
// center ===============================
const ColumnCenter = styled.div`
  /* border: 3px solid blue; */
  position: relative;
  background-color: white;
  border-radius: ${borderRadius}px;
  margin: ${spacing}px;
  transition: 0.3s;
  overflow: hidden;
`;
// right ================================
const ColumnRight = styled.div`
  /* border: 3px solid red; */

  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: ${spacing}px;
  margin-left: 0px;
  cursor: pointer;
  transition: 0.3s;

  color: black;
  overflow: hidden;
`;

const DeleteDocument = styled.div`
  position: absolute;
  right: -7px;
  bottom: -4px;
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
