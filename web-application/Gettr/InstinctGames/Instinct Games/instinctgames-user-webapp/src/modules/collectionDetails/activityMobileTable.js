import React from "react"
import { useSelector } from "react-redux";
import moment from "moment";
import { CURRENCIES } from "../../constants";

function ActivityMobileTable(props) {
    const {data,tabId,getExactIcon,setTabId} = props
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
      console.log("Hello window")
      window.open (
        process.env.REACT_APP_BINANCE_EXPLORER_TRANSACTION + address,'_blank', 'noopener,noreferrer');
    }
    return ( 
        <div className="w-full flex lg:hidden">
        <div className="policy_clip py-12 overflow-y-scroll scrollbar px-5 w-full shadow-layout  bg-black-100">
          <div className="flex flex-col gap-8">
            {data.map((item, index) => (
              <div key={item._id}>
                <div className="flex text-white justify-between">
                  <div className="flex gap-2">
                  {item.contentId.cdnUrl?.split(".").pop() === "mp4" ||
            item.contentId.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                 <video
                    className="w-14 h-13.25 object-cover rounded object-right-top"
                    src={item.contentId?.cdnUrl}
                  ></video>
              </>
            ) : item.contentId.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                  <video
                    className="w-14 h-13.25 object-cover rounded object-right-top audio-nft"
                    src={item.contentId?.cdnUrl}
                  ></video>
              </>
            ) : (
              <>
                  <img
                    className="w-14 h-13.25 object-cover rounded object-right-top"
                    src={item.contentId?.cdnUrl}
                  ></img>
              </>
            )}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-1.5 font-Eurostile font-black text-ft2">
                        {/* <img
                          className="w-2.75 h-2.75"
                          src={getExactIcon(item.type).imgUrl}
                          alt={getExactIcon(item.type).alt}
                        /> */}
                        <p>{getExactIcon(item.type).name}</p>
                      </div>
                      <p className="text-ft40 font-EurostileMedium">
                        {item.collectionId?.name ? item.collectionId.name : "--"}
                      </p>
                      <p className="text-ft2 font-EurostileBold">
                        {item.contentId
                          ? item.contentId.name +
                            " #" +
                            item.contentId.documentCount
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="text-ft40 flex flex-col gap-2 items-end font-EurostileMedium">
                    <div className="flex items-center gap-1.5">
                      <img
                        className="w-3.25 h-3.25"
                        src="/images/binance-icon.svg"
                        alt="coin"
                      />
                      <p>{item.price}</p>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <p>{moment(item.addedOn).fromNow()}</p>
                      {/* <a
                                  target="_blank"
                                  href={
                                    process.env.REACT_APP_BINANCE_EXPLORER_TRANSACTION+
                                    item.transactionHash
                                  } */}
                                  {/* > */}
                      <img
                        className="w-2 h-1.25 cursor-pointer"
                        src="/images/shareIcon.svg"
                        alt="share-icon"
                        onClick={()=>bscLink(item.transactionHash)}
                      />
                         
                                  
                  
                      {/* </a> */}
                    </div>
                    <p
                      className="underline cursor-pointer"
                      onClick={() => {
                        setTabId(index);
                      }}
                    >
                      More +
                    </p>
                  </div>
                </div>
                {tabId === index && (
                  <div className="grid place-items-center gap-2 mt-4 grid-cols-4 text-ft5 text-white">
                    <div>
                      <p className=" font-EurostileBold">Price</p>
                      <p className=" font-EurostileMedium">
                        $
                        {(getUsdPrice(item.currency) * item.price).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div>
                      <p className=" font-EurostileBold">Quantity</p>
                      <p className=" font-EurostileMedium">1</p>
                    </div>
                    <div>
                      <p className=" font-EurostileBold">From</p>
                      <p className=" font-EurostileMedium">
                        {item.seller && item.seller.firstName.length > 2
                          ? item.seller.firstName
                          : "----"}
                      </p>
                    </div>
                    <div>
                      <p className=" font-EurostileBold">To</p>
                      <p className=" font-EurostileMedium">
                        {item.buyer && item.buyer.firstName.length > 2
                          ? item.buyer.firstName
                          : "----"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
     );
}

export default ActivityMobileTable;