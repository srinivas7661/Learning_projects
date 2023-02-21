import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import CustomTable from "../../common/components/customTable";
import CustomDialog from "../../common/components/common-dialog";
import {
  adminMemberSelect,
  AdminRoles,
  statusConstants,
} from "../../constants";

const ManageTeamsing = styled.div`
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  opacity: 1;
`;
const Checkbox = styled.input`
  height: 15px;
  width: 15px;
`;

const CheckboxLabel = styled.label`
  font: normal normal 13px/20px Nunito;
  color: #686868;
  display: inline;
  padding-left: 5px;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: #ffffff;
  border-radius: 3px;
  height: 45px;
  width: 238px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 15px #00000012;
`;


const SearchInput = styled.input`
  font-size: 14px;
  min-width: 150px;
  outline: none;
  border: none;
  border-radius: 3px;
  margin-left: 5px;
  background-color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
    border: none;
  }
  &::placeholder {
    color: #5c4b75;
    opacity: 0.5;
  }
`;
const Icon = styled.img`
  height: 17.97px;
  width: 17.97px;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 10px;
`;

const InputText = styled.input`
  width: 100%;
  min-width: 400px;
  height: 55px;
  background: #ffffff 0% 0% no-repeat padding-box;
  text-align: left;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #686868;
  border: 0.3px solid #acacac;
  border-radius: 5px;
  margin-top: 20px;
  padding-left: 10px;
`;
const AdminSelect = styled.select`
  background: white;
  width: 100%;
  min-width: 400px;
  line-height: 1;
  background: url(images/drop.svg) no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position: 95%;
  color: #5c4b75;
  padding: 0 10px;
  font: normal normal normal 14px/20px Nunito;
  border-radius: 6px;
  border: 1px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
  height: 55px;
  margin-top: 20px;
  ManageTeams &:focus-visible {
    outline: none;
  }
  &[attribute="value"] {
    color: red;
  }
  option {
    color: #5c4b75;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 9px;
    padding: 0px 2px 1px;
    border-color: white;
    width: 50px;
  }
`;

const RoleTitle = styled.div`
  text-align: left;
  font: normal normal bold 15px/20px Nunito;
  margin-top: 20px;
  letter-spacing: 0px;
  color: #7d84c0;
  opacity: 1;
`;
const ButtonWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;
const UpdateAndAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  border-color: ${(props) => (props.primary ? "#5C4B75" : "#F6CB83")};
  height: 45px;
  width: 300px;
  border: none;
  font: normal normal bold 16px/22px Nunito;
  border-radius: 5px;
`;
const LabelText = styled.p`
  text-align: left;
  font: normal normal bold 15px/20px Nunito;
  letter-spacing: 0px;
  color: #7d84c0;
  opacity: 1;
`;
const Text = styled.p`
  text-align: left;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  margin-left: 10px;
  color: #686868;
  opacity: 1;
`;
const TextContainer = styled.div`
  display: flex;
`;
const RadioLabel = styled.label`
  text-align: left;
  cursor: pointer;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #686868;
  margin: 0 0px 0px 10px;
`;
const RadioInput = styled.input`
  margin-left: 80px;
  height: 30px;
  border: 1px solid #5c4b75;
  color: #5c4b75;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 12px;
  height: 12px;
  padding: 1.5px !important;
  background-clip: content-box !important;
  border-radius: 50%;
  cursor: pointer;

  :checked {
    background: #5c4b78;
  }
  :focus {
    border: 1px solid #5c4b75;
  }
`;

const AddMemberButton = styled.button`
  background: 0 % 0 % no - repeat padding - box;
  background: #f6cb83;
  border-radius: 5px;
  height: 35px;
  color: #5c4b75;
  font: normal normal bold 16px / 22px Nunito;
  width: 160px;
  border: none;
  @media (max-width: 1025px) {
    display: ${(props) => (props.tab ? "block" : "none")};
  }
  @media (min-width: 1025px) {
    display: ${(props) => (!props.tab ? "block" : "none")};
  }
