import React , {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isnotActiveStyle , isActiveStyles } from '../utils/styles';
import {FaCrown} from 'react-icons/fa'

import { useStateValue } from '../contex/stateprovider';
import { getAuth } from 'firebase/auth';
import { app  } from '../config/Firebase.config';

import {motion} from 'framer-motion'

const Header = () => {

  const navigate = useNavigate();
  const [ user , dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);


  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
     <NavLink to={'/'}>
     <img
        src="https://e7.pngegg.com/pngimages/642/899/png-clipart-gaana-mobile-app-streaming-media-music-of-bollywood-application-software-android-text-trademark-thumbnail.png"
        alt="logo"
        className='w-16'
      />     
    </NavLink>      

    <ul className='flex items-center justify-center ml-7'>
    <li className='mx-5 text-lg'>
       <NavLink to={'/home'} activeClassName={isActiveStyles} className={isnotActiveStyle}>
          Home
        </NavLink>
      </li>
        <li className='mx-5 text-lg'>
         <NavLink to={'/musics'} activeClassName={isActiveStyles} className={isnotActiveStyle} >
             Musics 
        </NavLink>
         </li>
        <li className='mx-5 text-lg'> <NavLink to={'/premium'} activeClassName={isActiveStyles} className={isnotActiveStyle} > Premium </NavLink> </li>
        <li className='mx-5 text-lg'> <NavLink to={'/contact'} activeClassName={isActiveStyles} className={isnotActiveStyle} > Contact </NavLink> </li>
    </ul>
    
     <div 
      onMouseEnter={() => setIsMenu(true)}
      onMouseLeave={() => setIsMenu(false)}
     className="flex items-center ml-auto cursor-pointer
     gap-2 relative ">
        <img src={user?.user?.user.imageURL} className='w-12 min-w-[44px] object-cover rounded-full shadow-lg' alt=""  />
        
        <div className="flex flex-col">
            <p className='text-textColor hover:text-headingColor font-semibold' >{user?.user?.user?.name}</p>
            <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>premium Member < FaCrown className='text-sm-ml-1 text-yellow-500 ' /> </p>
            
        </div>
 
        {isMenu && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className='absolute z-10 p-4 top-10 right-0 w-275 gap-3 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'
  >
    <NavLink to={'userprofile'}>
      <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>
        Profile
      </p>
    </NavLink>
    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>
      My Favourites
    </p>
    <hr />
      
    {
  user?.user?.user?.role === 'admin' && (
    <>
      <NavLink to={'/dashboard/home'}>
        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>
          Dashboard
        </p>
      </NavLink>
    </>
  )
}


    <p
      className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'
      onClick={logout}
    >
      SignOut
    </p>
  </motion.div>
)}

  
     </div>
    </header>
  );
};

export default Header;
