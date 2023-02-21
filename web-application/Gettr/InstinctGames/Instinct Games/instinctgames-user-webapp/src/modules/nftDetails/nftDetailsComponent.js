import React, { useState, useEffect, useRef } from "react";
import { genericConstants } from "../../constants";
import ItemActivity from "../common/itemActivity/itemActivityTable";
import PriceGraph from "../common/priceGraph";
import NftCard from "../../common/components/nftCard";
import { GetColorName } from "hex-color-to-color-name";
import ReportDialog from "./reportNFT";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckOutDialog from "./buyNowDialog";
import SellNowDialog from "./sellNowDialog";
import RemoveSaleDialog from "./removeFromSaleDialog";
import toast, { Toaster } from "react-hot-toast";
import IosShareIcon from "@mui/icons-material/IosShare";
import RemoveOfferDialog from "./removeOfferDialog";
import { Link } from "react-router-dom";
import {
  NftConstants,
  transactionConstants,
  CURRENCIES,
} from "../../constants";
import MakeOfferPopup from "./makeOfferPopup";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { getOffer } from "../../services/contentMicroservice";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import AcceptOfferDialog from "./acceptOfferDialog";
import styled from "styled-components";
import SaleProcessModal from "./saleProcessModal";
import moment from "moment";
import { history } from "../../managers/history";
import nftDetails from ".";
import NftCreatedPopup from "./buyNftTokenPopUp";
import utility from "../../utility";
import Utils from "../../utility";
const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background: rgba(0, 0, 0, 0.5);
    // background-color: transparent;
  }
  .MuiDialog-paper {
    // background-color: transparent;
    /* @media(min-width:2000px){
      max-width:1000px
    } */
  }
