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

  const [branches, setBranches] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [noBranches, setNoBranches] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (props.deleting) {
      setDeleting(true);
    }
  }, [props.deleting]);

  // this is setting this document
  useEffect(() => {
    const unsub = onSnapshot(doc(db, props.path, props.id), (doc) => {
      if (doc.exists) {
        setInfo(doc.data());
      }
    });
    if (deleting) {
      unsub();
    }
    if (noBranches && deleting) {
      const deleteHere = async () => {
        await deleteDoc(doc(db, props.path, props.id));
      };
      deleteHere();
    }
  }, [props.path, props.id, noBranches, deleting]);

  // getting data from collection
  /*
        What to do if deleting?
        1. when a branch is deleting , tell all child components to set it self to deleting
        2. If collection size is 0 unsubscribe, set (self) noBranches to   true    
        3. If collection size is not 0, delete all documents in the collection
        4. Delete itself (the document that builds it) and unsub
  */
  useEffect(() => {
    const newPath = `${props.path}/${props.id}/${props.id}`; //path to its collection
    const q = query(collection(db, newPath), orderBy("name"));
    const unsubscribe = onSnapshot(q, (collection) => {
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

      // DELETING BRANCHES
      if (deleting) {
        unsubscribe();
        if (collection.size > 0) {
          // delete existing branches
          const deleteOne = async (path, id) => {
            await deleteDoc(doc(db, path, id));
          };
          collection.forEach((doc) => {
            deleteOne(newPath, doc.id);
          });
        } else {
          // Stop listening ---- no branches and under deletion
          setNoBranches(true);
        }
      } else {
        // CREATING BRANCHES
        if (collection.size > 0) {
          collection.forEach((doc) => {
            list.push(
              <div style={whichMode()}>
                <Branch
                  name={doc.id}
                  key={doc.id}
                  id={doc.id}
                  path={newPath}
                  index={props.index + 1}
                  deleting={deleting}
                ></Branch>
              </div>
            );
          });
          setBranches(list);
        } else {
          //No Branches
          setNoBranches(true);
        }
      }
    });
  }, [props, deleting, noBranches]);

  return (
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
          {deleting ? null : (
            <EditTools
              show={me}
              spacing={spacing}
              borderRadius={borderRadius}
              info={info}
              id={props.id}
              path={props.path}
            />
          )}
        </ColumnCenter>
        <ColumnRight>
          {branches}
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
              setDeleting(true);
            }}
          >
            +
          </DeleteDocument>
        ) : null}
      </Row>
    </Box>
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
