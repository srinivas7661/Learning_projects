import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CURRENCIES, validationsMessages } from "../../constants";
import { useLocation } from "react-router-dom";
import CommonToasts from "../../common/components/commonToasts";

function SellNft(props) {
  const currencies = useSelector((state) => state.currency);
  const location = useLocation();
  const [token, setToken] = useState("BNB");
  const [arrow, setArrow] = useState(false);
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    setPrice(price || "");
    setCurrency(token || "");
  }, [props?.nftDetails]);

  function validateInformation() {
    let priceError = !price ? validationsMessages.PLEASE_ENTER_PRICE_ERROR : "";
    setPriceError(priceError);
    return !!priceError;
  }
  // console.log("locationValue--",location.state.detail)
  let nftData = location.state.detail;
  let nftObj = JSON.parse(nftData);
  console.log("nftlistItem", nftObj);

  const onClickHandler = async () => {
    if (!price) {
      CommonToasts.errorToast(validationsMessages.PLEASE_ENTER_PRICE_ERROR);
    } else {
      if (price < 0 || price == 0) {
        CommonToasts.errorToast(validationsMessages.PRICE_ERROR);
      } else {
        if (nftObj?.saleData?.isOpenForSale == true) {
          CommonToasts.errorToast(
            validationsMessages.UNABLE_TO_SELL_LISTED_ALREADY
          );
        } else {
          props.sellNowNft({
            price,
            token,
          });
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center py-14 justify-center bg-main bg-cover px-5 shadow-polygon min-h-screen">
        <div className="stats-polygon w-full max-w-1237 min-h-652 bg-black-60">
          <div className="font-EurostileExtd font-black uppercase text-white text-ft7 lg:text-ft19 text-center pt-8 pb-6 border-b-3 border-violet-10">
            List Item For Sale
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 px-5 pt-5 pb-14 lg:px-20.5 lg:py-14">
            {/* <img src={nftObj.cdnUrl} className="w-96.5 h-97.25"></img> */}

            {nftObj?.cdnUrl?.split(".").pop() === "mp4" ||
            nftObj?.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                <video
                  controls
                  className="w-72.5 h-72.5 lg:w-96.5 lg:h-97.25 tb:h-79 tb:w-85 rounded-md"
                  src={nftObj?.cdnUrl}
                  autoPlay
                  loop
                  playsInline
                ></video>
              </>
            ) : nftObj?.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                <video
                  controls
                  className="w-72.5 h-72.5 lg:w-96.5 lg:h-97.25 tb:h-79 tb:w-85 rounded-md audio-nft audio-border"
                  src={nftObj?.cdnUrl}
                  autoPlay
                  loop
                  playsInline
                ></video>
              </>
            ) : (
              <>
                <img
                  className="w-72.5 h-72.5 lg:w-96.5 lg:h-97.25 tb:h-79 tb:w-85 rounded-md"
                  src={nftObj?.cdnUrl}
                ></img>
              </>
            )}

            <div className="w-full flex flex-col max-w-627">
              <label
                className="block tracking-wide text-white text-ft-10 tb:text-ft12   mb-1 font-EurostileMedium"
                for="grid-password"
              >
                Price<span className="text-red-50 ml-1.25">*</span>
              </label>
              <div className="flex w-full text-ft-10 tb:text-ft12 font-EurostileMedium mt-3.75">
                <input
                  className="bg-black-300 border  border-r-0 border-primary-50 appearance-none rounded-l py-0.5 px-4 mb-2 focus:outline-none w-4/5 h-11 text-white"
                  placeholder="Price"
                  type="number"
                  min={0}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceError("");
                  }}
                />
                <div className="mb-2 relative">
                  <div
                    onClick={() => {
                      setArrow((prevState) => !prevState);
                    }}
                    className="flex items-center w-25 justify-between bg-black-300 px-4 h-11 rounded-r border border-primary-50  text-white"
                  >
                    <span className="overflow-hidden">{token}</span>
                    <img
                      className={`${
                        !arrow ? "" : "transform rotate-180"
                      } cursor-pointer w-5.75 h-6.75`}
                      src="/images/Dropdown.svg"
                    />
                  </div>
                  {arrow && (
                    <ul className="flex flex-col w-25 absolute z-50 right-0 top-12.25">
                      {props.state.approvedTokens.map((token, index) => (
                        <li
                          className="flex items-center cursor-pointer px-4  h-11 border bg-black-300 text-white border-primary-50"
                          onClick={() => {
                            setToken(token?.tokenSymbol);
                            setArrow(false);
                          }}
                          key={index}
                        >
                          {token?.tokenSymbol}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <label
                className="block tracking-wide text-white text-ft-10 tb:text-ft12  mb-1 font-EurostileMedium mt-5"
                for="grid-password"
              >
                Fees
              </label>
              <div className="flex mt-3.75 text-ft-10 tb:text-ft12">
                <div className="w-fzx font-EurostileMedium opacity-25 text-white">
                  {" "}
                  Service Fee
                </div>
                <div className="w-fzx text-right font-EurostileMedium opacity-25 text-white">
                  {" "}
                  2%
                </div>
              </div>
              <button
                className="border my-15 font-EurostileMedium self-center rounded-full market-button overflow-hidden relative z-10 focus:shadow-outline focus:outline-none text-white py-1 tb:py-2 px-4 border-blue-80 bg-blue-60 w-25 tb:w-45 text-ft1 tb:text-ft12 tb:h-12"
                type="button"
                onClick={onClickHandler}
              >
                Sell Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellNft;
