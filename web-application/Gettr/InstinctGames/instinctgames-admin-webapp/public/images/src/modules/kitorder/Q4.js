import React from "react";
import { Q1, CardHeader, Bold, T2, Image, Select, ImageDiv } from "./cardss";
import { Right } from "./Rightcard";
import styled from "styled-components";
import { Q2 } from "./Q2";

const Card1 = () => {
  const Light = styled.div`
  border: 0.0px solid var(--unnamed-color-acacac);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #dedcdc;
  border-radius: 5px;
  opacity: 1;
  height: 33px;
  width: 390px;
  margin-left: 18px;
  padding-top: 7px;
  padding-left: 10px;
`;
  const Card = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 15px #00000012;
    border-radius: 7px;
    opacity: 1;
    margin-top:8px;
    padding-left:10px;

  `;
  const Select2 = styled.select`
  
font: normal normal normal 12px/20px Nunito;
border: 0.3px solid var(--unnamed-color-acacac);
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 0.30000001192092896px solid #ACACAC;
border-radius: 5px;
opacity: 1;
height:30px;
margin-left: 43px;
width:50px;
margin-bottom:9px;
color: #3E344B;
}
  
head
  &:focus-visible {
    outline:none;
  }

  option {
    color: var(--unnamed-color-3e344b);
    text-align: left;
    font: normal normal normal 12px/20px Nunito;
    letter-spacing: 0px;
    color: #3E344B;
    opacity: 1;
    
  }
`;
  const Container = styled.div`
  display: flex;
  flex-direction: column;
 
`;
  const P = styled.p`
color: var(--unnamed-color-3e344b);
text-align: left;
font: normal normal bold 15px/20px Nunito;
letter-spacing: 0px;
color: #3E344B;
opacity: 1;
margin-bottom:4px;
padding-left: 43px;
`;
  const Bottom = styled.div`
  display:flex;
  flex-direction-column;
 
  `;

  return (
    <Card>
      <ImageDiv>
        <Image className="grid" src="images/grid.svg"></Image>
      </ImageDiv>

      <CardHeader>
        <Q1>
          <Bold>
            <text>Q4</text>
          </Bold>
          <Light className='Light'>
            <T2 className='T2'> Lorem ipsum dolor amet, consectetur adipiscing elit?</T2>
          </Light>

          <Select className>
            <option value="" hidden>
              Star Rating &emsp;
            </option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
          </Select>

        </Q1>

      </CardHeader>

      < Container>
        <P >Scale</P>
        <Select2 className="select2">
          <option value="" hidden>
            S &emsp;
          </option>
          <option value="1">Audi</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
          <option value="4">Ford</option>
        </Select2>

      </Container>
    </Card>
  );
};

export default Card1;