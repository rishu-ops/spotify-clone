import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdAdd, MdPlayArrow, MdDelete, MdPause } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai';
import { getAllSongs } from './api';
import { useStateValue } from '../contex/stateprovider';
import { actionType } from '../contex/reducer';
import SongCard from './SongCard';


const DasboardSongs = () => {

  const [songFilter, setSongFilter] = useState("");
   const [{allSongs} , dispatch ] = useStateValue();

     useEffect(() => {
        if(!allSongs) {
         getAllSongs().then(data => {
           dispatch({
             type : actionType.SET_ALL_SONGS ,
             allSongs : data.songs ,
           })
         })   
        }

    } , [])
   
  const handleInputChange = (e) => {
    setSongFilter(e.target.value);
    // Perform any additional actions based on the input value if needed
  };

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
    <div className='w-full flex justify-center items-center gap-20'>
      <NavLink to={'/dashboard/newsongs'} className='flex items-center justify-center ph-4 py-3 border-rounded-md border-gray-300 hover:border-gray-500 '>
        <MdAdd />
      </NavLink>
      <input
        type="text"
        className='bg-primary w-52 px-4 py-2 border border-black rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base'
        placeholder='Search here'
        value={songFilter}
        onChange={handleInputChange}
      />
       
        <i>
          <AiOutlineClear className='text-3xl text-textColor cursor-pointer'/>
        </i>
     </div>

     <div className='relative w-full my-4 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold text-textColor ' > <span> Count :  </span> 
           {allSongs?.length}
          </p>
        </div>
       <Songcontainer data={allSongs}/>
     </div>
  </div>
  )
}

export const Songcontainer = ({data}) => {
   return  ( 
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
        {data?.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />          
          ))}
     </div>
     
     ) 
    }

export default DasboardSongs
