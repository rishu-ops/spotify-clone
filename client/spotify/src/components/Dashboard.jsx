import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import DashboardNewSong from "./DashboardNewSong";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
  <NavLink to="/dashboard/home" className="nav-link"><IoHome className="text-2xl text-textColor" /></NavLink>
  <NavLink to="/dashboard/user" className="nav-link">Users</NavLink>
  <NavLink to="/dashboard/songs" className="nav-link">Songs</NavLink>
  <NavLink to="/dashboard/artist" className="nav-link">Artist</NavLink>
  <NavLink to="/dashboard/albums" className="nav-link">Albums</NavLink>
     </div>


      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashBoardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbum />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;