import React, { useEffect } from 'react'
import { app } from '../config/Firebase.config'

import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../contex/stateprovider'
import { validateUser } from './api'
import { actionType } from '../contex/reducer'

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [ user , dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        console.log(userCred);
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
    <div className='relative w-screen h-screen'>
       <video src='https://player.vimeo.com/external/311156914.sd.mp4?s=540775b35b49569577ffdb60cd6607e671aca427&profile_id=164&oauth2_token_id=57447761'  
        type = "video/mp4"
        autoPlay 
        muted
        loop
        className='w-full h-full object-cover'
       />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
             <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-md backdrop-blur-md flex flex-col items-center justify-center">
              <h1 className='text-2xl font-bold mb-2'>Bhas Bajna Chaiye Gana...</h1>

                  <h1 className='text-md mb-3'> Welcome to Gana, your go-to destination for an immersive musical experience. Dive into a world of limitless tunes, where every beat, melody, and rhythm is crafted to elevate your music journey. </h1>
                  
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay
                  cursor-pointer  hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
                  onClick={loginWithGoogle}>
                    <FcGoogle className='text-xl'/>  
                     
                     Sign In With Google
                  </div>  

                </div>  
        </div>  
      
    </div>
  )
}

export default Login
