import React from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  display: flex;
  margin-right: 10px;
  color: #5c4b75;
  box-shadow: 0px 4px 15px #00000012;
  height: 45px;
  border: 0.3px solid #acacac;
  border-radius: 5px;
  align-items: center;
  min-width: fit-content;
  padding-right: 10px;
  @media (max-width: 1024px) {
    height: 30px;
  }
`;
const SelectOption = styled.select`
  height: 100%;
  min-width: 20px;
  padding-right: 15px;
  border-radius: 3px;
  border: none;
  background-color: #fff;
  font: normal normal normal 15px/20px Nunito;
  color: #5c4b75;
  font-size: 12px;
  outline: none;
  font-weight: bold;
  text-align-last: right;
  background: url(images/drop.svg) no-repeat right #ffffff;
  -webkit-appearance: none;
  @media (max-width: 1024px) {
    min-width: 80px;
    height: 25px;
  }
`;
const FilterLabel = styled.div`
  font-size: 10px;
  font: normal normal normal 15px/20px Nunito;
  color: #5c4b75;
  cursor: pointer;
  margin: 0 20px 0 10px;
  flex-flow: column nowrap;
  display: flex;
  opacity: 0.5;
  @media (max-width: 1024px) {
    margin: 0px 10px 0px 10px;
  }
`;


const CustomSelect = (props) => {
  return (
    <SelectContainer>
      <FilterLabel htmlfor={props.title}>{props.title}</FilterLabel>
      <SelectOption
      // className="options"
        id={props.title}
        onChange={(event) =>
          props.handleChange(event.target.value, props.valueKey)
        }
      >
         
        <option value={"all"}>{"All"}</option>

        {props.options && props.options.length
          ? props.options.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              );
            })
          : ""}
      </SelectOption>
    </SelectContainer>
  );
};

export default CustomSelect;
