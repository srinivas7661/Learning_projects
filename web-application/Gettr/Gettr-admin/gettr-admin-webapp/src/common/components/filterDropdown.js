import React from "react";
import styled from "styled-components";

const Filter = styled.div`
  padding: 0 20px;
  width: 120px;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  > span {
    font: 400 14px/22px var(--root-font);
    color: #000000;
    &:last-of-type {
      font: 700 14px/22px var(--root-font);
    }
  }
  > img {
    width: 24px;
    height: 24px;
    &:last-of-type {
      margin-left: auto;
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
  }
`;
const FilterDropDown = () => {
  return (
    <Filter>
      <span>Filter :</span>
      <span>ALL</span>
    </Filter>
  );
};

export default FilterDropDown;
