import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
// import Table from "./sampleRequestTable";
import CustomTable from "../../common/components/customTable";
import { Row } from "simple-flexbox";
import CustomSelect from "../../common/components/custom-select";

const OuterDiv = styled.div`
  display: flex;
  overflow:hidden;
  flex-direction: row;

  margin-top: 30px;
  @media (max-width: 1025px) {
    flex-direction: column;
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media(max-width:1025px){
    margin-top:20px;
  }
`;

const BoardDiv = styled.div`
  border-radius: 7px;
  margin: 0 8px 0 8px;
  width: 165px;
  height: 100px;
  background-color: #fff4f3;
  @media(max-width:1025px) and (min-width:769px){
    margin:auto;
    width: 300px;
    height: 104px;
  }

  @media (max-width: 1025px) {
    width: 228px;
    height: 104px;
    margin-bottom: 15px;
  }
 
`;

const Boardfont = styled.div`
font: normal normal bold 14px/19px Nunito;
  padding-top: 20px;
  letter-spacing: 0px;
  text-align: center;
  opacity: 1;
  color: #7d84c0;
`;

const Heading = styled.div`
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  opacity: 1;
`;
const Input = styled.input`
  border-radius: 6px;
  box-shadow: 0px 4px 15px #00000012;
  border: 0.30000001192092896px solid #acacac;
  color: #5C4B75;
  opacity: 0.5;
  display: flex;
  padding: 5px;
  
  font: normal normal normal 14px/20px Nunito;
  color: #5C4B75;
  padding-left: 10px;
  width: 167px;
  @media (max-width: 1025px) {
    display: none;
  }
`;
const Tablediv = styled.div`
  margin-top:20px;
  @media (max-width: 1025px) {
    overflow-x: auto;
  }
`;
const InputIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 147px;
  width: 15px;
  @media (max-width: 1025px) {
    display: none;
  }
`;
const InputDiv = styled.div`
  position: relative;
  padding-right: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const SubWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
  padding: 50px 25px 25px 25px ;
`;
const Select = styled.select`
  background: white;

  width: 142px;
  line-height: 1;
  height: 36px;
  
  background: url(images/drop.svg) no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position-x: 120px;
  color:#5C4B75;
  // color: gray;
  padding-left: 10px;
  
  font: normal normal normal 14px/20px Nunito;
  border-radius: 6px;
  border: 0.30000001192092896px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
  height: 33px;
  margin-left: 8px;
  head &:focus-visible {
    outline: none;
  }
  &[attribute="value"]{
    color:red;
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

  @media (max-width: 1025px) {
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border-radius: 6px;
    border: 0.30000001192092896px solid #acacac;
    box-shadow: 0px 4px 15px #00000012;
    height: 33px;
    margin-left: 7px;
    width:158px;
    width: 150px;
    head &:focus-visible {
      outline: none;
    }
  }
`;


const ExportButton = styled.button`
background: 0 % 0 % no-repeat padding-box;
background: #f6cb83;
border-radius: 5px;
height: 35px;
color: #5c4b75;
width: 150px;
font: normal normal bold 16px/22px Nunito;

border: none;
@media(max-width: 1025px) {
  display: ${props => props.tab ? "block" : "none"};
}
@media(min-width: 1025px) {
  display: ${props => !props.tab ? "block" : "none"};
}
`;


const Number = styled.div`
  text-align: center;
  font: normal normal bold 30px/41px Nunito;
  letter-spacing: 0px;
  color: #3e344b;
  opacity: 1;
`;

const FiltersParent = styled.div`
display: flex;
width: 100%;
flex-flow: row wrap;
justify-content: space-between;
margin-top: 25px;
`

const SearchContainer = styled.div`
 background-color: #ffffff;
    border-radius: 3px;
    height: 45px;
    margin-right: 10px;
    border: 1px solid #ACACAC;
    box-shadow: 0px 4px 15px #00000012;
    display: flex;
    flex-flow: column;
    @media (max-width:1024px){
      display: none;
    }
`

const SearchBox = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  border-radius: 3px;
`;
const SearchInput = styled.input`
font: normal normal normal 15px/20px Nunito;

  color: #5C4B75;
  min-width: 150px;
  outline: none;
  border: none;
  border-radius:3px;
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


const SampleRequestComponent = (props) => {
  const { state } = props
  return (
    <>
      <Container>
        <Row className="justify-content-between">
          <Heading>Sample Requests</Heading>
          <ExportButton tab={true}>Export</ExportButton>
        </Row>
        <FiltersParent>
          <Row className="justify-space-between">
            <SearchContainer>
              <SearchBox>
                <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
                <Icon src="/images/Search.svg" />
              </SearchBox>
            </SearchContainer>
            <CustomSelect title="Sample Date" valueKey="subscription" options={state.subscriptionOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Sample Type" valueKey="stage" options={state.stageOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Zip Code" valueKey="pincode" options={state.zipCodeOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Status" valueKey="pincode" options={[]} handleChange={props.handleDropDownChange} />
          </Row>
          <ExportButton tab={false}>Export</ExportButton>

        </FiltersParent>
        {/* <Grid container={true} className="w-100-per" spacing={4}> */}
        <Grid container className="margin-top-25 data-grid-sample-request">

          <Grid item>
            <div>
              <Boardfont>
                Total Requests <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
          <Grid item>
            <div>
              <Boardfont>
                In Transit <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
          <Grid item>
            <div>
              <Boardfont>
                Sample Recieved <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
          <Grid item>
            <div>
              <Boardfont>
                Processing <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
          <Grid item>
            <div>
              <Boardfont>
                Report Generated <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
          <Grid item>
            <div>
              <Boardfont>
                Pickup Pending <br />
                <Number>120</Number>
              </Boardfont>
            </div>
          </Grid>
        </Grid>

        <Tablediv>
          <CustomTable
            tableHeading={""}
            columns={state.tableColumns}
            rows={state.sampleRequests}
            isCheckBoxVisible={true}
          />
        </Tablediv>
      </Container>
    </>
  );
};

export default SampleRequestComponent

