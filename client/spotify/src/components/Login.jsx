import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import styled from 'styled-components';

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  
    return (
      <StyledFullScreenWrapper>
        <StyledVideo
          src='https://player.vimeo.com/external/311156914.sd.mp4?s=540775b35b49569577ffdb60cd6607e671aca427&profile_id=164&oauth2_token_id=57447761'
          type="video/mp4"
          autoPlay
          muted
          loop
        ></StyledVideo>
        <StyledOverlay>
          <StyledContentWrapper>
               <h1>"Melodies That Rock Your World"</h1>
            <StyledGoogleButton onClick={loginWithGoogle}>
              <FcGoogle size={20} />
              <StyledGoogleButtonText>Sign in with Google</StyledGoogleButtonText>
            </StyledGoogleButton>
          </StyledContentWrapper>
        </StyledOverlay>
      </StyledFullScreenWrapper>
    );
  
};



const StyledFullScreenWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  @media screen and (max-width: 700px) {     
      width: 100%;
      margin-left: -113px;
    }
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  max-width: 75%; /* Adjust the maximum width as needed */
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9); /* Adjust the background color and opacity */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

   h1{
     font-size: 20px;
 
     @media screen and (max-width: 700px) {
      
      margin-left: -28px;
      }
   }
`;

const StyledGoogleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50; /* Adjust the background color */
  color: #fff; /* Adjust the text color */
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  @media screen and (max-width: 700px) {
      
      margin-left: -28px;
}
  &:hover {
    background-color: #45a049; /* Adjust the hover background color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const StyledGoogleButtonText = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;

export default Login;