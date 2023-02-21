import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import TableComponent from "./TableComponent";
import PastAppointment from "./Pastappoint";
import Review from "../Appoint-feedback/Review";

const Border = styled.div`
  height: 5px;
  background: black;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const use = makeStyles(() => ({
  tab1: {
    color: "#5C4B75 !important",
    font: "normal normal bold 16px/22px Nunito",
    fontWeight: "bold",
  },
  tab2: {
    color: "#5C4B75",
    font: "normal normal normal 16px / 22px Nunito",
  },
  selecte: {
    border: "1px solid #ACACAC",
    minWidth: "200px",
    padding: "5px",
    borderRadius: "5px",
    paddingLeft: "20px",
    font: "16px Nunito",
  },
}));

function Appcontain(props) {
  const classes = use();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Content = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-left: 30px;
  `;
  const Header = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;

    overflow: hidden;
    margin-left: 30px;
    @media (max-width: 1025px) {
      display: none;
    }
  `;

  const Hr = styled.hr`
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 1;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    @media (max-width: 1025px) {
      display: none;
    }
  `;

  const Span = styled.span`
    &:active {
      // padding-bottom: 12px;
      border-bottom: 5px solid #9e1acc;
    }
  `;

  const InputIcon = styled.img.attrs((props) => ({
    src: props.path,
  }))`
    position: absolute;
    top: 6px;
    left: 160px;
    width: 15px;
  `;
  const InputDiv = styled.div`
    position: relative;
    border: 0.3px solid var(--unnamed-color-acacac);
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: #00000012;
    width: 190px;
    margin-top: 20px;
    border: 5px;
    opacity: 1;
  `;

  const Input = styled.input.attrs((props) => ({
    type: "text",
    size: props.size || "0em",
  }))`
    border-radius: 6px;
    box-shadow: 0px 4px 15px #00000012;

    border: 0px solid #acacac;

    opacity: 1;

    padding: 5px;
    font: normal normal normal 15px/20px Nunito;
    letter-spacing: 0px;
    color: #5c4b75;
    padding-left: 10px;

    @media (max-width: 1025px) {
      margin: 0 20px 0 20px;
    }
  `;
  const SearchContaner = styled.div`
    background-color: #ffffff;
    border-radius: 5px;
    height: 35px;
    width: 200px;
    margin-right: 10px;
    border: 0.30000001192092896px solid #acacac;
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

    color: #5c4b75;
    min-width: 150px;
    outline: none;
    border: none;
    border-radius: 5px;
    margin-left: 5px;

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
    height: 13px;
    width: 13px;
    display: flex;
    margin-right: 10px;
    flex-flow: column nowrap;
    margin-top: 10px;
  `;

  const [selecte, setSelecte] = useState("0");
  const handleSelecte = (e) => setSelecte(e.target.value);
  function view() {
    if (selecte == 0) {
      return (
        <div>
          <SearchContaner className="margin-top-10-px">
            <SearchBox>
              <SearchInput
                placeholder="Search"
                onChange={(event) => props.onSearchChange(event.target.value)}
              />
              <Icon src="/images/Search.svg" />
            </SearchBox>
          </SearchContaner>
          <TableComponent />
          <PastAppointment />
        </div>
      );
    }
    if (selecte == 1) {
      return (
        <div>
          <Review />
        </div>
      );
    }
  }

  return (
    <>
      <Content className="display-block display-none-web">
        <div sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              style={{ flexWrap: "wrap" }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#5C4B75",
                  height: "4px",
                  borderRadius: "2px",
                },
              }}
            >
              <Tab
                label="Appointments"
                {...a11yProps(0)}
                className={value === 0 ? classes.tab1 : classes.tab2}
              />
              <Tab
                label="Feedback"
                {...a11yProps(1)}
                className={value === 1 ? classes.tab1 : classes.tab2}
              />
            </Tabs>
          </Box>
          <hr style={{ marginTop: "-2px" }} />
          <TabPanel value={value} index={0}>
            <SearchContaner>
              <SearchBox>
                <SearchInput
                  placeholder="Search"
                  onChange={(event) => props.onSearchChange(event.target.value)}
                />
                <Icon src="/images/Search.svg" />
              </SearchBox>
            </SearchContaner>
            <TableComponent />
            <PastAppointment />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Review />
          </TabPanel>
        </div>
      </Content>

      <Content className="display-none display-block-tab">
        <Select
          className={classes.selecte}
          onChange={handleSelecte}
          defaultValue={selecte}
        >
          <MenuItem value={0}>Appointments</MenuItem>
          <MenuItem value={1}>Feedback</MenuItem>
        </Select>
        <div className="w-100-pr">{view()}</div>
      </Content>
    </>
  );
}

export default Appcontain;
