import React from "react";
import {
  Container,
  Q1,
  CardHeader,
  Bold,
  Light,
  T2,
  Image,
  Select,
  
  ImageDiv,
} from "./cardss";
import { Right } from "./Rightcard";
import styled from "styled-components";
import { Q2 } from "./Q2";

const Card1 = () => {
  const Card = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 15px #00000012;
  border-radius: 7px;
  opacity: 1;
 margin-top:8px;
 padding-left:10px;

`;
  return (
    <Card>
      <ImageDiv>
        <Image className="grid" src="images/grid.svg"></Image>
      </ImageDiv>

      <CardHeader>
        <Q1>
          <Bold>
            <text>Q3</text>
          </Bold>
          <Light className='Light'>
            <T2  className='T2'> Lorem ipsum dolor amet, consectetur adipiscing elit?</T2>
          </Light>

          <Select  className="select">
            <option value="" hidden>
            Short Answer &emsp;
            </option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
          </Select>
        </Q1>
      </CardHeader>
    </Card>
  );
};


export default Card1;