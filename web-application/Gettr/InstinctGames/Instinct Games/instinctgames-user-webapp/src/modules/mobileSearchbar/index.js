import React, { useEffect, useState } from "react";
import Header from "../common/header";
import { getcollection, getNfts } from "../../services";
import { history } from "../../managers/history";

const MobileSearchbar = () => {
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [collectionsList, setCollectionsList] = useState([]);
  const [nftsList, setNftsList] = useState([]);

  const getNftList = async (searchString) => {
    let reqData = { "saleData.isOpenForSale": true, limit: 3 };
    if (searchString) {
      reqData = { ...reqData, searchKeys: ["name"], searchValue: searchString };
    }
    const nftListResponse = await getNfts(reqData);
    if (nftListResponse && nftListResponse.nftContent) {
      setNftsList(nftListResponse?.nftContent);
    }
  };
  const searchCollections = async (searchString) => {
    const collectionsRes = await getcollection(false, false, 3, searchString);
    if (collectionsRes && collectionsRes.collections) {
      setCollectionsList(collectionsRes.collections);
    }
  };
  const handleChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value) {
      setSearchBarOpen(true);
      searchCollections(e.target.value);
      getNftList(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search-items?s=" + searchName);
  };

  useEffect(() => {}, [searchName]);
  return (
    <div className="bg-main bg-black-60 bg-cover h-screen">
      <Header />
      <form
        className="flex w-nex mx-auto xl:w-57.5 2xl:w-72 cut-border items-center border-r-4 border-blue-80 mt-15"
        onSubmit={(e) => handleSubmit(e)}
      >
        <img src="/images/search-icon.svg" alt="searchIcon" className="pl-3" />
        <input
          type="search"
          name="search"
          placeholder="Search"
          value={searchName}
          onChange={(e) => {
            handleChange(e);
          }}
          autoComplete="off"
          className="px-4 cut-border w-full text-white  h-8 placeholder-grey-500 focus:outline-none"
        />
      </form>
      {isSearchBarOpen && (
        <div className="w-full text-white z-50 text-center cursor-pointer">
          <div className="bg-grey-30 px-3 py-2.5 w-nex mx-auto my-2">
            <div>
              <div className="font-bold ft6">Collections</div>
              <div className="pl-4 pt-1.5">
                {collectionsList?.map((collection) => {
                  return (
                    <div
                      className="cursor-pointer truncate pt-1.5"
                      onClick={() => {
                        history.push({
                          pathname: "/collectionDetails/" + collection._id,
                          state: {
                            collectionAddress: collection.collectionAddress,
                          },
                        });
                      }}
                    >
                      <div className="text-grey-15">{collection.name}</div>
                      <div className="text-grey-500 pl-3 text-ft1">
                        {collection.nftCount}&nbsp;Items
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="font-bold ft6 pt-2">Items</div>
              <div className="pl-4 pt-1">
                {nftsList?.map((nft) => (
                  <div
                    className="cursor-pointer truncate pt-1.5"
                    onClick={() => {
                      history.push("/nft/" + nft._id);
                    }}
                  >
                    <div className="text-grey-15">{nft.name}</div>
                    {nft?.saleData?.isOpenForSale ? (
                      <div className="text-grey-500 pl-3 text-ft1">
                        On Sale for {nft?.saleData?.price}{" "}
                        {nft?.saleData?.currency}{" "}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>

              <button
                className="text-white bg-blue-60 border-2 rounded border-blue-60 w-28.75 rounded-2xl pb-0.5 mt-3"
                onClick={handleSubmit}
              >
                All Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearchbar;
