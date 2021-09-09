import React, { useState, useEffect } from "react";
import Branch from "./Branch";
import { db } from "../../firebase";

import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";

import styled from "styled-components";
function Tree(props) {
  // takes a collection name to start of
  // always starts at collection level
  const [name, setName] = useState(props.name);
  const [tree, setTree] = useState([]);
  const [seed, setSeed] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  useEffect(() => {
    setTimeout(() => {
      console.log("seed", seed);
    }, 3000);
  }, [seed]);

  const collectionToArray = (path) => {
    const q = query(collection(db, path));
    onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.id);
      });
      console.log(props.name + " collection : ", list);
    });
  };
  // collection in this document
  useEffect(() => {
    collectionToArray("root");
  }, []);

  return (
    <Trunk>
      <Branch name={"Projects"} id={"project"} path={"root"} index={0}></Branch>
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
