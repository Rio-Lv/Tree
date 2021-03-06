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
  getDocs,
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
  const [collectionEmpty, setCollectionEmpty] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [info, setInfo] = useState({});

  //Check if parent is being deleted
  useEffect(() => {
    if (props.deleting) {
      setDeleting(props.deleting);
      setMe(true); //leave this, or many console log errors trust me
    }
    return null;
  }, [props.deleting]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, props.path, props.id), (doc) => {
      // console.log("unsub forming now");
      if (doc.exists) {
        setInfo(doc.data());
      }
      if (deleting) {
        unsub();
      }
    });
  }, []);

  // getting data from collection
  useEffect(() => {
    const newPath = `${props.path}/${props.id}/${props.id}`; //path to its collection
    const q = query(collection(db, newPath), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      (collection) => {
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
        // CREATING BRANCHES
        if (collection.size > 0) {
          collection.forEach((doc) => {
            list.push(
              <div style={whichMode()}>
                <Branch
                  id={doc.id}
                  name={doc.id}
                  key={doc.id}
                  path={newPath}
                  index={props.index + 1}
                  deleting={deleting}
                ></Branch>
              </div>
            );
          });
          setCollectionEmpty(false);
          setBranches(list);
        } else {
          // if collection is empty
          setCollectionEmpty(true);
        }
      },
      (error) => {
        return null;
      }
    );

    if (collectionEmpty) {
      unsubscribe();
    }
    if (deleting && collectionEmpty) {
      const deleteBranch = async () => {
        await deleteDoc(doc(db, props.path, props.id));
      };
      console.log("waiting to delete", props.id);

      deleteBranch(); // Deletes this branch if child branches are gone
    }
    return null;
  }, [props.path, props.id, props.index, deleting, collectionEmpty]);

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

              if (me && deleting === false) {
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
              deleting={deleting}
            />
          </ColumnCenter>

          <ColumnRight>
            {branches.length !== 0 ? <div>{branches}</div> : null}
            {deleting ? null : (
              <BuildTools
                index={props.index}
                name={props.name}
                setCollectionEmpty={setCollectionEmpty}
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
            )}

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

//notes

/*
      What to do if deleting?
      1. when a branch is deleting , tell all child components to set it self to deleting
      2. If collection size is 0 unsubscribe, set (self) noBranches to   true    
      3. If collection size is not 0, delete all documents in the collection
      4. Delete itself (the document that builds it) and unsub
    */
