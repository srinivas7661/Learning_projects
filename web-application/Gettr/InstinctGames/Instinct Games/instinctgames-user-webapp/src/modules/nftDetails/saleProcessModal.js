import React from "react";

function SaleProcessModal(props) {
  const { specificOffer, handleClose, params } = props;
  return (
    <div className="bg-black-100 items-center bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen">
      <div
        open={props.open}
        onClose={() => handleClose(false)}
        className="flex flex-col w-full min-w-350 max-w-md_2 polygon-wallet shadow-layout text-white bg-black-100"
      >
        <img
          onClick={() => {
            handleClose(false);
          }}
          className="w-4 h-4 tb:w-7 tb:h-7 self-end relative top-4 right-5 cursor-pointer"
          src="/images/xIcon.svg"
          alt="close"
        />
        <h1 className="text-ft5 tb:text-ft4 mb-2 text-center font-EurostileBold">
          {params.state.saleProcessMessage}
        </h1>
        <p className="text-ft0 text-center font-EurostileMedium text-grey-80 tb:text-ft13 mb-1">
          {specificOffer.description}
        </p>

        {specificOffer.cdnUrl?.split(".").pop() === "mp4" ||
        specificOffer.cdnUrl?.split(".").pop() === "mov" ? (
          <>
            <video
              className="tb:w-85 w-37.5 h-35 rounded-15 my-4 tb:h-79 self-center"
              src={specificOffer.cdnUrl}
            ></video>
          </>
        ) : specificOffer.cdnUrl?.split(".").pop() === "mp3" ? (
          <>
            <video
              className="tb:w-85 w-37.5 h-35 rounded-15 my-4 tb:h-79 self-center audio-nft"
              src={specificOffer.cdnUrl}
            ></video>
          </>
        ) : (
          <>
            <img
              className="tb:w-85 w-37.5 h-35 rounded-15 my-4 tb:h-79 self-center"
              src={specificOffer.cdnUrl}
            ></img>
          </>
        )}

        {/* {params.state.saleProcessSuccessMessage && (
          <div className="flex self-center gap-4 w-4/5 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <img
                className="w-4 h-4"
                src="/images/confirmCheck.png"
                alt="check"
              />
              <p className="text-ft0 font-EurostileMedium text-grey-80 tb:text-ft13">
                Complete
              </p>
            </div>
            <p className="text-blue-80 w-2/3 break-words text-ft0 tb:text-ft13 text-left">
              {specificOffer.transactionHash}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SaleProcessModal;
