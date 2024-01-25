import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import styled from 'styled-components';

const FilterContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 2rem;
  }

  & .filters {

    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 640px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

    & p {
      cursor: pointer;
      font-size: 1rem;
      color: ${({ theme }) => theme.text};
      transition: font-weight 0.2s ease-in-out;

      &:hover {
        font-weight: 600;
      }

      &.font-semibold {
        font-weight: 600;
      }
    }
  

  & .filter-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    @media (max-width: 640px) {
      margin-top: 1rem;
      flex-wrap: wrap;
    }
  }
`;

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data  });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data?.album });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };
  return (
    <FilterContainer>
      <div className="filters">
        {filters?.map((data , index) => (
          <p
            key={index}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } cursor-pointer`}
          >
            {data.name}
          </p>
        ))}
      </div>

      <div className="filter-buttons">
        <FilterButtons filterData={artists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />

        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={clearAllFilter}
        >
          <MdClearAll className="text-textColor text-xl cursor-pointer" />
        </motion.i>
      </div>
    </FilterContainer>
  );
};

export default Filter;