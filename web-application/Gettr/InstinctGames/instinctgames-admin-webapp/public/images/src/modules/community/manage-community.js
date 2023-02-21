import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Row, Column } from "simple-flexbox";
// import CustomizedDialogs from "./category-dialog";
import Badge from "@material-ui/core/Badge";
import { history } from "../../managers/history";
// import Test from './category-dialog';
// import CategoryDialog from "./category-dialog";
import Dialog from "@material-ui/core/Dialog";
import Dropzone from "react-dropzone";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CustomTable from "../../common/components/customTable";
import { makeStyles } from "@material-ui/styles";

const Text = styled.div`
  text-align: left;
  font: normal normal bold 18px/27px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;

const Create = styled.button`
  background: 0% 0% no-repeat padding-box;
  background: #f6cb83;
  border-radius: 5px;
  margin-top: 25px;
  width: 100%;
  height: 44px;
  color: #5c4b75;
  border: none;
  font: normal normal bold 14px/22px Nunito;
`;

const CategoryNameInput = styled.input`
  width: 100%;
  outline: none;
  height: 100%;
  box-shadow: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #acacac;
  border-radius: 5px;
  opacity: 1;
  text-align: left;
  font: normal normal normal 14px/20px Nunito;
  letter-spacing: 0px;
  color: #686868;
  height: 45px;
  margin-top: 25px;
  padding-left: 10px;
  :focus {
    outline: none;
    border: 1px solid #acacac;
  }
`;

const DropParent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 25px;
  padding: 20px;
`;

const use = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px 0px 20px",
    width: "100%",
  },
  styleContainer: {
    display: "flex",
    width: "100%",
    flexFlow: "nowrap",
    justifyContent: "space-between",
  },
  tab1: {
    background: "#ffffff",
    height: "38px",
    minHeight: "20px",
    textTransform: "capitalize",
    font: "normal normal bold 16px/22px Nunito",
    color: "#5C4B75 !important",
  },
  tab2: {
    background: "#ffffff",
    height: "38px",
    minHeight: "20px",
    padding: "8px",
    textTransform: "capitalize",
    font: "normal normal  16px/22px Nunitobox",
    color: "#5C4B75",
  },
  tabs: {
    marginTop: "25px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },

  dragDrop: {
    font: "normal normal normal 15px/20px Nunito",
    color: "#686868",
  },
  browse: {
    font: "normal normal normal 15px/20px Nunito",
    color: "#7D84C0",
    paddingLeft: "2px",
  },
  closeIcon: {
    paddingRight: "25px",
    paddingTop: "25px",
    cursor: "pointer",
  },

  selecte: {
    fontWeight: "bold",
  },
}));
const Button = styled.button`
  background: 0% 0% no-repeat padding-box;
  background: #f6cb83;
  border-radius: 5px;
  height: 35px;
  color: #5c4b75;
  font: normal normal bold 16px/22px Nunito;
  width: 160px;
  border: none;
  @media (max-width: 1025px) {
    display: ${(props) => (props.tab ? "block" : "none")};
  }
  @media (min-width: 1025px) {
    display: ${(props) => (!props.tab ? "block" : "none")};
  }
`;

const Title = styled.p`
  text-align: left;
  font-family: Nunito;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #5c4b75;
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
  letter-spacing: 0px;
  color: #5c4b75;
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
  height: 15px;
  width: 15px;
  display: flex;
  margin-right: 10px;
  flex-flow: column nowrap;
  margin-top: 10px;
`;

const SearchParent = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  height: 35px;
  margin-right: 20px;
  border: 1px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
`;
const Community = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #cccccc;
  margin-right: 10px;
  border-radius: 5px;
  max-width: 160px;
  margin: 10px 10px 10px 0px;
  width: 100%;
  justify-content: space-between;
  max-height: 180px;
  height: 100%;
`;

const CommunityName = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-family: Nunito;
  margin-top: 5px;
`;

const CommunityImage = styled.img`
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Container = styled.div`
  display: flex;
  // max-width: 1200px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 50px 25px 25px 25px;
`;

