import React, { useState, useEffect } from "react";
import Branch from "./Branch";
import { db } from "../../firebase";

import { doc, getDoc, setDoc } from "firebase/firestore";

import styled from "styled-components";
function Tree(props) {
  const [data, setData] = useState([]);
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
        // console.log("Document data:", docSnap.data());
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
    console.log(data);
  }, [data]);

  return (
    <Trunk>
      <Branch
        setData={setData}
        name={"root"}
        id={"root"}
        uid={props.uid}
        path={`${userCollectionPath}/root`}
        directory={`Tree/users/${props.uid}`}
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
