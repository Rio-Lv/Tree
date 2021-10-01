import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import styled from "styled-components";

import BuildTools from "./BuildTools";

import EditTools from "./EditTools/EditTools";

import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

const spacing = 4;
const borderRadius = 7;

const neatMode = true;

const colors = [
  "#03588C",
  "#0396A6",
  "#04BFAD",
  "#F28963",
  "#F25C5C",
  "#03588C",
  "#0396A6",
  "#04BFAD",
  "#F28963",
  "#F25C5C",
  "#03588C",
  "#0396A6",
  "#04BFAD",
  "#F28963",
  "#F25C5C",
];

const colors2 = [
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
  const [listen, setListen] = useState(true);

  const [branches, setBranches] = useState([]);
  const [collectionEmpty, setCollectionEmpty] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [info, setInfo] = useState({});

  const directory = `${props.directory}/${props.name}`;

  //Check if parent is being deleted
  useEffect(() => {
    if (props.deleting) {
      setDeleting(props.deleting);
      setMe(true); //leave this, or many console log errors trust me
    }
    return null;
  }, [props.deleting]);

  useEffect(() => {
    props.setData((data) => {
      const newData = data;
      newData[directory] = info;
      return newData;
    });
    return null;
  }, [info]);

  // deactivate listeners after init
  useEffect(() => {
    setTimeout(() => {
      setListen(false);
    }, 3000);
    return null;
  }, []);

  //control the listener
  useEffect(() => {
    if (me === true) {
      setListen(true);
      // console.log("subbing");
    } else {
      setListen(false);
      // console.log("unsubbing");
    }
  }, [me]);

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
    if (listen === false) {
      unsub();
    } else {
      console.log("listening ", props.id);
    }
    return null;
  }, [listen]);

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
              <div
                key={`${newPath}_${doc.id}_branch_key_div`}
                style={whichMode()}
              >
                <Branch
                  listen={listen}
                  setData={props.setData}
                  uid={props.uid}
                  id={doc.id}
                  name={doc.id}
                  key={`${newPath}_${doc.id}_branch_key`}
                  path={newPath}
                  index={props.index + 1}
                  directory={directory}
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

      const listRef = ref(storage, directory);

      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            deleteObject(itemRef);
            console.log("deleting", itemRef);
          });
          deleteBranch(); // Deletes this branch if child branches are gone
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }
    if (listen === false) {
      unsubscribe();
    }
    return null;
  }, [props.path, props.id, props.index, deleting, collectionEmpty, listen]);

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
              uid={props.uid}
              show={me}
              spacing={spacing}
              borderRadius={borderRadius}
              info={info}
              id={props.id}
              path={props.path}
              deleting={deleting}
              directory={
                props.directory
                  ? `${props.directory}/${props.name}`
                  : `${props.name}`
              }
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
