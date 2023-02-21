import React, { useEffect, useState } from "react";
import CommonToasts from "../../common/components/commonToasts";
import { CURRENCIES, validationsMessages } from "../../constants";
import { acceptOffer } from "../../services/contentMicroservice";
import utility from "../../utility";

const AcceptOfferDialog = (props) => {
  const { specificOffer } = props;
  const handleCheckout = () => {
    props.saleProcessPopup(true);
    if (props?.userDetails?.isBlocked === true) {
      CommonToasts.errorToast(validationsMessages.UNABLE_TO_BUY_NFTS);
    } else {
      props.checkoutHandler();
      props.acceptOfferNft();
    }
  };

  return (
    <>
      <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
        <div
          open={props.open}
          onClose={() => props.handleClose(false)}
          className="flex flex-col w-full min-w-330 max-w-md_2 polygon-wallet shadow-layout  bg-black-100"
        >
          <div className="flex mt-5 justify-evenly">
            <div className="font-black font-EurostileExtended text-center text-white 2xl:text-ft-1.5 w-efx text-ft4 pt-sep">
              Accept this offer
            </div>
            <img
              src="/images/xIcon.svg"
              className="cursor-pointer ml-fex tb:w-8.5 tb:h-8.5 h-4 w-4"
              onClick={() => props.handleClose(false)}
            />
          </div>

          <div className="w-nex ml-auto mr-auto  mt-1vw">
            <th className="w-full flex">
              <tr className="flex justify-between text-grey-55 2xl:text-ft-1 w-full text-ft1">
                <td>Price</td>
                <td>Subtotal</td>
              </tr>
            </th>
            <hr className="border-violet-10 w-full mt-0.5vw"/>
            <tbody className="mt-fff flex w-full">
              <tr className="flex justify-between w-full">
                <td className="flex gap-x-fff">
                  



                {specificOffer.cdnUrl?.split(".").pop() === "mp4" ||
            specificOffer.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                 <video
                    className="rounded-md w-twx"
                    src={specificOffer.cdnUrl}
                  ></video>
              </>
            ) : specificOffer.cdnUrl?.split(".").pop() === "mp3" ? (
              <>
                  <video
                    className="rounded-md w-twx audio-nft"
                    src={specificOffer.cdnUrl}
                  ></video>
              </>
            ) : (
              <>
                  <img
                    className="rounded-md w-twx"
                    src={specificOffer.cdnUrl}
                  ></img>
              </>
            )}





                
                  <h1 className="font-EurostileExtended text-left text-white 2xl:text-ft-1 flex items-center text-ft1">
                    {specificOffer.name}
                  </h1>
                </td>
                <div>
                  <td className="2xl:text-ft-1 text-ft1 flex items-end text-white gap-2 justify-end">
                    <p>{specificOffer.offers.amount}</p>                     
                    {utility.getTokenIcon(props?.currency) ? (
                        <img
                            className="w-5"
                            src={utility.getTokenIcon(props?.currency)}
                        />
                    ) : (
                        props?.currency
                    )}
                    {/*<img src="/images/binance-icon.svg" className="w-1/4" />*/}
                  </td>
                  <td className="2xl:text-ft-1 text-ft1 text-grey-55 flex justify-end">
                    ({props.convertedUSD}&nbsp;<p>USD</p>)
                  </td>
                </div>
              </tr>
            </tbody>
          </div>
          <div className="w-nex ml-auto mr-auto mt-1vw">
            <thead className="w-full">
              <tr className="flex justify-between w-full  text-grey-55 2xl:text-ft-1 text-ft1">
                <th>Fees</th>
              </tr>
            </thead>
            <hr className="border-violet-10   w-full mt-0.5vw" />
            <tbody className="mt-fff grid grid-cols-1">
              <tr className="flex justify-between w-full text-grey-55 2xl:text-ft-1 text-ft1">
                <td className="flex">
                  <p>Hoardable Fees</p>
                </td>
                <td className="text-grey-55 2xl:text-ft-1 text-ft1">
                  {2*Number(specificOffer.offers.amount)/100}
                </td>
              </tr>
              {/*<tr className="flex justify-between w-full text-grey-55 2xl:text-ft-1 text-ft1">*/}
              {/*  <td className="flex">*/}
              {/*    <p>Creator</p>*/}
              {/*  </td>*/}
              {/*  <td className="text-grey-55 2xl:text-ft-1 text-ft1">*/}
              {/*    {specificOffer.offers.amount}*/}
              {/*  </td>*/}
              {/*</tr>*/}
              <tr className="flex justify-between w-full text-grey-55 2xl:text-ft-1 mt-1vw text-ft1">
                <td className="flex">
                  <p>Total Earnings</p>
                </td>
                <td className="text-grey-55 2xl:text-ft-1 text-ft1">
                  {Number(specificOffer.offers.amount)-(2*Number(specificOffer.offers.amount)/100)}
                </td>
              </tr>
            </tbody>
          </div>

          <div className="text-center mt-2vw tb:mb-2.5vw mb-5vw">
            <button
              className="w-thx market-button rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 2xl:text-ft-1 text-ft1 font-PoppinsMedium tb:h-2vw"
              type="button"
              onClick={handleCheckout}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AcceptOfferDialog;
