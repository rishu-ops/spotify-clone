import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/Firebase.config";
import { useStateValue , Filters } from "../contex/stateprovider";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "./api";
import { actionType } from "../contex/reducer";
import { filterByLanguage, filters } from "../utils/supportFuntion"
import { IoMusicalNote } from "react-icons/io5";
import FilterButons from "./FilterButons";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNeSong = () => {

  const[songName , setSongName] = useState("");
  const[ { allArtist , allAlbums , languageFilter } , dispatch ] = useStateValue();
   
  useEffect(() => {
      if(!allArtist){
         getAllArtist().then(data => {
          
          dispatch({
             type : actionType.SET_ALL_ARTIST ,
             allArtist : data.artist
          })
        } 
           )
      }
      if(!allAlbums) {
          getAllAlbums().then(data =>  { 
            
          dispatch({
             type : actionType.SET_ALL_ALBUMS ,
             allAlbums : data.album
          })
        } 
        )
      }

  } , [])

  return (
    <div className='flex flex-col items-center justify-center p-4 border-gray-200 rounded gap-4'>
      <input className="w-full p-3 rounded-md text-base font-semibold text-textColor animate-none shadow-md  border-gray-300 " placeholder="type your song name "  
      onChange={(e) => setSongName(e.target.value)}></input>
       
        <div className="flex w-full justify-between flex-wrap  items-center gap-4 ">
          <FilterButons filterData={allArtist} flag={"artist"} />
          <FilterButons filterData={allAlbums} flag={"album"} />
          <FilterButons filterData={languageFilter} flag={"language"} />
          <FilterButons filterData={filters} flag={"category"} />
        </div>
     
      
    </div>
  )
}

export default DashboardNeSong
