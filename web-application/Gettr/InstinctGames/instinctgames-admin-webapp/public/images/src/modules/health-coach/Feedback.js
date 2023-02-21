import React from "react";
import styled from "styled-components";
import { Select, Select2, Button, ButtonWrapper } from "./Element";
import CustomTable from "../../common/components/customTable";
import CustomSelect from "../../common/components/custom-select";
// import PendingTable from "./PendingTable";
import { history } from "../../managers/history";
import Invite from "./invite";

import Table2 from "./feed-back";
import PendingTable from "./PendingTable";

const Heading = styled.div`
  margin-bottom: 20px;

  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  opacity: 1;
  // @media (max-width: 768px) {
  //   margin: 0 20px 0 20px;
  // }
`;
const Input = styled.input`
  border-radius: 6px;

  border: 0.30000001192092896px solid #acacac;

  opacity: 1;
  

  padding: 5px;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #5C4B75;
  height:34px;
  padding-left: 10px;
  width:189px;
  // @media (max-width: 768px) {
  //   margin: 0 20px 0 20px;
  // }
`;
const Tablediv = styled.div`
  margin-right: 40px;

  // @media (max-width: 768px) {
  //   margin: 20px;
  // }
`;
// const InputIcon = styled.img.attrs((props) => ({
//   src: props.path,
// }))`
//   position: absolute;
//   top: 9px;
//   left: 160px;
//   width: 15px;
// `;
const InputIcon = styled.img`
  position: absolute;
  top: 9px;
  left: 160px;
  width: 15px;
`;
const InputDiv = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 1040px) {
    margin-top: 20px;
  }
`;
const SubWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  padding: 50px 30px 30px 30px;
  width: 100%;
  min-height:100vh ;
  height: 100%;
  @media(max-width:1025px){
    padding-left:20px;
    padding-right:20px;
  }
`;
const SearchContaner = styled.div`
  background-color: #ffffff;
    border-radius: 5px;
    height: 45px;
    width: 238px;
    margin-right: 10px;
    border: 0.30000001192092896px solid #ACACAC;
    box-shadow: 0px 4px 15px #00000012;
`;
const SearchBox = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  border-radius: 5px;
`;
const SearchInput = styled.input`
font: normal normal normal 15px/20px Nunito;

color: #5C4B75;
  min-width: 150px;
  outline: none;
  border: none;
  border-radius:5px;
  margin-left:5px;

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
  height: 17.97px;
  width: 17.97px;
  display: flex;
  margin-right: 10px;
  flex-flow: column nowrap;
  margin-top: 10px;
`;


const Feedback = (props) => {


  const { state } = props
  return (
    <Container>
      <SubWrapper className="buttonwrap m20">
        <Heading>Health Coaches</Heading>
        <ButtonWrapper className="display-none display-flex-tab">
          <Button className="border-radius-3-px">Export</Button>
          {/* <Button primary className="border-radius-3-px" onClick={<Invite />}>invite</Button> */}
          <Invite />
        </ButtonWrapper>
      </SubWrapper>
      <Wrapper className="wrap">
        <SubWrapper className="search">
          <SearchContaner>
            <SearchBox>
              <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
              <Icon src="/images/Search.svg" />
            </SearchBox>
          </SearchContaner>
          <CustomSelect title="Specializations" valueKey="specializations" options={state.specializationsOptions} handleChange={props.handleDropDownChange} />
          <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
        </SubWrapper>
        <div className="display-block display-none-web">
          <ButtonWrapper >
            <Button className="border-radius-3-px">Export</Button>
            {/* <Button primary className="border-radius-3-px">invite</Button> */}
            <Invite />
          </ButtonWrapper>
        </div>
      </Wrapper>
      {/* <PendingTable />
        <Table2 /> */}
      <div className="margin-top-25">
        <CustomTable className='style'
          tableHeading={"Pending"}
          columns={props.state.pendingColumns}
          rows={props.state.pendingList}
          isCheckBoxVisible={true}
          headerBorder={true}
        ></CustomTable>

        <CustomTable classname='style'
          tableHeading={"Confirmed"}
          columns={props.state.confirnmedColumns}
          rows={props.state.confirnmedList}
          isCheckBoxVisible={true}
          headerBorder={true}
        />
      </div>
    </Container>
  );
};
export default Feedback;
