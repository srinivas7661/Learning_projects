import React, { useState } from "react";
import NftCard from "../../common/components/nftCard";
import { pathConstants } from "../../constants";
import { history } from "../../managers/history";

export function NftList(props) {
  console.log(props.unHide,"unhide");
  const [hidePopup,setHidePopUp]=useState(false)
 
  
  const redirect = (id, collectionAddress, tokenId) => {
    history.push(pathConstants.HEADER.NFT_DETAILS + "?id=" + id+"&collectionAddress="+ collectionAddress +"&tokenId="+tokenId);
  };
    return (
      <>
        <div className="flex flex-wrap max-h-560 ">
          
          {props?.nfts.length ? (
            props?.nfts.map((nft) => {
                let collectionAddress = nft?.collectionId?.collectionAddress;
                if(!collectionAddress)
                    collectionAddress = nft?.collectionDetails?.collectionAddress
              return (
                <div className="pr-9.25 pb-5" >
                  
                  <NftCard
                  unHide={props.unHide}
                  fav={props.fav}
                  hidePopup={hidePopup}
                  setHidePopUp={setHidePopUp}
                    nft={nft}
                    widthCard={
                      props.width ? props.width : "w-53.7 mobile:w-30"
                    }
                    imageHeight={
                      props.height ? props.height : "h-53.7 mobile:h-34"
                    }
               
                  />
                </div>
              );
            })
          ) : (
            <div className="flex w-full justify-center font-EurostileBold text-white text-ft12">No items found</div>
          )}
        </div>
        {/* {props.limit < props.totalNftsCount ? (
          <div className="flex justify-center">
            <button
              onClick={() => props.filterNftList(true)}
              className="market-button text-ft0 py-1.25 sm:text-ft13 w-24 h-6.5 sm:w-44 sm:h-12 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80"
            >
              Load More
            </button>
          </div>
        ) : (
          ""
        )} */}
      </>
    );
  }