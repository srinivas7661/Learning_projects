import React from 'react';
import styled from "styled-components";


const SelectContainer = styled.div`
  display: flex;
  margin-right: 10px;
  color: #5C4B75;
  box-shadow: 0px 4px 15px #00000012;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-items: center;
  min-width: fit-content;
`;
const SelectOption = styled.select`
  height: 100%;
  min-width:50px;
  padding-right: 30px;
  margin: 0px 0px 0px;
  border-radius: 3px;
  border: none;
  background-color: #fff;
  font: normal normal normal 15px/20px Nunito;
  color: #5C4B75;
  font-size: 12px;
  outline: none;
  font-weight: bold;
  text-align-last: right;
   background: url(images/drop.svg) no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position-x: 25px;
`;
const SelectOption2 = styled.select`
  height: 100%;
  min-width:50px;
  padding-right: 30px;
  margin: 0px 0px 0px;
  border-radius: 3px;
  border: none;
  background-color: #fff;
  font: normal normal normal 15px/20px Nunito;
  color: #5C4B75;
  font-size: 12px;
  outline: none;
  font-weight: bold;
  text-align-last: right;
   background: url(images/drop.svg) no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position-x: 65px;
`;
const FilterLabel = styled.div`
  font-size: 10px;
  font: normal normal normal 15px/20px Nunito;
  color: #5C4B75;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  flex-flow: column nowrap;
  display: flex;
  opacity: 0.5;
`;
const CustomSelect = (props) => {

  return (
    <SelectContainer>
      <FilterLabel htmlfor={props.title}>{props.title}</FilterLabel>
      <SelectOption id={props.title} onChange={(event) => props.handleChange(event.target.value, props.valueKey)}>
        <option value={"all"}>{"All"}</option>
        
        {props.options && props.options.length ? props.options.map((item, index) => {
          return (
            <option key={index} value={item.value}>{item.name}</option>
          )
        }) : ""}
      </SelectOption>
    </SelectContainer>
  )
}
const CustomSelect2 = (props) => {

  return (
    <SelectContainer>
      <FilterLabel htmlfor={props.title}>{props.title}</FilterLabel>
      <SelectOption2 id={props.title} onChange={(event) => props.handleChange(event.target.value, props.valueKey)}>
        <option value={"This Month"}>{"This Month"}</option>
        
        {props.options && props.options.length ? props.options.map((item, index) => {
          return (
            <option key={index} value={item.value}>{item.name}</option>
          )
        }) : ""}
      </SelectOption2>
    </SelectContainer>
  )
}

export {CustomSelect,CustomSelect2}