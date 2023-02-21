import React, { useEffect, useState } from "react";
import CommonToasts from "../../common/components/commonToasts";
import { CURRENCIES, validationsMessages } from "../../constants";
import utility from "../../utility";

const CheckOutDialog = (props) => {
  const handleCheckout = () => {
    if (props?.userDetails?.isBlocked === true) {
      CommonToasts.errorToast(validationsMessages.UNABLE_TO_BUY_NFTS);
    } else {
      props.checkoutHandler();
    }
  };

  const [convertedData, setConvertedData] = useState(
    props.currencies?.priceBNBToUSD
  );

  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  function shortenL(b, amountL = 200, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  useEffect(() => {
    if (props?.nftDetails?.saleData?.currency === CURRENCIES.BNB) {
      setConvertedData(
        props?.nftDetails?.saleData?.price * props.currencies?.priceBNBToUSD
      );
    } else if (
      props?.nftDetails?.saleData?.currency === CURRENCIES.SACREDTALES
    ) {
      setConvertedData(
        props?.nftDetails?.saleData?.price * props.currencies?.priceSacredToUSD
      );
    } else if (
      props?.nftDetails?.saleData?.currency === CURRENCIES.INSTINCTGAMES ||
      props?.nftDetails?.saleData?.currency === CURRENCIES.INSTINCT
    ) {
      setConvertedData(
        props?.nftDetails?.saleData?.price *
          props.currencies?.priceInstinctToUSD
      );
    }
  }, [props?.nftDetails?.saleData]);

  return (
    <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
      <div
        open={props.open}
        onClose={() => props.handleClose(false)}
        className="flex flex-col w-full min-w-330 max-w-md_2 polygon-wallet shadow-layout  bg-black-100"
      >
        <img
          onClick={() => {
            props.handleClose(false);
          }}
          className="w-4 h-4 tb:w-7 tb:h-7 self-end relative top-4 right-5 cursor-pointer"
          src="/images/xIcon.svg"
          alt="close"
        />
        <h1 className="font-EurostileBold text-center text-white text-ft5 tb:text-ft16">
          Checkout
        </h1>
        <div className="mt-9.5 pl-10 tb:pl-20 flex gap-4">


        {props?.nftDetails?.cdnUrl?.split(".").pop() === "mp4" ||
            props?.nftDetails?.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                <video
                  controls
                  className="rounded-md w-39 h-36 tb:h-79 tb:w-85 audio-nft audio-border"
                  src={props?.nftDetails?.cdnUrl}
                  onClick={props.toggleFullImageView}
                  autoPlay
                  loop
                  playsInline
                ></video>
                {/* <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                /> */}
              </>
            ) : props?.nftDetails?.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                <video
                  controls
                  className="rounded-md w-39 h-36 tb:h-79 tb:w-85 audio-nft audio-border"
                  src={props?.nftDetails?.cdnUrl}
                  onClick={props.toggleFullImageView}
                  autoPlay
                  loop
                  playsInline
                ></video>
                {/* <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                /> */}
              </>
            ) : (
              <>
                <img
                  className="rounded-md w-39 h-36 tb:h-79 tb:w-85 audio-nft audio-border"
                  src={props?.nftDetails?.cdnUrl}
                  onClick={props.toggleFullImageView}
                ></img>
                {/* <img
                  onClick={props.likeUnlikeNFT}
                  className="absolute top-2.5 left-2.5 w-8 cursor-pointer "
                  src={
                    props.state.isLiked
                      ? "/images/Icon awesome-heart.svg"
                      : "/images/hollow-heart.svg"
                  }
                /> */}
              </>
            )}




          {/* <img
            className="rounded-md w-39 h-36 tb:h-79 tb:w-85 "
            src={props?.nftDetails?.cdnUrl}
          ></img> */}





          <div>
            <div className="font-EurostileBold mb-5 text-left text-white text-ft25 tb:text-ft16">
              {shorten(props?.nftDetails?.name)} #
              {props?.nftDetails?.documentCount || 23}
            </div>
            <div className="flex gap-x-tix items-center font-black font-EurostileMedium mb-3.5 text-left text-grey-120 text-ft0 tb:text-ft12">
              <span>{props?.nftDetails?.saleData?.price}</span>
              {utility.getTokenIcon(props?.nftDetails?.saleData?.currency) ? (
              <img
                className="w-6"
                id="coin-icon"
                src={utility.getTokenIcon(props?.nftDetails?.saleData?.currency)}
                alt="/"
              />
            ) : (
              <span className="w-2 tb:w-7.5 text-truncate">
                {props?.nftDetails?.saleData?.currency}
              </span>
            )}
            </div>
            <div className="font-black font-EurostileMedium my-3.5 text-left text-grey-120 text-ft0 tb:text-ft12">
              {shortenL(props?.nftDetails?.description)}
            </div>
          </div>
        </div>
        <div className="mt-9.5 self-center mb-11.5">
          <button
            className="market-button overflow-hidden relative z-10 border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-1 tb:py-2 px-4 border-blue-80 text-ft0 tb:text-ft6 bg-blue-60 w-25 tb:w-45 tb:h-12"
            type="button"
            onClick={handleCheckout}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckOutDialog;
