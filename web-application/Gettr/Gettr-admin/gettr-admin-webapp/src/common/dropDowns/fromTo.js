import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DropDownComponent from "./dropDown";

import DropDownButtonsComponent from "./buttonDropDown";

const FieldContainer = styled.div`
  padding: 13px;
  input {
    border: 1px solid #e7e7e7;
    border-radius: 2px;
    width: 100%;
    padding-left: 14px;
    margin-bottom: 10px;
    font: 400 12px/22px var(--root-font);
    &:focus {
      outline: none;
    }
    &::placeholder,
    &::-moz-placeholder {
      color: #898a8d;
    }
  }
`;

function FromToDropDown({ id, close }) {
  const [searchValue, setSearchValue] = useState({
    [id]: "",
  });
  const onSubmission = () => {
    close("");
  };
  const onReset = () => {
    setSearchValue({
      [id]: "",
    });
  };
  return (
    <DropDownComponent
      width={"225px"}
      height={"101px"}
      top={"50px"}
      left={"56%"}
    >
      <FieldContainer>
        <input
          name={id}
          type="text"
          value={searchValue[id]}
          onChange={(e) =>
            setSearchValue({
              [id]: e.target.value,
            })
          }
          placeholder="Search by address"
        />
        <DropDownButtonsComponent onSubmit={onSubmission} onClear={onReset} />
      </FieldContainer>
    </DropDownComponent>
  );
}

export default FromToDropDown;
