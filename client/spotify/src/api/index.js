import axios from "axios";
import { useNavigate } from "react-router-dom";


const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    console.log("artist" , res.data.artist);
    return res.data.artist; 
  } catch (error) {
    return null;
  }
};

export const deleteArtistById = async (artistId) => {
  try {
    const res = await axios.delete(`${baseURL}api/artist/delete/${artistId}`);
    return res.data.artist;
  } catch (error) {
    console.error('Error deleting artist:', error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/deleteuser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    console.log("data", res.data.songs);
    return res.data.songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return null;
  }
};


export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteAlbumById = async (albumId) => {
  
  try {
    const res = await axios.delete(`${baseURL}api/albums/delete/${albumId}`);
    return res.data.album;
    
  } catch (error) {
    console.error('Error deleting album:', error);
    return null;
  }
};
export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artist/save`, { ...data });
    return  (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/songs/save`, { ...data });
    return (await res).data.songs;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};