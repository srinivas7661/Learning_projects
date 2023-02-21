import React, { useEffect } from "react";
import {
  getApproveToken,
  getcollection,
} from "../../services/adminConfigMicroservices";

function MobileActivityFilter(props) {
  return (
    <div
      className={`border w-full lg:hidden fixed bottom-0 z-10  border-primary-50 text-white bg-black-90`}
    >
      <div className=" w-full flex flex-col-reverse ">
        <div className="flex justify-center p-5 border-b border-primary-50">
          <h1
            onClick={() => props.params.toggleSideBar()}
            className="text-ft24 font-EurostileExtd font-black"
          >
            Filters
          </h1>
        </div>
        {!props.params.state.isSideBarOpen && (
          <>
            <div
              onClick={() => props.params.changeOpenFilter("price")}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.openFilter == "price"
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Price
              </h1>
            </div>
            <div className="border-b w-full flex justify-center border-primary-50">
              {props.params.state.openFilter == "price" && PriceFilter(props)}
            </div>
            <div
              onClick={() => props.params.changeOpenFilter("collections")}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.openFilter === "collections"
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Collections
              </h1>
            </div>
            <div className="border-b w-full border-primary-50">
              {props.params.state.openFilter === "collections" &&
                CollectionFilter(props)}
            </div>
            <div
              onClick={() => {
                props.params.changeOpenFilter("sale");
                props.params.filterTableByType("SELL");
              }}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.type === "SELL"
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Sale
              </h1>
            </div>
            <div
              onClick={() => {
                props.params.changeOpenFilter("listings");
                props.params.filterTableByType("MINT");
              }}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.type === "MINT"
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Listings
              </h1>
            </div>
            <div
              onClick={() => {
                props.params.changeOpenFilter("offer");
                props.params.filterTableByType("OFFER");
              }}
              className={`p-5 slide_nav relative z-10 ${
                props.params.state.type === "BUY"
                  ? "bg-primary-50 text-black-300"
                  : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
            >
              <h1 className="text-ft13 text-center font-EurostileMedium">
                Offer
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PriceFilter(props) {
  const [tokens, setTokens] = React.useState([]);
  useEffect(() => {
    getTokensList();
  }, []);

  async function getTokensList() {
    const tokensResponse = await getApproveToken({});
    if (tokensResponse && tokensResponse.approvedTokensContent)
      setTokens(tokensResponse.approvedTokensContent);
  }

  return (
    <div className="pl-7 w-1/2 pr-7 pt-4 pb-4">
      <div>
        <select
          value={props.params.state.priceFilter.selectedToken}
          className="bg-blue-60 cursor-pointer focus:outline-none w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60"
          onChange={(e) =>
            props.params.changePriceFilter("selectedToken", e.target.value)
          }
        >
          <option value="">Select Token</option>
          {tokens && tokens.length ? (
            tokens.map((token) => {
              return <option value={token.tokenName}>{token.tokenName}</option>;
            })
          ) : (
            <p>loading...</p>
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
            onChange={(e) =>
              props.params.changePriceFilter("maxTokenValue", e.target.value)
            }
          />
        </div>
      </div>
      <div className="pt-3 flex gap-3 items-center justify-center">
        <button
          onClick={() => props.params.filterNftByPrice()}
          className="text-white bg-blue-60 border-2 rounded-full border-blue-60 w-27 h-7  pb-0.5"
        >
          Apply
        </button>
        <button
          onClick={() => props.params.clearPriceFilter()}
          className="text-white bg-blue-60 border-2 rounded-full border-blue-60 w-27 h-7  pb-0.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function CollectionFilter(props) {
  const [collections, setCollections] = React.useState([]);
  useEffect(() => {
    getCollectionsList();
  });

  async function getCollectionsList() {
    const collectionResponse = await getcollection(false);
    if (collectionResponse && collectionResponse.collections)
      setCollections(collectionResponse.collections);
  }

  return (
    <div className="pl-7 pr-4 pt-4 pb-4">
      <div className="max-h-40 overflow-y-auto">
        <div className="flex" onClick={() => props.params.filterTable()}>
          <img className="w-5 h-5  mt-0.25" src="/images/Square.svg" />
          <span className="text-ft5 pl-2.5 pb-3 cursor-pointer">
            All Collections
          </span>
        </div>
        {collections && collections.length ? (
          collections.map((collection) => {
            return (
              <div
                className="flex cursor-pointer"
                onClick={() =>
                  props.params.filterNftByCollection(collection._id)
                }
              >
                <img
                  className="w-6.25 h-6.25 rounded-full mt-0.25"
                  src={collection.imageUrl}
                />
                <span className="text-ft5 pl-2.5 pb-3">{collection.name}</span>
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
}
export default MobileActivityFilter;
