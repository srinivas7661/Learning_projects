import React from "react";
import { Container, Q1, CardHeader, Bold, Light, T2, Select, Card, ImageDiv } from "./cardss";

import styled from "styled-components";

const Q2 = () => {
  const Card = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 15px #00000012;
    border-radius: 7px;
    opacity: 1;
    padding-left:10px;
    margin-top:37px;
    @media(max-width:1025px){
      margin-top:7px;
    }

   
  `;

  const Image = styled.img`
  padding-left:4px;
  height:23px;

  `;
  const Img = styled.img`

  height:13px;
  


 
`;
  const Innerdiv = styled.div`
  display: flex;
  margin: 20px 20px 7px 26px;
`;
  const Innerdiv2 = styled.div`
  display: flex;
  padding-left: 44px;
  padding-bottom:7px;
 
`;
  const Imgouter = styled.div`
display:flex;
flex-direction:row;
margin-left: 3px;
margin-right:13px;`;
  const Light2 = styled.div`
  border: 0.3px solid var(--unnamed-color-acacac);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid  #dedcdc;
  border-radius: 5px;
  opacity: 1;
  height: 32px;
  width: 464px;
  margin-left: 10px;
  padding-top: 7px;
  padding-left: 7px;
`;

  const Light3 = styled.div`
  border: 0.3px solid var(--unnamed-color-acacac);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid  #dedcdc;
  border-radius: 5px;
  opacity: 1;
  height: 32px;
  width: 464px;
  margin-left: 10px;
  padding-top: 7px;
  padding-left: 7px;`

  const ImageDiv2 = styled.div`
  margin-left: 5px;
`;
  const Select = styled.select`
  
font: normal normal normal 12px/20px Nunito;
border: 0.3px solid var(--unnamed-color-acacac);
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 0.30000001192092896px solid  #dedcdc;
border-radius: 5px;
opacity: 1;
color:#3E344B;
padding-right: 53px;
margin-left: 16px;
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
  const Imgr = styled.img`
height:21px;
margin-top:1px;`;
  return (
    <Card>
      <ImageDiv>
        <Img className="grid" src="images/grid.svg"></Img>
      </ImageDiv>

      <CardHeader>
        <Q1 className="Q1css">
          <Bold>
            <text>Q2</text>
          </Bold>
          <Light className="Light">
            <T2 className='T2'> Lorem ipsum dolor amet, consectetur adipiscing elit?</T2>
          </Light>

          <Select className="selectdrop">
            <option value="" hidden>
              Dropdown &emsp;
            </option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
          </Select>
        </Q1>

        <Innerdiv className='innerdiv'>
          <ImageDiv2 className="repeat">
            <Imgr src="images/repeat.svg"></Imgr>
          </ImageDiv2>
          <Light2 className='Light2'>
            <T2 className='T2'>Enter an answer choice</T2>
          </Light2>
          <Imgouter className='imgouter'> <ImageDiv2>
            <Image className="plus" src="images/plus.svg"></Image>
          </ImageDiv2> <ImageDiv2>
              <Image className="plus" src="images/Subtraction.svg"></Image>
            </ImageDiv2></Imgouter>
        </Innerdiv>
        <Innerdiv2>

          <Light3 className="light4">
            <T2 className='T2'>Enter an answer choice</T2>
          </Light3>
          <Imgouter className='imgouter'> <ImageDiv2>
            <Image className="plus" src="images/plus.svg"></Image>
          </ImageDiv2> <ImageDiv2>
              <Image className="plus" src="images/Subtraction.svg"></Image>
            </ImageDiv2></Imgouter>
        </Innerdiv2>
        <Innerdiv2>

          <Light3 className="light4">
            <T2 className='T2'>Enter an answer choice</T2>
          </Light3>
          <Imgouter className='imgouter'> <ImageDiv2>
            <Image className="plus" src="images/plus.svg"></Image>
          </ImageDiv2> <ImageDiv2>
              <Image className="plus" src="images/Subtraction.svg"></Image>
            </ImageDiv2></Imgouter>
        </Innerdiv2>
        <Innerdiv2>

          <Light3 className="light4">
            <T2 className='T2'> Lorem ipsum dolor amet, consectetur adipiscing elit?</T2>
          </Light3>
          <Imgouter className='imgouter'> <ImageDiv2>
            <Image className="plus" src="images/plus.svg"></Image>
          </ImageDiv2> <ImageDiv2>
              <Image className="plus" src="images/Subtraction.svg"></Image>
            </ImageDiv2></Imgouter>
        </Innerdiv2>


      </CardHeader>
    </Card>
  );
};
export { Q2 };
