import React from "react";
import FilterSide from "./filter";
import moment from "moment";
import { useSelector } from "react-redux";
import { genericConstants } from "../../constants";
import MobileActivityFilter from "./mobileFilter";
import MobileTable from "./mobileTab";
// import TableActivity from "../common/table/table";

function ActivityComponent(props) {
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
  const getExactIcon = (type) => {
    switch (type) {
      case "MINT":
        return {
          imgUrl: "/images/tag-icon.svg",
          alt: "list",
          name: "LIST",
        };
      case "SELL":
        return {
          imgUrl: "/images/info.svg",
          alt: "listed",
          name: "LISTED",
        };
      case "BUY":
        return {
          imgUrl: "/images/roller-icon.svg",
          alt: "buy",
          name: "BUY",
        };
      case "REMOVE_FROM_SALE":
        return {
          imgUrl: "/images/timer-icon.svg",
          alt: "remove",
          name: "CANCEL",
        };
      case "OFFER":
        return {
          imgUrl: "/images/list.svg",
          alt: "offer",
          name: "OFFER",
        };
        case "TRANSFER":
          return {
            imgUrl: "/images/list.svg",
            alt: "transfer",
            name: "TRANSFER",
          };
      default:
        return {
          imgUrl: "",
          alt: "",
          name: "---",
        };
    }
  };
  const bscLink=(address)=> {
    console.log("Hello window")
    window.open (
      process.env.REACT_APP_BINANCE_EXPLORER_TRANSACTION + address,'_blank', 'noopener,noreferrer');
  }
  return (
    <div className="w-full pt-25">
      <div>
        <div className="w-full flex justify-center">
          {/* SideBar */}
          <FilterSide params={props} />
          <MobileActivityFilter params={props} />
          {/* Main */}
          <div
            className={`${
              props.state.isSideBarOpen ? "profile_width" : "close_width"
            }  hidden lg:flex px-5`}
          >
            <div className="policy_clip  w-full shadow-layout  bg-black-100">
              {/* Table Section */}
              <table className="flex flex-col w-full text-white ">
                {/* Table Head */}
                <thead className="w-full font-Eurostile py-thp border-b-2 border-primary-50 font-bold text-ft5">
                  <tr className="w-full flex text-center">
                    <th className="w-12.5%"></th>
                    <th className="w-1/4">Item</th>
                    <th className="w-12.5%">Price</th>
                    <th className="w-12.5%">Quantity</th>
                    <th className="w-12.5%">From</th>
                    <th className="w-12.5%">To</th>
                    <th className="w-12.5%">Time</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="flex flex-col  overflow-y-scroll scrollbar 2.5xl:gap-y-14 xl:gap-y-12 lg:gap-y-10 gap-y-8 pb-fff mt-fff pr-tex pl-thp">
                  {props.state.table.map((item) => {
                    return (
                      <tr key={item._id} className="w-full flex items-center">
                        <td className="flex w-12.5% items-center gap-2">
                          <img
                            className="w-4.5 h-4.5"
                            src={getExactIcon(item.type).imgUrl}
                            alt={getExactIcon(item.type).alt}
                          />
                          <span className="text-ft2 font-Eurostile font-black">
                            {getExactIcon(item.type).name}
                          </span>
                        </td>
                        <td className="flex justify-center w-1/4 items-center gap-4">
                          <img
                            className="w-12 h-12 object-cover rounded object-right-top"
                            src={
                              item.contentId
                                ? item.contentId.cdnUrl
                                : ""
                            }
                            alt="zeni"
                          />
                          <div className="w-25">
                            <p className="text-ft2 text-truncate font-EurostileMedium">
                              {item.collectionId?.name
                                ? item.collectionId.name
                                : "--"}
                            </p>
                            <p className="text-ft2 text-truncate font-Eurostile font-bold">
                              {item.contentId
                                ? item.contentId.name +
                                  " #" +
                                  item.contentId.documentCount
                                : "--"}
                            </p>
                          </div>
                        </td>
                        <td className="text-ft2 w-12.5% text-center flex flex-col gap-1 items-center">
                          <div className="flex items-center gap-1">
                            <img
                              className=" w-4 h-4"
                              src="/images/binance-icon.svg"
                              alt="coin"
                            />
                            <span>{item.price}</span>
                          </div>
                          <span className="pl-1">
                            {(
                              findCurrencyUSDPrice(item.currency) * item.price
                            ).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-ft2 w-12.5% text-center">
                          <span>1</span>
                        </td>
                        <td className="text-ft2 w-12.5% text-center">
                          <span>
                            {item.seller && item.seller.firstName.length > 2
                              ? item.seller.firstName
                              : "----"}
                          </span>
                        </td>
                        <td className="text-ft2 w-12.5% text-center">
                          <span>
                            {item.buyer && item.buyer.firstName.length > 2
                              ? item.buyer.firstName
                              : "----"}
                          </span>
                        </td>
                        <td className="text-ft2 w-12.5% flex justify-center items-center gap-2">
                          <span>{moment(item.addedOn).fromNow()}</span>
                          <img
                            className="w-4 h-4 cursor-pointer"
                            src="/images/shareIcon.svg"
                            alt="share-icon"
                            onClick={()=>bscLink(item.transactionHash)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {props.state.table.length === 0 && (
                    <tr className="w-full flex items-center">
                      <td className="flex w-12.5% items-center gap-1">
                        <span>---------</span>
                      </td>
                      <td className="flex justify-center w-1/4 items-center gap-4">
                        <span>---------</span>
                      </td>
                      <td className="text-ft-1.1 w-12.5% text-center flex flex-col gap-1 items-center">
                        <span>---------</span>
                      </td>
                      <td className="text-ft-1.1 w-12.5% text-center">
                        <span>---------</span>
                      </td>
                      <td className="text-ft-1.1 w-12.5% text-center">
                        <span>---------</span>
                      </td>
                      <td className="text-ft-1.1 w-12.5% text-center">
                        <span>---------</span>
                      </td>
                      <td className="text-ft-1.1 w-12.5% flex justify-center items-center gap-2">
                        <span>---------</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <MobileTable
            table={props.state.table}
            tabId={props.state.tabId}
            typeIcon={getExactIcon}
            moment={moment}
            currencyConversion={findCurrencyUSDPrice}
            getTabId={props.getTabId}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivityComponent;
