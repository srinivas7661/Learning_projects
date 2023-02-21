import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function TransferNft(props) {
  const [address, setAddress] = useState("");
  const location = useLocation();
  let nftData = location.state.detail;
  let nftObj = JSON.parse(nftData);
  const onClickHandler = async () => {
    props.transferNft({ address });
  };
  return (
    <div className="flex items-start pt-12 pb-18 tb:pt-43.5 tb:pb-24 justify-center bg-main bg-cover px-5  shadow-polygon min-h-screen ">
      <div className="stats-polygon w-full max-w-lg_1 bg-black-60">
        <div className="font-EurostileExtd font-black text-white text-ft22 lg:text-ft19 text-center pt-8 pb-9.25 border-b-3 border-violet-10">
          TRANSFER
        </div>
        <div className="flex gap-4 items-center mb-17.75  mt-14 justify-between  mobile:flex-col mobile:flex mobile:mt-4 px-10">
          <div className="mobile:mb-3">
            {nftObj?.cdnUrl?.split(".").pop() === "mp4" ||
            nftObj?.cdnUrl?.split(".").pop() === "mov" ? (
              <>
                <video
                  controls
                  className="w-72.5 h-72.5 rounded-md lg:w-96.5 lg:h-97.25 tb:h-79 tb:w-85"
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
                  className="w-72.5 h-72.5 lg:w-96.5 lg:h-97.25 rounded-md tb:h-79 tb:w-85 audio-nft audio-border"
                  src={nftObj?.cdnUrl}
                  autoPlay
                  loop
                  playsInline
                ></video>
              </>
            ) : (
              <>
                <img
                  className="w-72.5 h-72.5 lg:w-96.5 lg:h-97.25 rounded-md tb:h-79 tb:w-85"
                  src={nftObj?.cdnUrl}
                ></img>
              </>
            )}
          </div>
          <div className="w-full flex max-w-627  mobile:pr-4 ">
            <div className="text-white w-full space-y-5.5">
              <p className="text-ft8 lg:text-ft9 font-EurostileExtd font-black whitespace-nowrap">
                {nftObj?.name} #{nftObj?.tokenId}
              </p>
              <div className="w-full">
                <p className="text-ft-10 lg:text-ft-20 pb-2  font-EurostileMedium">
                  Address
                </p>
                <input
                  className="text-black-70 bg-black-300 border rounded border-primary-50 focus:outline-none w-full h-11 pl-1 py-1 "
                  placeholder="Enter Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <p className="text-ft-10 lg:text-ft63 pt-3  font-EurostileMedium text-grey-80">
                  "{nftObj?.name} #{nftObj?.tokenId}" Will be transferred to...
                </p>
              </div>
              <div className="flex justify-center ">
                <button
                  className="market-button mt-14 mobile:mt-5 overflow-hidden relative z-10 border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-1 tb:py-2 px-4 border-blue-80 text-ft0 tb:text-ft6 bg-blue-60 w-12 h-45 tb:w-45 tb:h-12 mobile:w-45 mobile:h-12  mobile:mx-1 mx-auto"
                  type="button"
                  onClick={onClickHandler}
                >
                  Transfer
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferNft;
