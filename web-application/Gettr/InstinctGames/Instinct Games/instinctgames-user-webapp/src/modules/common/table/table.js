import { MonetizationOn } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { CURRENCIES, genericConstants } from "../../../constants";
import { history } from "../../../managers/history";
import { pathConstants } from "../../../constants";

function TableActivity(props) {
 
  const { data, getExactIcon } = props;
  const currencyPrice = useSelector((state) => state.currency);

  const getUsdPrice = (currency) => {
    switch (currency) {
      case CURRENCIES.BNB:
        return currencyPrice.priceBNBToUSD;
      case CURRENCIES.SACREDTALES:
        return currencyPrice.priceSacredToUSD;
      case CURRENCIES.INSTINCT:
        return currencyPrice.priceInstinctToUSD;

      default:
        break;
    }
  };
  const bscLink=(address)=> {
    window.open (
      process.env.REACT_APP_BINANCE_EXPLORER_TRANSACTION + address,'_blank', 'noopener,noreferrer');
  }

  const modifyUserId = (userId) => {
    return userId.slice(0, 5) + "..." + userId.slice(-3)
  }

  const NFTDetailsRoute = (id, collectionAddress, tokenId) => {
    history.push(pathConstants.HEADER.NFT_DETAILS + "?id=" + id + "&collectionAddress=" + collectionAddress + "&tokenId=" + tokenId);
  }
  return (
    <table className="flex flex-col w-full text-white ">
      {/* Table Head */}
      <thead className="w-full font-Eurostile py-thp border-b-2 border-primary-50 font-bold text-ft2">
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
        {data.map((item, index) => {
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
              <td
                className="flex justify-center w-1/4 items-center gap-4 cursor-pointer"
                onClick={() => NFTDetailsRoute(item?.contentId?._id, item?.collectionAddress, item?.contentId?.tokenId)}
              >
              {item.contentId.cdnUrl?.split(".").pop() === "mp4" ||
              item.contentId.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                 <video
                    className="w-12 h-12 object-cover rounded object-right-top"
                    src={item.contentId?.cdnUrl}
                  ></video>
              </>
            ) : item.contentId.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                  <video
                    className="w-12 h-12 object-cover rounded object-right-top audio-nft"
                    src={item.contentId?.cdnUrl}
                  ></video>
              </>
            ) : (
              <>
                  <img
                    className="w-12 h-12 object-cover rounded object-right-top"
                    src={item.contentId?.cdnUrl}
                  />
              </>
            )}



                {/* <img
                  className="w-12 h-12 object-cover rounded object-right-top"
                  src={
                    item.contentId ? item.contentId.cdnUrl : "/images/zeni.png"
                  }
                  alt="zeni"
                /> */}
                <div className="w-25">
                  <p className="text-ft2 text-truncate font-EurostileMedium">
                    {item.contentId ? item.contentId.name : "--"}
                  </p>
                  <p className="text-ft2 text-truncate font-Eurostile font-bold">
                    {item.contentId ? item.contentId.name + "#" + index : "--"}
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
                  <span className="pl-1">{item.price}</span>
                </div>
                <span>
                  {(getUsdPrice(item?.currency) * item.price).toFixed(2)}
                </span>
              </td>
              <td className="text-ft2 w-12.5% text-center">
                <span>1</span>
              </td>
              <td className="text-ft2 w-12.5% text-center">
                <span>{item.seller ? item.seller.firstName !== "" ? item.seller.firstName : modifyUserId(item.seller?.userId) : "----"}</span>
              </td>
              <td className="text-ft2 w-12.5% text-center">
                {item?.type !== "SELL" ? <span>{item.buyer ? item.buyer.firstName !== "" ? item.buyer.firstName : modifyUserId(item.buyer?.userId) : "----"}</span> : <span>----</span> }
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
        {data.length === 0 && (
          <tr className="w-full flex items-center">
            <td className="flex w-12.5% items-center gap-1">
              <span>-</span>
            </td>
            <td className="flex justify-center w-1/4 items-center gap-4">
              <span>-</span>
            </td>
            <td className="text-ft2 w-12.5% text-center flex flex-col gap-1 items-center">
              <span>-</span>
            </td>
            <td className="text-ft2 w-12.5% text-center">
              <span>-</span>
            </td>
            <td className="text-ft2 w-12.5% text-center">
              <span>-</span>
            </td>
            <td className="text-ft2 w-12.5% text-center">
              <span>-</span>
            </td>
            <td className="text-ft2 w-12.5% flex justify-center items-center gap-2">
              <span>-</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableActivity;
