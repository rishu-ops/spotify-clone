import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config/firebase.config";

import { getAllSongs, validateUser } from "./api";

import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Loader from "./components/Loader";
import MusicPlayer from "./components/MusicPlayer";
import UserProfile from "./components/UserProfile";
import styled from "styled-components";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 320px; /* Set a minimum width for smaller screens */
`;

const FixedContainer = styled.div`
  width: 100%;
  max-width: 700px; /* Set the maximum width for larger screens */
  height: 6rem;
  position: fixed;
  bottom: 0;
  
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
   
  @media (min-width: 768px) {
    max-width: 80%; /* Adjust the max-width for larger screens */
    
  }

`;

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    <AnimatePresence>
       <MainContainer>
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
              <Loader />
            </div>
          ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
                 <FixedContainer>
                 <MusicPlayer />
                 </FixedContainer>
          </motion.div>
        )}
         </MainContainer>
    </AnimatePresence>
  );
}

export default App;