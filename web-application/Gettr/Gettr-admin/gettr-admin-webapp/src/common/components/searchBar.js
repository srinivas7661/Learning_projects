import styled from "styled-components";

const Search = styled.div`
  padding: 0 20px;
  width: 349px;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "0px"};
  img {
    width: 20px;
    height: 20px;
  }
  input {
    width: calc(100% - 20px);
    border: none;
    &:focus {
      border: none;
      outline: none;
      caret-color: #2a2a2a;
    }
    &::-webkit-input-placeholder {
      font: 500 16px/22px var(--root-font);
      color: #dadada;
    }
    &:active {
      outline: none;
    }
  }
`;
export default function SearchBar({ marginBottom }) {
  return (
    <Search marginBottom={marginBottom}>
      <img src="/images/search.svg" alt="search" />
      <input type="text" placeholder="Search" />
    </Search>
  );
}
