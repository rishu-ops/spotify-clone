import React, { useEffect } from 'react'
import { useStateValue } from '../contex/stateprovider'
import { getAllUers , getAllAlbums , getAllSongs , getAllArtist} from './api'
import { actionType } from '../contex/reducer'
import { bgColors } from "../utils/styles";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";

export const DasboardCard = ({ icon , name , count}) => {
  return (
    
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-lg shadow-md bg-blue-500">
       {icon}
       <p className='text-xl text-textColor font-semibold'> {name} </p>
       <p className='text-xl text-textColor '> {count} </p> 
    </div>
 
  )
}

const DasboardHomescreeen = () => {
  const [ {  allUsers , allSongs , allArtist , allAlbums } , dispatch ] = useStateValue();
  
  useEffect(() => {
     
    if(!allUsers) {
      getAllUers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      })    
     }

     if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    }
  } , [])
   
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DasboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

      {/* prettier-ignore */}
      <DasboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

      {/* prettier-ignore */}
      <DasboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={allArtist?.length > 0 ? allArtist?.length : 0} />

      {/* prettier-ignore */}
      <DasboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  )
}

export default DasboardHomescreeen
