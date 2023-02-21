import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DropDownComponent from "./dropDown";
import DropDownButtonsComponent from "./buttonDropDown";

const FieldContainer = styled.div`
  padding: 13px;
  label {
    font: 600 12px/22px var(--root-font);
    margin-bottom: 6px;
  }
  input[type="date"] {
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

function TimeStampDropDown({ close }) {
  const [datePick, setDatePick] = useState({
    from: "",
    to: "",
  });
  const onSubmission = () => {
    close("");
  };
  const onReset = () => {
    setDatePick({
      from: "",
      to: "",
    });
  };
  return (
    <DropDownComponent
      width={"225px"}
      height={"195px"}
      top={"50px"}
      left={"80%"}
    >
      <FieldContainer>
        <label htmlFor="from">From</label>
        <input
          id="from"
          type="date"
          value={datePick.from}
          onChange={(e) =>
            setDatePick((pre) => ({
              ...pre,
              from: e.target.value,
            }))
          }
          placeholder="dd/mm/yy"
        />
        <label htmlFor="to">To</label>
        <input
          id="to"
          type="date"
          value={datePick.to}
          onChange={(e) =>
            setDatePick((pre) => ({
              ...pre,
              to: e.target.value,
            }))
          }
          placeholder="dd/mm/yy"
        />
        <DropDownButtonsComponent onSubmit={onSubmission} onClear={onReset} />
      </FieldContainer>
    </DropDownComponent>
  );
}

export default TimeStampDropDown;