`;

const Container = styled.div`
  padding: 40px 40px 40px 40px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  @media (max-width: 1025px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

function ManageTeams(props) {
  const { handleChange, onSearchChange, state } = props;
  return (
    <Container>
      <div>
        <Row className="w-100-per justify-content-between align-items-center">
          <ManageTeamsing>Manage Team</ManageTeamsing>
          <AddMemberButton
            tab={true}
            onClick={() => handleChange("type", "add")}
          >
            Add Member
          </AddMemberButton>
        </Row>
        <Row className="w-100-per justify-content-between margin-top-25">
          <SearchContainer>
              <SearchInput
                placeholder="Search"
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <Icon src="/images/search.svg" />
          </SearchContainer>
          <AddMemberButton
            tab={false}
            onClick={() => handleChange("type", "add")}
          >
            Add Member
          </AddMemberButton>
        </Row>
        <div className="margin-top-25">
          <CustomTable
            tableCellWidth="25%"
            className="style"
            columns={state.teamColumns}
            rows={state.users}
          />
        </div>
      </div>
      <CustomDialog
        open={state.drawer}
        title={"Add Member"}
        handleClose={() => handleChange("drawer", false)}
      >
        {state.type == "add" ? AddMember(props) : UpdateMember(props)}
      </CustomDialog>
    </Container>
  );
}

function AddMember(props) {
  const { inviteUser, handleChange } = props;
  return (
    <Column>
      <InputText
        onChange={(event) => handleChange("fullName", event.target.value)}
        placeholder="Full Name"
      />
      <InputText
        onChange={(event) => handleChange("email", event.target.value)}
        placeholder="Email ID"
      />
      {SelectComponent(props)}
      {RoleComponent(props)}
      <ButtonWrapper>
        <UpdateAndAddButton onClick={() => inviteUser()}>
          Add
        </UpdateAndAddButton>
      </ButtonWrapper>
    </Column>
  );
}

function UpdateMember(props) {
  const { state, updateUser, handleChange } = props;
  return (
    <Column>
      <TextContainer>
        <LabelText>Name :</LabelText>
        <Text>{state.user?.fullName}</Text>
      </TextContainer>
      <TextContainer>
        <LabelText>Email ID :</LabelText>
        <Text>{state.user?.email}</Text>
      </TextContainer>
      {SelectComponent(props)}
      <Row className="margin-top-30-px align-items-center">
        <RadioInput
          id="active"
          type="radio"
          name="active"
          onChange={() => handleChange("status", statusConstants.ACTIVE)}
          checked={state.user?.status === statusConstants.ACTIVE}
        />
        <RadioLabel for={"active"}>Active</RadioLabel>
        <RadioInput
          id="inActive"
          type="radio"
          name="inActive"
          onChange={() => handleChange("status", statusConstants.INACTIVE)}
          checked={state.user?.status === statusConstants.INACTIVE}
        />
        <RadioLabel for={"inActive"}>Inactive</RadioLabel>
      </Row>
      {RoleComponent(props)}
      <ButtonWrapper>
        <UpdateAndAddButton onClick={() => updateUser()}>
          Update
        </UpdateAndAddButton>
      </ButtonWrapper>
    </Column>
  );
}

function RoleComponent(props) {
  const { state, handlePermissionChange } = props;
  const permissions = state.user?.permissions ? state.user?.permissions : [];
  return (
    <Column>
      <RoleTitle>Select Role</RoleTitle>
      <table className="w-100-per">
        <tr>
          {AdminRoles.slice(0, 3).map((item, index) => {
            return (
              <td className="padding-5px " key={index}>
                <Row className="align-items-center cursor-pointer">
                  <Checkbox
                    id={item.value}
                    type="checkbox"
                    onChange={() => handlePermissionChange(item.value)}
                    checked={permissions.includes(item.value)}
                  />
                  <CheckboxLabel for={item.value}>{item.name}</CheckboxLabel>
                </Row>
              </td>
            );
          })}
        </tr>
        <tr>
          {AdminRoles.slice(3, 6).map((item, index) => {
            return (
              <td className="padding-5px" key={index}>
                <Row className="align-items-center cursor-pointer">
                  <Checkbox
                    id={item.value}
                    type="checkbox"
                    onChange={() => handlePermissionChange(item.value)}
                    checked={permissions.includes(item.value)}
                  />
                  <CheckboxLabel for={item.value}>{item.name}</CheckboxLabel>
                </Row>
              </td>
            );
          })}
        </tr>
        <tr>
          {AdminRoles.slice(6, 7).map((item, index) => {
            return (
              <td className="padding-5px" key={index}>
                <Row className="align-items-center cursor-pointer">
                  <Checkbox
                    id={item.value}
                    type="checkbox"
                    onChange={() => handlePermissionChange(item.value)}
                    checked={permissions.includes(item.value)}
                  />
                  <CheckboxLabel for={item.value}>{item.name}</CheckboxLabel>
                </Row>
              </td>
            );
          })}
        </tr>
      </table>
    </Column>
  );
}

function SelectComponent(props) {
  const { state, handleChange } = props;
  return (
    <AdminSelect
      value={state.user?.role}
      onChange={(event) => handleChange("role", event.target.value)}
    >
      <option disabled>Select admin type</option>
      {adminMemberSelect.map((item) => {
        return <option value={item.value}>{item.name}</option>;
      })}
    </AdminSelect>
  );
}

export default ManageTeams;
