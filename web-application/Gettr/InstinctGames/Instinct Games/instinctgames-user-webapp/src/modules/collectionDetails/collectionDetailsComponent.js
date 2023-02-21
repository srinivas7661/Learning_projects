import React, { useState, useEffect } from "react";
import {
  detailsTab,
  genericConstants,
  itemsCart,
  receivedCart,
} from "../../constants";
import { getApproveToken } from "../../services/adminConfigMicroservices";
import PriceGraph from "../common/priceGraph";
import { NftList } from "../explorePage/explorePageComponent";
import FilterSideBar from "./filterSide";
// import { contentService } from "../../services/index";
import ActivityTable from "../common/table/table";
import InfiniteScroll from "react-infinite-scroller";
import Utils from "../../utility";
import { useDispatch } from "react-redux";
import { eventConstants } from "../../constants";

function CollectionDetailsComponent(props) {
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const userName = "0x6a0a326c4e7c07c1bf137a0abddef7c334b988d1";
  const [priceFilter, setPriceFilter] = useState(false);

  const suggestedCollections = props.state.nftList.filter((item) =>
    item.name.toLowerCase().includes(props.state.searchName.toLowerCase())
  );
  const dispatch = useDispatch();
  const getExactIcon = (type) => {
    switch (type) {
      case "BUY":
        return {
          imgUrl: "/images/sale.png",
          alt: "buy",
          name: "BUY",
        };
      case "OFFER":
        return {
          imgUrl: "/images/list.svg",
          alt: "offer",
          name: "OFFER",
        };
      case "MINT":
        return {
          imgUrl: "/images/tag-icon.svg",
          alt: "list",
          name: "LIST",
        };
      case "SELL":
        return {
          imgUrl: "/images/sale.png",
          alt: "listed",
          name: "LISTED",
        };
      default:
        return {
          imgUrl: "",
          alt: "",
          name: "---",
        };
    }
  };
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

  const DateConstants = [
    {
      name: "All Time",
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

  const getPeriod = (value) => {
    switch (value) {
      case 365:
        return "All Time";
      case 30:
        return "Monthly";
      case 7:
        return "Weekly";
      default:
        return;
    }
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({ type: eventConstants.SHOW_LOADER });
  //   }, 4000);
  // }, []);
  return (
    <div className="hidden md:block w-full bg-hero bg-cover min-h-screen">
      {/* Collection-Image Cover */}
      <div>
        <img
          className="w-full h-85.5 object-cover object-bottom"
          src={props.state.collectionDetails?.coverUrl}
          alt={props.state.collectionDetails?.name}
        />
      </div>
      {/* CollectionDetails */}
      <div className="border-t-5 border-b-5 gap-y-4 bg-black-300 bg-opacity-50 pt-12.25 pb-3  px-15 flex flex-col items-start  border-primary-50">
        {/* Description_View */}
        <div className="w-full md:flex gap-10">
          {/* Stats */}
          <div className=" w-80 h-65 clip_dl border-2 border-primary-50 bg-primary-50">
            <div className=" w-full h-full clip_dl grid grid-cols-2 bg-black-100">
              <div className="bg-black-200 bg-opacity-33 flex flex-col items-center justify-center">
                <h1 className="text-blue-80 font-EurostileExtd font-black text-ft9">
                  {props.state.collectionDetails?.totalCount || 0}
                </h1>
                <p className="text-ft25 font-EurostileBold font-bold text-white opacity-33">
                  items
                </p>
              </div>
              <div className="bg-black-200 flex flex-col items-center justify-center ">
                <h1 className="text-blue-80 font-EurostileExtd font-black text-ft9">
                  {/* {props.state?.statsData?.Owners || 0} */}
                  {props.state.collectionDetails?.ownerList || 0}
                </h1>
                <p className="text-ft25 font-EurostileBold font-bold text-white opacity-33">
                  owners
                </p>
              </div>
              <div className="bg-black-200 flex flex-col items-center justify-center">
                <h1 className="text-blue-80 font-EurostileExtd font-black text-ft9">
                  {props.state?.statsData?.minPrice?.length
                    ? props.state?.statsData?.minPrice[0].floorPrice.toFixed(2)
                    : 0}
                </h1>
                <p className="text-ft25 font-EurostileBold font-bold text-white opacity-33">
                  floor price
                </p>
              </div>
              <div className="bg-black-200 flex flex-col items-center justify-center bg-opacity-33">
                {props.state.volumeTradeCount !== "--" ?
                  (<h1 className="text-blue-80 font-EurostileExtd font-black text-ft9">
                    {numFormatter(
                      Number(props.state.volumeTradeCount).toFixed(2)
                    )}
                  </h1>)
                  :
                  (
                    <h1 className="text-blue-80 font-EurostileExtd font-black text-ft9">0.00</h1>
                  )
                }
                <p className="text-ft25 font-EurostileBold font-bold text-white opacity-33">
                  Volume traded
                </p>
              </div>
            </div>
          </div>
          {/* Collection-Info */}
          <div className="flex flex-grow justify-between">
            {/* collectionTitle */}
            <div className="text-white -mt-3.75">
              <div>
                <h1 className="text-ft11 font-EurostileExtd font-black">
                  {props.state.collectionDetails?.name || "--"}
                </h1>
                <p className="text-ft13 font-EurostileMedium">
                  created by{" "}
                  <span className="text-blue-80">
                    {Utils.getFormattedAddress(
                      props.state.collectionDetails?.createdByAddress
                    )}
                  </span>
                </p>
              </div>
              {/* collectionDescription */}
              <div className="mt-7">
                <h1 className="text-ft17 text-blue-80 font-EurostileExtd font-black">
                  Description
                </h1>
                <p className="text-ft13 max-w-650 font-EurostileMedium opacity-1">
                  {props.state.collectionDetails?.description}
                  {/* Sacred Tails is a MMORPG giving endless possibilities of playstyles tailored to the player, chat, trade, explore and battle. Huge E-Sports PVP tournaments funded by our smart tokenomics and seasonal based rewards dependant on your rankings. Guild Vs Guild, Guild Housing and much more.Players will be able to upgrade or breed their NFTs, compete in tournaments & earn rewards, access exclusive content and benefits, and conquer their way through the all-immersive Sacred Tails Metaverse. */}
                </p>
              </div>
            </div>
            {/* Network */}
            {/* <div className="flex  gap-4 items-start justify-end">
              <button className="text-white bg-blue-100 market-button relative overflow-hidden z-10 rounded-full border border-blue-80 py-2 w-45 flex justify-center items-center">
                <svg
                  className="fill-white w-4"
                  id="Icon_awesome-plus"
                  data-name="Icon awesome-plus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="31.682"
                  height="31.683"
                  viewBox="0 0 31.682 31.683"
                >
                  <path
                    id="Icon_awesome-plus-2"
                    data-name="Icon awesome-plus"
                    d="M29.419,14.7H19.236V4.513A2.263,2.263,0,0,0,16.973,2.25H14.71a2.263,2.263,0,0,0-2.263,2.263V14.7H2.263A2.263,2.263,0,0,0,0,16.96v2.263a2.263,2.263,0,0,0,2.263,2.263H12.447V31.669a2.263,2.263,0,0,0,2.263,2.263h2.263a2.263,2.263,0,0,0,2.263-2.263V21.486H29.419a2.263,2.263,0,0,0,2.263-2.263V16.96A2.263,2.263,0,0,0,29.419,14.7Z"
                    transform="translate(0 -2.25)"
                    fill
                  />
                </svg>
                <p className="ml-4">Watchlist</p>
              </button>
              <button className="rounded-full bg-blue-100 market-button relative z-10 overflow-hidden border p-2 border-blue-80">
                <svg
                  className="w-7 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                >
                  <path d="M41.625 10.77c-3.98-3.204-10.277-3.747-10.547-3.766a.992.992 0 0 0-.988.586 6.63 6.63 0 0 0-.305.832c2.633.445 5.867 1.34 8.793 3.156a1 1 0 1 1-1.055 1.7C32.493 10.155 26.211 10 25 10c-1.21 0-7.496.156-12.523 3.277a1 1 0 0 1-1.055-1.7c2.926-1.811 6.16-2.71 8.793-3.151-.152-.496-.29-.809-.3-.836a.987.987 0 0 0-.993-.586c-.27.02-6.567.562-10.602 3.809C6.215 12.761 2 24.152 2 34c0 .176.047.344.133.496 2.906 5.11 10.84 6.445 12.648 6.504h.031a1 1 0 0 0 .81-.41l1.827-2.516c-4.933-1.273-7.453-3.437-7.597-3.566a1 1 0 0 1 1.324-1.5C11.234 33.063 15.875 37 25 37c9.14 0 13.781-3.953 13.828-3.992a1 1 0 0 1 1.41.094.996.996 0 0 1-.09 1.406c-.144.129-2.664 2.293-7.597 3.566l1.828 2.516a1 1 0 0 0 .809.41h.03c1.81-.059 9.743-1.395 12.65-6.504.085-.152.132-.32.132-.496 0-9.848-4.215-21.238-6.375-23.23ZM18.5 30c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4Zm13 0c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4Z" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
        {/* TabSection */}
        <div className="border-b-3 gap-4  flex justify-center  w-full ">
          {detailsTab.map((tabs, index) => (
            <div
              onClick={() => props.changeActiveTab(index)}
              className="flex flex-col items-center cursor-pointer"
              key={index}
            >
              <div className="flex gap-1 items-center">
                <img className="" src={tabs.imageUrl} alt={tabs.name} />
                <h1
                  className={`text-ft17 font-EurostileExtended font-black ${props.state.activeTab !== tabs.name
                    ? "text-white"
                    : "text-blue-80"
                    }`}
                >
                  {tabs.name}
                </h1>
              </div>
              {props.state.activeTab === tabs.name && (
                <hr className="text-blue-80 w-4 border-t-3 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Main Section */}
      <div className="flex">
        {/* SideBar */}
        <FilterSideBar params={props} activeTab={props.state.activeTab} collectionNFTAttributes={props.collectionNFTAttributes} filterNfts={props.filterNfts} />
        {/* Activity */}
        {props.state.activeTab === detailsTab[0].name ? (
          <div
            className={`${props.state.sideBarStatus ? "profile_width  " : "close_width"
              } flex mt-5 justify-center`}
          >
            <div className="nft_clip_dl w-91pe px-8 xl:px-10 bg-black-100">
              {/* Header */}
              <div className="mt-5 mb-8 flex flex-wrap gap-4 justify-between w-98pe">
                {/* Search */}
                <div className="flex w-45 xl:w-57.5 2xl:w-72 cut-border items-center border-r-4 border-blue-80">
                  <img
                    src="/images/search-icon.svg"
                    alt="searchIcon"
                    className="pl-3"
                  />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    value={props.state.searchName}
                    onChange={(e) => {
                      props.changeSearchName(e.target.value);
                    }}
                    autoComplete="off"
                    className="px-4 cut-border w-full text-white  h-8 placeholder-grey-500 focus:outline-none"
                  />
                </div>
                {/* DropDown icons and Icons */}
                <div className="flex flex-wrap justify-between gap-7">
                  <div className="flex gap-5">
                    {/* <select className="bg-blue-100 w-35 text-ft5 2xl:text-ft-1 border border-blue-80 text-white p-1 cursor-pointer focus:outline-none">
                      {itemsCart.map((item, index) => (
                        <option className="option_style" key={index}>
                          {item}
                        </option>
                      ))}
                    </select> */}
                    {/* <select className="bg-blue-100 text-ft5 2xl:text-ft-1 border border-blue-80 text-white p-1 cursor-pointer focus:outline-none">
                      {receivedCart.map((item, index) => (
                        <option className="option_style" key={index}>
                          {item}
                        </option>
                      ))}
                    </select> */}
                    <div className="p-3 relative w-auto">
                      <div
                        className="flex bg-blue-400 cursor-pointer border p-2 justify-between border-blue-80 text-white text-ft63 items-center w-44.25 mob:text-ft1"
                        onClick={props.toogleFilterDropdown}
                      >
                        <span>
                          {props.state.recentFilterIndex !== ""
                            ? genericConstants.RECENTLY_FILTER[
                              props.state.recentFilterIndex
                            ].name
                            : "Sort by"}
                        </span>
                        <div className="ml-2">
                          <img
                            src={
                              props.state.recentFilter
                                ? "/images/arrow-up.svg"
                                : "/images/arrow-down.svg"
                            }
                            className="w-4.5"
                          />
                        </div>
                      </div>
                      {props.state.recentFilter ? (
                        <div className="bg-blue-400 z-50 absolute text-white mob:text-ft1 border    border-blue-80">
                          {genericConstants.RECENTLY_FILTER.map(
                            (item, index) => (
                              <div
                                key={item.value}
                                className=" hover:bg-blue-80 border-b border-blue-80 py-3 px-8 text-ft63 mob:text-ft1 whitespace-nowrap"
                                onClick={() => {
                                  props.onChangeRecentFilter(index);
                                  // setSelectedWeeklyIndex(index);
                                  // props.toogleFilterDropdown();
                                  // props.getCollectedNfts();
                                }}
                              >
                                {item.name}
                              </div>
                            )
                          )}
                          {/* {genericConstants.PRICE_FILTER.map(
                            (item, index) => (
                              <div
                                key={index}
                                className=" hover:bg-blue-80 border-b cursor-pointer border-blue-80 py-3 px-8 text-ft63 mob:text-ft1 whitespace-nowrap"
                                onClick={() => {
                                  props.setPriceFilterValue(index);
                                  props.toggleShowPriceFilter();
                                  // setSelectedWeeklyIndex(index);
                                  // props.toogleFilterDropdown();
                                  // props.getCollectedNfts();
                                }}
                              >
                                {item}
                              </div>
                            )
                          )} */}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <img
                      src="/images/Square.svg"
                      alt="album"
                      className="cursor-pointer"
                      onClick={() => {
                        setWidth("");
                        setHeight("");
                      }}
                    />
                    <img
                      className="cursor-pointer"
                      src="/images/square-small.svg"
                      alt="timer"
                      onClick={(e) => {
                        setWidth("w-37.5");
                        setHeight("h-40");
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Collection */}
              <div className="py-8 h-185 scrollbar overflow-y-scroll">
                {/* <InfiniteScroll
                  pageStart={0}
                  loadMore={props.loadMore}
                  hasMore={true}
                  loader={<></>}
                  useWindow={false}
                > */}
                {console.log("suggestedcollection", suggestedCollections)}
                {props.state.collectionDetails.length !== 0 && (
                  <NftList
                    nfts={suggestedCollections}
                    limit={props.state.limit}
                    totalNftsCount={props.state.nftsCount}
                    loadNftList={props.filterNftList}
                    width={width}
                    height={height}
                  />
                )}
                {/* <div className=" flex flex-col  pt-8	">
    <button
      className=" content-between bg-transparent hover:bg-green-800 
      text-green-800 font-semibold hover:text-white py-2 px-4 border
      border-green-800 hover:border-transparent rounded"
      onClick={props.loadMore} >
          Load More
     </button>
</div> */}
                {/* </InfiniteScroll> */}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${props.state.sideBarStatus ? "profile_width" : "close_width"
              } mt-5 flex px-5 justify-center`}
          >
            {/* <h1 className="text-white font-EurostileExtended font-black text-ft19"> */}
            <div className="w-full h-3/4">
              <div className=" h-2/5 bg-black-100 mx-auto price-graph-polygon px-7 py-4 mb-5">
                <>
                  <div className="h-1/6 pt-5 pl-3 text-ft2 text-grey-120">
                    <div className="flex justify-between">
                      <div>
                        <div>
                          {
                            genericConstants.PRICE_GRAPH_FILTER[
                            props.state.selectedTime
                            ]
                          }
                        </div>
                        <div className="flex">
                          <div>Average Price </div>
                          <div className="text-blue-80 pl-1">
                            {props?.state?.avgPrice ? props?.state?.avgPrice.toFixed(5) : "0.00"}
                          </div>
                        </div>
                      </div>
                      {/* filter */}
                      <div className="relative w-32 font-EurostileMedium ">
                        <div
                          onClick={() => setPriceFilter((pre) => !pre)}
                          className="border bg-blue-60 text-white cursor-pointer justify-between flex items-center border-blue-80  mr-3 w-full h-8 pl-1 pr-1"
                        >
                          <p>{getPeriod(props.state.selectedTime)}</p>
                          <img
                            src={
                              priceFilter
                                ? "/images/arrow-up.svg"
                                : "/images/arrow-down.svg"
                            }
                            className="w-4.5"
                          />
                        </div>
                        {priceFilter && (
                          <div className="absolute top-8 z-10 w-full">
                            {DateConstants.map((item, id) => (
                              <p
                                key={item.value}
                                className="border bg-blue-150 text-center py-1 text-white hover:bg-blue-80 border-blue-80 cursor-pointer"
                                onClick={() => {
                                  props.selectTime(item.value);
                                  setPriceFilter(false);
                                }}
                              >
                                {item.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="h-3/4">
                    {props?.state?.priceGraphData &&
                      props?.state?.priceGraphData.length ? (
                      <PriceGraph
                        data={props?.state?.priceGraphData}
                      />
                    ) : (
                      <div className="text-center relative top-1/2 text-white">
                        {" "}
                        No Graph Data
                      </div>
                    )}
                  </div>
                </>
              </div>
              <div className="mx-auto h-4/5 bg-black-100 overflow-auto">
                <ActivityTable
                  data={props.state.itemActivities}
                  getExactIcon={getExactIcon}
                />
              </div>
            </div>
            {/* </h1> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionDetailsComponent;
