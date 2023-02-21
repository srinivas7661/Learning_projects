import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { genericConstants } from "../../constants";
import { NftList } from "../explorePage/explorePageComponent";



function SearchResultsComponent(props) {
  return (
    <div className="bg-homepage bg-black-60 w-full min-h-screen">
      <div className="max-w-lg6 m-auto pt-8 pb-10 px-5">
        <div className="font-black font-EurostileExtended text-left text-white text-ft20 pt-10">
          SEARCH RESULTS
        </div>
        <div className=" font-EurostileExtended text-left text-blue-80 text-ft14 pl-10">
          "{props?.state?.searchString}"
        </div>
        <div className="bg-grey-30 box-shadow-15 mt-9 ">
          <div className="flex py-4">
            <div
              onClick={() => props.changeSelectedTab("collections")}
              className={
                "text-white text-ft14 pl-10 cursor-pointer " +
                (props.state.selectedTab === "collections"
                  ? "text-blue-80"
                  : "")
              }
            >
              Collection
              {props.state.selectedTab === "collections" ? (
                <hr className="text-blue-80 w-3 ml-10" />
              ) : (
                ""
              )}
            </div>
            <div
              onClick={() => props.changeSelectedTab("nfts")}
              className={
                "text-white text-ft14 pl-12 cursor-pointer " +
                (props.state.selectedTab === "nfts" ? "text-blue-80" : "")
              }
            >
              Items
              {props.state.selectedTab === "nfts" ? (
                <hr className="text-blue-80 w-3 ml-5" />
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="text-primary-50" />
          <hr className="text-primary-50" />
          <div>
            {props.state.selectedTab === "collections" ? (
              CollectionListComponent(props)
            ) : (
              <div className="py-10 px-5 h-70vh xlr:h-60vh overflow-scroll">
                <div className="flex justify-end">
                  <div className="flex flex-wrap justify-between gap-7">
                    <div className="flex gap-5">
                      <div className="p-3 relative">
                        <div
                          className="flex justify-between bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center  min-w-150 h-9.5 gap-1 p-2 mob:text-ft1"
                          onClick={props.toogleFilterDropdown}
                        >
                          <span className="">
                            {props.state.recentFilterIndex != null
                              ? genericConstants.RECENTLY_FILTER[
                                  props.state.recentFilterIndex
                                ].name
                              : "Select"}
                          </span>
                          <img
                            src={
                              props.state.recentFilter
                                ? "/images/arrow-up.svg"
                                : "/images/arrow-down.svg"
                            }
                            className="2xl:h-3.5 h-2.5 w-4"
                          />
                        </div>
                        {props.state.recentFilter ? (
                          <div className="bg-blue-400 z-50 absolute text-white text-ft3 border border-blue-80">
                            {genericConstants.RECENTLY_FILTER.map(
                              (item, index) => (
                                <div
                                  key={item.value}
                                  className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  min-w-150 2xl:h-10.5 h-9.5 mob:text-ft1"
                                  onClick={() => {
                                    props.onChangeRecentFilter(index);
                                    // setSelectedWeeklyIndex(index);
                                    // props.toogleFilterDropdown();
                                    // props.getCollectedNfts();
                                  }}
                                >
                                  {item.name}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <NftList
                  nfts={props?.state?.nfts}
                  limit={props?.state?.limit}
                  totalNftsCount={props?.state?.totalNftsCount}
                  filterNftList={props.filterNftList}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}






function CollectionListComponent(props) {
  const [showTypeDropDown, setShowTypeDropDown] = useState(false);
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
  const [sortDropDown, setSortDropDown] = useState(false);


  // const ref = useRef();
  // const categoryRef = useRef();
  // const sortRef =useRef();
  
  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (showTypeDropDown && ref.current && !ref.current.contains(e.target)) {
  //       setShowTypeDropDown(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [showTypeDropDown] );
  
  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (showCategoryDropDown && categoryRef.current && !categoryRef.current.contains(e.target)) {
  //       setShowCategoryDropDown(false);
  //     }sortDropDown
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [showCategoryDropDown] );
  
  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (sortDropDown && sortRef.current && !sortRef.current.contains(e.target)) {
  //       setSortDropDown(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [sortDropDown] );
  
  return (
    <div className="h-70vh xlr:h-60vh overflow-scroll">
      <div className="flex justify-between show px-2 sm:px-6 pt-7">
        <div className="flex gap-1 md:gap-5 text-white mb-4 sm:mb-0">
          <div className="bg-blue-400  text-white text-ft3 border border-blue-80">
              <div
                className="flex justify-between  bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center  w-20 sm:w-27 h-9.5 gap-1 p-2 mob:text-ft1"
                onClick={() => setShowTypeDropDown((prev) => !prev)}
              >
                <span className="">
                  {props?.state?.collectionFilter?.collectionType ||
                    "Type"}
                </span>
                <img
                  src={
                    showTypeDropDown
                      ? "/images/arrow-up.svg"
                      : "/images/arrow-down.svg"
                  }
                  className="2xl:h-3.5 h-2.5 w-4"
                />
              </div>
              {showTypeDropDown ? (
                <div className="bg-blue-400 z-50 absolute text-white text-ft3 border border-blue-80">
                  {genericConstants.TypeConstants.map((item, ) => (
                    <div
                      key={item.value}
                      className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  w-20 sm:w-27 2xl:h-10.5 h-9.5 mob:text-ft1"
                      onClick={() =>{
                        props.changeCollectionFilter(
                          "collectionType",
                          item.value
                        );
                        setShowTypeDropDown((prev) => !prev)}
                      }
                     
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
          
          </div>

        <div className="relative ">
            <div 
              className="flex justify-between ml-tix bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center  w-27 sm:w-37.5 h-9.5 gap-1 p-2 mob:text-ft1"
              onClick={() => setShowCategoryDropDown((prev) => !prev)}
            >
              <span className="">
                {props?.state?.priceFilter?.selectedToken || "Category"}
              </span>
              <img
                src={
                  showCategoryDropDown
                    ? "/images/arrow-up.svg"
                    : "/images/arrow-down.svg"
                }
                className="2xl:h-3.5 h-2.5 w-4"
              />
            </div>
            {showCategoryDropDown ? (
              <div className="bg-blue-400 z-50 ml-tix absolute text-white text-ft3 border border-blue-80">
                     <div
                    key={"0"}
                    className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  w-27 sm:w-37.5 2xl:h-10.5 h-9.5 mob:text-ft1"
                    onClick={() =>{
                      props.changeCollectionFilter(
                        "selectedCategory",
                        "All"
                      );
                      setShowCategoryDropDown((prev) => !prev)
                    }
                    }
                  >
                   All
                  </div>
                {props?.state?.categories?.map((category, index) => (
                  <div
                    key={index}
                    className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  w-27 sm:w-37.5 2xl:h-10.5 h-9.5 mob:text-ft1"
                    onClick={() =>{
                      props.changeCollectionFilter(
                        "selectedCategory",
                        category._id
                      );
                      setShowCategoryDropDown((prev) => !prev)
                    }
                    }
                  >
                    {category.categoryName}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="relative">
          <div 
            className="flex justify-between  bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center w-28 sm:w-37.5 h-9.5 gap-1 p-2 mob:text-ft1"
            onClick={() => setSortDropDown((prev) => !prev)}
          >
            <span className="">
              {props?.state?.priceFilter?.selectedToken || "Sort by"}
            </span>
            <img
              src={
                sortDropDown ? "/images/arrow-up.svg" : "/images/arrow-down.svg"
              }
              className="2xl:h-3.5 h-2.5 w-4"
            />
          </div>
          {sortDropDown ? (
            <div className="bg-blue-400 z-50 absolute text-white text-ft3 border border-blue-80">
               
              {genericConstants.SortConstants.map((item) => (
                <div
                  key={item.value}
                  className="pt-2 px-2 hover:bg-blue-80 border-b border-blue-80 w-28 sm:w-37.5 2xl:h-10.5 h-9.5 mob:text-ft1 whitespace-nowrap"
                  onClick={() =>{
                    props.changeCollectionFilter("sortKey", item.value);
                    setSortDropDown((prev) => !prev)
                  }
                  }
                >
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap pt-7 pb-10">
          {props?.state?.collectionsList.map((game) => (
            <Link
              key={game._id}
              to={{
                pathname: `/collectionDetails/${game._id}/${game.collectionAddress}`,
                state: { collectionAddress: game.collectionAddress },
              }}
            >
              <div className="w-85 cursor-pointer mr-5 ml-5 mb-5  transition duration-100 hover:transform hover:-translate-y-2 border border-transparent hover:border-current rounded-lg hover:shadow-card hover:border-grey-5 hover:pl-10 hover:pr-10">
                <img
                  className="h-53.75 rounded-t-lg-1 w-full"
                  src={game.imageUrl}
                  alt={game.name.toLowerCase()}
                />
                <div className="bg-black-80 border overflow-hidden border-primary-50 rounded-b-lg-1 py-2.5 px-3.5">
                  <h1 className="md:text-ft14 xl:text-ft15 3xl:text-ft17 mb-2 text-white font-black truncate">
                    {game.name.toUpperCase()}
                  </h1>
                  <p className="md:text-ft4 xl:text-ft6 3xl:text-ft12 text-grey-100 truncate">
                    {game.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsComponent;
