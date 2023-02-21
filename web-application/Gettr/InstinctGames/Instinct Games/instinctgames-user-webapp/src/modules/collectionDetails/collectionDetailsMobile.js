import React from "react";
import {
  detailsTab,
  itemsCart,
  receivedCart,
  genericConstants,
} from "../../constants";
import PriceGraph from "../common/priceGraph";
import ActivityTable from "../common/table/table";
import { NftList } from "../explorePage/explorePageComponent";
import ActivityMobileTable from "./activityMobileTable";
import Utils from "../../utility";

const CollectionDetailsMobile = (props) => {
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const suggestedCollections = props.state.nftList.filter((item) =>
    item.name.toLowerCase().includes(props.state.searchName.toLowerCase())
  );
  const [priceFilter,setPriceFilter] = React.useState(false)

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
          imgUrl: "/images/eye-slash.svg",
          alt: "sale",
          name: "SALE",
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
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }
  const DateConstants =[
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
    }  
    ]
    
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
    }
 

  return (
    <div className="md:hidden bg-hero bg-cover px-5 py-5">
      <div>
        <img
          className="w-full h-85.5 object-cover object-bottom"
          src={props.state.collectionDetails?.imageUrl}
          alt={props.state.collectionDetails?.name}
        />
      </div>
      <div className="flex justify-between mr-13.5 mt-4.75">
        <h1 className="text-white text-ft8 font-black font-EurostileExtended">
        {props.state.collectionDetails?.name || "--"}
        </h1>
        {/* <button className="text-white bg-blue-60 px-20 rounded-full">
          Watchlist
        </button> */}
      </div>
      <p className="text-ft13 font-EurostileMedium text-white">
        Created by <span className="text-blue-80">{Utils.getFormattedAddress(props.state.collectionDetails?.createdByAddress)}</span>
      </p>

      <h2 className="text-blue-80 text-ft4 mt-2.25">Description</h2>

      <p className="mt-0.75 text-white">
      {props.state.collectionDetails?.description}
      </p>
      <div className="flex bg-black-60 py-10 border border-primary-50 polygon">
        <div className="w-1/4 text-center flex flex-col items-center justify-center">
          <h1 className="font-black font-EurostileExtd text-blue-80 text-ft-2.7 tb:text-ft16">
          {/* {props.state?.statsData?.totalNftCount || 0} */}
          {props.state.collectionDetails?.totalCount || 0}
          </h1>
          <p className="text-ft-1.1 tb:text-ft13 opacity-33 font-EurostileBold text-white">
            items
          </p>
        </div>
        <div className="w-1/4 text-center flex flex-col items-center justify-center">
          <h1 className="font-black font-EurostileExtd text-blue-80 text-ft-2.7 tb:text-ft16">
          {/* {props.state?.statsData?.Owners || 0} */}
          { props.state.collectionDetails?.ownerList || 0}
          </h1>
          <p className="text-ft-1.1 tb:text-ft13 opacity-33 font-EurostileBold text-white">
          owners
          </p>
        </div>
        <div className="w-1/4 text-center flex flex-col items-center justify-center">
          <h1 className="font-black font-EurostileExtd text-blue-80 text-ft-2.7 tb:text-ft16">
          {props.state?.statsData?.minPrice?.length
                    ? props.state?.statsData?.minPrice[0].floorPrice.toFixed(2)
                    : 0}
          </h1>
          <p className="text-ft-1.1 tb:text-ft13 opacity-33 font-EurostileBold text-white">
          floor price
          </p>
        </div>
        <div className="w-1/4 text-center flex flex-col items-center justify-center">
          <h1 className="font-black font-EurostileExtd text-blue-80 text-ft-2.7 tb:text-ft16">
          {numFormatter(Number(props.state.volumeTradeCount).toFixed(2))}
          </h1>
          <p className="text-ft-1.1 tb:text-ft13 opacity-33 font-EurostileBold text-white">
          Volume traded
          </p>
        </div>
      </div>

      <div className="border-b-3 gap-4 flex justify-center w-full mt-5.25">
        {detailsTab.map((tabs, index) => (
          <div
            onClick={() => props.changeActiveTab(index)}
            className="flex flex-col items-center cursor-pointer"
            key={index}
          >
            <div className="flex gap-1 items-center">
              <img className="w-3 h-3" src={tabs.imageUrl} alt={tabs.name} />
              <h1
                className={`text-ft61 font-EurostileExtended font-black ${
                  props.state.activeTab !== tabs.name
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

      {props.state.activeTab === detailsTab[0].name ? (
        <div
          className={`${
            props.state.sideBarStatus ? "" : "close_width"
          } my-5 flex justify-center`}
        >
          <div className="nft_clip_dl px-8 xl:px-10 bg-black-100">
            {/* Header */}
            <div className="mt-5 mb-8 flex flex-wrap gap-4 justify-end m" >
              {/* Search */}
              <div className="flex cut-border text-right border-r-4 border-blue-80 ">
                <img
                  src="/images/search-icon.svg"
                  alt="searchIcon"
                  className="pl-3 xsm:w-8"
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
                  className="px-4 cut-border w-full text-white  py-2 placeholder-grey-500 focus:outline-none "
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

                   <div className="p-3 relative">
                    <div
                      className="flex justify-between py-2.5 px-4  cursor-pointer relative border border-blue-80 text-white  items-center 2xl:w-55.1 2xl:h-10.5 w-43.75 h-9.5
                      bg-blue-100 text-ft5 2xl:text-ft-1  p-1  focus:outline-none"
                      onClick={props.toogleFilterDropdown}
                    >
                      <span>
                        {props.state.recentFilterIndex !== ""
                          ? genericConstants.RECENTLY_FILTER[props.state.recentFilterIndex].name
                          : "Sort by"}
                      </span>
                      <img
                        src={props.state.recentFilter?"/images/arrow-up.svg":"/images/arrow-down.svg"}
                        className="2xl:h-3.5 2xl:w-6 h-2.5 w-5"
                      />
                    </div>
                    {props.state.recentFilter ? (
                      <div className="bg-blue-400 z-50 absolute text-white text-ft5 2xl:w-55.1  w-43.75 border border-blue-80">
                        {genericConstants.RECENTLY_FILTER.map((item, index) => (
                          <div
                            key={item.value}
                            className="py-2.5 px-4 hover:bg-blue-80 border-b border-blue-80 2xl:h-10.5 h-9.5"
                            onClick={() => {
                              props.onChangeRecentFilter(index)
                              // setSelectedWeeklyIndex(index);
                              // props.toogleFilterDropdown();
                              // props.getCollectedNfts();
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
            {/* Collection */}
            <div className="py-8 h-185 scrollbar overflow-y-scroll">
              {props.state.collectionDetails.length !== 0 && (
                <NftList
                  nfts={suggestedCollections}
                  limit={props.state.limit}
                  totalNftsCount={props.state.nftsCount}
                  filterNftList={props.filterCollectionNftList}
                  width={width}
                  height={height}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            props.state.sideBarStatus ? "" : "close_width"
          } mt-5 flex justify-center`}
        >
          {/* <h1 className="text-white font-EurostileExtended font-black text-ft19"> */}
          <div className="w-full">
            <div className=" h-120 bg-black-100 mx-auto price-graph-polygon px-7 py-4 mb-5">
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
                          <div className="flex flex-col">  
                            <div>Average Price </div>
                            <div className="text-blue-80 pl-1">
                              {props?.state?.avgPrice.toFixed(5)}
                            </div>
                          </div>
                        </div>
                        {/* filter */}
                        <div className="relative w-32 font-EurostileMedium ">
                          <div
                            onClick={()=>setPriceFilter((pre)=>!pre)}
                            className="border bg-blue-60 text-white cursor-pointer justify-between flex items-center border-blue-80  mr-3 w-full h-8 pl-1 pr-1">
                            <p>{getPeriod(props.state.selectedTime)}</p>
                            <img
                            src={priceFilter?"/images/arrow-up.svg":"/images/arrow-down.svg"}
                            className="w-4.5"
                        />
                          </div>
                          {priceFilter && (
                          <div className="absolute top-8 z-10 w-full">
                            {DateConstants.map((item, id) => (
                              <p key={item.value}
                                className="border bg-blue-150 text-center py-1 text-white hover:bg-blue-80 border-blue-80 cursor-pointer"
                                onClick={() => { props.selectTime(item.value); setPriceFilter(false) }}
                              >{item.name}</p>
                            ))}
                          </div>)}
                        </div>
                      </div>
                    </div>
                    <div className="h-3/4">
                      {props?.state?.priceGraphData && props?.state?.priceGraphData.length ?(
                      <PriceGraph
                        data={props?.state?.priceGraphData}
                      ></PriceGraph>):(
                      <div className="text-center relative top-1/2 text-white"> No Graph Data</div>
                      )}                      
                    </div>
                 </>
            </div>
            <div className="mx-auto h-159 mb-10 bg-black-100 overflow-auto">
              <ActivityMobileTable 
                tabId={props.state.tabId}
                data={props.state.itemActivities}
                setTabId={props.setTabId}
                getExactIcon={getExactIcon} />                
            </div>
          </div>
          {/* </h1> */}
        </div>
      )}
    </div>
  );
};

export default CollectionDetailsMobile;
