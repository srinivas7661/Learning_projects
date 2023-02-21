import React, { useState } from "react";
import styled from "styled-components";
import DropDownButtonsComponent from "./buttonDropDown";
import DropDownComponent from "./dropDown";

const FieldContainer = styled.div`
  padding: 13px;
  > h3 {
    font: 700 14px/22px var(--root-font);
  }
  > input {
    border: 1px solid #e7e7e7;
    border-radius: 2px;
    width: 100%;
    padding-left: 14px;
    font: 400 12px/22px var(--root-font);
    &:focus {
      outline: none;
    }
    &::placeholder,
    &::-moz-placeholder {
      color: #898a8d;
    }
  }
  > ul {
    margin-top: 24px;
    list-style: none;
    padding-left: 0;
  }
`;

const TypeItem = styled.li`
  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 2px 14px 0;
  cursor: pointer;
  color: ${(props) => (props.active ? "#FFFFFF" : "#000000")};
  background-color: ${(props) => (props.active ? "#50555C" : "transparent")};
  font: 400 14px/22px var(--root-font);
`;

const typeData = ["All", "Transfer", "Redeem", "Reward", "Failed"];

function TypeDropDown({ close }) {
  const [fieldValue, setFieldValue] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const suggestedType = typeData.filter((item) =>
    item.toLowerCase().includes(fieldValue.toLowerCase())
  );
  const onSubmission = () => {
    close("");
  };
  const onReset = () => {
    setFilterValue("All");
    setFieldValue("");
  };
  return (
    <DropDownComponent
      width={"255px"}
      height={"322px"}
      top={"50px"}
      left={"28%"}
    >
      <FieldContainer>
        <h3>Search by Txn Type</h3>
        <input
          type="text"
          onChange={(e) => setFieldValue(e.target.value)}
          value={fieldValue}
          placeholder="Search"
        />
        <ul>
          {suggestedType.map((item) => (
            <TypeItem
              active={filterValue === item}
              key={item}
              onClick={() => {
                setFilterValue(item);
              }}
            >
              {item}
            </TypeItem>
          ))}
        </ul>
        <DropDownButtonsComponent onSubmit={onSubmission} onClear={onReset} />
      </FieldContainer>
    </DropDownComponent>
  );
}

export default TypeDropDown;
