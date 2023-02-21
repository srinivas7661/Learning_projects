import React from "react";
import styled from "styled-components";

const SearchBar = styled.div`
  padding: 0 20px;
  width: 349px;
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
      caret-color: #2a2a2a;
    }
    &::-webkit-input-placeholder {
      color: #dadada;
    }
    &:active {
      outline: none;
    }
  }
`;

function SearchComponent() {
  return (
    <SearchBar>
      <img src="/images/search.svg" alt="search" />
      <input type="text" placeholder="Search" />
    </SearchBar>
  );
}

export default SearchComponent;
