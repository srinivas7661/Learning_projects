import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import utility from "../../utility/index";
import { adminPermissionConstants, genericConstants } from "../../constants";
import { Row, Column } from "simple-flexbox";
import ManageStore from "../ManageStore";
import RemoveNFT from "../removedNFT";
import RemovedNFTComponent from "../viewRejectedTokens/index";
import Analytics from "../analytics/analytics";
import ReportNft from "../manageReportNft/reportNftTable";
import ListedToken from "../listedtokens/index";
import BLOCKED_USER from "../blockeduser";
import ReportedNftList from "../manageReportNft";
import Categories from "../categories";
import SubAdmins from "../subAdmins";
import Popover from "@material-ui/core/Popover";
import ChangePassword from "./changePassword";
import RequestedTokens from "../requestedtokens";
import TokenDetails from "../listedtokens/tokendetails";
import RequestedDetails from "../requestedtokens/requesteddetails";
import { history } from "../../managers/history";
import ViewRejTokens from "../viewRejectedTokens";
import Popup from "./popUp";
import { eventConstants } from "../../constants/index";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "./useClickOutside";
import useWindowDimensions from "../../common/windowDimensions";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  credsConstants,
  pathConstants,
  validationsMessages,
} from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import CommonToasts from "../../common/components/commonToasts";
import moment from "moment";
import Notifications from "./notificationComponent";

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 70px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  align-items: center;
  position: relative;
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
  @media (max-width: 767px) {
    width: 111px;
    height: 25px;
  }
`;

const NotifyMobileIcon = styled.img`
  width: 24px;
  height: 24px;
  display: flex !important;
  @media (min-width: 768px) {
    display: none !important;
  }
`;

const NotifyIcon = styled.img`
  width: 24px;
  height: 24px;
  display: none !important;
  @media (min-width: 768px) {
    display: block !important;
  }
`;
const WalletIcon = styled.img`
  width: 29px;
  height: 29px;
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
  @media (max-width: 767px) {
    margin: 0px 16px 0px 20px !important;
  }
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
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0;
  }

  @media (max-width: 767px) {
    margin: 0;
    background-color: #ffffff;
  }
`;
const Pop1text = styled.div`
  text-align: left;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;
  letter-spacing: 0px;
  color: #333333;
  margin-left: 14px;
  margin-top: 20px;
  cursor: pointer;
`;
const PopupItems = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  width: 100%;
  cursor: pointer;
  color: #535877;
  &:hover {
    background: #f8f8f8;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    cursor: pointer;
  }
`;
const PopupDescription = styled.div`
  display: flex;
  padding: 10px 0 10px 10px;
  justify-content: flex-start;
  width: 50%;
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  opacity: 1;
  white-space: nowrap;
  color: #535877;
`;
const PopupTimestamp = styled.div`
  display: flex;
  padding: 10px 10px;
  justify-content: flex-end;
  width: 50%;
  font: normal normal normal 10px/12px Barlow;
  letter-spacing: 0px;
  color: #535877;
  opacity: 1;
  white-space: nowrap;
`;
const Box = styled.div`
  width: 200px;
  /* height: 92px; */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  border: 1px solid rgba(234, 234, 234, 1);
  border-radius: 6px;
  position: absolute;
  right: 94px;
  z-index: 99;
  top: 75px;
  @media (max-width: 767px) {
    right: 0;
  }
`;
const DisImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 40px;
`;
const ImgPop = styled.img`
  height: auto;
`;
const DisBox = styled.div`
  background: #ffffff00 0% 0% no-repeat padding-box;
  border: 1px solid #6874e8;
  border-radius: 5px;
  width: 170px;
  height: 38px;
  text-align: center;
  font: normal normal medium 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #6874e8;
  margin-bottom: 10px;
  padding: 5.5px;
  margin-left: 18px;
`;

const HumburgerImg = styled.img`
  display: none;
  @media (max-width: 767px) {
    align-self: normal;
    margin: 0 0px 0 25px;
    display: block;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
    align-self: normal;
    margin: 0 0px 0 25px;
  }
`;
const RowDashboard = styled(Row)`
  @media (max-width: 767px) {
    display: block !important;
  }
`;
const ButtonCopy = styled(Button)`
  min-width: 19px !important;
