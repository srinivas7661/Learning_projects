import React from "react";
import styled from "styled-components";
import { Select, Button, ButtonWrapper } from "./kitcss.js";
import { history } from "../../managers/history";
import { Row, Column } from "simple-flexbox";
import Q1 from "./Q1";

const Heading = styled.div`
;
  font: normal normal bold 18px/20px Nunito;
  color: #5c4b75;
  opacity: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  
`;
const SaveButton = styled.button`
width: 170px;
height: 45px;
background: #ACACAC 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
border-radius: 5px;
margin-right: 10px;
box-shadow: none;
border: none;
opacity: 1;
`;
const CancelButton = styled.button`
width: 170px;
height: 45px;
background: #F6CB83 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
border-radius: 5px;
margin-right: 10px;
box-shadow: none;
border: none;
opacity: 1;
`;
const PublishButton = styled.button`
width: 170px;
height: 45px;
background: #5C4B75 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
border-radius: 5px;
box-shadow: none;
border: none;
opacity: 1;
`;
const SubWrapper = styled.div`
  
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  padding-left: 50px;
  width: 100%;
  padding-top: 20px;
`;
const Kit = () => {
  const Col = styled.div`
 `;
  const P = styled.div`
  color: var(--unnamed-color-686868);
text-align: left;
font: normal normal normal 12px/14px Nunito;
letter-spacing: 0px;
color: #686868;
opacity: 1;`;
  return (
    <>
      <Row justifyContent="space-between" className="main-padding">
        <Col>
          <Heading>Kit Ordering Survey</Heading><P>Trigger Controlled, Inactive</P></Col>
        <ButtonWrapper>
          <SaveButton onClick={() => history.push("/manage-survey")}>Save as Draft</SaveButton>
          <CancelButton onClick={() => history.push("/manage-survey")}>Cancel</CancelButton>
          <PublishButton onClick={() => history.push("/manage-survey")}>Publish</PublishButton>
        </ButtonWrapper>
      </Row>
      <Q1 />
    </>
  );
};
export default Kit;










