import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  button {
    width: calc(100% / 2);
    height: 27px;
    border: none;
    border-radius: 3px;
    font: 400 12px/22px var(--root-font);
    &:first-of-type {
      background: #298fff;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    color: #898a8d;
    background: #eaeaea;
  }
`;

function DropDownButtonsComponent({ onSubmit, onClear }) {
  return (
    <ButtonContainer>
      <button onClick={onSubmit}>
        <img src="/images/transparentFilter.svg" alt="filter" />
        <span>Filter</span>
      </button>
      <button onClick={onClear}>Clear</button>
    </ButtonContainer>
  );
}

export default DropDownButtonsComponent;
