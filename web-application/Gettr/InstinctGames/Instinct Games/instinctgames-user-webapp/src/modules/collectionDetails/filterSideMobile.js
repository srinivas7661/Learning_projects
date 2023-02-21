import React, { useEffect } from "react";
import { getApproveToken } from "../../services/adminConfigMicroservices";

function FilterSideMobile(props) {
  return (
    <div
      className={`border w-full lg:hidden sticky left-0 bottom-0 z-10  border-primary-50 text-white bg-black-90`}
    >
      <div className=" w-full flex flex-col-reverse ">
        <div
          onClick={() => props.params.changeSidebarStatus()}
          className="flex justify-center p-5 border-b border-primary-50"
        >
          <h1 className="text-ft24 font-EurostileExtd font-black">Filters</h1>
        </div>
        {!props.params.state.sideBarStatus && (
          <>
            <div
              onClick={() => props.params.changeOpenFilter()}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.openFilter
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Price
              </h1>
            </div>
            <div className="border-b w-full flex justify-center border-primary-50">
              {props.params.state.openFilter && PriceFilter(props)}
            </div>
            {props?.activeTab === "Collected" && (
              <div>
                <div
                  onClick={() => {
                    props.params.filterNftBySale("auction");
                    props.params.changeOpenFilter("auction");
                  }}
                  className={`p-5 slide_nav relative z-10 ${
                    props.params.state.type === "auction"
                      ? "bg-primary-50 text-black-300"
                      : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
                >
                  <h1 className="text-ft13 text-center font-EurostileMedium">
                    On Auction
                  </h1>
                </div>
                <div
                  onClick={() => {
                    props.params.filterNftByAdded("new");
                    props.params.changeOpenFilter("new");
                  }}
                  className={`p-5 slide_nav relative z-10 ${
                    props.params.state.type === "new"
                      ? "bg-primary-50 text-black-300"
                      : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
                >
                  <h1 className="text-ft13 text-center font-EurostileMedium">
                    New
                  </h1>
                </div>
                <div
                  onClick={() => {
                    props.params.filterNftByOffers();
                    props.params.changeOpenFilter("offer");
                  }}
                  className={`p-5 slide_nav relative z-10 ${
                    props.params.state.type === "offer"
                      ? "bg-primary-50 text-black-300"
                      : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
                >
                  <h1 className="text-ft13 text-center font-EurostileMedium">
                    Has Offers
                  </h1>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PriceFilter(props) {
  const [tokens, setTokens] = React.useState([]);
  const [arrow, setArrow] = React.useState(true);
  useEffect(() => {
    // getTokensList();
  }, [props]);

  // async function getTokensList() {
  //   const tokensResponse = await getApproveToken({});
  //   if (tokensResponse && tokensResponse.approvedTokensContent)
  //     setTokens(tokensResponse.approvedTokensContent);
  // }

  return (
    <div className="pl-7 pr-7 pt-4 pb-4">
      <div>
        <select
          value={props.params.state.priceFilter.selectedToken}
          className={`${arrow?"":"arrow-edit"} bg-blue-60 cursor-pointer focus:outline-none w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60`}
          onChange={(e) =>
          { props.params.changePriceFilter("selectedToken", e.target.value); setArrow(false)}
          }
          onClick={()=>setArrow((pre)=>!pre)}
        >
          <option
            className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
            value=""
          >
            Select Token
          </option>
          {/* <option value={"BNB"}>BNB</option> */}
          {props.params.state.approvedTokens && props.params.state.approvedTokens.length ? (
            props.params.state.approvedTokens.map((token) => {
              return (
                <option
                  className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
                  value={token.tokenName}
                >
                  {token.tokenSymbol}
                </option>
              );
            })
          ) : (
            <div>loading...</div>
          )}
        </select>
      </div>
      <div className="flex pt-2">
        <div className="mr-2.5 w-2/4">
          <input
            value={props.params.state.priceFilter.minTokenValue}
            className="bg-black-50 focus:outline-none pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70 text-white w-full"
            type="number"
            placeholder="min"
            min="0"
            onChange={(e) =>
              props.params.changePriceFilter("minTokenValue", e.target.value)
            }
          />
        </div>
        <div className="w-2/4">
          <input
            value={props.params.state.priceFilter.maxTokenValue}
            className="bg-black-50 focus:outline-none w-full pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70"
            type="number"
            placeholder="max"
            min="0"
            onChange={(e) =>
              props.params.changePriceFilter("maxTokenValue", e.target.value)
            }
          />
        </div>
      </div>
      <div className="pt-3 flex gap-3 items-center justify-center">
        <button
          onClick={() => props.params.filterNftByPrice(props?.activeTab)}
          className="text-white bg-blue-60 border-2 border-blue-60 w-28.75 rounded-2xl pb-0.5"
        >
          Apply
        </button>
        <button
          onClick={() => props.params.clearPriceFilter(props?.activeTab)}
          className="text-white bg-blue-60 border-2 border-blue-60 w-28.75 rounded-2xl pb-0.5"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
export default FilterSideMobile;
