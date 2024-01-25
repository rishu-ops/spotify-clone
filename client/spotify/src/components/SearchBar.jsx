import React from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBarContainer = styled.div`
  width: 70%;
  margin-bottom: 2rem; /* Adjust the margin as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .search-input-container {
    width: 100%;
    padding: 1rem; /* Adjust padding as needed */
    margin-top: 2rem; /* Adjust margin-top as needed */
    border-radius: 0.375rem; /* Replace with your rounded-md value */
    display: flex;
    align-items: center;
    gap: 1rem; /* Adjust the gap between icon and input */

    .search-icon {
      font-size: 1.5rem; /* Adjust as needed */
      color: #cbd5e0; /* Replace with your text-textColor color */
    }

    input {
      flex: 1; /* Take remaining width */
      height: 100%;
      background-color: transparent;
      color: black; /* Replace with your text-textColor color */
      font-size: 1rem; /* Adjust as needed */
      border: none;
      outline: none;

      ::placeholder {
        color: black; /* Replace with your placeholder color */
      }
    }
  }
`;

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <SearchBarContainer>
      <div className="search-input-container">
        <IoSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search here ...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </SearchBarContainer>
  );
};

export default SearchBar;
