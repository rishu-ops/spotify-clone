import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

import { FaCrown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

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
      <NavLink to={"/"}>
        <img src="data:image/png;base64,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" className="w-16" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/musics'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Musics</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/premium'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/contact'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Contact</NavLink></li>
      </ul>

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerpolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member.{" "}
            <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favourites
            </p>
            <hr />
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;