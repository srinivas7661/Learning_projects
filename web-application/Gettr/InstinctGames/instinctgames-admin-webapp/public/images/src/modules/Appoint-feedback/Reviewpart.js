import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Review from './Review';
function Appcontain() {
  const Content = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-left: 30px;
    @media(max-width:850px){
      padding-right:50px;
    }
  `;
  const Header = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;

    overflow: hidden;
    margin-left: 30px;
    @media (max-width: 768px) {
      display: none;
    }
  `;

  const Hr = styled.hr`
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 1;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    @media (max-width: 768px) {
      display: none;
    }
  `;

 

  const InputIcon = styled.img.attrs((props) => ({
    src: props.path,
  }))`
    position: absolute;
    top: 6px;
    left: 160px;
    width: 15px;
  `;
  const InputDiv = styled.div`
    position: relative;
    border: 0.3px solid var(--unnamed-color-acacac);
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: #00000012;
    margin-top: 20px;
    border: 5px;
    opacity: 1;
  `;

  const Input = styled.input.attrs((props) => ({
    type: "text",
    size: props.size || "0em",
  }))`
    border-radius: 6px;
    box-shadow: 0px 4px 15px #00000012;

    border: 0px solid #acacac;

    opacity: 1;

    padding: 5px;
    font-size: 13px;
    padding-left: 10px;

    @media (max-width: 768px) {
      margin: 0 20px 0 20px;
    }
  `;

  const Select = styled.select`
    display: none;
    @media (max-width: 768px) {
      display: block;
      background: white;
      color: #5c4b75;
      font: normal normal bold 16px/22px Nunito;
      padding-left: 5px;
      border-radius: 6px;
      border: 0px;
      box-shadow: 0px 4px 15px #00000012;
      height: 33px;
      margin-left: 8px;
      head &:focus-visible {
        outline: none;
      }

      option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 9px;
        padding: 0px 2px 1px;
        border-color: white;
        width: 50px;
      }
    }
  `;

  const NavUnlisted = styled.ul`
    display: flex;
    padding: 0;

    a {
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }

    li {
      
      text-align: left;
      font: normal normal normal 16px/22px Nunito;

      color: #5c4b75;
      opacity: 1;

      margin-right: 5rem;

      position: relative;
      list-style: none;
    }

    .current {
      li {
        padding-bottom: 10px;
        border-bottom: 3px solid #5c4b75;
  
        panding-bottom: 4px;
        border-radius: 2px;
        opacity: 1;
        width: 138px;
        text-align: center;
      }
    }
  `;

  return (
    <Content>
      <Header>
        <NavUnlisted>
          <NavLink to="/appointment" exact activeclassName="current" >
            <li>Appointments</li>
          </NavLink>
          <NavLink to="/feedback" exact activeClassName="current" >
            <li>Feedback</li>
          </NavLink>
        </NavUnlisted>
      </Header>
      <Hr />

      <Select>
        <option value="" hidden>
          Appointments &emsp;
        </option>
        <option value="1">Feedback</option>
      </Select>
      <InputDiv>
        <Input placeholder="Search" size="2em" />
        <InputIcon path="images/search.svg"></InputIcon>
      </InputDiv>
      <Review/>
      
    </Content>
  );
}

export default Appcontain;
