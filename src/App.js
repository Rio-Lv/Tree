import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

import ProjectBuilder from "./DB_Build_Tools/project_tools/ProjectBuilder";
import Branch from "./DB_Build_Tools/Tree/Branch";
import Tree from "./DB_Build_Tools/Tree/Tree";

const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("user is signed out");
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      // console.log(user.displayName);
    }
  }, [user]);

  const GoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const GoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {/* <ProjectBuilder /> */}
      <DisplayArea>
        <Center>{user ? <Tree uid={user.uid} /> : null}</Center>
      </DisplayArea>
      <div style={{ position: "fixed" }}>
        {user ? <div style={{ color: "white" }}>{user.uid}</div> : null}
        <button onClick={() => GoogleSignIn()}>SignIn</button>
        <button onClick={() => GoogleSignOut()}>SignOut</button>
      </div>
    </div>
  );
}

export default App;

const Center = styled.div`
  margin-top: 50px;
  height: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const DisplayArea = styled.div`
  top: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: black;
`;
