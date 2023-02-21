import React from "react";
import styled from "styled-components";
import { Row } from "simple-flexbox";
import CustomTable from "../../common/components/customTable";
import CustomSelect from "../../common/components/custom-select";

const Container = styled.div`
  display: flex;
  // max-width: 1200px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
`;

const Title = styled.div`
  text-align: left;
  font: bold 20px/27px Nunito;
  color: #5c4b75;
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
  min-width: 200px;
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
  height: 17.97px;
  width: 17.97px;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 10px;
`;

const ExportBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6cb83 padding-box;
  width: 170px;
  height: 45px;
  border: none;
  padding: 0px 10px 0px 10px;
  border-radius: 3px;
  color: #5c4b75;
  font: normal normal bold 16px/22px Nunito;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const InviteBtn = styled.button`
  background: #5c4b75 padding-box;
  border: none;
  width: 120px;
  height: 30px;
  color: #fff4f3;
  border-radius: 3px;
  text-align: center;
  font: #fff4f3 bold 14px/19px Nunito;
  @media (min-width: 1025px) {
    display: none;
  }
`;

const ExportButton = styled.button`
  background: #f6cb83 padding-box;
  border: none;
  width: 120px;
  height: 30px;
  border-radius: 3px;
  text-align: center;
  font: normal normal bold 14px/19px Nunito;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const ExportRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  height: fit-content;
`;

const SearchContainer = styled.div`
    display:flex;
    flex-flow:row nowrap;
    background-color: #ffffff;
    border-radius: 3px;
    margin-right: 10px;
    height: 45px;
    width: 238px;
    border: 1px solid #acacac;
    box-shadow: 0px 4px 15px #00000012;
`;

const DoctorsList = (props) => {
  const { state } = props
  return (
    <Container>
      <Row justifyContent="space-between">
        <Title>Doctors</Title>
        <ExportRow>
          <ExportButton>Export</ExportButton>
          <InviteBtn>Invite</InviteBtn>
        </ExportRow>
      </Row>
      <Row className={"justify-content-between margin-top-25"}>
        <Row className="w-100-per">
          <div className="display-block display-none-web display-flex">
            <SearchContainer>
              <SearchBox>
                <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
                <Icon src="/images/search.svg" />
              </SearchBox>
            </SearchContainer>
            <CustomSelect title="Specialization" valueKey="specialization" options={state.specializationOptions} handleChange={props.handleDropDownChange} />
            <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
          </div>
          <div className="display-none display-block-tab display-flex">
            <div className="display-flex">
              <div className="w-150 display-flex margin-right-40-px">
                <SearchContainer>
                  <SearchBox>
                    <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
                    <Icon src="/images/Search.svg" />
                  </SearchBox>
                </SearchContainer>
              </div>
              <div className="w-200 margin-right-20-px">
                <CustomSelect title="Specialization" valueKey="specialization" options={state.specializationOptions} handleChange={props.handleDropDownChange} />
              </div>
              <div className="w-100-px margin-left-45-px">
                <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
              </div>
            </div>
          </div>
        </Row>
        <ExportBtn>Export</ExportBtn>
      </Row>

      <div className="margin-top-25">
        <CustomTable
          minWidth={"850px"}
          tableHeading={"Pending"}
          columns={props.state.tableColumns}
          rows={props.state.pendingDoctorList}
          isCheckBoxVisible={true}
          headerBorder={true}
        ></CustomTable>

        <CustomTable
          minWidth={"850px"}
          tableHeading={"Confirmed"}
          columns={props.state.tableColumns}
          rows={props.state.confirmDoctorList}
          isCheckBoxVisible={true}
          headerBorder={true}
        />
      </div>

    </Container>
  );
};

export default DoctorsList;
