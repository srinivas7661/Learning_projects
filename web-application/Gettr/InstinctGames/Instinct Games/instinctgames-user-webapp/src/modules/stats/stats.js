import React, { useEffect, useState } from "react";
import { stringConstants, CURRENCIES } from "../../constants";
import { getApproveToken, getcategory, getcollection } from "../../services";
import { history } from "../../managers/history";

const exploreBtn = () => {
  history.push("/explore");
  window.location.reload();
};

function Stats(props) {
  const { buyers, topSellers, topCollection } = props.state;
  const limtUndefined = () => {
    const statsData = [buyers, topSellers];
    const temp = [];
    for (let item of statsData) {
      if (item !== undefined) {
        temp.push(item.length);
      } else {
        temp.push(0);
      }
    }
    let count = 0
    topCollection.map((item) => {
      if (item.collection.length !== 0) {
        count++
      }
    })
    temp.push(count)
    return Math.max(...temp) === 0 ? 1 : Math.max(...temp);
  };

  const limit = limtUndefined();
  const [isWeeklyDropDownVisible, setWeeklyDropDownVisible] = useState(false);
  const [isCoinDropDownVisible, setCoinDropDownVisible] = useState(false);
  const [itemsList, setItemsList] = useState([
    {
      name: "Weekly",
      value: "weekly",
    },
    {
      name: "Monthly",
      value: "monthly",
    },
    {
      name: "Yearly",
      value: "yearly",
    },
  ]);

  const [selectedWeeklyIndex, setSelectedWeeklyIndex] = useState(null);

  const [tokens, setTokens] = React.useState([]);
  const [getToken, setGetTokens] = React.useState("");
  // console.log(tokens, "tokens");
  useEffect(() => {
    getTokensList();
  }, [props.state.currentOpenFilter]);

  async function getTokensList() {
    const tokensResponse = await getApproveToken({});
    if (tokensResponse && tokensResponse.approvedTokensContent)
      setTokens(tokensResponse.approvedTokensContent);
  }
  const [main, setMain] = useState(props.state?.type);


  useEffect(() => {
    setMain(props.state?.type);
  }, [props.state?.type]);

  useEffect(() => {
    setMain(stringConstants.TYPE_ALL);
  }, [props.state?.currentState]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="bg-main bg-cover px-5 py-eex shadow-polygon min-h-screen">
      <div className="stats-polygon ml-auto mr-auto w-full max-w-md2 bg-black-100 mobile:w-full mobile:max-w-100">
        <div className="flex mx-thp py-3 justify-between gap-3 items-center">
          <h1 className="text-white text-ft22 tb:text-ft19 font-black font-EurostileExtended mobile:text-ft0">
            STATS
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="flex justify-between tb:py-2.5 py-1.5 px-2 bg-blue-400 cursor-pointer relative border border-blue-80 text-white tb:text-ft6 text-ft38 items-center tb:h-10.5 tb:min-w-150 w-18 h-5 tb:w-max"
                onClick={(e) => {
                  setCoinDropDownVisible(!isCoinDropDownVisible);
                  
                }}
              >
                <span className="mobile:text-ft40 tb:text-ft6">
                  {" "}
                  {getToken?getToken: props.state.currencyForStats}
                </span>
                <img
                  src={isCoinDropDownVisible?"/images/arrow-up.svg":"/images/arrow-down.svg"}
                  className="tb:h-3 pl-2 tb:w-6 h-1.5 w-4"
                />
              </div>
              {isCoinDropDownVisible ? (
                <div className="bg-blue-60 absolute text-white tb:text-ft6 mobile:text-ft40 tb:w-37.5 w-18 border border-blue-80">
                  {props.state.currencyList &&
                    props.state.currencyList.length >= 1 &&
                    props.state.currencyList.map((list, idx) => (
                      <div
                        value={list.tokenSymbol}
                        className="tb:py-2.5 py-1.5 pl-2 cursor-pointer hover:bg-blue-80 bg-blue-150 border-b border-blue-80"
                        onClick={() => {
                          setCoinDropDownVisible(false);
                          props.CurrencyChangeOnStats(list.tokenName);
                          setGetTokens(list.tokenSymbol)
                          
                        }}
                      >
                        <span className="break-words">{list.tokenSymbol}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="relative">
              <div
                className="flex justify-between tb:py-2.5 py-1.5 px-2 bg-blue-400 cursor-pointer relative border border-blue-80 text-white tb:text-ft6 text-ft38 items-center  tb:h-10.5 tb:min-w-150 h-5 w-18 tb:w-max"
                onClick={(e) => {
                  setWeeklyDropDownVisible(!isWeeklyDropDownVisible);
                }}
              >
                <span className="mobile:text-ft40 tb:text-ft6">
                  {selectedWeeklyIndex != null
                    ? itemsList[selectedWeeklyIndex].name
                    : "Weekly"}
                </span>

                <img
                  src={isWeeklyDropDownVisible?"/images/arrow-up.svg":"/images/arrow-down.svg"}
                  className="tb:h-3 pl-2 tb:w-6 h-1.5 w-4"
                />
              </div>
              {isWeeklyDropDownVisible ? (
                <div className="bg-blue-400 absolute text-white tb:text-ft6 mobile:text-ft40 tb:w-37.5 w-18 border border-blue-80">
                  {itemsList.map((item, index) => (
                    <div
                      key={item.value}
                      className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
                      onClick={() => {
                        setSelectedWeeklyIndex(index);
                        setWeeklyDropDownVisible(false);
                        props.DurationChangeOnStats(item.value);
                      }}
                    >
                      <span className="break-words">{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-blue-80 w-full" />
        <div className="flex text-white w-full h-pex">
          <div className="w-4/12 flex flex-col items-center">
            <h1 className="font-black uppercase font-EurostileExtended 2.5xl:h-15 xl:h-12.5 tb:h-10 h-8 flex items-center text-ft23 tb:text-ft2 lg:text-ft6 mobile:h-9.5">
              Top Buyers
            </h1>
            <div className="w-full">
              {props.state.buyers === undefined &&
                Array(limit)
                  .fill("")
                  .map((item) => (
                    <div>
                      <div className="border-b  border-blue-80 w-full h-15 mobile:h-9.5">
                        <div className="ml-tix text-center mt-fex mb-tex flex flex-col items-start">
                          <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white text-center">
                            {item}
                          </h1>
                          <p className="text-ft0 tb:text-ft6 text-blue-80">
                            --
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              <div>
                {props.state.buyers?.map((row, index) => {
                  return (
                    <>
                      <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                        <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                          <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white mobile:text-ft0">
                            {row?.buyerFirstName[0]?.length > 0||row?.buyerAddress[0]?.length > 0
                              ? row?.buyerFirstName[0]
                              ||row?.topBuyers[0].userId.slice(0, 5) +
                                ".".repeat(3) +
                                row?.topBuyers[0].userId.slice(
                                  row?.topBuyers[0].userId.length - 3,
                                  row?.topBuyers[0].userId.length
                                )
                              : "--"}
                          </h1>
                          <p className="text-ft0 tb:text-ft6 text-blue-80 mobile:text-ft40 mb-thp">
                            ({row?.totalPurchasedValue?.toFixed(3) || ""})
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              {props.state.buyers?.length < limit && (
                <div>
                  {Array(limit - props.state.buyers.length)
                    .fill()
                    .map(() => {
                      return (
                        <>
                          <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                            <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                              <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white">
                              
                              </h1>
                              <p className="text-ft0 tb:text-ft6 text-blue-80">
                                --
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div className="w-4/12 flex flex-col items-center text-center bg-darkGrey-50 bg-opacity-16">
            <h1 className="font-black uppercase font-EurostileExtended 2.5xl:h-15 xl:h-12.5 tb:h-10 h-8 flex items-center text-ft23 tb:text-ft2 lg:text-ft6 mobile:h-9.5">
              Top Sellers
            </h1>
            <div className="w-full">
              {props.state.topSellers === undefined &&
                Array(limit)
                  .fill("")
                  .map((item) => (
                    <div>
                      <div className="border-b  border-blue-80 w-full h-15 mobile:h-9.5">
                        <div className="ml-tix text-center mt-fex mb-tex flex flex-col items-start">
                          <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white text-center">
                            {item}
                          </h1>
                          <p className="text-ft0 tb:text-ft6 text-blue-80">
                            --
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              <div>
                {props.state.topSellers?.map((item, index) => {
                  return (
                    <>
                      <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                        <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                          <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white mobile:text-ft0">
                            {item.sellerFirstName[0]?.length > 0||item?.sellerAddress[0]?.length > 0
                              ? item?.sellerFirstName[0] ||item?.sellerAddress[0].slice(0, 5) +
                              ".".repeat(3) +
                              item?.sellerAddress[0].slice(
                                item?.sellerAddress[0].length - 3,
                                item?.sellerAddress[0].length
                              )
                              : "--"}
                          </h1>
                          <p className="mb-thp text-ft0 tb:text-ft6 text-blue-80 mobile:text-ft40">
                            ({item?.totalPurchasedValue?.toFixed(3) || ""})
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              {props.state.topSellers?.length < limit && (
                <div>
                  {Array(limit - props.state.topSellers.length)
                    .fill()
                    .map(() => {
                      return (
                        <>
                          <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                            <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                              <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white">
                                
                              </h1>
                              <p className="text-ft0 tb:text-ft6 text-blue-80">
                                --
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div className="w-4/12 flex flex-col items-center text-center">
            <h1 className="font-black uppercase font-EurostileExtended text-ft23 tb:text-ft2 lg:text-ft6 2.5xl:h-15 xl:h-12.5 tb:h-10 h-8 flex items-center mobile:h-9.5">
              Top Collections
            </h1>
            <div className="w-full">
              <div className="w-full">
                {props.state.topCollection === undefined &&
                  Array(limit)
                    .fill("")
                    .map((item) => (
                      <div>
                        <div className="border-b  border-blue-80 w-full h-15 mobile:h-9.5">
                          <div className="ml-tix text-center mt-fex mb-tex flex flex-col items-start">
                            <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white text-center">
                              {item}
                            </h1>
                            <p className="text-ft0 tb:text-ft6 text-blue-80">
                              --
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                <div>
                  {props.state.topCollection?.map((item, index) => {
                    return (
                      <>
                        {item.collection.length !== 0 &&
                          <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                          <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                            <h1 className="text-ft23 tb:text-ft6 font-bold font-EurostileExtended text-white mobile:text-ft0">
                              {item.collection[0]?.name.length > 0||item.collection[0]?.collectionAddress.length > 0
                                ? item.collection[0]?.name||item?.collection[0]?.collectionAddress.slice(0, 5) +
                                ".".repeat(3) +
                                item?.collection[0]?.collectionAddress.slice(
                                  item?.collection[0]?.collectionAddress.length - 3,
                                  item?.collection[0]?.collectionAddress.length
                                )
                                : ""}
                            </h1>
                            <p className="mb-thp text-ft0 tb:text-ft6 text-blue-80 mobile:text-ft40">
                              ({item?.amount?.toFixed(3) || ""})
                            </p>
                          </div>
                          </div>
                        }
                      </>
                    );
                  })}
                </div>
                {props.state.topCollection?.length < limit && (
                  <div>
                    {Array(limit - props.state.topCollection.length)
                      .fill()
                      .map(() => {
                        return (
                          <>
                            <div className="border-b border-blue-80 w-full h-15 mobile:h-9.5">
                              <div className="ml-tix mt-fex mb-tex flex flex-col items-start">
                                <h1 className="text-ft23 tb:text-ft6  font-bold font-EurostileExtended text-white">
                                
                                </h1>
                                <p className="text-ft0 tb:text-ft6 text-blue-80">
                                  --
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-6 font-EurostileMedium  items-center">
          <button
            className="market-button text-ft0 py-0.75 tb:py-1.25 sm:text-ft13 w-24 h-6.5 sm:w-44 sm:h-12 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80"
            onClick={exploreBtn}
          >
            Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stats;
