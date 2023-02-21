import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DropDownButtonsComponent from "./buttonDropDown";
import DropDownComponent from "./dropDown";

const FieldContainer = styled.div`
  padding: 13px;
  label {
    font: 600 12px/22px var(--root-font);
    margin-bottom: 6px;
  }
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

function AmountDropDown({ close }) {
  const [filedStates, setFieldState] = useState({
    minAmount: "",
    maxAmount: "",
  });
  const onSubmission = () => {
    close("");
  };
  const onReset = () => {
    setFieldState({
      minAmount: "",
      maxAmount: "",
    });
  };
  return (
    <DropDownComponent
      width={"225px"}
      height={"195px"}
      top={"50px"}
      left={"40%"}
    >
      <FieldContainer>
        <label htmlFor="min">Min Amount</label>
        <input
          id="min"
          type="text"
          value={filedStates.minAmount}
          onChange={(e) =>
            setFieldState((pre) => ({
              ...pre,
              minAmount: e.target.value,
            }))
          }
          placeholder="Enter Amount"
        />
        <label htmlFor="max">Max Amount</label>
        <input
          id="max"
          type="text"
          value={filedStates.maxAmount}
          onChange={(e) =>
            setFieldState((pre) => ({
              ...pre,
              maxAmount: e.target.value,
            }))
          }
          placeholder="Enter Amount"
        />
        <DropDownButtonsComponent onSubmit={onSubmission} onClear={onReset} />
      </FieldContainer>
    </DropDownComponent>
  );
}

export default AmountDropDown;
