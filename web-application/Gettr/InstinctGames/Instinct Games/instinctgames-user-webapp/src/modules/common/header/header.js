import React, {useEffect, useRef} from "react";
import {history} from "../../../managers/history";
import styled from "styled-components";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {connect, useDispatch, useSelector} from "react-redux";
import Popup from "../../../common/components/Popup";
import {
    eventConstants,
    validationsMessages,
    NetworkConstants,
} from "../../../constants";
import {Link} from "react-router-dom";
import Web3 from "web3";
import Utility from "../../../utility";
import {BlockchainService} from "../../../services";
import {addUser} from "../../../services/userMicroservice";
import CommonToasts from "../../../common/components/commonToasts";
import {ethers} from "ethers";
import useOnClickOutside from "./../../../common/useOnClickOutside";
import NotificationPopup from "./notification";

const Box1 = styled.div`
  width: 255px;
  background: #21232a 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  border: 1px solid #333333;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  right: 3%;
`;
const Box3 = styled.div`
  width: 100%;
  background: orange;
  // box-shadow: 0px 3px 6px #0000000f;
  // border: 1px solid #333333;
  // border-radius: 6px;
  position: absolute;
  margin-top: 83px;
  z-index: 1;
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
  clip-path: circle(44% at 50% 50%);
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

const statsBtn = () => {
    history.push("/stats");
    // window.location.reload();
};
const exploreBtn = () => {
    history.push("/explore");
    // window.location.reload();
};
const resourcesBtn = () => {
    history.push("/resources");
    // window.location.reload();
};
const collectionsBtn = () => {
    history.push("/collections");
    // window.location.reload();
};

function HeaderComponent(props) {
    console.log(JSON.stringify(props));
    const userData = useSelector((state) => state.wallet.walletConnect);
    const dispatcher = useDispatch();

    const [isOpenWalletTogglePopup, walletTogglePopup] = React.useState(false);
    const [isOpenNotificationPopup, setIsOpenNotificationPopup] =
        React.useState(false);
    const [isOpenNavError, openNavError] = React.useState(false);
    const [networkName, setNetworkName] = React.useState("tesnet");
    const [name, setName] = React.useState("main");
    const [mainLogoImage, setMainLogoImage] = React.useState(
        "/images/main-logo.svg"
    );

    const PopupRef = useRef();
    const notificationRef = useRef();
    let picExtension;
    if (userData) {
        picExtension = userData?.profileImage.split(".").pop();
    }
    

    useOnClickOutside(PopupRef, () => walletTogglePopup(false));
    useOnClickOutside(notificationRef, () => setIsOpenNotificationPopup(false));
    const isDataCopied = () => {
        CommonToasts.successToast("Link Copied");

        walletTogglePopup(false);
    };

    function shorten(b, amountL = 10, amountR = 4, stars = 3) {
        return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
            b.length - 3,
            b.length
        )}`;
    }

    function disconnect() {
        walletTogglePopup(false);

        dispatcher({type: eventConstants.LOGOUT_SUCCESS});
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
    const handleConnect = async () => {
        const response = await handleNetwork();
        const chainId = process.env.REACT_APP_CHAIN_ID;
        if (chainId == NetworkConstants.MAINET_CHAIN_ID) {
            setNetworkName(NetworkConstants.MAINET);
            setName(NetworkConstants.TESTNET);
        }
        if (chainId != response) {
            openNavError(!isOpenNavError);
        } else {
            userData?.userId
                ? history.push("/select-category")
                : history.push("/wallet-connect");
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

    useEffect(() => {
        handleNetwork();
        captureAccountChangeEvent();
    }, [window?.ethereum]);
    const captureAccountChangeEvent = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", getAndUpdateWalletAccount);
        }
    };
    const getAndUpdateWalletAccount = async () => {
        const [err, response] = await Utility.parseResponse(
            BlockchainService.connectWallet()
        );

        if (err || !response) {
            return dispatcher({type: eventConstants.LOGOUT_SUCCESS});
        }
        dispatcher({type: eventConstants.SHOW_LOADER});
        const [error, addUserResponse] = await Utility.parseResponse(
            addUser({
                userId: response[0],
                password: process.env.REACT_APP_ADD_IG_MEMBER_PASSWORD,
            })
        );
        dispatcher({type: eventConstants.HIDE_LOADER});
        if (error || !addUserResponse) {
            return CommonToasts.errorToast(
                error?.message || validationsMessages.UNABLE_TO_ADD_USER
            );
        }
        dispatcher({
            type: eventConstants.META_MASK,
            data: {...addUserResponse},
        });
        window.location.reload();
    };
    const handleProfile = async () => {
        const response = await handleNetwork();
        const chainId = process.env.REACT_APP_CHAIN_ID;
        if (chainId == NetworkConstants.MAINET_CHAIN_ID) {
            setNetworkName(NetworkConstants.MAINET);
            setName(NetworkConstants.TESTNET);
        }
        if (chainId != response) {
            openNavError(!isOpenNavError);
        } else {
            userData?.userId
                ? history.push("/profile")
                : history.push("/wallet-connect");
        }
    };

    function toggleNotification() {
        setIsOpenNotificationPopup((prev) => !prev);
    }

    const notificationRoute = async () => {
        const response = await handleNetwork();
        const chainId = process.env.REACT_APP_CHAIN_ID;
        if (chainId == NetworkConstants.MAINET_CHAIN_ID) {
            setNetworkName(NetworkConstants.MAINET);
            setName(NetworkConstants.TESTNET);
        }
        if (chainId != response) {
            openNavError(!isOpenNavError);
        } else {
            userData?.userId
                ? setIsOpenNotificationPopup(!isOpenNotificationPopup)
                : history.push("/wallet-connect");
        }
    } 

    return (
        <div className="bg-black-60 relative drop-shadow-mb hidden mb-e:block w-full z-20 6xl:h-fff">
            <div className="flex justify-between shadow-header w-full px-thp">
                <div className="w-1/3 flex justify-end">
                    <nav className="flex py-4  font-EurostileMedium justify-between w-nex xl:w-4/5">
                        <p
                            className="text-white hover:text-blue-80 cursor-pointer text-ft-1.4 xl:text-ft-1 transition-all"
                            onClick={exploreBtn}
                        >
                            Marketplace
                        </p>
                        <p
                            className="text-white hover:text-blue-80 cursor-pointer text-ft-1.4 xl:text-ft-1 transition-all"
                            onClick={statsBtn}
                        >
                            Stats
                        </p>
                        <p
                            className="text-white hover:text-blue-80 cursor-pointer text-ft-1.4 xl:text-ft-1 transition-all"
                            onClick={resourcesBtn}
                        >
                            Resources
                        </p>
                        <p
                            className="text-white hover:text-blue-80 cursor-pointer text-ft-1.4 xl:text-ft-1 transition-all"
                            onClick={collectionsBtn}
                        >
                            Collections
                        </p>
                    </nav>
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
                            className="absolute z-20 cursor-pointer transition-all 2xl:w-78 h-34 w-65 "
                        />
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="flex justify-between w-full max-w-650">
                        <div className="py-3.5 mb-e:w-1/2 lg:w-full ">
                            <div action="" className="">
                                <div className="relative flex items-center ">
                                    <img
                                        src="/images/search-icon.svg"
                                        alt="/"
                                        className="absolute ml-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        onChange={(e) => props.onGlobalSearch(e)}
                                        autoComplete="off"
                                        className="pl-10 cut-border h-8 text-grey-500 focus:outline-none min-w-30 border-r-4 border-blue-80 4xl:min-w-70"
                                    />
                                </div>
                                {props?.state?.isSearchBarOpen && (
                                    <div className="absolute text-white w-72 z-50">
                                        <div className="bg-grey-30 px-3 py-2.5">
                                            <div>
                                                <div className="font-bold ft6">Collections</div>
                                                <div className="pl-4 pt-1.5">
                                                    {props?.state?.collectionsList?.map((collection) => {
                                                        return (
                                                            <div
                                                                className="cursor-pointer truncate pt-1.5"
                                                                onClick={() => {
                                                                    history.push({
                                                                        pathname:
                                                                            "/collectionDetails/" + collection._id,
                                                                        state: {
                                                                            collectionAddress:
                                                                            collection.collectionAddress,
                                                                        },
                                                                    });
                                                                }}
                                                            >
                                                                <div className="text-grey-15">
                                                                    {collection.name}
                                                                </div>
                                                                <div className="text-grey-500 pl-3 text-ft1">
                                                                    {collection.nftCount}&nbsp;Items
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold ft6 pt-2">Items</div>
                                                <div className="pl-4 pt-1">
                                                    {props?.state?.nftsList?.map((nft) => {
                                                        return (
                                                            <div
                                                                className="cursor-pointer truncate pt-1.5"
                                                                onClick={() => {
                                                                    history.push(
                                                                        "/nft?id=" +
                                                                        nft._id +
                                                                        "&collectionAddress=" +
                                                                        nft.collectionId?.collectionAddress +
                                                                        "&tokenId=" +
                                                                        nft.tokenId
                                                                    );
                                                                }}
                                                            >
                                                                <div className="text-grey-15">{nft.name}</div>
                                                                {nft?.saleData?.isOpenForSale ? (
                                                                    <div className="text-grey-500 pl-3 text-ft1">
                                                                        On Sale for {nft?.saleData?.price}{" "}
                                                                        {nft?.saleData?.currency}{" "}
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="pt-3 flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        props.navigateToAllSearchResults();
                                                    }}
                                                    className="text-white bg-blue-60 border-2 rounded border-blue-60 w-28.75 rounded-2xl pb-0.5"
                                                >
                                                    All Results
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start py-3.5 justify-evenly mb-e:w-1/2 lg:w-full ml-3 6xl:pt-thp">
                            <div onClick={() => handleConnect()}>
                                <img
                                    src="/images/plus-icon.svg"
                                    alt="/"
                                    className="w-6 h-6 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
                                />
                                <img
                                    src="/images/plus-blue-icon.svg"
                                    alt="/"
                                    className="w-6 h-6 transition-all 2.5xl:w-8 2.5xl:h-8"
                                />
                            </div>
                            <div
                                onClick={() => {
                                    handleProfile();
                                }}
                            >
                                <img
                                    src="/images/user-icon.svg"
                                    alt="/"
                                    className="w-6 h-6 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
                                />
                                <img
                                    src="/images/blue-user-icon.svg"
                                    alt="/"
                                    className="w-6 h-6 transition-all 2.5xl:w-8 2.5xl:h-8"
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
                                    className="w-6 h-6 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-8 2.5xl:h-8"
                                />
                                <img
                                    src="/images/blue-wallet-icon.svg"
                                    alt="/"
                                    className="w-6 h-6 transition-all 2.5xl:w-8 2.5xl:h-8"
                                />
                            </div>

                            <div>
                                <div
                                    className="relative"
                                    onClick={
                                        notificationRoute
                                    }>
                                    <img
                                        src="/images/notification-white.svg"
                                        alt="/"
                                        className="w-7.5 h-6 absolute hover:opacity-0 cursor-pointer transition-all 2.5xl:w-12 2.5xl:h-9"
                                    />
                                    <img
                                        src="/images/notification-blue.svg"
                                        alt="/"
                                        className="w-7.5 h-6 transition-all 2.5xl:w-12 2.5xl:h-9"
                                    />
                                    <div className="">
                                        <span
                                            className="notification-count">{props?.walletConnect?.notificationUnreadCount==0?"":props?.walletConnect?.notificationUnreadCount}
                                            {props?.walletConnect?.notificationUnreadCount ? <span>+</span> : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpenNotificationPopup && (
                <div ref={notificationRef} className="z-20 absolute right-thp top-13">
                    {" "}
                    <NotificationPopup/>{" "}
                </div>
            )}
            {isOpenWalletTogglePopup && (
                <Popup
                    content={
                        userData?.userId ? (
                            // (
                            <Box1 ref={PopupRef}>
                                <PopDiv>
                                    {(picExtension === "mp4" || picExtension === "mov") ?
                                        (<video className="w-15 h-16 video_circle" src={userData?.profileImage} />) :
                                        (<DisImg
                                            src={picExtension === "mp3" ? "/images/music-bg.png" : userData?.profileImage || "/images/image-5.png"}
                                        />)
                                        }
                                    <Pop1text>
                                        {shorten(userData?.userId || " ")}{" "}
                                        <CopyToClipboard text={userData?.userId}>
                                            <ButtonCopy onClick={isDataCopied}>
                                                <ImgPop src="/images/Copy.svg"/>
                                            </ButtonCopy>
                                        </CopyToClipboard>
                                    </Pop1text>
                                </PopDiv>
                                <DisBox onClick={() => disconnect()}>Disconnect</DisBox>
                            </Box1>
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
            {isOpenNavError && (
                <Popup
                    content={
                        <>
                            <div
                                className="absolute z-index-1 bg-orange-10 w-full text-center font-medium pt-2 pb-2 mt-15.5">
                                {/* You're viewing data from the {networkName} network, but your
             wallet is connected to the {name} network (BSC).Please switch
             your network to {networkName} to perform trade */}
                                In order to connect your wallet, please switch to BSC{" "}
                                {networkName} network within your MetaMask wallet.
                            </div>
                        </>
                    }
                />
            )}
        </div>
    );
}

// export default HeaderComponent;
const mapStateToProps = (state) => {
    return {walletConnect: state.wallet};
};
export default connect(mapStateToProps)(HeaderComponent);
