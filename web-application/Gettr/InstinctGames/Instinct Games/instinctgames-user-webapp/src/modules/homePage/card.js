import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {
  CURRENCIES,
  eventConstants,
  transactionConstants,
  validationsMessages,
} from "../../constants";
import commonToasts from "../../common/components/commonToasts";
import { history } from "../../managers/history";
import utility from "../../utility";
import { likeNft } from "../../services";
import { pathConstants } from "../../constants";

const Card = ({
  likedBy,
  nftDetails,
  id,
  images,
  cardHeading,
  cardPrice,
  handleLikeNft,
  tokenId,
  ownerAddress,
  getLike,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const userData = useSelector((state) => state.wallet.walletConnect);
  let collectionAddress = "";
  let collectionName = "";
  if (
    nftDetails &&
    nftDetails.collectionId &&
    nftDetails.collectionId.collectionAddress
  ) {
    collectionAddress = nftDetails.collectionId.collectionAddress;
    collectionName = nftDetails.collectionId.name;
  } else {
    collectionAddress = nftDetails.collectionDetails.collectionAddress;
    collectionName = nftDetails.collectionDetails.collectionName;
  }
  useEffect(() => {
    let a = likedBy?.find((x) => x?.userId === userData?._id);
    // console.log(a, "A");
    if (a?.length > 0 || a !== undefined) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [nftDetails]);
  return (
    <div className="w-full cursor-pointer">
      <div
        className="w-full  group cursor-pointer transition duration-100 hover:transform hover:-translate-y-2  border-transparent hover:border-current rounded-lg hover:shadow-card hover:border-grey-5 "
        id="trend-image"
      >
        {isLiked === true ? (
          <img
            src="/images/liked.svg"
            alt="/"
            className="absolute cursor-pointer mt-2.5 ml-2.5 w-5 md:w-9.75 md:h-10"
            id="hollow-heart"
            onClick={() => {
              handleLikeNft(true, id, userData._id);
              userData._id ? setIsLiked(true) : setIsLiked(false);
            }}
          />
        ) : (
          <img
            src="/images/hollow-heart.svg"
            alt="/"
            className="absolute cursor-pointer mt-2.5 ml-2.5 w-5 md:w-9.75 md:h-8.5"
            id="hollow-heart"
            onClick={() => {
              handleLikeNft(false, id, userData._id);
              userData._id ? setIsLiked(false) : setIsLiked(true);
            }}
          />
        )}

        {images?.split(".").pop() === "mp4" ||
        images?.split(".").pop() === "mov" ? (
          <>
            <video
              onClick={() => {
                history.push(
                  pathConstants.HEADER.NFT_DETAILS +
                    "?id=" +
                    id +
                    "&collectionAddress=" +
                    collectionAddress +
                    "&tokenId=" +
                    tokenId
                );
              }}
              src={images || ""}
              alt="/"
              className=" w-full tb:rounded-lg rounded h-full object-cover"
            />
          </>
        ) : images?.split(".").pop() === "mp3" ? (
          <>
            <video
              onClick={() => {
                history.push(
                  pathConstants.HEADER.NFT_DETAILS +
                    "?id=" +
                    id +
                    "&collectionAddress=" +
                    collectionAddress +
                    "&tokenId=" +
                    tokenId
                );
              }}
              src={images || ""}
              alt="/"
              className=" w-full tb:rounded-lg rounded h-full audio-nft"
            />
          </>
        ) : (
          <>
            <img
              onClick={() => {
                history.push(
                  pathConstants.HEADER.NFT_DETAILS +
                    "?id=" +
                    id +
                    "&collectionAddress=" +
                    collectionAddress +
                    "&tokenId=" +
                    tokenId
                );
              }}
              src={images || ""}
              alt="/"
              className=" w-full tb:rounded-lg h-full  "
            />
          </>
        )}
        <div className="bg-box-color border-box-border font-EurostileExtended border-ztw border-t-zfw flex justify-between tb:rounded-b-lg rounded-b relative -mt-tix px-fex">
          <div className="w-sfx">
            <p className="text-text-color " id="coin-details">
              #{nftDetails?.tokenId}
            </p>
            <p className="text-text-color " id="coin-details">
              {collectionName}
            </p>
            <h1
              className="whitespace-nowrap overflow-hidden "
              id="card-details"
            >
              {cardHeading || "--"}&nbsp;
            </h1>
          </div>
          <div className="flex items-end w-1/2 justify-end">
            <p className=" flex items-center pt-2.5" id="card-details">
              {cardPrice || "--"}&nbsp;
            </p>
            {utility.getTokenIcon(nftDetails?.saleData?.currency) ? (
              <img
                className="pb-eex"
                id="coin-icon"
                src={utility.getTokenIcon(nftDetails?.saleData?.currency)}
                alt="/"
              />
            ) : (
              <span className="w-2 tb:w-7.5 text-truncate">
                {nftDetails?.saleData?.currency}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
