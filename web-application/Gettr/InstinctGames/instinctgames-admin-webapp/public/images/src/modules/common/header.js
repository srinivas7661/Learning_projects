import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "simple-flexbox";
import MenuIcon from "@material-ui/icons/Menu";
import { Popover } from "@material-ui/core";
import { sessionManager } from "../../managers/sessionManager";
import { cookiesConstants } from "../../constants";
import UserService from '../../services/user';


const useStyles = makeStyles({
  root: {
    // left: "none",
    right: "10px !important",
    minWidth: "600px ",
    // padding: "10px",
    // width: "600px !important",
  },
});

const AppBar = styled.div`
  width: 100%;
  height: 60px;

  padding: "0px 30px 0px 30px";
  display: flex;
  justify-content: space-between;


`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 15px;
  margin-right: 20px;
`;

const BellIcon = styled.img`
    margin-top: 15px;
    margin-right: 20px;
    height:18px;

`;

const Logo = styled.img`
    width: 120px;
    height: 50px;
    margin: 5px 8px 4px 0px;
    margin-left: 20px;
    top: 7px;
`;

const Hamburger = styled.div`
  display: none;
  margin-top: 15px;
  margin-left: 15px;
  color: black;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const HeaderSideBar = styled.div`
  width: 100%;
  box-shadow:0px 4px 15px #00000012 !important;
`;

const ResetPassword = styled.a`
    color: black;
    text-decoration: none !important;
    ::hover{
    text-decoration: none !important;
    color: black;
    }
`;

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const userDetails = sessionManager.getDataFromCookies(cookiesConstants.USER_DETAIL)

  return (

    <HeaderSideBar>
      <AppBar position="static">
        <Hamburger className="display-block-1024px">
          <MenuIcon onClick={() => props.handleChange("menu", true)} />
        </Hamburger>

        <div>
          <Logo src="/images/logo.svg" alt="Logo"></Logo>
        </div>

        <div>
          <BellIcon src="/images/bellicon.svg" alt="bellicon"  ></BellIcon>
          <Avatar onClick={(event) => handleClick(event)} src={userDetails && userDetails.profilePic ? userDetails.profilePic : "/images/avatar.jpg"} alt="avatar" />

          <Popover
            // className="profile-popover "
            classes={{ root: classes.root }}
            id={id}
            open={open}

            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Row className="popup margin-top-10-px margin-left-10-px">
              <ResetPassword href="/reset-password">Change Password</ResetPassword>
            </Row>
            <Row className="popup margin-top-10-px">
              <div>Change Profile</div>
            </Row>
            <Row className="popup margin-top-10-px">
              <div onClick={() => new UserService().logout()}>Logout</div>
            </Row>
          </Popover>
        </div>
      </AppBar>


    </HeaderSideBar>

  );
}
export default Header;
