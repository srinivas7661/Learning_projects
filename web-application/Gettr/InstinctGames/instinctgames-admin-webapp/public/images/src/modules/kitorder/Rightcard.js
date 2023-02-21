import React from "react";
import styled from "styled-components";

const Right = () => {
  const Card = styled.div` 
   background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 15px #00000012;
    border-radius: 7px;
    opacity: 1;
    margin-left: 12px;
    padding-left: 5px;
    padding-right: 5px;
`;
  const ImageDiv = styled.div`
  padding:2px
`;
  const Image = styled.img`
  height:15px;
  weight:18px;
  opacity: 1;`;

  return (
    <Card className='rightcard'>
      <ImageDiv className="rightcard">
        <Image className="Image" src="images/right.svg"></Image>
      </ImageDiv >
      <ImageDiv className="rightcard">
        <Image className="Image" src="images/add.svg"></Image>
      </ImageDiv>
      <ImageDiv className="rightcard">
        <Image className="Image" src="images/file.svg"></Image>
      </ImageDiv>
      <ImageDiv className="rightcard">
        <Image className="Image" src="images/delete.svg"></Image>
      </ImageDiv>
    </Card>




  );
};
export { Right };
