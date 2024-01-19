import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { app } from './config/Firebase.config'
import { getAuth, validatePassword } from 'firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { validateUser } from './components/api'
import { useStateValue } from './contex/stateprovider'
import { actionType } from './contex/reducer'
import Dashboard from './components/Dashboard'

const App = () => {

  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [ user , dispatch] = useStateValue();

   
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth")
    === "true")

  useEffect(() => {

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
          })
          navigate('/')

        })
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false")
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login")
      }

    })

  }, [])

  return (

    <AnimatePresence  mode='wait'>
      <div className=' h-auto min-w-[680px] flex justify-center items-center '>
        <Routes>

          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/*' element={<Home />} />
          <Route path='dashboard/*' element={<Dashboard/>}></Route>

        </Routes>
      </div>
    </AnimatePresence>
  )
}

export default App
