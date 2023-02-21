import React, { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../common/components/Popup";
import styled from "styled-components";
import {
  eventConstants,
  validationsMessages,
  NetworkConstants,
} from "../../../constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3 from "web3";
import useOnClickOutside from "./../../../common/useOnClickOutside";
import CommonToasts from "../../../common/components/commonToasts";
import NotificationPopup from "./notification";

const Box1 = styled.div`
  width: 255px;
  background: #21232a 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  border: 1px solid #333333;
  border-radius: 6px;
  position: absolute;
  z-index: 20;
  right: 3%;
`;

const PopDiv = styled.div`
  margin: 15px 0 21px 20px;
  display: flex;
`;

const DisBox = styled.div`
  background: #ffffff00 0% 0% no-repeat padding-box;
  border: 1px solid #ffffff;
  border-radius: 12px;
  width: 206px;
  height: 38px;
  text-align: center;
  cursor: pointer;
  font: normal normal medium 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #ffffff;
  margin-bottom: 40px;
  padding: 5.5px;
  margin-left: 18px;
  margin-top: 40px;
`;
const DisImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 40px;
`;
const Pop1text = styled.div`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  margin-left: 8px;
  margin-top: 20px;
  cursor: pointer;
`;
const ButtonCopy = styled.button`
  min-width: 19px !important;
`;
const ImgPop = styled.img`
  height: auto;
`;

export const HeaderMobile = (props) => {
  const PopupRef = useRef();

  useOnClickOutside(PopupRef, () => walletTogglePopup(false));
  const history = useHistory();
  const userData = useSelector((state) => state.wallet.walletConnect);
  const [isOpenWalletTogglePopup, walletTogglePopup] = useState(false);
  const [isOpenNotificationPopup, setIsOpenNotificationPopup] = useState(false);
  const [mainLogoImage, setMainLogoImage] = React.useState(
    "/images/main-logo.svg"
  );
  const [isOpenNavError, openNavError] = React.useState(false);
  const [networkName, setNetworkName] = React.useState("tesnet");
  const [name, setName] = React.useState("main");
  const dispatcher = useDispatch();
  const handleConnect = async () => {
    userData?.userId
      ? history.push("/select-category")
      : history.push("/wallet-connect");
  };

  const currentPath = history.location.pathname;

  const notificationRef = useRef();

  useOnClickOutside(notificationRef, () => setIsOpenNotificationPopup(false));

  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const isDataCopied = () => {
    CommonToasts.successToast("Link Copied");
    walletTogglePopup(false);
  };
  function disconnect() {
    walletTogglePopup(false);
    dispatcher({ type: eventConstants.LOGOUT_SUCCESS });
  }

  const onClickConnect = async () => {
    const response = await handleNetwork();
    const chainId = process.env.REACT_APP_CHAIN_ID;
    if (chainId == NetworkConstants.MAINET_CHAIN_ID) {
      setNetworkName(NetworkConstants.MAINET);
      setName(NetworkConstants.TESTNET);
    }
    if (chainId != response) {
      openNavError(!isOpenNavError);
      walletTogglePopup(false);
    } else {
      walletTogglePopup(false);
      history.push("/wallet-connect");
    }
  };
  const handleNetwork = async () => {
    let web3;
    web3 = new Web3(window.ethereum);
    return web3.eth.net.getId().then((response) => {
      if (!response) return Promise.reject(response);
      return Promise.resolve(response);
    });
  };

  return (
    <header className="z-50 mb-e:hidden w-full relative text-white bg-black-60 content-center py-2 h-8">
      <div className="flex justify-between shadow-header w-full px-thp h-6">
        <div className="w-1/3 flex justify-start">
          <GiHamburgerMenu
            className="w-4 h-4 cursor-pointer mr-3"
            onClick={() =>
              history.push(
                currentPath === "/mobile-menu" ? "/" : "/mobile-menu"
              )
            }
          />
          <BiSearch
            className="w-4 h-4 cursor-pointer"
            onClick={() => history.push("/mobile-searchbar")}
          />
        </div>

        <div className="w-1/3 ">
          <div
            onClick={() => {
              history.push("/");
            }}
            className="flex justify-center "
            onMouseEnter={() =>
              setMainLogoImage("/images/main-colored-logo.svg")
            }
            onMouseLeave={() => setMainLogoImage("/images/main-logo.svg")}
          >
            <img
              src={mainLogoImage}
              alt="/"
              className="absolute z-20 cursor-pointer transition-all 2xl:w-78 h-15.5 w-36.2"
            />
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <div className="flex justify-between  w-25 ">
            <div onClick={() => handleConnect()}>
              <img
                src="/images/plus-icon.svg"
                alt="/"
                className="w-4 h-4 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
              />
              <img
                src="/images/plus-blue-icon.svg"
                alt="/"
                className="w-4 h-4 transition-all 2.5xl:w-8 2.5xl:h-8"
              />
            </div>
            <div
              onClick={() => {
                history.push("/profile");
              }}
            >
              <img
                src="/images/user-icon.svg"
                alt="/"
                className="w-4 h-4 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
              />
              <img
                src="/images/blue-user-icon.svg"
                alt="/"
                className="w-4 h-4 transition-all 2.5xl:w-8 2.5xl:h-8"
              />
            </div>
            <div
              onClick={() => {
                walletTogglePopup(!isOpenWalletTogglePopup);
              }}
            >
              <img
                src="/images/wallet-icon.svg"
                alt="/"
                className="w-4 h-4 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
              />
              <img
                src="/images/blue-wallet-icon.svg"
                alt="/"
                className="w-4 h-4 transition-all 2.5xl:w-8 2.5xl:h-8"
              />
            </div>

            <div
              onClick={() => {
                setIsOpenNotificationPopup(!isOpenNotificationPopup);
              }}
            >
              <img
                src="/images/notification-white.svg"
                alt="/"
                className="w-5 h-4 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
              />
              <img
                src="/images/notification-blue.svg"
                alt="/"
                className="w-5 h-4 transition-all 2.5xl:w-8 2.5xl:h-8"
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenNotificationPopup && (
            <div ref={notificationRef} className="z-20 absolute right-thp top-8">
              {" "}
              <NotificationPopup />{" "}
            </div>
          )}
      {isOpenWalletTogglePopup && (
        <Popup
          content={
            userData?.userId ? (
              // (
              <>
                <Box1 ref={PopupRef}>
                  <PopDiv>
                    <DisImg
                      src={userData?.profileImage || "/images/image-5.png"}
                    />
                    <Pop1text>
                      {shorten(userData?.userId || " ")}{" "}
                      <CopyToClipboard text={userData?.userId}>
                        <ButtonCopy onClick={isDataCopied}>
                          <ImgPop src="/images/Copy.svg" />
                        </ButtonCopy>
                      </CopyToClipboard>
                    </Pop1text>
                  </PopDiv>
                  <DisBox onClick={() => disconnect()}>Disconnect</DisBox>
                </Box1>
              </>
            ) : (
              <>
                <Box1>
                  {" "}
                  <DisBox onClick={() => onClickConnect()}>Connect</DisBox>
                </Box1>
              </>
            )
          }
        />
      )}
    </header>
  );
};