function ManageCommunity(props) {
  const classes = use();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Title>Manage community</Title>
        <Button tab={true} onClick={() => props.handleChange("dialog", true)}>
          New Category
        </Button>
      </Row>

      <Row className="justify-content-between">
        <SearchParent>
          <SearchBox>
            <SearchInput
              placeholder="Search"
              onChange={(event) => props.onSearchChange(event.target.value)}
            />
            <Icon src="/images/Search.svg" />
          </SearchBox>
        </SearchParent>

        <CategoryDialog
          open={props.state.dialog}
          handleClose={props.handleChange}
          onFileSelect={props.onFileSelect}
          file={props.state.file}
          picture={props.state.picture}
        />
        <Button
          tab={false}
          primary
          onClick={() => props.handleChange("dialog", true)}
        >
          New Category
        </Button>
      </Row>

      <Row className="flex-wrap margin-top-25">
        {props.state.communities && props.state.communities.length
          ? props.state.communities.map((item, index) => (
              <Community key={index}>
                <CommunityImage
                  src={item.image}
                  onClick={() => history.push(`/community/${item.name}`)}
                />
                <CommunityName>{item.name}</CommunityName>
              </Community>
            ))
          : ""}
      </Row>
      {/* <Table/> */}
      <Box className="Tabbox">
        <Box className="Tabcss">
          <Tabs
            style={{ height: "20px" }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            style={{ flexWrap: "wrap" }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "transparent",
                height: "4px",
                borderRadius: "5px",
                padding: "0px",
              },
            }}
          >
            <Tab
              label="Reported Users"
              {...a11yProps(0)}
              className={value === 0 ? classes.tab1 : classes.tab2}
            />
            <Tab
              label="Suspended Users"
              {...a11yProps(1)}
              className={value === 1 ? classes.tab1 : classes.tab2}
            />
          </Tabs>
        </Box>
        <TabPanel className="tablebox" value={value} index={0}>
          <CustomTable
            columns={props.state.tableColumns}
            rows={props.state.PostReportList}
            isCheckBoxVisible={false}
          />
        </TabPanel>
        <TabPanel
          className="tablebox"
          style={{ padding: "0px" }}
          value={value}
          index={1}
        >
          <CustomTable
            classname="style"
            columns={props.state.tableColumns}
            rows={props.state.suspendedUser}
            isCheckBoxVisible={false}
          />
        </TabPanel>
      </Box>
    </Container>
  );
}

function CategoryDialog(props) {
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        className="community-dialog"
        open={props.open}
      >
        <Row className="justify-content-between">
          <Text>Create New Category</Text>
          <img
            src="/images/close.svg"
            onClick={() => props.handleClose("dialog", false)}
          />
        </Row>
        <CategoryNameInput
          onChange={(event) => props.handleClose("name", event.target.value)}
          placeholder="Category Name"
        />
        <DropParent>
          <DropArea
            onFileSelect={props.onFileSelect}
            file={props.file}
            picture={props.picture}
          />
        </DropParent>

        <Create onClick={() => props.addCommunity()}>Create</Create>
      </Dialog>
    </div>
  );
}

const DropArea = (props) => {
  const classes = use();

  return (
    <Dropzone onDrop={props.onFileSelect}>
      {({ getRootProps, getInputProps }) => (
        <Column justifyContent="center" {...getRootProps()}>
          <input {...getInputProps()} />
          <Column>
            {props.file.name ? (
              <Row justifyContent="center">{props.file.name}</Row>
            ) : props.picture ? (
              <img
                alt=""
                src={props.picture}
                style={{ cursor: "pointer", height: "75px" }}
              />
            ) : (
              <img
                alt=""
                src="/images/upload.svg"
                style={{ cursor: "pointer", height: "75px" }}
              />
            )}
            <Row
              justifyContent="center"
              style={{
                cursor: "pointer",
                marginTop: "11px",
                fontSize: "small",
              }}
            >
              <Row className="align-items-center">
                <p className={classes.dragDrop}>
                  Drag and Drop Category Image or
                </p>{" "}
                <p className={classes.browse}> browse</p>
              </Row>
            </Row>
          </Column>
        </Column>
      )}
    </Dropzone>
  );
};

export default ManageCommunity;
