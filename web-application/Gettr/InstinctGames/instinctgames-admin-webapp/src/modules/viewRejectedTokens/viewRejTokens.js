import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Row, column } from "simple-flexbox";
import CustomTable from "../../common/components/customTable";
import Table from "./table";
const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #f0f0f6 0% 0% no-repeat padding-box;
  align-items: center;
  margin-top: 60px;
  @media (max-width: 767px) {
    margin-top: 16px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 16px;
  }
`;

const CollectionRow = styled.div`
  width: 100%;
  margin: 0px auto;
  ${"" /* margin: 50px 0px 25px 30px; */}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 2560px;
  padding-bottom: 28px;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  float: right;
  margin-top: 9px;
`;

const SortBy = styled.div`
  width: 137px;
  height: 34px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  text-align: left;
  font: normal normal 600 14px/70px Barlow;
  display: flex;
  justify-content: space-evenly;
  color: #151e58;
  align-items: center;
  margin: 0px 0px 0px 22px;
`;
const Text = styled.div`
  text-align: left;
  font: normal normal 600 18px/22px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
`;

const DropDownContainer = styled.div`
  width: 30px;
  align-self: flex-start;
`;

const DropDownList = styled.ul`
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  float: right;
  overflow: overlay;
  width: 216px;
  margin-top: 13px;
  text-align: left;
  font: normal normal 600 14px/70px Manrope;
`;
const DropText = styled.div`
  text-align: left;
  font: normal normal 600 14px/70px Manrope;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
`;
const ListItem = styled.li`
  list-style: none;
  height: 50px;
`;

export default function HomePageComponent(props) {
  const { state } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleDropDownChange = (value, name) => {
    if (value === "Last 7 ") {
      this.setState({});
    } else {
      let pendingDoctorList = this.state.pendingDoctors.filter((item) => {
        return item[name] === value;
      });
      let confirmDoctorList = this.state.confirmDoctors.filter((item) => {
        return item[name] === value;
      });
      this.setState({ confirmDoctorList, pendingDoctorList });
    }
  };

  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);

  const openChangePassword = () => {
    setOpenPasswordBox(true);
  };

  return (
    <MainComponent>
      <div className="w-100 mb-28 padding-79 tab-padding-21 mb-list-pd">
        <CollectionRow>
          <div>
            <Text>Rejected Tokens</Text>
          </div>
        </CollectionRow>
        <Table
          onClick={props.openChangePassword}
          maxWidth={"1520px"}
          tableCellWidth={""}
          tableHeading={"Confirmed"}
          columns={props.state.tableColumns}
          rows={props.state.rejectedList}
        />
      </div>
    </MainComponent>
  );
}
