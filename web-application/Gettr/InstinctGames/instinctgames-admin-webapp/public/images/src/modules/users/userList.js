import React from "react";
import { makeStyles } from "@material-ui/styles";
import CustomTable from "../../common/components/customTable";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import ExportDilaog from "./exportDialog";
import CustomSelect from "../../common/components/custom-select";


const SearchBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  flex-flow: row nowrap;
  height: 35px;
  border-radius: 5px;
  margin-right:12px;
  box-shadow: 0px 4px 15px #00000012 !important;
`;
const SearchInput = styled.input`
font: normal normal normal 15px/20px Nunito;
color: #5C4B75;
  width: 170px;
  outline: none;
  border: none;
  border-radius:5px;
  padding-left: 10px;
  display: flex;
  flex-flow: column nowrap;
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
  margin-right: 10px;
  flex-flow: column nowrap;
  margin-top: 10px;
`;


const ButtonContainer = styled.div`
  display: flex;
 
`;
const ExportBtn = styled.button`
  background: #f6cb83 0% 0% no-repeat padding-box;
  font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
  margin-left: 10px;
    width: 140px;
    border: none;
    height:38px;
    border-radius: 5px;
  
   
`;
const InviteBtn = styled.button`
  background: #5C4B75 0% 0% no-repeat padding-box;;
  margin-left: 10px;
    width: 140px;
    border: none;
    border-radius: 5px;
    font: normal normal bold 14px/22px Nunito;
    letter-spacing: 0px;
    color:#FFF4F3;
    height:38px;
`;
const FirstRow = styled.div`
justify-content:space-between;
display: flex;
flex-flow: row nowrap;
width:100%;
align-items: center;
`

const use = makeStyles(() => ({
  root: {

    padding: "10px 25px 25px 25px",

  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
  },
  "@media (max-width: 769px)": {
    container: {
      // margin:'40px 0px 0px 20px',
    },
  },
  iconButton: {
    padding: 10,
  },
  styleContainer: {
    display: "flex",
    width: "100%",
    flexFlow: "nowrap",
    justifyContent: "space-between",
  },

  styleSearch: {
    backgroundColor: "#ffffff",
    borderRadius: "3px",
    height: "35px",
    marginRight: "10px",
    border: "1px solid #ACACAC",
    boxShadow: "0px 4px 15px #00000012",
  },

  styleHeading: {
    font: 'normal normal bold 20px/27px Nunito',
    color: '#5C4B75',
  },
  searchDropDownContainer: {
    display: "flex",
    width: "100%",
    flexFlow: "nowrap",
    justifyContent: "space-between",
    marginTop: "25px",
  },
  tableComponenet: {
    width: "98%",
    marginTop: "30px",
    paddingTop: "1px",
    paddingBottom: "15px",
    boxShadow: "0px 4px 15px #00000012 !important",
  },
}));

export default function ClinicScreen(props) {
  const classes = use();
  const { state } = props

  return (
    <div className={classes.root}>
      <div className="margin-top-30-px">
        <FirstRow>
          <div className={classes.styleHeading}>Users</div>
          <ButtonContainer>
            {props.state.exortDialogOpen && <ExportDilaog click={props.exportDialog} />}
            <ExportBtn onClick={props.exportDialog}>
              Export
            </ExportBtn>

            <InviteBtn>
              Invite
            </InviteBtn>

          </ButtonContainer>
        </FirstRow>
      </div>
      <div className="margin-top-30-px">
        <Row className="justify-space-between w-100">
          <Row className="w-100">
            <Column >
              <SearchBox>
                <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
                <Icon src="/images/Search.svg" />
              </SearchBox>
            </Column>
            <CustomSelect title="Subscription" valueKey="subscription" options={state.subscriptionOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Stage" valueKey="stage" options={state.stageOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Zip Code" valueKey="pincode" options={state.zipCodeOptions} handleChange={props.handleDropDownChange} />
          </Row>
        </Row>
      </div>
      <div className="margin-top-30-px">
        <CustomTable
          minWidth={"1200px"}
          columns={state.tableColumns}
          rows={state.users}
          isCheckBoxVisible={true}
        />
      </div>
    </div>
  );
}
