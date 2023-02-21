import React from "react";
import styled from "styled-components";

const Search = styled.div`
  padding: 0 20px;
  max-width: 349px;
  width: 100%;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 20px;
    height: 20px;
  }
  input {
    width: calc(100% - 20px);
    border: none;
    font: 400 16px/22px var(--root-font);
    &:focus {
      outline: none;
      border: none;
      caret-color: #2a2a2a;
    }
    &::-webkit-input-placeholder {
      color: #898a8d;
    }
    &:active {
      border: none;
      outline: none;
    }
  }
`;

const SearchComponent = ({ value, handleChange }) => {
  return (
    <Search>
      <img src="/images/searchIcon.svg" alt="search" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </Search>
  );
};

export default SearchComponent;
