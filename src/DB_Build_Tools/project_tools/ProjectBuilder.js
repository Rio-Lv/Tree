import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import ProjectTypes from "./project_type_builder/ProjectTypes";

function ProjectBuilder() {
  useEffect(() => {
    showProjects();
  }, []);
  return (
    <div>
      <Center>
        <Box>
          <First>
            <CenterText>PROJECT TYPES</CenterText>
          </First>
          <ProjectTypes />
        </Box>
      </Center>
    </div>
  );
}

export default ProjectBuilder;
const Center = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  width: 600px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  height: auto;
  background-color: #264653;
  border: 3px solid #264653;
  border-radius: 5px;
`;

const First = styled.div`
  position: relative;
  width: 200px;
  height: 100%;
  background-color: #264653;
  color: white;
  text-align: center;
`;

const CenterText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
`;

const showProjects = async () => {
  const querySnapshot = await getDocs(collection(db, "Projects"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
  });
};
const addProjects = async () => {
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
};