`;
const BoxNoti = styled(Box)`
  width: 400px;
  margin-top: 0;
  top: 70px;
  width: 410px;
  height: 292px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  opacity: 1;
  /* height: 292px; */
  @media (max-width: 767px) {
    height: unset !important;
  }
`;
const PopNewDiv = styled.div`
    display: flex;
    width: 400px;
    justify-content: space-between;
    padding: 24px 12px 10px 12px;
    @media (max-width:767px) {
    width: auto;
    }
`;
const PopNewDiv1 = styled(PopDiv)`
  flex-direction: column;
`;
const PopNewDiv2 = styled(PopDiv)`
  background-color: #f7f7f7;
  justify-content: space-between;
  padding: 24px 12px 10px 12px;
`;

const Header = (props) => {
  const [isOpenWalletTogglePopup, walletTogglePopup] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  // const notifyCopyToast = () =>
  // toast.success(validationsMessages.IS_TEXT_COPIED, {
  //   duration: 1000,
  //   position: validationsMessages.TOASTS_POSITION,
  //   className: "toast-div-address",
  // });

  const isDataCopied = () => {
    walletTogglePopup(false);
    CommonToasts.successfullySent(validationsMessages.IS_TEXT_COPIED);
  };

  const ref = useRef();
  useOnClickOutside(ref, () => {
    walletTogglePopup(false);
    setIsNotificationOpen(false);
    // setOpenBtn(false);
  });
  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  const userData = useSelector((state) => state.wallet.userAddress);
  const dispatcher = useDispatch();
  function disconnect() {
    walletTogglePopup(false);
    //TODO need to work on disconnect wallet account as well
    dispatcher({ type: eventConstants.METAMASK_DISCONNECTED });
    console.log("disconnected");
  }
  const onClickConnect = async () => {
    history.push("/wallet-connect");
    walletTogglePopup(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    walletTogglePopup(false);
  };
  const [openPasswordBox, setOpenPasswordBox] = React.useState(false);
  const openChangePassword = () => {
    setAnchorEl(null);
    setOpenPasswordBox(true);
  };

  const notiOpen = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setOpenPasswordBox(false);
    walletTogglePopup(false);
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

  const handleClickWallet = () => {
    history.push("/wallet-connect");
    // window.location.reload();
  };
  const { height, width } = useWindowDimensions();
  const [openBtn, setOpenBtn] = React.useState(false);
  

  const handleTooltipClose = () => {
    setOpenBtn(false);
  };

  const handleTooltipOpen = (id) => {
    setOpenBtn(true);
    navigator.clipboard.writeText(id);
  };
  
  

  return (
    <>
      <div>
        <Toaster />
      </div>
      <MainComponent ref={ref}>
        <HomeMenu ref={ref}>
          {/* <button   onClick={() => {
                      props.changeStateVariable("isFilterOpen", true);
                  }}>hello</button> */}
          
            <HumburgerImg
              onClick={() => {
                props.changeStateVariable("isFilterOpen", props.state.isFilterOpen);
              }}
              src="/Hamburger.svg"
            />
          
          <Logo
            src="/images/Group 283.svg"
            className="btn"
            onClick={mainPageRedirect}
          />
        </HomeMenu>

        <NotifyMobileIcon          
         className="btn"
          src="/images/notification.svg"
          onClick={()=>{history.push("/dashboard/notifications")}} />

        <NotifyIcon
          className="btn"
          src="/images/notification.svg"
          onClick={notiOpen}
        />

        {(isNotificationOpen && width > 767) && (
          <Popup
            content={
              <>
                <BoxNoti className="flex-d-f-e">
                  {width <= 767 && (
                    <div className="notice fs-16 c-p f-w-600 m-t-b-16">
                      <p>Notifications</p>
                      <p className="f-c-6874E8">Mark all as read</p>
                    </div>
                  )}
                  <PopNewDiv1>
                    <PopNewDiv>
                      {width > 767 && (
                        <div className="display-flex fs-16 c-p f-w-600">
                          Notifications
                        </div>
                      )}
                      {width > 767 &&<div className="f-c-6874E8">Mark all as read</div>}
                    </PopNewDiv>

                    <div className="scrollbar" id="scrollbar-7">
                      <div className="addScrollStyle">
                        {props.state.notifications &&
                          props.state.notifications?.length > 0 &&
                          props.state.notifications.map((item) => {
                            return (
                              <PopupItems key={item?._id}>
                                {(() => {
                                  switch (item.description) {
                                    case credsConstants.NFT_HAS_REPORTED:
                                      return (
                                        <PopupDescription
                                          onClick={() =>
                                            history.push(
                                              genericConstants.ACTIVE_MENU
                                                .REPORTED_NFT
                                            )
                                          }
                                        >
                                          {item?.description}
                                        </PopupDescription>
                                      );
                                    case credsConstants.NEW_TOKEN_REQUEST:
                                      return (
                                        <PopupDescription
                                          onClick={() =>
                                            history.push(
                                              genericConstants.ACTIVE_MENU
                                                .REQUESTED_TOKENS
                                            )
                                          }
                                        >
                                          {item?.description}
                                        </PopupDescription>
                                      );

                                    default:
                                      return;
                                  }
                                })()}

                                <PopupTimestamp>
                                  {item?.description?.length > 0
                                    ? moment(item.addedOn).format("LLL")
                                    : ""}
                                </PopupTimestamp>
                              </PopupItems>
                            );
                          })}
                      </div>
                    </div>
                  </PopNewDiv1>
                  {/* <DisBox onClick={() => disconnect()}>Disconnect</DisBox> */}
                </BoxNoti>
              </>
            }
          />
        )}

        <WalletIcon
          src="/images/Wallet.svg"
          className="btn"
          onClick={
            userData?.userAddress
              ? () => {
                  walletTogglePopup(!isOpenWalletTogglePopup);
                  setOpenPasswordBox(false);
                  setIsNotificationOpen(false);
                }
              : handleClickWallet
          }
        />
        {isOpenWalletTogglePopup && (
          <Popup className="absolute"
            content={
              <>
                <Box>
                  <PopDiv>
                    <Pop1text>
                      {shorten(userData?.userAddress || " ")}

                      <CopyToClipboard text={userData?.userAddress}>
                        <ButtonCopy onClick={isDataCopied}>
                          <ImgPop src="/images/Copy.svg" />
                        </ButtonCopy>
                      </CopyToClipboard>
                      {/* </Tooltip>
            
          </ClickAwayListener> */}
                    </Pop1text>
                  </PopDiv>
                  <DisBox onClick={() => disconnect()}>Disconnect</DisBox>
                </Box>
              </>
            }
          />
        )}
        <GroupIconMenu className="btn" onClick={handleClick} Open Popover>
          <UserProfile src={ "/images/profileImage.png"} />
          {width > 767 && (
            <Column>
              <UserName>{props?.user?.name || ""}</UserName>
              <Email>{props?.user?.email || ""}</Email>
            </Column>
          )}
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
            onCrossBtnClick={props.onCrossBtnClick}
            openPasswordBox={openPasswordBox}
            closePasswordPopup={closePasswordPopup}
            onChangeEvent={props.onChangeEvent}
            state={props.state}
            onChangePasswordClick={onClickChangePasswordBtn}
          />
        )}
      </MainComponent>
    </>
  );
};

const SideMenu = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      {props.state.isFilterOpen ? (
       <ClickAwayListener onClickAway = {() => {if(props.state.isFilterOpen)        
            props.changeStateVariable("isFilterOpen", false); 
            }}>
        <div className="side-menu mb-side-width tab-side-menu">
          <div className="main-menu">
            <div>
              <div>
                {props.permission.indexOf(
                  adminPermissionConstants.STORE_FRONT
                ) > -1 && (
                  <Row
                    vertical={"center"}
                    className={
                      " p-l-29 p-b-29 p-t-30 f-w-600 " +
                      (utility.isMenuActive("/dashboard/manage-store")
                        ? " active-menu mb-active-menu"
                        : "menu")
                    }
                    onClick={() =>
                      props.onMenuClick(genericConstants.ACTIVE_MENU.COLLECTION)
                    }
                  >
                    <div>
                      <img
                        src={
                          utility.isMenuActive("/dashboard/manage-store")
                            ? "/images/manage storefront.svg"
                            : "/images/manage storefront dark.svg"
                        }
                      />
                    </div>
                    <div className="fs-16 cursor-pointer f-w-600 p-l-15 p-l-15">
                      Manage Storefront
                    </div>
                  </Row>
                )}
                {props.permission.indexOf(
                  adminPermissionConstants.STORE_FRONT
                ) > -1 && utility.isMenuActive("/dashboard/manage-store") ? (
                  <div className="sub-menu">
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.COLLECTION
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.COLLECTION
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Collection
                    </div>
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.CATEGORIES
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.CATEGORIES
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Categories
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <Row
                  vertical={"center"}
                  className={
                    " p-l-29 p-b-29 p-t-30 f-w-600  " +
                    (utility.isMenuActive("/dashboard/analytics")
                      ? " active-menu mb-active-menu"
                      : "menu")
                  }
                  onClick={() => {
                    props.onMenuClick(genericConstants.ACTIVE_MENU.ANALYTICS);
                    props.changeStateVariable("isFilterOpen", false);
                  }}
                >
                  <div>
                    <img
                      alt=""
                      src={
                        "" +
                        (utility.isMenuActive("/dashboard/analytics")
                          ? "/images/Analytics.svg"
                          : "/images/Analytics dark.svg")
                      }
                    />
                  </div>
                  <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                    Analytics
                  </div>
                </Row>
                {props.permission.indexOf(adminPermissionConstants.CONTENT) >
                  -1 && (
                  <Row
                    vertical={"center"}
                    className={
                      " p-l-29 p-b-29 p-t-30 f-w-600  " +
                      (utility.isMenuActive("/dashboard/manage-content")
                        ? " active-menu mb-active-menu"
                        : "menu")
                    }
                    onClick={() =>
                      props.onMenuClick(
                        genericConstants.ACTIVE_MENU.REPORTED_NFT
                      )
                    }
                  >
                    <div>
                      <img
                        alt=""
                        src={
                          "" +
                          (utility.isMenuActive(
                            genericConstants.ACTIVE_MENU.MANAGE_CONTENT
                          )
                            ? "/images/manage_content.svg"
                            : "/images/manage_content_dark.svg")
                        }
                      />
                    </div>
                    <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                      Manage Content
                    </div>
                  </Row>
                )}
                {props.permission.indexOf(adminPermissionConstants.CONTENT) >
                  -1 && utility.isMenuActive("/dashboard/manage-content") ? (
                  <div className="sub-menu">
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.REPORTED_NFT
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500" +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.REPORTED_NFT
                        )
                          ? " active-sub-menu"
                          : " sub-items")
                      }
                    >
                      Reported NFT
                    </div>
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.REMOVED_NFT
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.REMOVED_NFT
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Removed NFT
                    </div>
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.BLOCKED_USER
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.BLOCKED_USER
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Blocked User
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {props.permission.indexOf(adminPermissionConstants.SUB_ADMINS) >
                  -1 && (
                  <Row
                    vertical={"center"}
                    className={
                      " p-l-29 p-b-29 p-t-30 f-w-600  " +
                      (utility.isMenuActive("/dashboard/sub-admins")
                        ? " active-menu mb-active-menu"
                        : "menu")
                    }
                    onClick={() => {
                      props.onMenuClick(
                        genericConstants.ACTIVE_MENU.SUB_ADMINS
                      );
                      props.changeStateVariable("isFilterOpen", false);
                    }}
                  >
                    <div>
                      <img
                        alt=""
                        src={
                          "" +
                          (utility.isMenuActive(
                            genericConstants.ACTIVE_MENU.SUB_ADMINS
                          )
                            ? "/images/sub_admin.svg"
                            : "/images/sub_admin_dark.svg")
                        }
                      />
                    </div>
                    <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                      Sub Admins
                    </div>
                  </Row>
                )}
                {props.permission.indexOf(adminPermissionConstants.TOKENS) >
                  -1 && (
                  <Row
                    vertical={"center"}
                    className={
                      " p-l-29 p-b-29 p-t-30 f-w-600  " +
                      (utility.isMenuActive("/dashboard/tokens-list")
                        ? " active-menu mb-active-menu"
                        : "menu")
                    }
                    onClick={() =>
                      props.onMenuClick(
                        genericConstants.ACTIVE_MENU.LISTED_TOKENS
                      )
                    }
                  >
                    <div>
                      <img
                        alt=""
                        src={
                          "" +
                          (utility.isMenuActive(
                            genericConstants.ACTIVE_MENU.TOKENS_LISTING
                          )
                            ? "/images/token (1).svg"
                            : "/images/token_dark.svg")
                        }
                      />
                    </div>
                    <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                      Tokens Listing
                    </div>
                  </Row>
                )}
                {props.permission.indexOf(adminPermissionConstants.TOKENS) >
                  -1 && utility.isMenuActive("/dashboard/tokens-list") ? (
                  <div className="sub-menu">
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.LISTED_TOKENS
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.LISTED_TOKENS
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Listed Tokens
                    </div>
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.REQUESTED_TOKENS
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.REQUESTED_TOKENS
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Requested Tokens
                    </div>
                    <div
                      onClick={() => {
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.REJECTED_TOKENS
                        );
                        props.changeStateVariable("isFilterOpen", false);
                      }}
                      className={
                        "fs-14 f-w-500 " +
                        (utility.isMenuActive(
                          genericConstants.ACTIVE_MENU.REJECTED_TOKENS
                        )
                          ? " active-sub-menu"
                          : "sub-items")
                      }
                    >
                      Rejected Tokens
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        </ClickAwayListener>
      ) : (
        <>
          {width > 1024 && (
            <div className="side-menu">
              <div className="main-menu">
                <div>
                  <div>
                    {props.permission.indexOf(
                      adminPermissionConstants.STORE_FRONT
                    ) > -1 && (
                      <Row
                        vertical={"center"}
                        className={
                          " p-l-29 p-b-29 p-t-30 f-w-600 " +
                          (utility.isMenuActive("/dashboard/manage-store")
                            ? " active-menu"
                            : "menu")
                        }
                        onClick={() =>
                          props.onMenuClick(
                            genericConstants.ACTIVE_MENU.COLLECTION
                          )
                        }
                      >
                        <div>
                          <img
                            src={
                              utility.isMenuActive("/dashboard/manage-store")
                                ? "/images/manage storefront.svg"
                                : "/images/manage storefront dark.svg"
                            }
                          />
                        </div>
                        <div className="fs-16 cursor-pointer f-w-600 p-l-15 p-l-15">
                          Manage Storefront
                        </div>
                      </Row>
                    )}
                    {props.permission.indexOf(
                      adminPermissionConstants.STORE_FRONT
                    ) > -1 &&
                    utility.isMenuActive("/dashboard/manage-store") ? (
                      <div className="sub-menu">
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.COLLECTION
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.COLLECTION
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Collections
                        </div>
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.CATEGORIES
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.CATEGORIES
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Categories
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <Row
                      vertical={"center"}
                      className={
                        " p-l-29 p-b-29 p-t-30 f-w-600  " +
                        (utility.isMenuActive("/dashboard/analytics")
                          ? " active-menu"
                          : "menu")
                      }
                      onClick={() =>
                        props.onMenuClick(
                          genericConstants.ACTIVE_MENU.ANALYTICS
                        )
                      }
                    >
                      <div>
                        <img
                          alt=""
                          src={
                            "" +
                            (utility.isMenuActive("/dashboard/analytics")
                              ? "/images/Analytics.svg"
                              : "/images/Analytics dark.svg")
                          }
                        />
                      </div>
                      <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                        Analytics
                      </div>
                    </Row>
                    {props.permission.indexOf(
                      adminPermissionConstants.CONTENT
                    ) > -1 && (
                      <Row
                        vertical={"center"}
                        className={
                          " p-l-29 p-b-29 p-t-30 f-w-600  " +
                          (utility.isMenuActive("/dashboard/manage-content")
                            ? " active-menu"
                            : "menu")
                        }
                        onClick={() =>
                          props.onMenuClick(
                            genericConstants.ACTIVE_MENU.REPORTED_NFT
                          )
                        }
                      >
                        <div>
                          <img
                            alt=""
                            src={
                              "" +
                              (utility.isMenuActive(
                                genericConstants.ACTIVE_MENU.MANAGE_CONTENT
                              )
                                ? "/images/manage_content.svg"
                                : "/images/manage_content_dark.svg")
                            }
                          />
                        </div>
                        <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                          Manage Content
                        </div>
                      </Row>
                    )}
                    {props.permission.indexOf(
                      adminPermissionConstants.CONTENT
                    ) > -1 &&
                    utility.isMenuActive("/dashboard/manage-content") ? (
                      <div className="sub-menu">
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.REPORTED_NFT
                            )
                          }
                          className={
                            "fs-14 f-w-500" +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.REPORTED_NFT
                            )
                              ? " active-sub-menu"
                              : " sub-items")
                          }
                        >
                          Reported NFT
                        </div>
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.REMOVED_NFT
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.REMOVED_NFT
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Removed NFT
                        </div>
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.BLOCKED_USER
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.BLOCKED_USER
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Blocked User
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {props.permission.indexOf(
                      adminPermissionConstants.SUB_ADMINS
                    ) > -1 && (
                      <Row
                        vertical={"center"}
                        className={
                          " p-l-29 p-b-29 p-t-30 f-w-600  " +
                          (utility.isMenuActive("/dashboard/sub-admins")
                            ? " active-menu"
                            : "menu")
                        }
                        onClick={() =>
                          props.onMenuClick(
                            genericConstants.ACTIVE_MENU.SUB_ADMINS
                          )
                        }
                      >
                        <div>
                          <img
                            alt=""
                            src={
                              "" +
                              (utility.isMenuActive(
                                genericConstants.ACTIVE_MENU.SUB_ADMINS
                              )
                                ? "/images/sub_admin.svg"
                                : "/images/sub_admin_dark.svg")
                            }
                          />
                        </div>
                        <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                          Sub Admins
                        </div>
                      </Row>
                    )}
                    {props.permission.indexOf(adminPermissionConstants.TOKENS) >
                      -1 && (
                      <Row
                        vertical={"center"}
                        className={
                          " p-l-29 p-b-29 p-t-30 f-w-600  " +
                          (utility.isMenuActive("/dashboard/tokens-list")
                            ? " active-menu"
                            : "menu")
                        }
                        onClick={() =>
                          props.onMenuClick(
                            genericConstants.ACTIVE_MENU.LISTED_TOKENS
                          )
                        }
                      >
                        <div>
                          <img
                            alt=""
                            src={
                              "" +
                              (utility.isMenuActive(
                                genericConstants.ACTIVE_MENU.TOKENS_LISTING
                              )
                                ? "/images/token (1).svg"
                                : "/images/token_dark.svg")
                            }
                          />
                        </div>
                        <div className="fs-16 cursor-pointer f-w-600 p-l-15">
                          Tokens Listing
                        </div>
                      </Row>
                    )}
                    {props.permission.indexOf(adminPermissionConstants.TOKENS) >
                      -1 && utility.isMenuActive("/dashboard/tokens-list") ? (
                      <div className="sub-menu">
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.LISTED_TOKENS
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.LISTED_TOKENS
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Listed Tokens
                        </div>
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.REQUESTED_TOKENS
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.REQUESTED_TOKENS
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Requested Tokens
                        </div>
                        <div
                          onClick={() =>
                            props.onMenuClick(
                              genericConstants.ACTIVE_MENU.REJECTED_TOKENS
                            )
                          }
                          className={
                            "fs-14 f-w-500 " +
                            (utility.isMenuActive(
                              genericConstants.ACTIVE_MENU.REJECTED_TOKENS
                            )
                              ? " active-sub-menu"
                              : "sub-items")
                          }
                        >
                          Rejected Tokens
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

function HomeComponent(props) {
  return (
    <Column>
      <div>
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.COLLECTION) ? (
          <ManageStore />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.CATEGORIES) ? (
          <Categories />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.ANALYTICS) ? (
          <Analytics />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.REPORTED_NFT) ? (
          <ReportedNftList />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.REMOVED_NFT) ? (
          <RemoveNFT />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.NOTIFICATIONS) ? (
          <Notifications props={props} />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.BLOCKED_USER) ? (
          <BLOCKED_USER />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.SUB_ADMINS) ? (
          <SubAdmins />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.LISTED_TOKENS) ? (
          <ListedToken />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.REQUESTED_TOKENS) ? (
          <RequestedTokens />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.REJECTED_TOKENS) ? (
          <RemovedNFTComponent />
        ) : null}
        {utility.isMenuActive(genericConstants.ACTIVE_MENU.TOKEN_DETAILS) ? (
          <TokenDetails />
        ) : null}
        {utility.isMenuActive(
          genericConstants.ACTIVE_MENU.REQUESTED_DETAILS
        ) ? (
          <RequestedDetails />
        ) : null}
      </div>
    </Column>
  );
}

const dashboardComponent = (props) => {
  return (
    <Column>
      {Header(props)}
      <RowDashboard>
        <Column id="sideContainer">{SideMenu(props)}</Column>
        <Column className="w-100-per overflow-y-auto max-height-full-page">
          {HomeComponent(props)}
        </Column>
      </RowDashboard>
    </Column>
  );
};

export default dashboardComponent;
