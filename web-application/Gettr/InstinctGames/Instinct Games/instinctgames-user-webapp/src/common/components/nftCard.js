import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { validationsMessages, pathConstants } from "../../constants";
import { likeNft } from "../../services";
import utility from "../../utility";
import commonToasts from "./commonToasts";
import { history } from "../../managers/history";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useHistory, useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { hideNft } from "../../services";
import { unhideNft } from "../../services";
import { updateUser } from "../../services/userMicroservice";
import Utils, { dispatchAction } from "../../utility";
import { eventConstants } from "../../constants";
import Moralis from "moralis";
import ContentService from "../../services/contentMicroservice";
import VideoThumbnail from 'react-video-thumbnail';

function NftCard(props) {
  const { nft, widthCard, imageHeight } = props;
  const nftData = props.nft;
  const nftJson = JSON.stringify(nftData);
  // const userData = useSelector((state) => state.wallet.walletConnect);
  const userData = props?.user?.walletConnect;
  const [isLiked, setLike] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const limitNum = nft?.saleData?.price ? nft?.saleData?.price.toFixed(2) : 0;
  const [nftDetails, setNftDetails] = useState(nft);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const refreshMetadata = async () => {
    props.dispatchAction(eventConstants.SHOW_LOADER);
    let updatedNftDetails = nftDetails;
    const options = {
      chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet",
      address: nftDetails?.collectionDetails?.collectionAddress,
      token_id: nftDetails?.tokenId,
    };
    let nftData = await Moralis.Web3API.token
      .getTokenIdMetadata(options)
      .catch((err) => {
        props.dispatchAction(eventConstants.HIDE_LOADER);
      });
    if (!nftData || !nftData.metadata) {
      props.dispatchAction(eventConstants.HIDE_LOADER);
      commonToasts.successToast(
        validationsMessages.METADATA_REFRESHED_SUCCESSFULLY
      );
      return;
    }
    let metadata = JSON.parse(nftData.metadata);
    updatedNftDetails.name = metadata?.name || updatedNftDetails.name;
    updatedNftDetails.cdnUrl = Utils.getNftUrl(metadata);
    updatedNftDetails.collectionDetails = {
      ...(updatedNftDetails?.collectionDetails || {}),
      collectionName:
        nftData?.name || updatedNftDetails?.collectionDetails?.collectionName,
    };
    commonToasts.successToast(
      validationsMessages.METADATA_REFRESHED_SUCCESSFULLY
    );
    props.dispatchAction(eventConstants.HIDE_LOADER);
    setNftDetails(updatedNftDetails);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function shorten(b, amountL = 10, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const transfer = () => {
    history.push({
      pathname: "/transfer-nft",
      state: { detail: nftJson },
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // var ext =  fileName.split('.').pop();
    nft.likedBy.map((like) => {
      if (like.userId === userData._id) setLike(true);
    });
  }, [nft]);

  const likeUnLikeNft = async () => {
    if (!userData || !userData._id)
      return commonToasts.errorToast(validationsMessages.WALLET_CONNECT);
    const data = {
      contentId: nft._id,
      addedBy: userData._id,
    };
    const [error, res] = await utility.parseResponse(likeNft(data));
    if (error || !res) {
      commonToasts.errorToast(error || validationsMessages.UNABLE_TO_LIKE);
      return;
    }
    commonToasts.successToast(
      isLiked
        ? validationsMessages.UNLIKED_NFT_SUCCESSFULLY
        : validationsMessages.LIKED_NFT_SUCCESSFULLY
    );
    setLike(!isLiked);
  };
  const hide = async () => {
    if (!userData || !userData._id)
      return commonToasts.errorToast(validationsMessages.WALLET_CONNECT);

    if (nftDetails._id.length == 0) {
      saveNft();
      return;
    }

    const data = {
      contentId: nftDetails._id,
    };
    const [error, res] = await utility.parseResponse(hideNft(data.contentId));
    if (error || !res) {
      commonToasts.errorToast(error || validationsMessages.UNABLE_TO_HIDE);
      return;
    }

    commonToasts.successToast(
      res
        ? validationsMessages.HIDE_NFT_SUCCESSFULLY
        : validationsMessages.UNHIDE_NFT_SUCCESSFULLY
    );
    // window.location.reload();
  };

  const saveNft = async () => {
    let requestData = {
      collectionDetails: {
        collectionAddress: nftDetails?.collectionDetails?.collectionAddress,
        collectionName: nftDetails?.collectionDetails?.collectionName,
      },
      tokenId: nftDetails?.tokenId,
      ipfsUrl: nftDetails?.cdnUrl,
      name: nftDetails?.name,
      cdnUrl: nftDetails?.cdnUrl,
      ownerAddress: userData?.userId,
      saleData: {
        currency: nftDetails?.saleData?.currency,
        price: nftDetails?.saleData?.price,
        isOpenForSale: false,
      },
      isHidden: true,
    };

    const [error, res] = await utility.parseResponse(
      ContentService.updateNftContent(requestData)
    );
    if (error || !res) {
      commonToasts.errorToast(error || validationsMessages.UNABLE_TO_HIDE);
      return;
    }

    commonToasts.successToast(validationsMessages.HIDE_NFT_SUCCESSFULLY);
    window.location.reload();
  };

  const unhide = async () => {
    if (!userData || !userData._id)
      return commonToasts.errorToast(validationsMessages.WALLET_CONNECT);
    const data = {
      contentId: nftDetails._id,
    };

    const [error, res] = await utility.parseResponse(unhideNft(data.contentId));
    if (error || !res) {
      commonToasts.errorToast(error || validationsMessages.UNABLE_TO_HIDE);
      return;
    }

    commonToasts.successToast(
      res
        ? validationsMessages.UNHIDE_NFT_SUCCESSFULLY
        : validationsMessages.UNHIDE_NFT_SUCCESSFULLY
    );
    window.location.reload();
  };

  const handleCopyToClipboard = () => {
    commonToasts.successToast(validationsMessages.IS_TEXT_COPIED);
  };
  const url = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  );

  const changeAvtar = async () => {
    if (!userData || !userData._id)
      return commonToasts.errorToast(validationsMessages.WALLET_CONNECT);
    // const extensionFormat = nftDetails.cdnUrl.split(".").pop();
    // if (extensionFormat === "mp3" || extensionFormat === "mp4" || extensionFormat ==="mov")
    //     return commonToasts.errorToast("You can only use image as an Avatar")
    let requestData = {
      findQuery: { userId: props?.user?.walletConnect?.userId },
      updateQuery: {
        profileImage: nft?.cdnUrl,
      },
    };

    const [error, res] = await utility.parseResponse(updateUser(requestData));
    if (error || !res) {
      commonToasts.errorToast(
        error || validationsMessages.UNABLE_TO_UPDATE_USER
      );
      return;
    }

    commonToasts.successToast(
      res
        ? validationsMessages.PROFILE_TO_UPDATE_USER
        : validationsMessages.UNABLE_TO_UPDATE_USER
    );
    dispatch({ type: eventConstants.SIGN_IN_SUCCESS, data: res });
    window.location.reload();
  };

  const sellEventHandler = async () => {
    if (nftDetails?.saleData?.isOpenForSale == true) {
      history.push(
        "/nft?id=" +
        nftDetails?._id +
        "&collectionAddress=" +
        nftDetails?.collectionDetails?.collectionAddress +
        "&tokenId=" +
        nftDetails?.tokenId
      );
    } else {
      history.push({
        pathname: "/list-item",
        state: { detail: nftJson },
      });
    }
  };

  function SharePopup(props) {
    // const open = Boolean(props.hidePopup);
    // const history = useHistory();
    // const handleCopyToClipboard = () => {
    //   toast.success("Page URL Copied");
    // };
    // const url = window.location.href;
    return (
      <div>
        <img
          src="/images/Dots.svg"
          onClick={handleClick}
          className="-mt-52 right-4 absolute text-ft8"
        ></img>

        {/* /> */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="mobile-pop"
        >
          {/* <div>
            <Toaster />
          </div> */}
          <div className=" bg-black-80 text-white border border-violet-10 text-ft6 font-light">
            {/* <CopyToClipboard text={"url"}> */}
            {props.fav == false ? (
              ""
            ) : (
              <div
                className="flex pl-5 pr-7.5 pt-3.75 pb-2.5 cursor-pointer hover:bg-violet-10"
              // onClick={handleCopyToClipboard}
              >
                <img src="/images/wallet-icon.svg" className="w-7.5 pr-1"></img>
                <div className="pt-1 pl-10" onClick={sellEventHandler}>
                  {nftDetails?.saleData?.isOpenForSale == true
                    ? "Remove From Sale"
                    : "Sell"}
                </div>
              </div>
            )}
            {props.fav == false ? (
              ""
            ) : (
              <div
                className="flex pl-5 pr-7.5 cursor-pointer hover:bg-violet-10 pt-1.75 pb-2.5"
              // onClick={handleCopyToClipboard}
              >
                <img
                  src="/images/Icon open-transfer.svg"
                  className="w-7.5 pr-1"
                ></img>
                <div className="pt-1 pl-10" onClick={transfer}>
                  Transfer
                </div>
              </div>
            )}
            <CopyToClipboard
              text={
                url +
                pathConstants.HEADER.NFT_DETAILS +
                "?id=" +
                nftDetails?._id +
                "&collectionAddress=" +
                nftDetails?.collectionId?.collectionAddress +
                "&tokenId=" +
                nftDetails.tokenId
              }
            >
              <div
                className="flex pl-5 pr-7.5 cursor-pointer hover:bg-violet-10 pt-1.75 pb-2.5"
                onClick={handleCopyToClipboard}
              >
                <img src="/images/copy-not.svg" className="w-7.5 pr-1"></img>
                <div className="pt-1 pl-10">Copy Link</div>
              </div>
            </CopyToClipboard>
            <div
              className="flex pl-5 pr-7.5 cursor-pointer hover:bg-violet-10 pt-1.75 pb-2.5"
              onClick={changeAvtar}
            >
              <img src="/images/use-avtar.svg" className="w-7.5 pr-1"></img>
              <div className="pt-1 pl-10">Use as Avatar</div>
            </div>
            {props.fav == false ? (
              ""
            ) : (
              <div
                className="flex pl-5 pr-7.5 cursor-pointer pt-1.75 hover:bg-violet-10 pb-2.5"
                onClick={props.unHide == false ? unhide : hide}
              >
                <img src="/images/eye-slash.svg" className="w-7.5 pr-1"></img>
                <div className="pt-1 pl-10">
                  {props.unHide == false ? "Unhide" : "Hide"}
                </div>
              </div>
            )}
            <div
              className="flex pl-5 pr-7.5 cursor-pointer hover:bg-violet-10 pt-1.75 pb-3.75"
            // onClick={handleCopyToClipboard}
            >
              <img src="/images/refresh.svg" className="w-7.5 pr-1"></img>
              <div
                className="pt-1 pl-10"
                onClick={() => refreshMetadata(nftDetails)}
              >
                Refresh Metadata
              </div>
            </div>
            {/* <CopyToClipboard text={"url"}>
            <div
              className="flex p-1 cursor-pointer"
              onClick={handleCopyToClipboard}
            >
              <img src="/images/Copy.svg" className="w-10 pr-1"></img>
              <div className="pt-1">Copy Link</div>
            </div>
          </CopyToClipboard> */}
            {/* </CopyToClipboard> */}
            {/* <FacebookShareButton
            className="flex p-1 cursor-pointer"
            url={props?.state?.nftDetails?.cdnUrl}
          >
            <img src="/images/Copy.svg" className="w-10 pr-1"></img>
            <div className="pt-1">Share On Facebook</div>
          </FacebookShareButton> */}

            {/* <TwitterShareButton
            className="flex p-1 cursor-pointer"
            url={props?.state?.nftDetails?.cdnUrl}
          >
            <img src="/images/Copy.svg" className="w-10 pr-1"></img>
            <div className="pt-1">Share On Twitter</div>
          </TwitterShareButton> */}
          </div>
        </Popover>
      </div>
    );
  }

  const redirect = (id, nft, tokenId) => {
    let collectionAddress = "";
    if (nft?.collectionId?.collectionAddress)
      collectionAddress = nft?.collectionId?.collectionAddress;
    else {
      collectionAddress = nft?.collectionDetails?.collectionAddress;
    }
    history.push(
      pathConstants.HEADER.NFT_DETAILS +
      "?id=" +
      id +
      "&collectionAddress=" +
      collectionAddress +
      "&tokenId=" +
      tokenId
    );
  };
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= 0) {
      setLoading(false);
    }
  }
  return (
    <div
      className={`${widthCard} group cursor-pointer transition duration-100 hover:transform hover:-translate-y-2 border border-transparent hover:border-current rounded-lg hover:shadow-card hover:border-grey-5 `}
    >
      <div className="relative">
        {nft && nft.cdnUrl ? (
          nft.cdnUrl.split(".").pop() === "mp4" ||
            nft.cdnUrl.split(".").pop() === "mov" ? (
            <>
              {/*<VideoThumbnail
                videoUrl={nft.cdnUrl}
                // thumbnailHandler={(thumbnail) => console.log(thumbnail)}px
                onClick={() => redirect(nft?._id, nft, nft.tokenId)}
                className={
                  widthCard + " " + imageHeight + " rounded-t-lg object-cover"
                }
              />*/}

              <video
                onClick={() => redirect(nft?._id, nft, nft.tokenId)}
                className={
                  widthCard + " " + imageHeight + " rounded-t-lg object-cover"
                }
                src={nft.cdnUrl}
              ></video>

              <img
                onClick={(e) => {
                  e.stopPropagation();
                  likeUnLikeNft();
                }}
                className="absolute top-2.5 left-2.5 w-8 mobile:w-6.5 cursor-pointer"
                src={
                  isLiked
                    ? "/images/Icon awesome-heart.svg"
                    : "/images/hollow-heart.svg"
                }
              />
            </>
          ) : nft.cdnUrl.split(".").pop() === "mp3" ? (
            <>
              <video
                onClick={() => redirect(nft?._id, nft, nft.tokenId)}
                className={
                  widthCard +
                  " " +
                  imageHeight +
                  " rounded-t-lg object-cover audio-nft"
                }
                src={nft.cdnUrl}
              ></video>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  likeUnLikeNft();
                }}
                className="absolute top-2.5 left-2.5 w-8 mobile:w-6.5 cursor-pointer"
                src={
                  isLiked
                    ? "/images/Icon awesome-heart.svg"
                    : "/images/hollow-heart.png"
                }
              />
            </>
          ) : (
            <>
              <img
                onClick={() => redirect(nft?._id, nft, nft.tokenId)}
                className={
                  widthCard + " " + imageHeight + " rounded-t-lg object-cover"
                }
                src={nft.cdnUrl}
              ></img>

              <img
                onClick={(e) => {
                  e.stopPropagation();
                  likeUnLikeNft();
                }}
                className="absolute top-2.5 left-2.5 w-8 mobile:w-6.5 cursor-pointer"
                src={
                  isLiked
                    ? "/images/Icon awesome-heart.svg"
                    : "/images/hollow-heart.svg"
                }
              />
            </>
          )
        ) : (
          <>
            <img
              onClick={() => redirect(nft?._id, nft, nft.tokenId)}
              className={
                widthCard + " " + imageHeight + " rounded-t-lg object-cover"
              }
              src="/images/imageNotFound.png"
            ></img>
            <img
              onClick={(e) => {
                e.stopPropagation();
                likeUnLikeNft();
              }}
              className="absolute top-2.5 left-2.5 w-8 mobile:w-6.5 cursor-pointer"
              src={
                isLiked
                  ? "/images/Icon awesome-heart.svg"
                  : "/images/hollow-heart.svg"
              }
            />
          </>
        )}
        {props.hidePopup == false ? SharePopup(props) : ""}
      </div>
      <div className="bg-black-50 border-2 border-primary-50 group-hover:border-0 group-hover:border-t group-hover:border-grey-5 rounded-b-lg px-1.5 py-1 h-16.75 mobile:h-7.5 mobile:py-0.5">
        <div className="text-primary-50 tb:text-ft23 text-ft33">{`#${nft?.tokenId}`}</div>
        <div className="text-primary-50 tb:text-ft23 text-ft33">
          {nft?.collectionId?.name ||
            nft?.collectionDetails?.collectionName ||
            "N/A"}
        </div>
        <div className="flex justify-between ">
          <div
            className={`${nft.name.length >= 5 ? "truncate" : ""
              } text-white tb:text-ft4 text-ft34 w-1/2 mobile:mt-30000 mobile:w-10 `}
          >
            {nft.name}
          </div>
          <div className="text-white tb:text-ft62 text-ft34 mobile:mt-50000 pt-0.5 truncate justify-between overflow-hidden flex">
            <span
              className={`${String(limitNum).length >= 7 ? "text-truncate" : ""
                }  pr-1 w-2/3 `}
            >
              {nft?.saleData?.price ? nft?.saleData?.price.toFixed(2) : ""}
            </span>
            <span>
              {" "}
              {utility.getTokenIcon(nft?.saleData?.currency) ? (
                <img
                  className="w-4.5 mt-1 mobile:w-3 mobile:mt-0"
                  src={utility.getTokenIcon(nft?.saleData?.currency)}
                />
              ) : (
                nft?.saleData?.currency
              )}
              {/* {nft?.saleData?.currency == "BNB" ? (
                <img
                  className="w-4.5 mt-1 ml-2 mobile:w-3 mobile:mt-0"
                  src="/images/binance-icon.svg"
                />
              ) : nft?.saleData?.currency == "SACREDTALES" ? (
                <img
                  className=" mobile:w-3 mobile:mt-0 w-4.5 mt-1 ml-2 tablet:w-3"
                  src="/images/sacredTailsToken.png"
                />
              ) : nft?.saleData?.currency == "INSTINCT" ? (
                <img
                  className="w-4.5 mt-1 ml-2 mobile:w-3 mobile:mt-0"
                  src="/images/instinctToken.png"
                />
              ) : (
                nft?.saleData?.currency
              )} */}
            </span>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex justify-between">
    //   <div className="text-white text-ft6 truncate">{nft.name}</div>
    //   <div className="text-white text-ft6 truncate">
    //     {nft?.saleData?.price} {nft?.saleData?.currency}
    //   </div>
    // </div>
    //   </div>
    // </div>
  );
}

// export default NftCard;
const mapStateToProps = (state) => {
  return { user: state.wallet };
};

export default connect(mapStateToProps, { dispatchAction })(NftCard);
