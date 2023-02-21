import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { profileTab } from "../../constants";
import Utility from "../../utility";
import Activity from "../activity";
import { NftList } from "./nftList";
import { useSelector } from "react-redux";
import { getOffer } from "../../services/contentMicroservice";
import { genericConstants } from "../../constants";
import RemoveOfferDialog from "../nftDetails/removeOfferDialog";
import AcceptOfferDialog from "../nftDetails/acceptOfferDialog";
import SaleProcessModal from "../nftDetails/saleProcessModal";
import NftCard from "../../common/components/nftCard";
// import { Shape, star, hexagon } from 'styled-shapes';

// import { getNFTDetails } from "./index";
import moment from "moment";
import utility from "../../utility";

function ProfileComponent(props) {
  const [showOffer, setShowOffer] = React.useState([]);
  const currencyIcon = useSelector((state) => state.currency);

  useEffect(() => { }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  const userData = useSelector((state) => state.wallet.walletConnect);
  React.useEffect(() => {
    getOfferList();
  }, []);
  const getOfferList = async () => {
    const request = {
      ownerAddress: userData.userId,
    };
    const response = await getOffer(request);
    if (response.length !== 0) {
      setShowOffer(response);
    }
  };

  const [activeTab, setActiveTab] = React.useState(0);
  const [offerData, getOfferData] = React.useState("");

  const [acceptOfferDialog, setAcceptOfferDialog] = React.useState(false);
  const [saleProcessPopup, setSaleProcessPopup] = React.useState(false);
  const [openRemoveOfferDialog, setOpenRemoveOfferDialog] =
    React.useState(false);
  const checkoutHandler = () => {
    setAcceptOfferDialog(false);
  };
  const removeOfferHandler = () => {
    setOpenRemoveOfferDialog(false);
  };
  // const [isWeeklyDropDownVisible, setWeeklyDropDownVisible] =
  //   React.useState(false);
  const [isItemDropDownVisible, setItemDropDownVisible] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      name: "Single Item",
      value: "1",
    },
    {
      name: "Multiple Items",
      value: "2",
    },
  ]);

  const [selectedWeeklyIndex, setSelectedWeeklyIndex] = React.useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);

  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  const [unHide, setUnHide] = React.useState(false)
  const [fav, setFav] = React.useState(false)

  return (
    <div>
      <div className="bg-profileBannerBackground bg-cover w-full lg:h-100 h-30.75 tb:h-62.5 flex justify-center">
        <div className={`w-full ${props?.state?.userDetails?.coverUrl ? "max-w-2500px" : ""}`}>
          <img
            className="w-full lg:h-100 h-30.75 object-cover object-bottom tb:h-62.5"
            // className="w-full h-85.5 object-cover object-bottom"
            src={
              props?.state?.userDetails?.coverUrl
                ? props?.state?.userDetails?.coverUrl
                : "/images/default-banner.png"
            }
          />
        </div>
      </div>
      <div className="bg-main bg-cover bg-black-60 pb-8">
        {ProfileSection(props)}

        {props.state.defaultTab === profileTab[0] ? (
          <>
            <div className="hidden lg:block">{FavoriteNftsSection(props)}</div>
            <div className="block lg:hidden">{MobileFavourited(props)}</div>
            <div className="max-w-lg5 px-10 m-auto mt-15 flex justify-between">
              <div className="text-ft17 font-extrabold text-white">
                COLLECTIONS
              </div>
              <div className="lg:flex mob:hidden flex pt-2 w-full justify-end">
                <div>
                  {/* <select
              value={props?.state?.itemsFilter}
              className="select-edit bg-blue-60 w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60 text-white h-10.5 text-ft12"
              onChange={(e) => props.changeItemsFilter(e)}
            >
              <option value="Single Items">Single Item</option>
              <option value="Multiple Items">Multiple Items</option>
            </select> */}

                  {/* <div className="p-3 relative">
                    <div
                      className="flex justify-between  py-2.5 px-4 bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft-1 items-center 2xl:w-47 2xl:h-10.5 w-40 h-9.5"
                      onClick={(e) => {
                        setItemDropDownVisible(!isItemDropDownVisible);
                      }}
                    >
                      <span>
                        {selectedItemIndex != null
                          ? items[selectedItemIndex].name
                          : "Select"}
                      </span>
                      <img
                        src="/images/arrow-down.svg"
                        className="2xl:h-3.5 2xl:w-6 h-2.5 w-5"
                      />
                    </div>
                    {isItemDropDownVisible ? (
                      <div className="bg-blue-400 z-50 absolute text-white text-ft-1 2xl:w-47  w-40 border border-blue-80">
                        {items.map((item, index) => (
                          <div
                            key={item.value}
                            className="py-2.5 px-4 hover:bg-blue-80 border-b border-blue-80 2xl:h-10.5 h-9.5"
                            onClick={() => {
                              setSelectedItemIndex(index);
                              setItemDropDownVisible(false);
                              // props.changeItemsFilter(item.name);
                            }}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div> */}
                </div>
                <div className="pl-2 ">
                  {/* <select
              value={props?.state?.timeFilter}
              className=" select-edit bg-blue-60 w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60 text-white h-10.5 text-ft12"
              onChange={(e) => props.changeTimeFilter(e)}
            >
              <option value="Recently Received">Recently Received</option>
              <option value="Multiple Items">Multiple Items</option>
            </select> */}

                  <div className="p-3 relative w-auto">
                    <div
                      className="flex bg-blue-400 cursor-pointer border px-4 py-2 border-blue-80 text-white text-ft63 items-center  mob:text-ft1"
                      onClick={props.toogleFilterDropdown}
                    >
                      <span>
                        {props.state.recentFilterIndex != null
                          ? genericConstants.RECENTLY_FILTER[
                            props.state.recentFilterIndex
                          ].name
                          : "Select"}
                      </span>
                      <div className="ml-2 ">
                        <img
                          src={props.state.recentFilter ? "/images/arrow-up.svg" : "/images/arrow-down.svg"}
                          className="w-4.5"
                        />
                      </div>
                    </div>
                    {props.state.recentFilter ? (
                      <div className="bg-blue-400 z-50 absolute text-white mob:text-ft1 border    border-blue-80">
                        {genericConstants.RECENTLY_FILTER.map((item, index) => (
                          <div
                            key={item.value}
                            className=" hover:bg-blue-80 border-b border-blue-80 py-3 px-8 text-ft63 mob:text-ft1 whitespace-nowrap"
                            onClick={() => {
                              props.onChangeRecentFilter(index);
                            }}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden ">
              {/* {CollectionSection(props)} */}
              <CollectionSection
                {...props}
                findCurrencyUSDPrice={findCurrencyUSDPrice}
                setAcceptOfferDialog={setAcceptOfferDialog}
                getOfferData={getOfferData}
                shorten={shorten}
                setOpenRemoveOfferDialog={setOpenRemoveOfferDialog}
                acceptOfferDialog={acceptOfferDialog}
                offerData={offerData}
                checkoutHandler={checkoutHandler}
                setSaleProcessPopup={setSaleProcessPopup}
                openRemoveOfferDialog={openRemoveOfferDialog}
                removeOfferHandler={removeOfferHandler}
                saleProcessPopup={saleProcessPopup}
              ></CollectionSection>
            </div>
            <div className="  xlr:hidden max-w-lg5 px-10 m-auto mt-15">
              <div className="flex gap-1 ml-4 -mr-3.25">
                <button
                  className={
                    props?.state?.active === "collected"
                      ? " bg-primary-50 flex-1 h-15 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                      : "flex-1 h-15 bg-blue-300 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                  }
                  onClick={() => {
                    props.activeTab("collected");

                    // props.toggleCollectionTab("collected");
                  }}
                >
                  <div className="flex justify-center items-center transform skew-x-20 gap-x-2.25">
                    <img src="/images/gallery-icon.svg" />
                    <span>Collected</span>
                  </div>
                </button>
                <button
                  className={
                    props?.state?.active === "created"
                      ? "bg-primary-50 flex-1 h-15 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                      : "flex-1 h-15 bg-blue-300 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                  }
                  onClick={() => {
                    props.activeTab("created");
                    // props.toggleCollectionTab("created");
                  }}
                >
                  <div className="flex justify-center items-center transform skew-x-20 gap-x-2.25">
                    <img src="/images/roller-icon.svg" />
                    <span>Created</span>
                  </div>
                </button>
                <button
                  className={
                    props?.state?.active === "hidden"
                      ? " bg-primary-50 flex-1 h-15 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                      : "flex-1 h-15 bg-blue-300 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                  }
                  onClick={() => {
                    props.activeTab("hidden");
                    // props.toggleCollectionTab("hidden");
                  }}
                >
                  <div className="flex justify-center items-center transform skew-x-20 gap-x-2.25">
                    <img src="/images/eye-slash.svg" />
                    <span>Hidden</span>
                  </div>
                </button>
                <button
                  className={
                    props?.state?.active === "offers"
                      ? "bg-primary-50 flex-1 h-15 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                      : "flex-1 h-15 bg-blue-300 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white transform -skew-x-20"
                  }
                  onClick={() => {
                    props.activeTab("offers");
                    // props.toggleCollectionTab("offers");
                  }}
                >
                  <div className="flex justify-center items-center transform skew-x-20 gap-x-2.25">
                    <img src="/images/list.svg" />
                    <span>Offers</span>
                  </div>
                </button>
                <button
                  className={
                    props?.state?.active === "favourited"
                      ? "bg-primary-50 flex-1 h-15 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white relative right-3.5 single-cut"
                      : "flex-1 h-15 bg-blue-300 font-black font-Eurostile xl:text-ft16 tb:text-ft4 text-white relative right-3.5 single-cut"
                  }
                  onClick={() => {
                    props.activeTab("favourited");
                    // props.toggleCollectionTab("favourited");
                  }}
                >
                  <div className="flex justify-center items-center  gap-x-2.25">
                    <img src="/images/white-heart-empty.svg" />
                    <span>Favourite</span>
                  </div>
                </button>
              </div>

              <div className="border-2 rounded border-blue-60 bg-grey-30">
                {props?.state?.active === "collected" ? (
                  <>
                    <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
                      <NftList
                        nfts={props?.state?.collectedNfts}
                        limit={props?.state?.collectedNftsLimit}
                        totalNftsCount={props?.state?.totalCollectedNftsCount}
                        filterNftList={props.filterCollectedNftList}
                      />
                    </div>
                  </>
                ) : props?.state?.active === "created" ? (
                  <>
                    {console.log("created")}

                    <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
                      <NftList
                        nfts={props?.state?.createdNfts}
                        limit={props?.state?.createdNftsLimit}
                        totalNftsCount={props?.state?.totalCreatedNftsCount}
                        filterNftList={props.filterCreatedNftList}
                      />
                    </div>
                  </>
                ) : props?.state?.active === "hidden" ? (
                  <>
                    <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
                      <NftList
                        unHide={unHide}
                        nfts={props?.state?.hiddenNfts}
                        limit={props?.state?.hiddenNftsLimit}
                        totalNftsCount={props?.state?.totalHiddenNftsCount}
                        filterNftList={props.filterHiddenNftList}
                      />
                    </div>
                  </>
                ) : props?.state?.active === "offers" ? (
                  <>
                    <OffersTable
                      {...props}
                      findCurrencyUSDPrice={findCurrencyUSDPrice}
                      setAcceptOfferDialog={setAcceptOfferDialog}
                      getOfferData={getOfferData}
                      shorten={shorten}
                      setOpenRemoveOfferDialog={setOpenRemoveOfferDialog}
                      acceptOfferDialog={acceptOfferDialog}
                      offerData={offerData}
                      checkoutHandler={checkoutHandler}
                      setSaleProcessPopup={setSaleProcessPopup}
                      openRemoveOfferDialog={openRemoveOfferDialog}
                      removeOfferHandler={removeOfferHandler}
                      saleProcessPopup={saleProcessPopup}
                    ></OffersTable>
                    {/* <div className="max-h-160 overflow-y-auto border border-primary-50 flex justify-center overflow-x-hidden">
                      <table className="w-efx">
                        <thead className="text-grey-120 pt-5  pb-5 text-ft3 ">
                          <tr className="grid grid-cols-5  pb-2 pt-2 pl-5 text-tHead justify-items-start">
                            <th className="font-normal">Item</th>
                            <th className="font-normal">Price</th>
                            <th className="font-normal">USD Price</th>
                            <th className="font-normal">Expiration</th>
                            <th className="font-normal">From</th>
                          </tr>
                        </thead>
                        <hr className="border-b-3 border-primary-50 w-120pe -ml-tix" />
                        <tbody className="text-white">
                          {props.state.offersList.length !== 0 ? (
                            props.state.offersList.map((curElem, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="grid grid-cols-5 gap-x-0 justify-items-start border-down font-PoppinsMedium text-ft4 mobile:text-ft2 py-3 cursor-pointer text-white ml-5 mr-5"
                                >
                                  <td className="border-collapse flex">
                                    <img
                                      src={curElem.cdnUrl || curElem.ipfsUrl}
                                      className="w-twx"
                                    />
                                    <h1>{curElem.name || "--"}</h1>
                                  </td>
                                  <td className="border-collapse flex items-center w-full">
                                    <p>{curElem.offers.amount}&nbsp;</p>
                                    <img
                                      src="/images/binance-icon.svg"
                                      className="w-eex h-1/2"
                                    />
                                  </td>
                                  <td className="w-full pl-1 flex text-grey-55">
                                    $
                                    <p className="w-tix">
                                      {(
                                        findCurrencyUSDPrice(
                                          curElem.offers.currency
                                        ) * curElem.offers.amount
                                      ).toFixed(2)}
                                    </p>
                                    <button
                                      className="market-button rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 text-ft-0.7 font-PoppinsMedium w-1/2 ml-twx h-8"
                                      onClick={() => {
                                        setAcceptOfferDialog(true);
                                        getOfferData(curElem);
                                        props.getOffer(curElem);
                                        props.nftDetails(curElem._id);
                                      }}
                                    >
                                      Accept
                                    </button>
                                  </td>
                                  <td className="w-full pl-3 font-normal text-grey-55">
                                    {moment(curElem.offers.expTime).format(
                                      "DD MMM YYYY"
                                    )}
                                  </td>
                                  <td className="w-full pl-3 text-blue-80 font-normal flex">
                                    {shorten(curElem.offers.userAddress)}{" "}
                                    &nbsp;&nbsp;&nbsp;
                                    <img
                                      className="h-6.25"
                                      src="/images/delete-forever.svg"
                                      onClick={() => {
                                        setOpenRemoveOfferDialog(true);
                                        getOfferData(curElem);
                                        props.getOffer(curElem);
                                        props.nftDetails(curElem._id);
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div className="text-white">No Offers Found</div>
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
                        convertedUSD={(
                          findCurrencyUSDPrice(offerData.offers.currency) *
                          offerData.offers.amount
                        ).toFixed(2)}
                      />
                    )}
                    {openRemoveOfferDialog && (
                      <RemoveOfferDialog
                        open={openRemoveOfferDialog}
                        specificOffer={offerData}
                        handleClose={setOpenRemoveOfferDialog}
                        removeOfferHandler={removeOfferHandler}
                        rejectOfferNft={props.rejectOfferNft}
                      />
                    )}
                    {saleProcessPopup && (
                      <SaleProcessModal
                        open={saleProcessPopup}
                        handleClose={setSaleProcessPopup}
                        specificOffer={offerData}
                      />
                    )} */}
                  </>
                ) : props?.state?.active === "favourited" ? (
                  <>
                    <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
                      <NftList
                        fav={fav}
                        nfts={props?.state?.favoriteNfts}
                        limit={props?.state?.allFavoriteNftsLimit}
                        totalNftsCount={props?.state?.totalFavoriteNftsCount}
                        filterNftList={props.allFavoriteNftList}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <Activity />
        )}
      </div>
    </div>
  );
}

function ProfileSection(props) {
  console.log(props?.state?.userDetails?.profileImage?.split(".")?.pop(), "pro");
  return (
    <div>
      <hr className="text-primary-50" />
      <hr className="text-primary-50 border-t-4" />
      <div className="m-auto max-w-lg5 px-10 smobile:px-2.5">
        <div className="flex container-height tb:h-auto">
          <div className="hex-frame">

            {props?.state?.userDetails?.profileImage?.split(".")?.pop() === "mp4" ||
              props?.state?.userDetails?.profileImage?.split(".")?.pop() === "mov" ? (
              <>

                <video
                  // controls
                  className="object-cover video-pic"
                  src={props?.state?.userDetails?.profileImage}

                ></video>


              </>
            ) : props?.state?.userDetails?.profileImage?.split(".")?.pop() === "mp3" ? (
              <>
                <img

                  className="audio-nft video-pic"

                  src={props?.state?.userDetails?.profileImage}

                >
                </img>

              </>
            ) : (
              <>
                <img
                  className=""
                  src={
                    props?.state?.userDetails?.profileImage
                      ? props?.state?.userDetails?.profileImage
                      : "/images/default-pfp.png"
                  }
                />
              </>
            )}


          </div>
          {/* <div className="profile-clip border-4 border-primary-50 mt-neg-115">
          <img
            className=""
            src={
              props?.state?.userDetails?.profileImage
                ? props?.state?.userDetails?.profileImage
                : "/images/default-pfp.svg"
            }
          />
          </div> */}
          {/* h-pvh */}

          <div className="flex justify-between pt-7.5 pl-8.5 mob:pl-1.75 mob:pt-0.75  overflow-hidden w-full">
            <div className="max-w-75per">
              <div className=" font-extrabold text-white w-full flex mob:block items-end">
                <p className="text-ft30 mob:text-ft4 font-EurostileExtd">
                  {props?.state?.userDetails?.firstName || "USERNAME"}
                </p>
                <span className="text-ft4 mob:text-ft-10 text-white font-normal pl-2 mob:pl-0">
                  Joined{" "}
                  {props?.state?.userDetails?.addedOn
                    ? Utility.epochToDate(
                      props?.state?.userDetails?.addedOn,
                      "MM/DD/YY"
                    )
                    : "N/A"}
                </span>
              </div>
              <div className="text-ft13 font-Eurostile text-white pt-4 hidden tb:block">
                {props?.state?.userDetails?.bio}
              </div>
            </div>
            <div className="mt-3.25">
              <Link to="/settings">
                <button className=" market-button font-Poppins text-white bg-blue-60 border-2 border-blue-60 mob:text-ft-10 w-45 mob:w-23.25 h-12 mob:h-6.25 rounded-full pb-0.5 relative overflow-hidden border-blue-80 z-10">
                  Edit profile
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-ft-10 font-Eurostile text-white pt-4 block tb:hidden">
          {props?.state?.userDetails?.bio}
        </div>
      </div>
      <div className="flex items-center max-w-lg5 gap-9 m-auto px-10">
        {profileTab.map((item, index) => (
          <div
            className="w-max cursor-pointer flex flex-col justify-center items-center font-EurostileBold text-ft16"
            key={index}
            onClick={() => {
              props.changeDefaultTab(index);
            }}
          >
            <h1
              className={`${props.state.defaultTab === item ? "text-blue-80" : "text-white"
                } `}
            >
              {item}
            </h1>
            {props.state.defaultTab === item && (
              <hr className="w-3 border-1.5 border-blue-80 bg-blue-80 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoriteNftsSection(props) {
  const nfts = props?.state?.topFavouritedNfts;
  // console.log(nfts, "nfts-sachin");
  return (
    <div className="px-10 m-auto mt-15 h-125">
      {/* <div className="bg-primary-50 w-full py-2.5 pl-8 flex"> */}
      {/* <div className="flex flex-col justify-center pr-2">
        <img src="/images/white-heart-empty.svg" />
      </div> */}
      <span className="text-ft17 font-extrabold text-white max-w-lg5 ml-47.25">
        FAVOURITE
      </span>
      {/* </div> */}
      <div>
        <img
          src="/images/Hologram.svg"
          className="absolute -ml-fff flex w-full hollow-left justify-center h-131 mt-20 2xl:mt-10"
        ></img>
        <div className="flex absolute z-2 mt-5 w-98pe justify-center pr-7.5">
          {/* {console.log(nfts, "nftttt")} */}
          {nfts.map((nft, index) => {
            if (index === 1) {
              return (
                <div className="pr-9.25 pb-5">
                  {" "}
                  <NftCard
                    nft={nft}
                    widthCard={props.width ? props.width : "w-75 mobile:w-30"}
                    imageHeight={
                      props.height ? props.height : "h-87.5 mobile:h-34"
                    }
                  />
                </div>
              );
            }
            return (
              <div className="pr-9.25 pb-5 mt-5.25">
                <NftCard
                  nft={nft}
                  widthCard={props.width ? props.width : "w-62.5 mobile:w-30"}
                  imageHeight={props.height ? props.height : "h-75 mobile:h-34"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CollectionSection(props) {
  return (
    <div className="max-w-lg5 m-auto pt-8 px-10 ">
      <div
        className={
          "w-full border border-primary-50 " +
          (props.state.collectionTabs.collected
            ? "clip-left-top bg-grey-30"
            : "")
        }
      >
        <div
          className={
            "w-full py-2.5 pl-8 flex justify-between " +
            (props.state.collectionTabs.collected
              ? "bg-primary-50"
              : "bg-black-60")
          }
        >
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <img className="h-5" src="/images/gallery-icon.svg" />
            </div>
            <span className="text-ft7 font-extrabold text-white">
              Collected
            </span>
          </div>
          <div
            className="flex flex-col justify-center pr-4"
            onClick={() => props.toggleCollectionTab("collected")}
          >
            <img
              className=""
              src={
                props?.state?.collectionTabs?.collected
                  ? "/images/arrow-down.svg"
                  : "/images/arrow-right.svg"
              }
            />
          </div>
        </div>
        {props?.state?.collectionTabs?.collected && (
          <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
            <NftList
              nfts={props?.state?.collectedNfts}
              limit={props?.state?.collectedNftsLimit}
              totalNftsCount={props?.state?.totalCollectedNftsCount}
              filterNftList={props.filterCollectedNftList}
            />
          </div>
        )}
      </div>
      <div className="w-full border border-primary-50 bg-grey-30">
        <div
          className={
            "w-full py-2.5 pl-8 flex justify-between " +
            (props.state.collectionTabs.created
              ? "bg-primary-50"
              : "bg-black-60")
          }
        >
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <img className="h-5" src="/images/roller-icon.svg" />
            </div>
            <span className="text-ft7 font-extrabold text-white">Created</span>
          </div>
          <div
            className="flex flex-col justify-center pr-4"
            onClick={() => props.toggleCollectionTab("created")}
          >
            <img
              className=""
              src={
                props?.state?.collectionTabs?.created
                  ? "/images/arrow-down.svg"
                  : "/images/arrow-right.svg"
              }
            />
          </div>
        </div>
        {props?.state?.collectionTabs?.created && (
          <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
            <NftList
              nfts={props?.state?.createdNfts}
              limit={props?.state?.createdNftsLimit}
              totalNftsCount={props?.state?.totalCreatedNftsCount}
              filterNftList={props.filterCreatedNftList}
            />
          </div>
        )}
      </div>
      <div className="w-full border border-primary-50 bg-grey-30">
        <div
          className={
            "w-full py-2.5 pl-8 flex justify-between " +
            (props.state.collectionTabs.hidden
              ? "bg-primary-50"
              : "bg-black-60")
          }
        >
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <img className="h-5" src="/images/eye-slash.svg" />
            </div>
            <span className="text-ft7 font-extrabold text-white">Hidden</span>
          </div>
          <div
            className="flex flex-col justify-center pr-4"
            onClick={() => props.toggleCollectionTab("hidden")}
          >
            <img
              className=""
              src={
                props?.state?.collectionTabs?.hidden
                  ? "/images/arrow-down.svg"
                  : "/images/arrow-right.svg"
              }
            />
          </div>
        </div>
        {props?.state?.collectionTabs?.hidden && (
          <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
            <NftList
              nfts={props?.state?.hiddenNfts}
              limit={props?.state?.hiddenNftsLimit}
              totalNftsCount={props?.state?.totalHiddenNftsCount}
              filterNftList={props.filterHiddenNftList}
            />
          </div>
        )}
      </div>

      <div className="w-full border border-primary-50 bg-grey-30">
        <div
          className={
            "w-full py-2.5 pl-8 flex justify-between " +
            (props.state.collectionTabs.offers
              ? "bg-primary-50"
              : "bg-black-60")
          }
        >
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <img className="h-5" src="/images/list.svg" />
            </div>
            <span className="text-ft7 font-extrabold text-white">Offers</span>
          </div>
          <div
            className="flex flex-col justify-center pr-4"
            onClick={() => props.toggleCollectionTab("offers")}
          >
            <img
              className=""
              src={
                props?.state?.collectionTabs?.offers
                  ? "/images/arrow-down.svg"
                  : "/images/arrow-right.svg"
              }
            />
          </div>
        </div>
        {props?.state?.collectionTabs?.offers && (
          <OffersTable {...props}></OffersTable>
        )}
      </div>
      <div className="w-full border border-primary-50 bg-grey-30">
        <div
          className={
            "w-full py-2.5 pl-8 flex justify-between " +
            (props.state.collectionTabs.favourited
              ? "bg-primary-50"
              : "bg-black-60")
          }
        >
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <img className="h-5" src="/images/tag-icon.svg" />
            </div>
            <span className="text-ft7 font-extrabold text-white">
              Favourite
            </span>
          </div>
          <div
            className="flex flex-col justify-center pr-4"
            onClick={() => props.toggleCollectionTab("favourited")}
          >
            <img
              className=""
              src={
                props?.state?.collectionTabs?.favourited
                  ? "/images/arrow-down.svg"
                  : "/images/arrow-right.svg"
              }
            />
          </div>
        </div>
        {props?.state?.collectionTabs?.favourited && (
          <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
            <NftList
              nfts={props?.state?.favoriteNfts}
              limit={props?.state?.allFavoriteNftsLimit}
              totalNftsCount={props?.state?.totalFavoriteNftsCount}
              filterNftList={props.allFavoriteNftList}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MobileFavourited(props) {
  const nft = props?.state?.topFavouritedNfts;
  return (
    <div className="mt-5">
      <span className="text-ft17 font-extrabold text-white max-w-lg5 ml-11.5">
        FAVOURITE
      </span>
      {/* </div> */}
      <div className="h-48.5">
        <img src="/images/Hologram.svg" className="absolute mobile-card"></img>
        <div className="absolute z-2 flex w-full justify-center ml-2.5">
          {/* {console.log(nfts, "nftttt")} */}
          {/* {nfts.map((nft) => {
            console.log("nft==",nft) */}
          {/* return ( */}
          <div className="mt-5">
            <div className="rounded-lg pt-zer">
              {/* {nft?.cdnUrl?.pop()==="mp4" || nft?.cdnUrl?.pop()==="mov"?
              <>
              <video
                  src={nft?.cdnUrl || "/images/zeni.png"}
                  className="w-nex rounded-lg h-117.5"
                ></video>
              </>
              :
              nft?.cdnUrl?.split('.').pop()==="mp3"?
              <>
              <audio
                  src={nft?.cdnUrl || "/images/zeni.png"}
                  className="w-nex rounded-lg h-117.5"
                ></audio>
              </>
              :
              <>
                <img
                  src={nft?.cdnUrl || "/images/zeni.png"}
                  className="w-nex rounded-lg"
                ></img>
                </>} */}
              <img
                src={nft[1]?.cdnUrl || "/images/zeni.png"}
                className="w-27 h-27 rounded-t"
              ></img>
              <div className="bg-box-color border-box-border border-2 border-t-4 rounded-b w-27">
                <div className="ml-eex mt-3.5">
                  <p className="text-primary-50 text-ft-8px">#12</p>
                  <p className="text-primary-50 text-ft-8px">
                    {nft[1]?.collectionId?.name || "N/A"}
                  </p>
                </div>
                {/* <div className="flex justify-between ml-eex mr-eex">
                  <p className="text-ft0 text-white whitespace-nowrap overflow-hidden">
                    {nft[1]?.name || "N/A"}
                  </p>
                  <div className="flex items-end">
                    <p className="text-ft0 text-white">
                      {nft[1]?.saleData?.price || "25"}
                    </p>
                  </div> */}
                <div className="flex justify-between gap-1 ml-eex mr-eex">
                  <p className="text-ft0 text-white text-truncate">
                    {nft[1]?.name || ""}
                  </p>
                  <div className="flex">
                    <p className="text-ft0 text-white">
                      {nft[1]?.saleData?.price || ""}
                    </p>
                    <img
                      className="mb-eex w-thx"
                      src="/images/binance-icon.svg"
                      alt="/"
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            {/* <NftCard
                  nft={nft}
                  widthCard={props.width ? props.width : "w-62.5 mobile:w-30"}
                  imageHeight={props.height ? props.height : "h-75 mobile:h-34"}
                /> */}
          </div>
          );
        </div>
      </div>
    </div>
    // <div className="max-w-lg5 m-auto pt-8 px-10 ">
    //   <div
    //     className={
    //       "w-full border border-primary-50 " +
    //       (props?.state?.toggleMobile?.favourited
    //         ? "clip-left-top bg-grey-30"
    //         : "")
    //     }
    //   >
    //     <div
    //       className={
    //         "w-full py-2.5 pl-8 flex justify-between " +
    //         (props?.state?.toggleMobile?.favourited
    //           ? "bg-primary-50"
    //           : "bg-black-60")
    //       }
    //     >
    //       <div className="flex">
    //         <div className="flex flex-col justify-center pr-2">
    //           <img className="h-5" src="/images/gallery-icon.svg" />
    //         </div>
    //         <span className="text-ft7 font-extrabold text-white">
    //           Favorited
    //         </span>
    //       </div>
    //       <div
    //         className="flex flex-col justify-center pr-4"
    //         onClick={() => props.toggleMobile("favourited")}
    //       >
    //         <img
    //           className=""
    //           src={
    //             props?.state?.toggleMobile?.favourited
    //               ? "/images/arrow-down.svg"
    //               : "/images/arrow-right.svg"
    //           }
    //         />
    //       </div>
    //     </div>
    //     {props?.state?.toggleMobile?.favourited && (
    //       <div className="max-h-160 overflow-y-auto border border-primary-50 py-10 px-5">
    //         <NftList
    //           nfts={props?.state?.favoriteNfts}
    //           limit={props?.state?.allFavoriteNftsLimit}
    //           totalNftsCount={props?.state?.totalFavoriteNftsCount}
    //           filterNftList={props.allFavoriteNftList}
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

const OffersTable = (props) => {
  return (
    <>
      <div className="w-full overflow-x-scroll">
        <div className="max-h-160 w-262.5 lg:w-full">
          <table className="w-full">
            <thead className="text-grey-120 pt-5  pb-5 text-ft3 ">
              <tr className="grid grid-cols-5  pb-2 pt-2 pl-5 text-tHead justify-items-start">
                <th className="font-normal">Item</th>
                <th className="font-normal">Price</th>
                <th className="font-normal">USD Price</th>
                <th className="font-normal">Expiration</th>
                <th className="font-normal">From</th>
              </tr>
            </thead>
            <hr className="border-b-3 border-primary-50 w-full" />
            <tbody className="text-white w-full">
              {props?.state?.offersList.length !== 0 ? (
                props.state.offersList.map((curElem, index) => {
                  console.log(props?.state?.offersList?.offers, "off");
                  return (curElem.offers.expTime > Date.now() ? (
                    <tr
                      key={index}
                      className="grid grid-cols-5 gap-x-0 justify-items-start border-down font-PoppinsMedium text-ft4 mobile:text-ft2 py-3 cursor-pointer text-white ml-5 mr-5"
                    >
                      <td className="border-collapse flex">



                        {curElem.cdnUrl?.split(".").pop() === "mp4" ||
                          curElem.cdnUrl?.split(".").pop() === "mov" ? (
                          <>
                            <video
                              className="w-twx tablet:h-3/5 "
                              src={curElem.cdnUrl}
                            ></video>
                          </>
                        ) : curElem.cdnUrl?.split(".").pop() === "mp3" ? (
                          <>
                            <video
                              className="w-twx tablet:h-3/5  audio-nft"
                              src={curElem.cdnUrl}
                            ></video>
                          </>
                        ) : (
                          <>
                            <img
                              className="w-twx tablet:h-3/5 "
                              src={curElem.cdnUrl}
                            ></img>
                          </>
                        )}





                        <h1>{curElem.name || "--"}</h1>
                      </td>
                      <td className="border-collapse flex items-center w-full mobile:h-3/5 tablet:h-3/5">
                        <p>{curElem.offers.amount}&nbsp;</p>
                        {utility.getTokenIcon(curElem.offers.currency) ? (
                          <img
                            className="w-5"
                            src={utility.getTokenIcon(curElem.offers.currency)}
                          />
                        ) : (
                          curElem.offers.currency
                        )}
                        {/*<img*/}
                        {/*  src="/images/binance-icon.svg"*/}
                        {/*  className="w-eex h-1/2"*/}
                        {/*/>*/}
                      </td>
                      <td className="w-full pl-1 flex text-grey-55">
                        $
                        <p className="w-tix">
                          {(
                            props.findCurrencyUSDPrice(
                              curElem.offers.currency
                            ) * curElem.offers.amount
                          ).toFixed(4)}
                        </p>
                        <button
                          className="market-button rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 text-ft-0.7 font-PoppinsMedium w-1/2 ml-twx h-8 mobile:text-ft23 tablet:text-ft23"
                          onClick={() => {
                            props.setAcceptOfferDialog(true);
                            props.getOfferData(curElem);
                            props.getOffer(curElem);
                            props.nftDetails(curElem._id);
                          }}
                        >
                          Accept
                        </button>
                      </td>
                      <td className="w-full pl-3 font-normal text-grey-55">
                        {moment(curElem.offers.expTime).format("DD MMM YYYY")}
                      </td>
                      <td className="w-full pl-3 text-blue-80 font-normal flex">
                        {props.shorten(curElem.offers.userAddress)}{" "}
                        &nbsp;&nbsp;&nbsp;
                        <img
                          className="h-6.25 mobile:pl-1 tablet:pl-1"
                          src="/images/delete-forever.svg"
                          onClick={() => {
                            props.setOpenRemoveOfferDialog(true);
                            props.getOfferData(curElem);
                            props.getOffer(curElem);
                            props.nftDetails(curElem._id);
                          }}
                        />
                      </td>
                    </tr>
                  ) : ""
                  );
                })
              ) : (
                <div className="flex w-full justify-center font-EurostileBold text-white text-ft12 py-10 px-5">No offers found</div>
              )}
            </tbody>
          </table>
        </div>
        {props.acceptOfferDialog && (
          <AcceptOfferDialog
            open={props.acceptOfferDialog}
            handleClose={props.setAcceptOfferDialog}
            specificOffer={props.offerData}
            checkoutHandler={props.checkoutHandler}
            saleProcessPopup={props.setSaleProcessPopup}
            acceptOfferNft={props.acceptOfferNft}
            currency={props.offerData.offers.currency}
            convertedUSD={(
              props.findCurrencyUSDPrice(props.offerData.offers.currency) *
              props.offerData.offers.amount
            ).toFixed(4)}
          />
        )}
        {props.openRemoveOfferDialog && (
          <RemoveOfferDialog
            open={props.openRemoveOfferDialog}
            specificOffer={props.offerData}
            handleClose={props.setOpenRemoveOfferDialog}
            removeOfferHandler={props.removeOfferHandler}
            rejectOfferNft={props.rejectOfferNft}
          />
        )}
        {props.saleProcessPopup && (
          <SaleProcessModal
            open={props.saleProcessPopup}
            handleClose={props.setSaleProcessPopup}
            specificOffer={props.offerData}
            params={props}
          />
        )}
      </div>
    </>
  );
};
export default ProfileComponent;
