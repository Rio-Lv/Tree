import React, { useState, useEffect } from "react";
import Branch from "./Branch";
import { db } from "../../firebase";

import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import styled from "styled-components";
function Tree(props) {
  // takes a collection name to start of
  // always starts at collection level
  const [name, setName] = useState(props.name);
  const [tree, setTree] = useState([]);
  const [seed, setSeed] = useState([]);

  const [userCollectionPath, setUserCollectionPath] = useState(
    `trees/users/${props.uid}/${props.uid}`
  );

  useEffect(() => {
    setUserCollectionPath(`trees/users/${props.uid}/${props.uid}`);
  }, [props.uid]);

  useEffect(() => {
    const defaultRoot = {
      id: "root",
      _instructions: "welcome to your tree!",
      expand:
        "clicking on the branch name expands it and gives you extra tools",
      addBranch:
        "try press that + button on the top right of the branch to add sub branches",
      images: "store your images here",
    };
    const checkRoot = async () => {
      const docRef = doc(db, userCollectionPath + "/root", "root");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // setDoc(docRef, defaultRoot, { merge: true });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setDoc(docRef, defaultRoot);
      }
    };
    checkRoot();
  }, [userCollectionPath]);

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  useEffect(() => {
    setTimeout(() => {
      console.log("seed", seed);
    }, 3000);
  }, [seed]);

  // collection in this document
  useEffect(() => {
    // collectionToArray("root");
  }, []);

  return (
    <Trunk>
      <Branch
        name={"root"}
        id={"root"}
        path={`${userCollectionPath}/root`}
        index={0}
      ></Branch>
    </Trunk>
  );
}

export default Tree;

const Trunk = styled.div`
  position: relative;
`;
const BuildTreeButton = styled.button`
  position: fixed;
  right: 50px;
  top: -30px;
`;
// What I Need to do
/* 
if(has collection) render list
*/
