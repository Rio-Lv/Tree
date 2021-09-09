import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectTypeBuilder from "./ProjectTypeBuilder";
import ProjectTypeBlock from "./ProjectTypeBlock";
import { db } from "../../../firebase";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";

function ProjectTypes() {
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    const createTypeBlocks = () => {
      const q = query(collection(db, "Projects"));
      onSnapshot(q, (querySnapshot) => {
        const newBlocks = [];
        querySnapshot.forEach((doc) => {
          //   console.log(doc.id, " => ", doc.data());
          newBlocks.push(<ProjectTypeBlock id={doc.id} />);
        });
        setBlocks(newBlocks);
      });
    };
    createTypeBlocks();
  }, []);

  return (
    <TypesBox>
      {blocks}

      <ProjectTypeBuilder />
    </TypesBox>
  );
}

export default ProjectTypes;
const TypesBox = styled.div`
  position: relative;
  width: 400px;
  height: auto;
  color: white;
  text-align: center;
`;