`;

function CollectionDetailsComponent(props) {
  const activityHandler = (data) => {
    props.getItemActivityData(
      data.selectedOption,
      props.state?.nftDetails?._id
    );
  };
  return (
    <div className="bg-main bg-cover text-white pb-13 overflow-x-hidden">
      {NFTContentDetails(props)}
      {PropertiesAndListing(props)}

      <div className="flex ml-auto mr-auto w-nex xr:w-5/6 h-auto mb-10">
        {/* {ItemActivity(props,activityHandler={activityHandler} )} */}
        <ItemActivity
          itemActivities={props.itemActivities}
          activityHandler={activityHandler}
          options={props.state.itemActivitiesOptions}
        />
      </div>
      {props?.state?.nfts?.length ? (
        <div className="flex ml-auto mr-auto w-nex xr:w-5/6  mb-8">
          {RelatedColledtions(props)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function NFTContentDetails(props) {
  const { nftDetails, usdPrice } = props.state;
  const [makeOfferPopup, setToggleMakeOffer] = useState(false);
  const [openSellNowDialog, setOpenSellNowDialog] = useState(false);
  const [openCheckOutDialog, setOpenCheckOutDialog] = useState(false);
  const [openRemoveSaleDialog, setOpenRemoveSaleDialog] = useState(false);
  const audioRef = useRef();
  const location = useLocation();
  const userData = useSelector((state) => state.wallet.walletConnect);
  const [sortDropDown, setSortDropDown] = useState(false);
  const [filterbyDate, setFilterbyDate] = useState("Filter by Time");

  const [buttonText, setButtonText] = useState(
    getButtonText({
      nftDetails,
      userDetails: props.userDetails,
    })
  );
  useEffect(() => {
    setButtonText(
      getButtonText({
        nftDetails: nftDetails,
        userDetails: props.userDetails,
      })
    );
  }, [nftDetails, props.userDetails]);

  const handleForButton = () => {
    if (nftDetails?.cdnUrl?.split(".").pop() === "mp3") {
      audioRef.current.pause();
    }
    switch (buttonText) {
      case NftConstants.SELL_NOW:
        setOpenSellNowDialog(true);
        break;
      case NftConstants.REMOVE_FROM_SALE:
        setOpenRemoveSaleDialog(true);

        break;
      case NftConstants.BUY_NOW:
        setOpenCheckOutDialog(true);

        break;
      default:
        console.log("No Action Found");
    }
  };
  const sellNowHandler = (data) => {
    setOpenSellNowDialog(false);
    props.sellNowNft(data);
    // location.reload();
  };
  const removeSaleHandler = () => {
    setOpenRemoveSaleDialog(false);
    props.removeNftFromSale();
    // location.reload();
  };
  const checkoutHandler = () => {
    setOpenCheckOutDialog(false);
    props.buyNowNft();
    // location.reload();
  };
  const offerHandler = (data) => {
    setToggleMakeOffer(false);
    props.makeOffer(data);
  };

  function check(nftDetails, userData) {
    let offer = nftDetails?.offers || [];
    for (var i = 0; i < offer.length; i++) {
      if (offer[i].userAddress === userData.userId) {
        return true;
      } else {
        i++;
      }
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function bscLink() {
    window.location.href =
      process.env.REACT_APP_BINANCE_EXPLORER_LINK + nftDetails?.ownerAddress;
  }

  const SortConstants = [
    {
      name: "ALL Time",
      value: 365,
    },
    {
      name: "Monthly",
      value: 30,
    },
    {
      name: "Weekly",
      value: 7,
    },
  ];
  return (
    <div className="xr:flex tb:pt-25 pt-10 ml-auto mr-auto w-nex xr:w-5/6 mb-8 block h-full">
      <div className="flex xr:hidden">
        <div className="font-bold pr-4 text-ft8">
          {nftDetails?.name} # {nftDetails?.documentCount || " "}
        </div>
        <div className="text-ft0 pt-3">
          <Link to={{pathname: `/collectionDetails/${nftDetails.collectionId?._id}/${nftDetails.collectionId?.collectionAddress}`}}>
            <div className="text-grey-120 py-2">{nftDetails?.collectionName}</div>
          </Link>
          <div>
            Owned by{" "}
            <span className="text-blue-80 py-2">{nftDetails?.ownerAddress}</span>
          </div>
        </div>
      </div>
      <div className="xr:w-38pe w-full xr:pr-6 h-full">
        <div className="flex flex-col justify-center ml-auto mr-auto h-full">
          <div className="relative h-full cursor-pointer">
            {nftDetails?.cdnUrl?.split(".").pop() === "mp4" ||
              nftDetails?.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                <video
                  controls
                  className="rounded-md w-full h-75 xr:h-27vw tb:h-100 xr:min-h-430 object-cover"
                  src={nftDetails?.cdnUrl}
                  onClick={props.toggleFullImageView}
                  autoPlay
                  loop
                  playsInline
                ></video>
                <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                />
              </>
            ) : nftDetails?.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                <video
                  ref={audioRef}
                  controls
                  className="rounded-md w-full h-75 xr:h-27vw tb:h-100 xr:min-h-430 object-cover audio-nft"
                  onClick={props.toggleFullImageView}
                  src={nftDetails?.cdnUrl}
                  loop
                  playsInline
                  autoPlay
                >
                </video>
                <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                />
              </>
            ) : (
              <>
                <img
                  className="rounded-md w-full"
                  // h-75 xr:h-27vw tb:h-100 xr:min-h-430

                  src={nftDetails?.cdnUrl}
                  onClick={props.toggleFullImageView}
                ></img>
                <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                />
              </>
            )}
            {/* <img
              src="/images/hollow-heart.svg"
              className="bottom-3 right-4 absolute cursor-pointer"
              onClick={props.openSharePopup}
            ></img> */}
            {/* <IosShareIcon
              sx={{ fontSize: "30px" }}
              className="bottom-3 right-4 absolute"
            /> */}
            {SharePopup(props, nftDetails)}
          </div>

          <StyledDialog
            onClose={props.toggleFullImageView}
            open={props.state.openFullImageView}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            {nftDetails?.cdnUrl?.split(".").pop() === "mp4" ||
              nftDetails?.cdnUrl?.split(".").pop() === "mov" ? (
              <video
                controls
                src={nftDetails?.cdnUrl}
                className="h-screen object-cover"
              ></video>
            ) : nftDetails?.cdnUrl?.split(".").pop() === "mp3" ? (
              <video
                controls
                src={nftDetails?.cdnUrl}
                className="h-screen object-cover audio-nft audio-border"
              ></video>
            ) : (
              <img src={nftDetails?.cdnUrl} className="dialog-image"></img>
            )}
          </StyledDialog>
        </div>
      </div>
      <div className="xr:w-3/4 h-full w-full">
        <div className="flex flex-col justify-between ml-auto mr-auto mt-5 xr:mt-0 h-full">
          <div className="xr:flex hidden">
            <div className="font-bold pr-4 text-ft-3.2 w-pex whitespace-nowrap overflow-hidden">
              {nftDetails?.name}
              {/*#{nftDetails?.tokenId }*/}
            </div>
            <div className="xr:text-ft12 text-ft0 pt-3">
              <Link to={{ pathname: `/collectionDetails/${nftDetails.collectionId?._id}/${nftDetails.collectionId?.collectionAddress}` }}>
                <div className="text-grey-120 py-2">{nftDetails?.collectionName}</div>
              </Link>
              <div>
                Owned by{" "}
                <span className="text-blue-80 py-2">
                  <a
                    target="_blank"
                    href={
                      process.env.REACT_APP_BINANCE_EXPLORER_LINK +
                      nftDetails?.ownerAddress
                    }
                  >
                    {Utils.getFormattedAddress(nftDetails.ownerAddress)}
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-black-60 xr:h-22vw xr:min-h-350 nft-detail-polygon">
            <div className="flex justify-between m-oex">
              <div className="flex p-2 xr:items-end xr:w-twx xr:gap-x-tix">
                <div className="pt-1.5 pr-1.5">
                  <img
                    className="xr:w-9 w-3.5"
                    src="/images/open-graph.svg"
                  ></img>
                </div>
                <div className="xr:text-ft30 text-ft6">Price</div>
              </div>
              <div className="pr-5 pt-2 flex justify-between relative ">

                <div
                  className="flex justify-between  bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center  min-w-150 h-9.5 gap-1 p-2 mob:text-ft1"
                  onClick={() => setSortDropDown((prev) => !prev)}
                >
                  <span className="">
                    {filterbyDate}
                  </span>
                  <img
                    src={
                      sortDropDown ? "/images/arrow-up.svg" : "/images/arrow-down.svg"
                    }
                    className="2xl:h-3.5 h-2.5 w-4"
                  />
                </div>
                {sortDropDown ? (
                  <div className="bg-blue-400 z-50 absolute text-white text-ft3 border border-blue-80">
                    {SortConstants.map((item, index) => (
                      <div
                        key={index}
                        className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  min-w-150 2xl:h-10.5 h-9.5 mob:text-ft1 whitespace-nowrap"
                        onClick={() => {
                          props.filterByTime(item.value)
                          setSortDropDown(false)
                          setFilterbyDate(item.name)
                        }
                        }
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                {/* <select
                    className="bg-blue-60 xr:text-ft12 text-ft-10 border border-blue-80 mr-3 xr:w-47 w-21 xr:h-10.5 h-5 pl-3.25 pr-1 focus:outline-none"
                    onChange={props.selectTime}
                    value={props.state.selectedTime}
                  >
                    <option value={365}>All Time</option>
                    <option value={30}>Monthly</option>
                    <option value={7}>Weekly</option>
                  </select> */}

                <div
                  className="xr:pt-1.5 xr:w-7 w-4.5 ml-2"
                  onClick={props.toggleReportDialog}
                >
                  <img src="/images/report-icon.svg" className="cursor-pointer" alt="info"></img>
                </div>
                {props.state.reportDialog ? (
                  <ReportDialog
                    open={props.state.reportDialog}
                    handleClose={props.toggleReportDialog}
                    onReportNFT={props.onReportNFT}
                    selectReason={props.selectReason}
                    reportConfirmDialog={props.state.reportConfirmDialog}
                    handleSetState={props.handleSetState}
                    state={props.state}
                  ></ReportDialog>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="border-b-3 border-violet-10"></div>
            <div className="flex  nft-detail-polygon xr:h-eiy">
              <div className="w-1/3 border-r border-violet-10 2xl:p-8 xl:p-6 xr:p-4 p-3">
                <div className="xr:text-ft12 text-ft-10 text-center text-grey-120">
                  {nftDetails?.isListed ? "Current Price" : ""}
                </div>
                {nftDetails?.isListed ? (
                  <div className="flex justify-between pt-tix">
                    <div className="2xl:text-ft60 xr:text-ft11 text-ft6 font-bold pl-2">
                      {nftDetails?.price}
                    </div>
                    <div className=" pt-1 flex items-center">
                      {" "}
                      {utility.getTokenIcon(nftDetails?.currency) ? (
                        <img
                          className="xr:h-10 h-3.5"
                          src={utility.getTokenIcon(nftDetails?.currency)}
                        />
                      ) : (
                        nftDetails?.currency
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {genericConstants.CURRENCIES.includes(nftDetails?.currency) ? (
                  <div className="text-center xr:text-ft2 text-ft-10 text-grey-120">
                    ($
                    {props
                      .getUSDEquivalentValue(
                        nftDetails?.currency,
                        nftDetails?.saleData?.price
                      )
                      .toFixed(2)}
                    )
                  </div>
                ) : (
                  ""
                )}
                {buttonText === NftConstants.BUY_NOW ? (
                  <>
                    <button
                      className="bg-blue-60 border border-blue-80 min-w-25 xr:w-max xr:min-w-180 w-20 flex xr:p-2 xr:pl-4 p-0.5 items-center justify-center rounded-full ml-auto mr-auto mt-4 mb-4 market-button relative overflow-hidden"
                      onClick={() => handleForButton()}
                    >
                      <img
                        className="pr-4 xr:h-5.5 h-2"
                        src="/images/wallet-icon.svg"
                      ></img>
                      <span className="xr:text-ft-1 text-ft-10">
                        {buttonText}
                      </span>
                    </button>
                    {check(nftDetails, userData) === true ||
                      userData == false ? (
                      ""
                    ) : (
                      <button
                        className="bg-blue-60 border border-blue-80 min-w-25 xr:w-max xr:min-w-180 w-20 flex xr:p-2 xr:pl-4 p-0.5 items-center justify-center rounded-full ml-auto mr-auto market-button overflow-hidden relative"
                        onClick={() => setToggleMakeOffer(true)}
                      >
                        <img
                          className="xr:pr-4 pr-2 xr:h-5.5 h-3"
                          src="/images/tag-icon.svg"
                        ></img>
                        <span className="xr:text-ft-1 text-ft-10">
                          Make Offer
                        </span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-60 border border-blue-80 min-w-25 xr:min-w-180 w-20 flex xr:p-2 xr:pl-4 p-0.5 rounded-full ml-auto items-center justify-center mr-auto mt-4 mb-4 market-button relative overflow-hidden"
                      onClick={() => handleForButton()}
                    >
                      <img
                        className="xr:pr-4 pr-2 xr:h-5.5 h-3"
                        src="/images/wallet-icon.svg"
                      ></img>
                      <span className="  text-ft61">{buttonText}</span>
                    </button>
                  </>
                )}
              </div>

              <div className="w-2/3 ">
                {props?.state?.priceGraphData &&
                  props?.state?.priceGraphData.length ? (
                  <>
                    <div className="h-1/6 xr:pt-5 pt-3 pl-3 lmobile:text-ft-24 xr:text-ft-1.4 text-grey-120 flex xr:block">
                      <div className="xr:text-ft12 text-ft-10 lmobile:mt-0.75 lmobile:mr-2.5">
                        {
                          genericConstants.PRICE_GRAPH_FILTER[
                          props.state.selectedTime
                          ]
                        }
                      </div>

                      <div className="flex w-pex items-center">
                        <div className="xr:text-ft12 text-ft-10">
                          Average Price{" "}
                        </div>
                        &nbsp;
                        {/* <button onClick={() => props.testingToast()}>X</button> */}
                        <img src="/images/avg-price.svg" />
                        <div className="text-blue-80 pl-1">
                          {props?.state?.avgPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="xr:h-pex h-3/4 ">
                      <PriceGraph
                        data={props?.state?.priceGraphData}
                      ></PriceGraph>
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-25"> No Graph Data</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openCheckOutDialog && (
        <CheckOutDialog
          open={openCheckOutDialog}
          handleClose={setOpenCheckOutDialog}
          nftDetails={nftDetails}
          checkoutHandler={checkoutHandler}
          userDetails={props.userDetails}
        />
      )}
      {openSellNowDialog && (
        <SellNowDialog
          open={openSellNowDialog}
          handleClose={setOpenSellNowDialog}
          nftDetails={nftDetails}
          approvedTokens={props?.state?.approvedTokens}
          sellNowHandler={sellNowHandler}
        />
      )}
      {openRemoveSaleDialog && (
        <RemoveSaleDialog
          open={openRemoveSaleDialog}
          handleClose={setOpenRemoveSaleDialog}
          nftDetails={nftDetails}
          removeSaleHandler={removeSaleHandler}
          userDetails={props.userDetails}
        />
      )}
      {makeOfferPopup && (
        <MakeOfferPopup
          open={makeOfferPopup}
          offerHandler={offerHandler}
          handleClose={setToggleMakeOffer}
          approvedTokens={props?.state?.approvedTokens}
        // toggleModal={setToggleMakeOffer}
        />
      )}
      {props.isOpen && (
        <NftCreatedPopup
          content={props.content}
          isOpen={props.isOpen}
          steps={props.steps}
          handleClose={props.showPopup}
          nftDetails={props.state.nftDetails}
        />
      )}
    </div>
  );
}

function PropertiesAndListing(props) {
  const [showOffer, setShowOffer] = React.useState(false);
  const [nftOffer, setNftOffer] = React.useState([]);
  const userData = useSelector((state) => state.wallet.walletConnect);
  const [sortDropDown, setSortDropDown] = useState(false);

  const params = { ...props, nftOffer };
  React.useEffect(() => {
    getOfferList();
  }, []);
  const getOfferList = async () => {
    const request = {
      ownerAddress: userData.userId,
      contentId: props?.state?.id,
    };
    const response = await getOffer(request);
    if (response.length !== 0) {
      setShowOffer(true);
      setNftOffer(response);
    }
  };
  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  function bscLink() {
    window.location.href =
      process.env.REACT_APP_BINANCE_EXPLORER +
      "address/" +
      props?.state?.nftDetails?.collectionAddress;
  }


  return (
    <div className="text-white mt-eex xr:mt-0">
      <div className="ml-auto mr-auto w-nex xr:w-5/6 h-auto mb-8 xr:flex">
        <div className="xr:w-38pe w-full xr:pr-6 h-full">
          <div className="flex flex-col  properties-polygon  ml-auto mr-auto game-container h-full bg-black-100">
            <div
              onClick={() => props.toggleAccordian("propertiesAccordian")}
              className="flex justify-between cursor-pointer text-ft6 text-white xr:h-16.5 h-12 font-bold  bg-violet-10 p-1.5 pl-9"
            >
              <div className="flex items-center">
                <div className="flex mr-1 pr-1">
                  <img
                    className="xr:w-6 xr:h-6 w-4 h-4"
                    src="/images/info.svg"
                    alt="info"
                  ></img>
                </div>
                <div className=" font-black xr:text-ft30 text-ft6">
                  Properties
                </div>
              </div>
              <div className=" pr-1.75 cursor-pointer flex items-center">
                {props?.state?.propertiesAccordian ? (
                  <img
                    className="w-5"
                    src="/images/arrow-up.svg"
                    onClick={() => props.toggleAccordian("propertiesAccordian")}
                  ></img>
                ) : (
                  <img
                    className="w-5"
                    src="/images/arrow-down.svg"
                    onClick={() => props.toggleAccordian("propertiesAccordian")}
                  ></img>
                )}
              </div>
            </div>
            <div className="border border-violet-10">
              {props?.state?.propertiesAccordian ? PropertiesGrid(props) : ""}
              <div className="text-ft7 font-bold">
                <div
                  onClick={() => props.toggleAccordian("descriptionAccordian")}
                  className="border-t border-violet-10 cursor-pointer  border-b-0  p-3 flex justify-between"
                >
                  <div className="flex">
                    <div className="h-4.5">
                      {" "}
                      <img
                        className="p-2 w-8.75"
                        src="/images/paragraph.svg"
                      ></img>
                    </div>
                    <div className="xr:text-ft30 text-ft6">Description</div>{" "}
                  </div>
                  <div className="pt-1.5 pr-1.75">
                    {props?.state?.descriptionAccordian ? (
                      <img
                        className="w-5 cursor-pointer"
                        src="/images/arrow-up.svg"
                        onClick={() =>
                          props.toggleAccordian("descriptionAccordian")
                        }
                      ></img>
                    ) : (
                      <img
                        className="w-5 cursor-pointer"
                        src="/images/arrow-down.svg"
                        onClick={() =>
                          props.toggleAccordian("descriptionAccordian")
                        }
                      ></img>
                    )}
                  </div>
                </div>
                {props?.state?.descriptionAccordian ? (
                  <div className="py-3 pl-5 text-ft3 font-light h-50 overflow-scroll">
                    {props?.state?.nftDetails?.description}
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() =>
                    props.toggleAccordian("collectionDetailsAccordian")
                  }
                  className="border border-violet-10 cursor-pointer border-b-0 p-3 flex justify-between"
                >
                  <div className="flex">
                    <div className="h-4.5">
                      {" "}
                      <img
                        className="p-2 w-8.75"
                        src="/images/gallery-icon.svg"
                      ></img>
                    </div>
                    <div className="xr:text-ft30 text-ft6">Details</div>{" "}
                  </div>
                  <div className="pt-1.5 pr-1.75">
                    {props?.state?.collectionDetailsAccordian ? (
                      <img
                        className="w-5"
                        src="/images/arrow-up.svg"
                        onClick={() =>
                          props.toggleAccordian("collectionDetailsAccordian")
                        }
                      ></img>
                    ) : (
                      <img
                        className="w-5"
                        src="/images/arrow-down.svg"
                        onClick={() =>
                          props.toggleAccordian("collectionDetailsAccordian")
                        }
                      ></img>
                    )}
                  </div>
                </div>
                {props?.state?.collectionDetailsAccordian ? (
                  <div className="py-3 pl-5 text-ft3 font-light">
                    <div className="justify-between flex w-nsx">
                      <span> Contract Address</span>
                      <div className="text-blue-80 cursor-pointer">
                        <a
                          target="_blank"
                          href={
                            process.env.REACT_APP_BINANCE_EXPLORER +
                            "address/" +
                            props?.state?.nftDetails?.collectionAddress
                          }
                        >
                          {shorten(props?.state?.nftDetails?.collectionAddress)}

                        </a>
                      </div>
                    </div>
                    <div className="justify-between flex w-nsx">
                      <span>Token ID</span>
                      <span>{props?.state?.nftDetails?.tokenId}</span>
                    </div>
                    <div className="justify-between flex w-nsx">
                      <span> Token Standard</span>
                      <span>{props?.state?.nftDetails?.collectionId?.tokenType}</span>
                    </div>
                    <div className="justify-between flex w-nsx">
                      <span> Blockchain</span>
                      <span>Binance</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => props.toggleAccordian("aboutAccordian")}
                  className="border border-violet-10 cursor-pointer border-b-0 p-3 flex justify-between"
                >
                  <div className="flex">
                    <div className="h-4.5">
                      {" "}
                      <img className="p-2 w-8.75" src="/images/list.svg"></img>
                    </div>
                    <div className="xr:text-ft30 text-ft6">About</div>{" "}
                  </div>
                  <div className="pt-1.5 pr-1.75">
                    {props?.state?.aboutAccordian ? (
                      <img
                        className="w-5"
                        src="/images/arrow-up.svg"
                        onClick={() => props.toggleAccordian("aboutAccordian")}
                      ></img>
                    ) : (
                      <img
                        className="w-5"
                        src="/images/arrow-down.svg"
                        onClick={() => props.toggleAccordian("aboutAccordian")}
                      ></img>
                    )}
                  </div>
                </div>
                {props?.state?.aboutAccordian ? (
                  <div className="py-3 pl-5 text-ft3 font-light">
                    {props?.state?.nftDetailsFromDb?.collectionId?.description || "NA"}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="xr:w-3/4 h-full w-full mt-tix xr:mt-0">
          <div className="flex flex-col justify-center   ml-auto mr-auto game-container">
            <ListingTable props={props} />

            {showOffer && <OfferTable props={params} />}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
function ListingTable({props}) {
  let { listing } = props?.state;

  return (
    <div className=" h-full">
      <div className="h-110 w-full">
        {props?.state?.listingAccordian ? (
          <div className="p-1.5 text-ft6 text-white xr:h-16.5 h-12  font-bold  bg-violet-10 flex justify-between">
            <div className="flex xr:pl-3 items-center">
              <div className="flex mr-1 pr-1">
                <img
                  className="xr:w-6 xr:h-6 w-4 h-4"
                  src="/images/tag-icon.svg"
                  alt="tag"
                ></img>
              </div>
              <div className=" font-black xr:text-ft30 text-ft6">Listings</div>
            </div>
            <div className="flex items-center pr-1.75">
              <img
                className="w-5 cursor-pointer flex items-center"
                src="/images/arrow-up.svg"
                onClick={() => props.toggleAccordian("listingAccordian")}
              ></img>
            </div>
          </div>
        ) : (
          <div className="p-1.5 text-ft6 text-white  font-bold bg-black-60 flex justify-between border border-violet-10">
            <div className="flex pl-3">
              <div className="pt-1.5 mr-1 pr-1">
                <img className="w-4" src="/images/tag-icon.svg" alt="tag"></img>
              </div>
              Listings
            </div>
            <div className="pt-1.5 pr-1.75">
              <img
                className="w-5 cursor-pointer"
                src="/images/arrow-down.svg"
                onClick={() => props.toggleAccordian("listingAccordian")}
              ></img>
            </div>
          </div>
        )}
        {props?.state?.listingAccordian ? (
          <div className=" border border-violet-10 bg-black-100">
            <table className="text-ft1  w-full  bg-black-100 text-white ">
              <thead className="text-grey-120 pt-5  pb-5 text-ft3">
                <tr className="grid grid-cols-3  pb-2 pt-2 pl-5 text-tHead justify-items-start">
                  <th className="font-normal">Price</th>
                  <th className="font-normal">USD Price</th>
                  {/* <th className="font-normal">Floor Difference</th>
                                <th className=" whitespace-nowrap font-normal">Expiration</th> */}
                  <th className="font-normal">From</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b-2 border-violet-10"></tr>
                {listing && listing.length ? (
                  listing.map((data, index) => {
                    return (
                      <tr className="grid grid-cols-3 gap-x-0 justify-items-start border-down font-PoppinsMedium text-ft4 py-3 cursor-pointer text-white ml-5 mr-5">
                        <td className="border-collapse flex">
                          {data.price}{" "}
                          <span>
                            {utility.getTokenIcon(data.currency) ? (
                              <img
                                className="w-4.5 mt-1 ml-1"
                                src={utility.getTokenIcon(data.currency)}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        </td>
                        <td className="w-full pl-1 whitespace-nowrap">
                          {props
                            .getUSDEquivalentValue(data?.currency, data?.price)
                            .toFixed(2)}
                        </td>
                        {/* <td className="w-full pl-1 text-blue-80 font-normal">{data.status}</td> */}
                        {/* <td className="w-full pl-3 text-blue-80 font-normal">{data.ticketCount}</td> */}
                        <td className="w-full pl-3 text-blue-80 font-normal">
                          {data.from}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-center h-10.25 text-2xl font-semibold pt-2.5">
                    No Data Available
                  </div>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
function OfferTable(params) {
  const [acceptOfferDialog, setAcceptOfferDialog] = React.useState(false);
  const [saleProcessPopup, setSaleProcessPopup] = useState(false);
  const [offerData, getOfferData] = React.useState("");
  // const [offerExpired,setOfferExpired]=React.useState(false)
  const [openRemoveOfferDialog, setOpenRemoveOfferDialog] =
    React.useState(false);
  const { props } = params;
  const currencyIcon = useSelector((state) => state.currency);
  const findCurrencyUSDPrice = (value) => {
    if (genericConstants.CURRENCIES.includes(value)) {
      switch (value) {
        case genericConstants.CURRENCY_SYMBOL.BNB:
          return currencyIcon.priceBNBToUSD ? currencyIcon.priceBNBToUSD : 100;
        case genericConstants.CURRENCY_SYMBOL.SACREDTALES:
          return currencyIcon.priceSacredToUSD
            ? currencyIcon.priceSacredToUSD
            : 100;
        case genericConstants.CURRENCY_SYMBOL.INSTINCT:
          return currencyIcon.priceInstinctToUSD
            ? currencyIcon.priceInstinctToUSD
            : 100;
        default:
          return 100;
      }
    }
    return 100;
  };
  const checkoutHandler = () => {
    setAcceptOfferDialog(false);
  };
  const removeOfferHandler = () => {
    setOpenRemoveOfferDialog(false);
  };
  //   const reload = (data)=>{
  //     toast.success("Offer Expired");
  // setTimeout=(()=>{
  //   setOfferExpired(true)

  // },data)
  //     // history.push("/nft/" + props.state.nftDetails._id);
  //     // window.location.href=`/nft/${props.state.nftDetails._id}`;
  //   }

  // check for tab1 and tab2
  function bscLink(address) {
    window.location.href =
      process.env.REACT_APP_BINANCE_EXPLORER_LINK + address;
  }
  return (
    <div className=" h-full  ">
      <div className="h-110 w-full">
        {props?.state?.offerAccordian ? (
          <div className="p-1.5 text-ft6 text-white  font-bold  bg-violet-10 flex justify-between">
            <div className="flex pl-3">
              <div className="pt-1.5 mr-1 pr-1">
                <img
                  className="w-4"
                  src="/images/offer-list-icon.svg"
                  alt="list"
                ></img>
              </div>
              Offers
            </div>
            <div className="pt-1.5 pr-1.75">
              <img
                className="w-5 cursor-pointer"
                src="/images/arrow-up.svg"
                onClick={() => props.toggleAccordian("offerAccordian")}
              ></img>
            </div>
          </div>
        ) : (
          <div className="p-1.5 text-ft6 text-white  font-bold  bg-black-60 flex justify-between border border-violet-10">
            <div className="flex pl-3">
              <div className="pt-1.5 mr-1 pr-1">
                <img
                  className="w-4"
                  src="/images/offer-list-icon.svg"
                  alt="list"
                ></img>
              </div>
              Offers
            </div>
            <div className="pt-1.5 pr-1.75">
              <img
                className="w-5 cursor-pointer"
                src="/images/arrow-down.svg"
                onClick={() => props.toggleAccordian("offerAccordian")}
              ></img>
            </div>
          </div>
        )}
        {props?.state?.offerAccordian ? (
          <>
            <div className="tablet:relative border overflow-x-scroll border-violet-10 bg-black-100">
              <table className="text-ft1  w-full tablet:w-218.75 mobile:w-151 bg-black-100 text-white ">
                <thead className="text-grey-120 pt-5  pb-5 text-ft3">
                  <tr className="grid grid-cols-4  pb-2 pt-2 pl-5 text-tHead justify-items-start">
                    <th className="font-normal">Price</th>
                    <th className="font-normal">USD Price</th>
                    <th className="font-normal">Expiration</th>
                    <th className="font-normal">from</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b-2 border-violet-10"></tr>
                  {props.state.offersList && props.state.offersList.length ? (
                    props.state.offersList?.map((data, index) => {
                      return data.offers.expTime > Date.now() ? (
                        <>
                          <tr
                            key={index}
                            className="grid grid-cols-4 gap-x-0 justify-items-start border-down font-PoppinsMedium text-ft4 py-3 cursor-pointer text-white ml-5 mr-5"
                          >
                            <td className="border-collapse flex w-full">
                              {data.offers.amount} &nbsp;
                              {Utils.getTokenIcon(data.offers.currency) ? (
                                <img
                                  src={Utils.getTokenIcon(data.offers.currency)}
                                  className="w-nix h-efx"
                                />
                              ) : (
                                <span className="overflow-hidden">
                                  {" "}
                                  {data.offers.currency}
                                </span>
                              )}
                            </td>
                            <td className="w-full whitespace-nowrap flex">
                              <p className="w-eix">
                                {props.getUSDEquivalentValue(
                                  data.offers.currency,
                                  data.offers.amount
                                )
                                  ? props
                                    .getUSDEquivalentValue(
                                      data.offers.currency,
                                      data.offers.amount
                                    )
                                    .toFixed(2)
                                  : 0}
                              </p>
                              <button
                                className="market-button rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 text-ft-0.7 font-PoppinsMedium w-1/2 ml-twx cursor-pointer"
                                onClick={() => {
                                  setAcceptOfferDialog(true); // try to make 1 fun here and others in separate fun of that fun
                                  getOfferData(data);
                                  props.getOffer(data);
                                }}
                              >
                                Accept
                              </button>
                            </td>
                            <td className="w-full pl-3 text-blue-80 font-normal">
                              {/* {data.offers.expTime<Date.now()?"Offer Closed":"Offer Running"} */}
                              {moment(data.offers.expTime).format(
                                "DD MMM YYYY"
                              )}
                            </td>
                            <td className="w-full pl-3 text-blue-80 font-normal flex">
                              <span className="w-nex">
                                {" "}
                                <a
                                  target="_blank"
                                  href={
                                    process.env.REACT_APP_BINANCE_EXPLORER +
                                    "address/" +
                                    data.offers.userAddress
                                  }
                                >
                                  {" "}
                                  {Utils.getFormattedAddress(
                                    data.offers.userAddress
                                  )}
                                </a>
                              </span>
                              <img
                                src="/images/offer-delete.svg"
                                onClick={() => {
                                  setOpenRemoveOfferDialog(true);
                                  getOfferData(data);
                                  props.getOffer(data);
                                }}
                              />
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full justify-center font-EurostileBold text-white text-ft12 py-5 px-5">No offers available</div>
                        </>
                      );
                    })
                  ) : (
                    <div className="flex w-full justify-center font-EurostileBold text-white text-ft12 py-5 px-5">No offers available</div>
                  )}
                </tbody>
              </table>
            </div>
            {acceptOfferDialog && (
              <AcceptOfferDialog
                open={acceptOfferDialog}
                handleClose={setAcceptOfferDialog}
                specificOffer={offerData}
                checkoutHandler={checkoutHandler}
                saleProcessPopup={setSaleProcessPopup}
                acceptOfferNft={props.acceptOfferNft}
                currency={offerData.offers.currency}
                convertedUSD={
                  props.getUSDEquivalentValue(
                    offerData.offers.currency,
                    offerData.offers.amount
                  )
                    ? props
                      .getUSDEquivalentValue(
                        offerData.offers.currency,
                        offerData.offers.amount
                      )
                      .toFixed(2)
                    : 0
                }
              />
            )}
            {openRemoveOfferDialog && (
              <RemoveOfferDialog
                open={openRemoveOfferDialog}
                handleClose={setOpenRemoveOfferDialog}
                specificOffer={offerData}
                removeOfferHandler={removeOfferHandler}
                rejectOfferNft={props.rejectOfferNft}
              />
            )}
            {saleProcessPopup && (
              <SaleProcessModal
                params={props}
                open={saleProcessPopup}
                handleClose={setSaleProcessPopup}
                specificOffer={offerData}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
function PropertiesGrid(props) {
  const { nftDetails } = props.state;
  return (
    <div className="p-3 grid grid-cols-2 max-h-55 overflow-y-auto">
      {nftDetails?.attributes?.length ? (
        nftDetails.attributes.map((property) => (
          <>
            {property?.trait_type ? (
              <div className="border border-blue-80 p-3 pl-4 pr-4 m-2 rounded text-center text-ft1">
                <div className="text-blue-80 pb-1">{property.trait_type}</div>
                {property?.color ? (
                  <div className="pb-1">{GetColorName(property.color)}</div>
                ) : (
                  ""
                )}
                {property?.value ? (
                  <div className="text-grey-120 font-semibold">
                    {property.value}
                  </div>
                ) : (
                  ""
                )}
                {property?.percentage ? (
                  <div className="text-grey-120 font-light">
                    {property.percentage.toFixed(2)}% have this trait
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="text-center">No Properties Available</div>
            )}
          </>
        ))
      ) : (
        <div className="text-center">No Properties Available</div>
      )}
    </div>
  );
}
function RelatedColledtions(props) {
  const { state } = props;

  return (
    <>
      <div className="bg-black-100 w-auto overflow-auto pt-8 pb-8 xr:pl-16 xr:pr-16 px-8 related-polygon  shadow-inner-md shadow-grey-20 ml-auto mr-auto">
        <div className="text-ft8 pb-3 font-bold text-center">
          More From this Collection
        </div>
        <div className="flex overflow-x-auto scroll-width pt-5 more-from-collection mr-auto ml-auto justify-between">
          {state?.nfts && state?.nfts?.length
            ? state.nfts.map((nft) => (
              <div
                className="pb-6 pr-3 pl-3 ml-auto mr-auto"
                onClick={() => {
                  props.onClickNFT(nft);
                }}
              >
                <NftCard nft={nft} widthCard="w-50" imageHeight="h-40" />
              </div>
            ))
            : ""}
        </div>
      </div>
    </>
  );
}

function SharePopup(props, nftDetails) {
  const open = Boolean(props.state.sharePopup);
  const history = useHistory();
  const handleCopyToClipboard = () => {
    toast.success("Page URL Copied");
  };
  const extension = nftDetails?.cdnUrl?.split(".").pop();

  let cssBottom;
  switch (extension) {
    case "mp4":
      cssBottom = "bottom-15";
      break;
    case "mp3":
      cssBottom = "bottom-15";
      break;
    case "mov":
      cssBottom = "bottom-15";
      break;
    default:
      cssBottom = "bottom-3";
  }
  const url = window.location.href;
  return (
    <div>
      {/* <img
        src="/images/hollow-heart.svg"
        className="bottom-3 right-4 absolute"
        variant="contained"
        onClick={props.openSharePopup}
      ></img> */}
      <IosShareIcon
        sx={{ fontSize: "30px" }}
        onClick={props.openSharePopup}
        className={`${cssBottom} right-4 absolute`}
      />
      <Popover
        open={open}
        anchorEl={props.state.sharePopup}
        onClose={props.closeSharePopup}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <Toaster />
        </div>
        <div className="p-4 xr:pr-6 bg-black-80 text-white border border-violet-10 text-ft6 font-light">
          <CopyToClipboard text={url}>
            <div
              className="flex p-1 cursor-pointer"
              onClick={handleCopyToClipboard}
            >
              <img src="/images/Copy.svg" className="w-10 pr-1"></img>
              <div className="pt-1">Copy Link</div>
            </div>
          </CopyToClipboard>
          {/* <FacebookShareButton
            className="flex p-1 cursor-pointer"
            url={props?.state?.nftDetails?.cdnUrl}
          >
            <img src="/images/Copy.svg" className="w-10 pr-1"></img>
            <div className="pt-1">Share On Facebook</div>
          </FacebookShareButton> */}

          <TwitterShareButton
            className="flex p-1 cursor-pointer"
            url={props?.state?.nftDetails?.cdnUrl}
          >
            <img src="/images/Copy.svg" className="w-10 pr-1"></img>
            <div className="pt-1">Share On Twitter</div>
          </TwitterShareButton>
        </div>
      </Popover>
    </div>
  );
}
export default CollectionDetailsComponent;

function getButtonText({ nftDetails, userDetails }) {
  //need to update userId to address
  if (!userDetails?.userId) {
    return
  }
  else if (
    nftDetails?.ownerAddress?.toLowerCase() ===
    userDetails?.userId?.toLowerCase()
  ) {
    return (nftDetails?.collectionId?.tokenType === "ERC1155" ? (nftDetails?.isListed && nftDetails?.saleData?.isOpenForSale
      ? NftConstants.REMOVE_FROM_SALE
      : NftConstants.SELL_NOW) :
      (nftDetails?.isListed
        ? NftConstants.REMOVE_FROM_SALE
        : NftConstants.SELL_NOW)
    )
  } else {
    return (nftDetails?.collectionId?.tokenType === "ERC1155" ?
      (nftDetails?.isListed && nftDetails?.saleData?.isOpenForSale ?
        NftConstants.BUY_NOW : "") :
      (nftDetails?.isListed ?
        NftConstants.BUY_NOW : "")
    );
  }
}
