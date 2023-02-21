import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import useOnClickOutside from "./useOnClickOutside"
const SortBy = styled.div`
  width: ${props => props.width ? props.width :"227px"};
  height: 34px;
  background: ${props => props.color ? props.color : '#ffffff'};
  border-radius: 4px;
  opacity: 1;
  text-align: left;
  font: normal normal 600 14px/70px Barlow;
  display: flex;
  justify-content: space-evenly;
  color: #151e58;
  align-items: center;
  margin: 0px 0px 0px 32px;
  @media (min-width: 900px) and (max-width: 1050px) {
    margin: 0px 0px 0px 14px;

  }
  @media (min-width: 767px) and (max-width:1024px) {
    ${'' /* margin: 38px 0 0 0; */}
  }
  @media (max-width: 767px) {
    width: 100%;
    justify-content: space-between;
    padding: 0px 12px 0px 6px;

  }

`;

const DropDownContainer = styled.div`
  width: 30px;
  align-self: flex-start;
  z-index: 9;
`;
const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  float: right;
  margin-top: 9px;
`;
const DropDownList = styled.div`
  ${'' /* padding-left: 1em; */}
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font: normal normal medium 14px/17px Barlow;
  float: right;
  overflow: overlay;
  width: 226px;
  margin-top: 13px;
  margin-right:-9px;
  line-height: 36px;

`;

const ListItem = styled.div`
  list-style: none;
  cursor: pointer;
  ${'' /* height:45px; */}
  padding: 0px 0 0 20px;
  &:hover {
  ${'' /* color: gray; */}
  background-color: #F8F8F8 ;
  }
`;
const SearchIcon = styled.img`
  margin-right: 0.625rem;
  width: 14px;
  height: 14px;
`;


// const ref = useRef();

const DropDown = ({options, color, name, icon, width, handleInput, customMargin}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = (value) => () => {
      setSelectedOption(value);
      setIsOpen(false);
      handleInput && handleInput(value);
    };
    const ref = useRef();
    useOnClickOutside(ref, () => setIsOpen(false));

    
    return (
        <SortBy color={color} width={width} ref={ref} onClick={toggling} className={customMargin ? 'm-b-r-l-mob' : ""}>
        {/* <SearchIcon src="/images/sorting.svg" /> */}
      <div>
      {icon}
        {name} <span className="recently" >{selectedOption}</span>
      </div>
        <DropDownContainer>
          <ArrowIcon src="/images/arrow.svg" ></ArrowIcon>
          {isOpen && (
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option)}
                  key={Math.random()}>
                  {option} 
                </ListItem>
              ))}
            </DropDownList>
          )}
        </DropDownContainer>
      </SortBy>
    )
    
}


export default DropDown