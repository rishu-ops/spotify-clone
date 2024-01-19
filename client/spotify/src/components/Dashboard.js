import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { isActiveStyles, isnotActiveStyle } from '../utils/styles';
import { Routes , Route } from 'react-router-dom';
import DasboardHomescreeen from './DasboardHomescreeen';
import DashboardUser from './DashboardUser';
import DasboardSongs from './DasboardSongs';
import DashboardArtist from './DashboardArtist';
import DashboardAlbums from './DashboardAlbums';
import DashboardNeSong from './DashboardNeSong';

const Dashboard = () => {
  return (
    <div className='w-full ms:flex-col h-full flex flex-col items-center justify-center bg-primary main'>
      <Header />
      <div className="w-full  md:w-3/4 lg:w-2/3 xl:w-1/2 my-4 p-4 flex flex-col md:flex-row  items-center justify-between">
        <NavLink to="/dashboard/home" activeClassName={isActiveStyles} className="mb-2 md:mb-0">
          <IoHome className='text-2xl text-textColor' />
        </NavLink>
        <div className="md:ml-1">
          <NavLink to="/dashboard/users" activeClassName={isActiveStyles} className={isnotActiveStyle}>
            Users
          </NavLink>
        </div>
        <div className="md:ml-4">
          <NavLink to="/dashboard/songs" activeClassName={isActiveStyles} className={isnotActiveStyle}>
             Songs
          </NavLink>
          
        </div>
        <div className="md:ml-4">
          <NavLink to="/dashboard/artist" activeClassName={isActiveStyles} className={isnotActiveStyle}>
            Artist
          </NavLink>
        </div>
        <div className="md:ml-4">
          <NavLink to="/dashboard/albums" activeClassName={isActiveStyles} className={isnotActiveStyle}>
            Albums
          </NavLink>
        </div>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path='/home' element={<DasboardHomescreeen/>} />
          <Route path='/users' element={<DashboardUser/>} />
          <Route path='/songs' element={<DasboardSongs/>} />
          <Route path='/artist' element={<DashboardArtist/>} />
          <Route path='/albums' element={<DashboardAlbums/>} />
          <Route path='/newsongs' element={<DashboardNeSong/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
