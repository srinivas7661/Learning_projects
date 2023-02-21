import React, { useEffect } from "react";
import styled from "styled-components";
import utility from "../../utility";
import Cards from "./card";
import { contentService } from "../../services/index";
import { sellAndPurchaseService } from "../../services/index";
import useWindowDimensions from "../../common/WindowDimension";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../managers/history";
import "tw-elements";
import { Toaster } from "react-hot-toast";
import { pathConstants } from "../../constants";

const exploreBtn = () => {
  history.push("/explore");
  // window.location.reload();
};

const NavButton = styled.button`
  font-size: 8px;
  font-weight: 900;
  opacity: 1;
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 21px;
  }
  @media (min-width: 1500px) {
    font-size: 29px;
  }
  color: ${(props) =>
    props.toggle === props.value ? "#ffffff" : "grey"} !important;
`;
const Hr = styled.hr`
  border-top-width: ${(props) =>
    props.toggle === props.value ? "2px" : "0px"} !important;
  color: #8454eb;
  @media (min-width: 0) and (max-width: 768px) {
    color: #3c60fd;
  }
  width: 8px;
  align-self: center;
`;

const HomePageComponent = (props) => {
  const data = props.data;

  const { height, width } = useWindowDimensions();

  const [latestList, setLatestList] = React.useState([]);
  const [trendingNfts, setTrendingNfts] = React.useState([]);
  const [recentlySoldNft, setRecentlySoldNft] = React.useState([]);

  const [count, setCount] = React.useState([]);
  const [volumeTrade, setVolumeTrade] = React.useState([]);
  const [featuredNft, setFeaturedNft] = React.useState([]);

  const userData = useSelector((state) => state.wallet.walletConnect);
  const [toggle, setToggle] = React.useState(1);

  const limit = 9;

  React.useEffect(() => {
    getListOfTrendingNfts();
    getNewNftList();
    getRecentlySoldNftList();
    getCountList();
    getVolumeTrade();
    getFeaturedNft();
  }, []);

  const getListOfTrendingNfts = async (requestData) => {
    const request = {
      limit: limit,
    };
    const response = await contentService.getTrendingNfts(request);
    setTrendingNfts(response);
  };
  const getNewNftList = async (requestData) => {
    const request = {
      "saleData.isOpenForSale": true,
      limit: limit,
    };
    const response = await contentService.getNewlyListNfts(request);
    setLatestList(response.nftContent);
  };

  const getRecentlySoldNftList = async (requestData) => {
    const request = {
      limit: 100,
    };
    const response = await contentService.getRecentlySoldNft(request);
    setRecentlySoldNft(response);
    console.log(recentlySoldNft, "sell");
  };
  const getCountList = async () => {
    const response = await contentService.getCount();
    setCount(response);
  };

  const getVolumeTrade = async () => {
    const response = await sellAndPurchaseService.totalVolumeTraded({});
    setVolumeTrade(response);
    console.log("volumeTrade++",response)
  };

  const getFeaturedNft = async () => {
    const response = await sellAndPurchaseService.featuredNft();
    setFeaturedNft(response);
  };

  const toggleTab = (index) => {
    setToggle(index);
  };

  const renderSwitch = (id) => {
    switch (id) {
      case 1:
        return trendingNfts;
      case 2:
        return latestList;
      case 3:
        return recentlySoldNft;
      default:
        return trendingNfts;
    }
  };
  const [currentImageIdx, setCurrentImagIdx] = React.useState(0);

  const prevSlide = () => {
    const resetToVeryBack = currentImageIdx === 0;

    const index = resetToVeryBack
      ? renderSwitch(toggle).length - 1
      : currentImageIdx - 1;

    setCurrentImagIdx(index);
  };

  const nextSlide = () => {
    const resetIndex = currentImageIdx === renderSwitch(toggle).length - 1;

    const index = resetIndex ? 0 : currentImageIdx + 1;
    setCurrentImagIdx(index);
  };

  const itemOnDevice = width < 768 ? 2 : width <= 1024 ? 2 : 3;
  const activeImageSourcesFromState = renderSwitch(toggle).slice(
    currentImageIdx,
    currentImageIdx + itemOnDevice
  );
  const imageSourcesToDisplay =
    activeImageSourcesFromState.length < itemOnDevice
      ? // if the imageSourcesToDisplay's length is lower than 5 images than append missing images from the beginning of the original array
        [
          ...activeImageSourcesFromState,
          ...renderSwitch(toggle).slice(
            0,
            itemOnDevice - activeImageSourcesFromState.length
          ),
        ]
      : activeImageSourcesFromState;

  const handleConnect = async () => {
    userData?.userId
      ? history.push("/select-category")
      : history.push("/wallet-connect");
  };

  useEffect(() => {}, [featuredNft]);

  function numFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  const redirectHandler = () => {
    history.push(
      pathConstants.HEADER.NFT_DETAILS +
        "?id=" +
        featuredNft?.[0]?.nftContents?.[0]?._id +
        "&collectionAddress=" +
        featuredNft?.[0]?.nftContents?.[0]?.collectionDetails
          ?.collectionAddress +
        "&tokenId=" +
        featuredNft?.[0]?.nftContents?.[0]?.tokenId
    );
  }


  return (
    <div className="bg-main bg-cover text-white pb-13 overflow-x-hidden">
      <Toaster />
      <div className="flex pl-fff tb:pl-0">
        <div className="w-3/6">
          <div className="flex flex-col justify-center xl:w-ffx w-eiy h-pex ml-auto mr-auto game-container mt-tix tb:mt-0">
            <div className="flex flex-col">
              <div className=" text-white tb:text-ft-2.2 text-ft4 font-Eurostile font-bold leading-tight">
                Gaming NFT's
              </div>
              <h1 class="leading-tight tb:text-ft-3.7 text-ft12 text-blue-80 font-black font-EurostileExtended">
                REDEFINED
              </h1>
              <p className="leading-tight tb:text-ft-1.5 text-ft0 text-white font-EurostileExtended">
                revolutionizing the gaming metaverse marketplace
              </p>
              <div className="pt-2 flex gap-2 text-center tb:gap-6 tb:pt-12.5">
                <button
                  className="market-button sm:w-fox w-24 tb:h-12 h-6.5  py-1 px-4 tb:py-0 tb:px-0 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 2xl:text-ft-1 xl:text-ft6 lg:text-ft4 tb:text-ft2 text-ft-8px font-EurostileMedium tb:font-PoppinsMedium"
                  onClick={exploreBtn}
                >
                  Marketplace
                </button>
                <button
                  className="market-button sm:w-fox w-18 tb:h-12 h-6.5  py-1 px-4 tb:py-0 tb:px-0 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 2xl:text-ft-1 xl:text-ft6 lg:text-ft4 tb:text-ft2 text-ft-8px font-EurostileMedium tb:font-PoppinsMedium"
                  onClick={() => handleConnect()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="ml-tix xl:ml-twx h-nvw mt-tif tb:mt-0">
            <div className="polygon  bg-primary-50 border border-primary-50 h-16.75 w-178pe tb:h-evw tb:w-full">
              <div className="polygon flex justify-between  bg-black-60 w-full h-full ">
                <div className="w-1/4 text-center flex flex-col items-center justify-center">
                  <h1 className="font-black font-EurostileExtd text-blue-80 tb:text-ft-2.7 text-ft6">
                    {count.totalNftCount || "--"}
                  </h1>

                  <p className="tb:text-ft-1.1 text-ft23 opacity-33 font-EurostileBold text-white pt-tix">
                    items
                  </p>
                </div>
                <div className="w-1/4 text-center flex flex-col items-center justify-center bg-inside-color">
                  <h1 className="font-black font-EurostileExtd text-blue-80 tb:text-ft-2.7 text-ft6">
                    {count.Owners || "--"}
                  </h1>
                  <p className="tb:text-ft-1.1 text-ft23 opacity-33 font-EurostileBold text-white pt-tix">
                    owners
                  </p>
                </div>
                <div className="w-1/4 text-center flex flex-col items-center justify-center">
                  <h1 className="font-black font-EurostileExtd text-blue-80 tb:text-ft-2.7 text-ft6">
                    {count?.minPrice?.[0]?.floorPrice.toFixed(2) || "--"}
                  </h1>
                  <p className="tb:text-ft-1.1 text-ft23 opacity-33 font-EurostileBold text-white pt-tix">
                    floor price
                  </p>
                </div>
                <div className="w-1/4 text-center flex flex-col items-center justify-center bg-inside-color">
                  <h1 className="font-black font-EurostileExtd text-blue-80 tb:text-ft-2.7 text-ft6">
                    {numFormatter(volumeTrade[0]?.volumeTraded.toFixed(2)) ||
                      "--"}
                  </h1>
                  <p className="tb:text-ft-1.1 text-ft23 opacity-33 font-EurostileBold text-white pt-tix">
                    volume trade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden tb:block font-EurostileMedium tb:rounded-lg rounded-sm pt-tix w-1/2 tb:pl-tix mb-eex">
          {featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mp4" ||
          featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mov" ? (
            <video
              onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="w-sfx tb:rounded-lg rounded-sm h-33vw object-cover"
            ></video>
          ) : 
          featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mp3" ? (
                <video
              onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="w-sfx tb:rounded-lg rounded-sm h-33vw object-cover audio-nft audio-border"
                ></video>
          ) : (
            <img
              onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="w-pex tb:rounded-lg rounded-sm h-28vw"
            />
          )}
          <div className="bg-box-color border-box-border border-ztw border-t-zfw flex items-center  justify-between tb:rounded-b-lg rounded-b-sm relative w-pex overflow-scroll">
            <div className="pl-fff w-ffx">
              <p className="text-text-color text-ft-1">
                #{featuredNft?.[0]?.nftContents?.[0]?.tokenId}
              </p>
              <p className="text-text-color text-ft-1">
                {" "}
                #
                {
                  featuredNft?.[0]?.nftContents?.[0]?.collectionDetails
                    ?.collectionName
                }
              </p>
              <h1 className="text-ft-2.5 whitespace-nowrap truncate overflow-hidden ">
                {featuredNft?.[0]?.nftContents?.[0]?.name}
              </h1>
            </div>
            <div className="flex items-end tb:pb-sip pr-1 self-end w-full justify-around">
              <p className="text-ft0 tb:text-ft-2 ">
                {" "}
                {featuredNft?.[0]?.nftContents?.[0]?.saleData?.price}
              </p>
              {utility.getTokenIcon(
                featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency
              ) ? (
                <img
                  className="w-2 self-center h-2 tb:w-7.5 tb:h-7.5"
                  src={utility.getTokenIcon(
                    featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency
                  )}
                  alt="/"
                />
              ) : (
                <span className="w-2 tb:w-7.5 text-truncate">
                  {featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="tb:hidden block font-EurostileMedium tb:rounded-lg rounded-sm pt-tix w-1/2 tb:pl-tix mb-eex">
          
            {featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mp4" ||
          featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mov" ? (
            <video
              onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="tb:w-sfx tb:h-33vw w-shx h-fow tb:rounded-lg rounded-sm ml-tix object-cover"
            ></video>
          ) :
            featuredNft?.[0]?.nftContents?.[0]?.cdnUrl.split(".").pop() ===
            "mp3" ? (
                <video
                   onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="w-sfx tb:rounded-lg rounded-sm h-33vw object-cover audio-nft audio-border"
                ></video>
          ) : (
            <img
              onClick={redirectHandler}
              src={featuredNft?.[0]?.nftContents?.[0]?.cdnUrl}
              alt={featuredNft?.[0]?.nftContents?.[0]?.ipfsUrl}
              className="tb:w-sfx tb:h-33vw w-shx h-35vw tb:rounded-lg rounded-sm ml-tix"
            ></img>
          )}
          
          {/* <img
            src={
              featuredNft?.[2]?.nftContents?.[0]?.cdnUrl || "/images/zeni.png"
            }
            alt={featuredNft?.[2]?.nftContents?.[0]?.ipfsUrl}
            className="tb:w-sfx tb:h-33vw w-shx h-fow tb:rounded-lg rounded-sm ml-tix"
          ></img> */}
          <div className="bg-box-color border-box-border border-ztw border-t-zfw ml-tix flex items-center  justify-between tb:rounded-b-lg rounded-b-sm relative tb:w-sfx w-shx">
            <div className="pl-fff tb:w-sxx w-ffx">
              <p className="text-text-color text-ft-1">
                #
                {featuredNft?.[0]?.nftContents &&
                  featuredNft?.[0]?.nftContents.length &&
                  featuredNft?.[0]?.nftContents?.[0].tokenId}
              </p>
              <p className="text-text-color text-ft-1">INSTINCT CCG</p>
              <h1 className="text-ft-2.5 whitespace-nowrap overflow-hidden">
                {featuredNft?.[0]?.nftContents?.[0]?.name || "Zeni"}
              </h1>
            </div>
            <div className="flex items-end tb:pb-sip pr-1 self-end w-full justify-around">
              <p className="text-ft0 tb:text-ft-2 ">
                {" "}
                {featuredNft?.[0]?.nftContents?.[0]?.saleData?.price}
              </p>
              {utility.getTokenIcon(
                featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency
              ) ? (
                <img
                  className="w-2 self-center h-2 tb:w-7.5 tb:h-7.5"
                  src={utility.getTokenIcon(
                    featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency
                  )}
                  alt="/"
                />
              ) : (
                <span className="w-2 tb:w-7.5 text-truncate">
                  {featuredNft?.[0]?.nftContents?.[0]?.saleData?.currency}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-twx tb:mt-0">
        <div className="flex -mt-eex ml-elx tb:pl-tex w-full invisible tb:visible">
          <img src="/images/bg-line-1.svg" className="w-ffx" />
        </div>
        <div className="-mt-19pe tb:ml-eix ml-tix">
          <div className="flex mb-5 md:mb-0 justify-between w-87pe items-baseline h-nvw">
            <div>
              <div className="leading-none mb-1.5 font-black font-EurostileExtended text-white text-ft12 md:text-ft-3.7">
                BROWSE
              </div>
              <div className="font-bold font-Eurostile text-ft4 md:text-ft-2.2  text-primary-50">
                NFT's
              </div>
            </div>
            <div
              className="items-center flex see-more pb-sip justify-center cursor-pointer w-twx"
              id="see-more"
              onClick={exploreBtn}
            >
              <div className="dashed-circle circle-right absolute rounded-full w-sip h-6vw rotate-0"></div>
              <div className=" flex items-center font-PoppinsMedium justify-evenly w-full ml-thx">
                <p>See More</p>
                <img
                  src="/images/Icon-Arrow.svg"
                  className="w-fix duration-700"
                  id="sharp"
                />
              </div>
            </div>
          </div>
          <div className="trending-polygon flex flex-col items-center w-efx bg-black-60 h-fvw">
            <div className="mt-tex w-eiy font-EurostileExtd flex justify-between">
              <NavButton
                toggle={toggle}
                value={1}
                type="checkbox"
                onClick={() => toggleTab(1)}
              >
                <span>TRENDING</span>
                <Hr toggle={toggle} value={1} />
              </NavButton>
              <NavButton
                toggle={toggle}
                value={2}
                type="checkbox"
                onClick={() => toggleTab(2)}
              >
                <span>NEWLY LISTED</span>
                <Hr toggle={toggle} value={2} />
              </NavButton>
              <NavButton
                toggle={toggle}
                value={3}
                type="checkbox"
                onClick={() => toggleTab(3)}
              >
                <span>RECENTLY SOLD</span>
                <Hr toggle={toggle} value={3} />
              </NavButton>
            </div>
            <div className="flex mt-thp w-nnn">
              <div className="flex items-center h-tfw">
                <img
                  src="/images/left-slide-arrow.svg"
                  className="cursor-pointer w-thx tb:w-full"
                  onClick={prevSlide}
                />
              </div>
              <div className="flex w-full ml-oex mr-oex gap-3.75">
                {imageSourcesToDisplay.map((row, index) => {
                  return (
                    <Cards
                      key={index}
                      id={row?._id || ""}
                      collectionAddress={row?.collectionAddress || ""}
                      nftDetails={row}
                      tokenId={row?.tokenId || ""}
                      cardHeading={row?.name || ""}
                      ownerAddress={row?.ownerAddress || ""}
                      createdBy={row?.createdBy || ""}
                      ownedBy={row?.ownedBy || ""}
                      cardCurrency={row?.saleData?.currency || ""}
                      cardPrice={row?.saleData?.price || ""}
                      images={row?.cdnUrl || row?.ipfsUrl}
                      handleLikeNft={props.handleLikeNft}
                      likedBy={row?.likedBy || []}
                    />
                  );
                })}
              </div>

              <div className="flex items-center h-tfw justify-end">
                <img
                  src="/images/right-slide-arrow.svg"
                  className="cursor-pointer w-thx tb:w-full"
                  onClick={nextSlide}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-end -mt-eex pr-sep invisible tb:visible">
          <img src="/images/bg-line-2.svg" className="w-sep" />
        </div>
        <div>
          <div className="flex justify-between w-81pe mr-auto ml-auto -mt-fix items-center mb-thp pl-tex">
            <div>
              <div className="font-black font-EurostileExtended text-white text-ft12 md:text-ft-3">
                Digitize Your Ideas
              </div>
              <div className="font-bold font-Eurostile text-ft4 md:text-ft-2.2 text-blue-200 ml-0 md:ml-105pe w-max">
                Create & Sell
              </div>
            </div>
            <div
              onClick={() => {
                history.push("/wallet-connect");
              }}
              className="flex cursor-pointer see-more justify-center w-twx items-center"
              id="see-more"
            >
              <div className="dashed-circle absolute rounded-full w-sip h-6vw rotate-0"></div>
              <div className=" flex items-center font-PoppinsMedium justify-evenly w-full ml-thx">
                <p>Connect Wallet</p>
                <img
                  src="/images/Icon-Arrow.svg"
                  className="w-fix duration-700"
                  id="sharp"
                />
              </div>
            </div>
          </div>
          <div className="hidden tb:block">
            <div className="flex justify-between w-4/5 mr-eex ml-auto gap-x-thp relative">
              <img
                src="/images/list-icons.svg"
                className="absolute z-10 -mt-thp h-58pe w-full"
              />
              <div className="create-polygon flex justify-around items-end h-28vw pb-thp w-twx">
                <div className="ml-eex mr-eex  leading-none h-62pe padding-bottom-39 flex flex-col justify-end">
                  <h1 className=" text-grey-200 font-Eurostile text-ft-1.5 font-bold leading-none">
                    Setup Web3 Wallet
                  </h1>
                  <p className="text-ft-0.7 tracking-wider  font-EurostileRegular text-grey-500 font-bold mt-fex align-justify leading-130pe">
                    Simply connect your web3 wallet to discover support for all
                    BNB Chain NFTs, with additional cross-chain native support
                    coming soon. Hoardable enables you to centralize all your
                    NFTs.
                  </p>
                </div>
              </div>
              <div className="create-polygon flex justify-around items-end h-28vw pb-thp w-twx">
                <div className="ml-eex mr-eex leading-none h-62pe padding-bottom-19 flex flex-col justify-end">
                  <h1 className="text-grey-200 font-Eurostile text-ft-1.5 font-bold  leading-none">
                    Create Your Own Collection
                  </h1>
                  <p className="text-ft-0.7 tracking-wider  text-grey-500 font-EurostileRegular font-bold align-justify mt-fex leading-130pe">
                    Get your collection up and running on Hoardable’s
                    customizable NFT marketplace with only a few steps.
                    Hoardable enables creators to deploy their NFT collections
                    to the storefront or import smart contract enabled
                    collections and utility NFTs using our native creator suite.
                  </p>
                </div>
              </div>
              <div className="create-polygon flex justify-around items-end h-28vw pb-thp w-twx">
                <div className="ml-eex mr-eex leading-none h-62pe padding-bottom-26 flex flex-col justify-end">
                  <div>
                    <h1 className="text-grey-200 text-ft-1.5 font-Eurostile font-bold leading-none">
                      Create Your NFTs on Hoardable
                    </h1>
                    <p className="text-ft-0.7 tracking-wider  text-grey-500 font-EurostileRegular align-justify font-bold mt-fex leading-130pe">
                      Creating your own NFT on Hoardable is very simple. By just
                      inputting simple data, you have full control over how your
                      NFTs are and can either choose to mint & create unique
                      NFTs (ERC-721), or multi-edition NFTs (ERC-1155) through
                      our creator suite.
                    </p>
                  </div>
                </div>
              </div>
              <div className="create-polygon flex justify-around items-end h-28vw pb-thp w-twx">
                <div className="ml-eex mr-eex h-62pe flex flex-col justify-end">
                  <h1 className="text-grey-200 text-ft-1.5 font-bold font-Eurostile leading-none">
                    NFT-To-Market
                  </h1>
                  <p className="text-ft-0.7 tracking-wider  text-grey-500 align-justify font-EurostileRegular font-bold mt-fex leading-130pe">
                    With Hoardable, you can choose between different ownership
                    options for your NFTs that have been created or imported.
                    You can select between a mint-to-wallet, selling for a fixed
                    price, or auctioning your NFTs on the open marketplace. You
                    can set your own prices to best optimize your monetization
                    strategies. With the addition of EIP-2981 support, royalties
                    on collections will automatically be tracked and paid to you
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="block tb:hidden">
            <div
              id="carouselExampleIndicators"
              class="carousel slide relative w-pex ml-auto mr-auto mt-fff"
            >
              <button
                class="carousel-control-prev absolute flex items-center justify-center text-center border-0 hover:outline-none left-0 mr-ttt top-fox"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <img
                  src="/images/left-slide-arrow.svg"
                  className="cursor-pointer w-tkx mr-ofi"
                  aria-hidden="true"
                />
                <span class="visually-hidden">Previous</span>
              </button>
              <div class="carousel-inner relative w-full overflow-hidden">
                <div class="carousel-item active float-left w-full">
                  <div className="flex">
                    <div className="create-polygon flex items-center justify-center h-fvw w-fkx ml-auto">
                      <div className="w-11/12 h-llx">
                        <div className="relative">
                          <img src="/images/Wallet.svg" />
                        </div>
                        <div className="-mt-twx ">
                          <h1 className=" text-grey-200 text-ft-2 mx-eex font-Eurostile font-bold">
                            Setup Web3 Wallet
                          </h1>
                          <p className="text-ft-1 text-grey-500 align-justify font-EurostileRegular  font-bold mx-eex">
                            Simply connect your web3 wallet to discover support
                            for all BNB Chain NFTs, with additional cross-chain
                            native support coming soon. Hoardable enables you to
                            centralize all your NFTs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="create-polygon flex items-center justify-center h-fvw w-fkx ml-auto">
                      <div className="w-11/12 h-llx">
                        <div className="relative">
                          <img src="/images/Nft-Image.svg" />
                        </div>

                        <div className="-mt-twx">
                          <h1 className="text-grey-200 text-ft-2 font-Eurostile font-bold mx-eex">
                            Create Your Own Collection
                          </h1>
                          <p className="text-ft-1 text-grey-500 align-justify font-EurostileRegular font-bold mx-eex">
                            Get your collection up and running on Hoardable’s
                            customizable NFT marketplace with only a few steps.
                            Hoardable enables creators to deploy their NFT
                            collections to the storefront or import smart
                            contract enabled collections and utility NFTs using
                            our native creator suite.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item float-left w-full">
                  <div className="flex">
                    <div className="create-polygon flex items-center justify-center h-fvw w-fkx ml-auto">
                      <div className="w-11/12 relative h-full flex flex-col justify-center ">
                        <div className="w-full absolute h-pex">
                          <img
                            src="/images/Upload.svg"
                            className="text-center flex ml-qex w-fox"
                          />
                        </div>
                        <div className="absolute upload-text">
                          <h1 className="text-grey-200 text-ft-2 font-Eurostile mx-eex font-bold">
                            Create Your NFTs on Hoardable
                          </h1>
                          <p className="text-ft-1 text-grey-500 align-justify font-EurostileRegular font-bold mx-eex">
                            Creating your own NFT on Hoardable is very simple.
                            By just inputting simple data, you have full control
                            over how your NFTs are and can either choose to mint
                            & create unique NFTs (ERC-721), or multi-edition
                            NFTs (ERC-1155) through our creator suite.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="create-polygon flex items-center justify-center h-fvw w-fkx ml-auto">
                      <div className="w-11/12 h-llx">
                        <div className="relative">
                          <img src="/images/List-Them.svg" />
                        </div>
                        <div className="-mt-twx">
                          <h1 className="text-grey-200 text-ft-2 font-Eurostile mx-eex font-bold">
                            NFT-To-Market
                          </h1>
                          <p className="text-ft-1 text-grey-500 align-justify font-EurostileRegular font-bold mx-eex">
                            With Hoardable, you can choose between different
                            ownership options for your NFTs that have been
                            created or imported. You can select between a
                            mint-to-wallet, selling for a fixed price, or
                            auctioning your NFTs on the open marketplace. You
                            can set your own prices to best optimize your
                            monetization strategies. With the addition of
                            EIP-2981 support, royalties on collections will
                            automatically be tracked and paid to you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="carousel-control-next absolute flex items-center justify-center text-center border-0 hover:outline-none -right-eex top-fox ml-ttt"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <img
                  src="/images/right-slide-arrow.svg"
                  className="cursor-pointer w-tkx ml-full"
                  aria-hidden="true"
                />
                <span class="visually-hidden">Next</span>
              </button>
              <div class="carousel-indicators flex justify-center">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex ml-nix -mt-oex invisible tb:visible">
          <img src="/images/bg-line-3.svg" className="w-tix" />
        </div>

        <div className="flex flex-col items-center -mt-14pe">
          <div className="tb:mr-tis self-start tb:self-center tb:ml-eix ml-tix -mt-fex mb-tex">
            <h1 class="text-searchBorder-500 font-EurostileExtended text-blue-80 text-ft12 md:text-ft-3.2 font-black leading-none">
              DEVELOPER TOOLS
            </h1>
            <div className="font-bold font-Eurostile text-ft4 md:text-ft-2  text-white w-max ml-auto mr-auto">
              Customizable Token Support
            </div>
          </div>
          <div className="dev-polygon clip-bottom-corner border tb:border-primary-50 tb:w-pex w-eiy tb:bg-primary-50 border-black-60 bg-black-60">
            <div className="dev-polygon gap-4 tb:gap-20 p-2 tb:p-4 flex flex-col tb:flex-row  items-center bg-black-60">
              <div className="tb:w-tkx font-EurostileExtd font-black flex flex-row tb:flex-col">
                <div className="tb:flex items-center w-full">
                  <img
                    src="/images/NewBnb.png"
                    alt="/"
                    className="width-34 ml-fex mobile:w-fgx  mobile:ml-19pe"
                  />
                  <h1 className="font-bold text-ft-1.5 pl-fix tb:pl-0 margin-left-7 mobile:ml-twx">
                    BNB
                  </h1>
                </div>
                <div className="tb:flex items-center w-full">
                  <img
                    src="/images/instincttglogo.png"
                    alt="/"
                    className="width-38 ml-thp mobile:w-fkx"
                  />
                  <h1 className="font-bold text-ft-1.5 tb:pl-fex pl-tix">
                    INSTINCT
                  </h1>
                </div>
                <div className="tb:flex items-center w-full tb:pl-fff tb:py-fff">
                  <img
                    src="/images/sacred-tails.png"
                    alt="/"
                    className="w-tif mobile:w-fkx"
                  />
                  <h1 className="font-bold text-ft-1.5 pl-fex lg:ml-thp">
                    SACRED TAILS
                  </h1>
                </div>
              </div>
              <div className="tb:w-sfx self-stretch flex gap-2 tb:gap-0 justify-evenly flex-col">
                <h1 className="font-EurostileBold font-bold text-ft-2 leading-none mobile:text-ft5">
                  Access All Digital Assets <br className="hidden tb:block" />{" "}
                  Within One Ecosystem
                </h1>
                <p className="text-ft12 mobile:text-ft64 font-EurostileRegular align-justify text-grey-500 font-normal xl:text-ft26 xl:font-medium">
                  Hoardable enables individuals to purchase Non Fungible Tokens
                  seamlessly. In addition, some digital assets could also be
                  sold as part of a collection. Developers may use our suite of
                  tools to aggregate tokens in collections and create various
                  listings using token characteristics. This allows for a more
                  user-centric experience in which users may obtain utility
                  tokens associated with NFT collections. Hoardable fosters this
                  with access to purchase utility tokens tied to GameFi projects
                  that have their collections listed on the platform, thus
                  providing unparalleled access to entire GameFi ecosystems and
                  their respective digital assets.
                </p>
                <h1 className="font-EurostileBold font-bold text-ft-2 text-right">
                  AND MORE TO COME!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
