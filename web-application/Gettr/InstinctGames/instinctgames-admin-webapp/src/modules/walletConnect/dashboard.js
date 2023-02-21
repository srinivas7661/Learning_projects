import React, { useEffect, useRef ,useState } from "react";
import styled from "styled-components";
import utility from "../../utility/index";
import { adminPermissionConstants, genericConstants } from "../../constants";
import { Row, Column } from "simple-flexbox";
import Popup from "../dashboard/popUp";
import { history } from "../../managers/history";
import Popover from "@material-ui/core/Popover";
import ChangePassword from "../dashboard/changePassword";
const MainComponent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 70px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  align-items: center;
`;
const HomeMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`;
const Logo = styled.img`
  width: 220px;
  height: 49px;
  margin-left: 20px;
`;

const NotifyIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const WalletIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 12px !important;
`;
const UserProfile = styled.img`
  width: 32px;
  height: 32px;
  background: transparent 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  margin-right: 7px;
`;
const GroupIconMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 50px 0px 20px;
`;

const UserName = styled.div`
  text-align: left;
  font: normal normal normal 14px/19px Manrope;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
`;
const Email = styled.div`
  text-align: left;
  font: normal normal normal 12px/17px Manrope;
  letter-spacing: 0px;
  color: #4e578b;
  opacity: 1;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px 20px;
`;

const Text = styled.button`
  background: none;
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #000000;
  border: none;
`;
const PopDiv = styled.div`
  margin: 5px 0 5px 5px;
  display: flex;
`;
const Pop1text = styled.div`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #333333;
  margin-left: 8px;
  margin-top: 20px;
  cursor: pointer;
`;
const Box = styled.div`
  width: 200px;
  /* height: 92px; */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  border: 1px solid #ffffff;
  border-radius: 6px;
  position: absolute;
  margin-top: 190px;
  margin-left: 80%;
  z-index: 1;
`;
const ImgPop = styled.img`
  height: auto;
`;
const DisBox = styled.div`
  background: #ffffff00 0% 0% no-repeat padding-box;
  cursor:pointer;
  border: 1px solid #151e58;
  border-radius: 5px;
  width: 170px;
  height: 38px;
  text-align: center;
  font: normal normal medium 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #151e58;
  margin-bottom: 10px;
  padding: 5.5px;
  margin-left: 18px;
`;
const Header = (props) => {
  const [isOpenWalletTogglePopup, walletTogglePopup] = useState(false);
  const PopupRef = useRef();
  useOnClickOutside(PopupRef, () => walletTogglePopup(false));
  function disconnect() {
    walletTogglePopup(false);
    //TODO need to work on disconnect wallet account as well
  }
  const onClickConnect = async () => {
    history.push("/wallet-connect");
    walletTogglePopup(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
  const openChangePassword = () => {
    setAnchorEl(null);
    setOpenPasswordBox(true);
  };
  const closePasswordPopup = () => {
    setOpenPasswordBox(false);
  };
  const onClickChangePasswordBtn = () => {
    // setOpenPasswordBox(false);
    props.onChangePasswordClick();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function logoutOut() {
    handleClose();
    props.logoutUser();
  }
  const mainPageRedirect = () => {
    history.push("/dashboard/manage-store/collection");
  };
  const walletPageRedirect = () => {
    history.push("/wallet-connect");
  };

  return (
    <MainComponent>
      <HomeMenu>
        <Logo
          src="/images/Group 283.svg"
          className="btn"
          onClick={mainPageRedirect}
        />
      </HomeMenu>

      <NotifyIcon className="btn" src="/images/notification.svg" />
      <WalletIcon
        src="/images/Wallet.svg"
        className="btn"
        onClick={() => {
          walletTogglePopup(!isOpenWalletTogglePopup);
        }}
      />
      {isOpenWalletTogglePopup && (
        <Popup 
          content={
            <>
              <Box ref={PopupRef}>
                <PopDiv>
                  <Pop1text>
                    1234567
                    <ImgPop src="/images/Copy.svg" />
                  </Pop1text>
                </PopDiv>
                <DisBox onClick={() => disconnect()}>Disconnect</DisBox>
              </Box>
            </>
          }
        />
      )}
      <GroupIconMenu className="btn" onClick={handleClick} Open Popover>
        <UserProfile src={props?.user?.picture || "/images/Group 608.svg"} />
        <Column>
          <UserName>{props?.user?.name || ""}</UserName>
          <Email>{props?.user?.email || ""}</Email>
        </Column>
      </GroupIconMenu>

      <Popover
        style={{
          top: "25px",
          left: "-10px",
          borderRadius: "30px",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",

          horizontal: "left",
        }}
      >
        <Contents>
          <Text onClick={() => openChangePassword()}>Change Password</Text>
        </Contents>

        <Contents>
          <Text onClick={() => logoutOut()}>Log Out</Text>
        </Contents>
      </Popover>

      {openPasswordBox && (
        <ChangePassword
          openPasswordBox={openPasswordBox}
          closePasswordPopup={closePasswordPopup}
          onChangeEvent={props.onChangeEvent}
          state={props.state}
          onChangePasswordClick={onClickChangePasswordBtn}
        />
      )}
    </MainComponent>
  );
};

const dashboard = (props) => {
  return (
    <Column>
      {Header(props)}
      <Row>
        <Column className="w-100-per overflow-y-auto max-height-full-page"></Column>
      </Row>
    </Column>
  );
};

export default dashboard;
