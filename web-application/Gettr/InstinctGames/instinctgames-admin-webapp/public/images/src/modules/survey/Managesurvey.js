import React from "react";
import styled from "styled-components";
import { Button, ButtonWrapper } from "./Managecss";
import CustomTable from "../../common/components/customTable";

import Addsurvey from "./Addsurvey";
import { CustomizedDialog } from "./Addsurvey";

const Heading = styled.div`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  
`;
const SubWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
`;
const SearchContainer = styled.div`
    display:flex;
    flex-flow:row nowrap;
    background-color: #ffffff;
    border-radius: 3px;
    margin-right: 10px;
    height: 35px;
    // width: 100px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 15px #00000012;
`;
const SearchBox = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items:center;
  flex-flow: row nowrap;
  height: 100%;
  border-radius: 3px;
`;
const SearchInput = styled.input`
 font-size: 14px;
  min-width: 100px;
  outline: none;
  border: none;
  border-radius:3px;
  margin-left:5px;
  background-color:#ffffff;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  &:focus{
    outline:none;
    border:none;

  }
  &::placeholder {
    color: #5C4B75;
    opacity:0.5;
}
`;
const Icon = styled.img`
  height: 13px;
  width: 13px;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 10px;
`;
const Manage = (props) => {
  const { state } = props
  return (
    <>
      <Container>
        <SubWrapper>
          <Heading className="manage">Manage Survey</Heading>

          <ButtonWrapper className="addsurvey">
            <Addsurvey />
          </ButtonWrapper>
        </SubWrapper>
        <div className="display-none display-block-tab">
          <div className="display-flex margin-right-40-px w-100-px">
            <SearchContainer>
              <SearchBox>
                <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
                <Icon src="/images/Search.svg" />
              </SearchBox>
            </SearchContainer>
          </div>
        </div>

        <div className="margin-top-25">
          <CustomTable className='style'
            tableCellWidth="30%"
            columns={props.state.surveyColumns}
            rows={props.state.surveyList}
          ></CustomTable>
        </div>
      </Container>
    </>
  );
};
export default Manage;
