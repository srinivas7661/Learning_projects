import React from "react";
import { makeStyles } from "@material-ui/styles";
import styled, { css } from "styled-components";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { history } from "../../managers/history";
import Utility from "../../utility/index";
import { sidebarConstants } from "../../constants";

const Image = styled.img`
  width: 16px;
  height: 16px;
  margin: 5px 8px 4px 0px;
`;

const MenuName = styled.p`
text-align: left;
font: normal normal 18px/24px Nunito;
cursor: pointer;
color: #FFF4F3;
margin: 0px;
font-weight: ${props => !props.tab ? "" : "bold"};
display: ${props => props.visibility ? "none" : ""};
`

const useStyles = makeStyles((theme) => ({
  drawer: {
    paddingTop: "40px",

    width: 230,
    MarginTop: "60px",
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#5C4B75",
    color: "#FFF4F3",
    font: "normal normal normal 18px/24px Nunito",
  },

  textStyleNotSelected: {
    textAlign: "left",
    font: "normal normal normal 18px/24px Nunito",
    letterSpacing: "0px",
    color: "#FFF4F3",
    opacity: "1",
    cursor: "pointer",
    margin: "0px",
  },

  root: {
    color: "#FFF4F3",
    minHeight: "100vh",
    height: "100%",
    font: "normal normal normal 18px/24px Nunito",
  }
}));

const MenuList = (props, hide) => {
  const classes = useStyles();
  const pathName = window.location.pathname?.split("/");
  const currSection = pathName?.length ? pathName[pathName.length - 1] : "";
  const hideText = hide && props.menuType === 'icon'

  return (
    <List
      disablePadding
      className={
        classes.drawer +
        ` ${hide && props.menuType === "icon" ? " w-fit-content" : ""}`
      }
    >
      <ListItem
        button
        onClick={() => {
          history.push(`/${sidebarConstants.USERS}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.USERS
              ? "/images/activeuser.svg"
              : "/images/inactiveuser.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.USERS}
          visibility={hideText}
        >
          Users
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.SAMPLE_REQUEST}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.SAMPLE_REQUEST
              ? "/images/activesamplerequest.svg"
              : "/images/tabletsamplerequests.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.SAMPLE_REQUEST}
          visibility={hideText}
        >
          Sample request
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.DOCTORS}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.DOCTORS
              ? "/images/activedoctor.svg"
              : "/images/tabletdocter.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.DOCTORS}
          visibility={hideText}
        >
          Doctors
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.HEALTH_COACH}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.HEALTH_COACH
              ? "/images/activehealthcoach.svg"
              : "/images/inactivehealthcoach.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.HEALTH_COACH}
          visibility={hideText}
        >
          Health Coaches
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.FEEDS}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.FEEDS
              ? "/images/activefeeds.svg"
              : "/images/tabletfeeds.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.FEEDS}
          visibility={hideText}
        >
          Feeds
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.COMMUNITY}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.COMMUNITY
              ? "/images/activecommunity.svg"
              : "/images/tablemanagecommunity.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.COMMUNITY}
          visibility={hideText}
        >
          Manage Community
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.MANAGE_SURVEY}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.MANAGE_SURVEY
              ? "/images/activesurvey.svg"
              : "/images/tabletmanagesurvey.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.MANAGE_SURVEY}
          visibility={hideText}
        >
          Manage Survey
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.MANAGE_TEAM}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.MANAGE_TEAM
              ? "/images/activeteam.svg"
              : "/images/tabletmanageteam.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.MANAGE_TEAM}
          visibility={hideText}
        >
          Manage Team
        </MenuName>
      </ListItem>

      <ListItem
        className="margin-top-20-px"
        button
        onClick={() => {
          history.push(`/${sidebarConstants.PLANS}`);
        }}
      >
        <Image
          src={
            currSection === sidebarConstants.PLANS
              ? "/images/actsubscription.svg"
              : "/images/inactsubscription.svg"
          }
        />
        <MenuName
          tab={currSection === sidebarConstants.PLANS}
          visibility={hideText}
        >
          Subscription Plans
        </MenuName>
      </ListItem>
    </List>
  );
};

function Sidebar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        open={props.open}
        onClose={() => props.handleChange("menu", false)}
        className="tab-menu"
      >
        {MenuList(props, false)}
      </Drawer>

      <div className="display-none-1024px h-100-per">
        {MenuList(props, true)}
      </div>
    </div>
  );
}

export default Sidebar;
