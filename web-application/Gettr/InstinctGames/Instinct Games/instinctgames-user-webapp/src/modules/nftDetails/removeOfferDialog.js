import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import { acceptOffer } from "../../services/contentMicroservice";

const RemoveOfferDialog = (props) => {
  const handleCheckout = () => {
    props.removeOfferHandler();
    props.rejectOfferNft();
  };

  return (
    <>
      <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
        <div
          open={props.open}
          onClose={() => props.handleClose(false)}
          className="flex flex-col w-full min-w-330 max-w-604 polygon-wallet shadow-layout  bg-black-100"
        >
          <div className="flex mt-5 justify-evenly">
            <div className="font-medium font-EurostileExtended text-center text-white tb:text-ft8 lg:text-ft16 w-efx text-ft6 pt-sep">
              Remove this offer
            </div>
            <img
              src="/images/xIcon.svg"
              className="cursor-pointer ml-fex tb:w-8.5 tb:h-8.5 h-4 w-4"
              onClick={() => props.handleClose(false)}
            />
          </div>

          <div className="mt-9.5 px-4 justify-center">
            <div className="font-medium font-EurostileExtended text-center text-grey-120 text-ft1 tb:text-ft6 lg:text-ft13">
              Are you sure want to remove this offer?
            </div>
          </div>
          <div className="text-center mt-9.5 mb-11.5">
            <button
              className="market-button rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 text-ft1 lg:text-ft6 font-PoppinsMedium w-27 h-7.5 tb:w-39 tb:h-9.75 lg:w-45 lg:h-12"
              type="button"
              onClick={handleCheckout}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveOfferDialog;
