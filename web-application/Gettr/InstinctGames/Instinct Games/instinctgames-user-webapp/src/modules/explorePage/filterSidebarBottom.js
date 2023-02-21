import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getApproveToken, getcategory, getcollection } from "../../services";

const PriceComponent = ({ props }) => {
  const [tokens, setTokens] = useState([]);
  const [arrow, setArrow] = React.useState(true);
  async function getTokensList() {
    const tokensResponse = await getApproveToken({});
    if (tokensResponse && tokensResponse.approvedTokensContent) {
      setTokens(tokensResponse.approvedTokensContent);
    }
  }
  useEffect(() => {
    getTokensList();
  }, [props.state.currentOpenFilter.price]);

  return (
    <div className="pl-7 pr-7 pt-4 pb-4 border-primary-50 border-b">
      <div>
        <select
          value={props?.state?.priceFilter?.selectedToken}
          className={`${arrow?"":"arrow-edit"} bg-blue-60 w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60`}
          onChange={(e) =>
            {props.changePriceFilter("selectedToken", e.target.value);
            setArrow(false)}
          }
          onClick={()=>setArrow((pre)=>!pre)}
        >
          <option value="">Select Token</option>
          {tokens && tokens.length ? (
            tokens.map((token) => {
              return <option value={token.tokenName}>{token.tokenName}</option>;
            })
          ) : (
            <div>loading...</div>
          )}
        </select>
      </div>
      <div className="flex pt-2">
        <div className="mr-2.5 w-2/4">
          <input
            value={props?.state?.priceFilter?.minTokenValue}
            className="bg-black-50 w-100 pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70 text-white w-full"
            type="number"
            placeholder="min"
            min="0"
            onChange={(e) =>
              props?.changePriceFilter("minTokenValue", e.target.value)
            }
          />
        </div>
        <div className="w-2/4">
          <input
            value={props?.state?.priceFilter?.maxTokenValue}
            className="bg-black-50 w-full pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70"
            type="number"
            placeholder="max"
            max="0"
            onChange={(e) =>
              props?.changePriceFilter("maxTokenValue", e.target.value)
            }
          />
        </div>
      </div>
      <div className="pt-3 flex gap-3 items-center justify-center">
        <button
          onClick={() => props?.filterNftByPrice()}
          className="text-white bg-blue-60 border-2 rounded border-blue-60 w-28.75 rounded-2xl pb-0.5"
        >
          Apply
        </button>
        <button
          onClick={() => props.clearFilterByPrice()}
          className="text-white bg-blue-60 border-2 rounded border-blue-60 w-27 h-7 rounded-2xl pb-0.5"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const CollectionsComponent = ({ props }) => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getCollectionsList();
  }, [props?.state.currentOpenFilter.collections]);

  async function getCollectionsList() {
    const collectionResponse = await getcollection(false);
    if (collectionResponse && collectionResponse.collections) {
      setCollections(collectionResponse.collections);
    }
  }

  return (
    <div className="pl-7 pr-4 pt-4 pb-4">
      <div className="max-h-40 overflow-y-auto">
        <div
          className="flex"
          onClick={() => props?.filterNftByCollection()}
        >
          <img
            className="w-6.25 h-6.25 mt-0.25"
            src="/images/Square.svg"
          />
          <span className="text-ft5 pl-2.5 pb-3 cursor-pointer">
            All Collections
          </span>
        </div>
        {collections && collections.length ? (
          collections.map((collection) => {
            return (
              <div
                key={collection._id}
                className="flex cursor-pointer"
                onClick={() => props?.filterNftByCollection(collection.collectionAddress)}
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
};

const CategoriesComponent = ({ props }) => {
  const [categories, setCategory] = React.useState([]);
  useEffect(() => {
    getCategoriesList();
  }, [props?.state.currentOpenFilter.categories]);

  async function getCategoriesList() {
    const categoryResponse = await getcategory(false, 100);
    if (categoryResponse && categoryResponse.categoriesContent)
      setCategory(categoryResponse.categoriesContent);
  }

  return (
    <div className="pl-7 pr-4 pt-4 pb-4">
      <div className="max-h-40 overflow-y-auto">
        <div
          className="flex"
          onClick={() => props?.filterNftByCategory()}
        >
          <img
            className="w-6.25 h-6.25 mt-0.25"
            src="/images/Square.svg"
          />
          <span className="text-ft5 pl-2.5 pb-3 cursor-pointer">
            All Categories
          </span>
        </div>
        {categories && categories.length ? (
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className="flex cursor-pointer"
                onClick={() => props?.filterNftByCategory(category._id)}
              >
                <img
                  className="w-6.25 h-6.25 rounded-full mt-0.25"
                  src={category.imageUrl}
                />
                <span className="text-ft5 pl-2.5 pb-3">
                  {category.categoryName}
                </span>
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

const AbovePanelItem = ({ props, data }) => {
  const [tabDetails, setTabDetails] = useState("");
  const handleToggleTab = () =>
    tabDetails === data ? setTabDetails("") : setTabDetails(data);
  return (
    <>
      <div
        className={classNames(
          {
            "border-primary-50 border-b": data === "Price",
            "bg-primary-50": tabDetails === data,
          },
          "border-primary-50 border-t py-6 text-ft7 font-Eurostile"
        )}
        onClick={handleToggleTab}
      >
        {data}
      </div>
      {tabDetails === "Price" ? <PriceComponent props={props} /> : <></>}
      {tabDetails === "Collections" ? (
        <CollectionsComponent props={props} />
      ) : (
        <></>
      )}
      {tabDetails === "Categories" ? (
        <CategoriesComponent props={props} />
      ) : (
        <></>
      )}
    </>
  );
};

const AbovePanel = ({ props }) => {
  const options = ["Categories", "Collections", "Price"];
  return (
    <div className="w-full bg-black-60 -mt-61 lg:hidden">
      {options.map((data, index) => (
        <AbovePanelItem key={index} data={data} props={props} />
      ))}
    </div>
  );
};

export const FilterSidebarBottom = ({ props }) => {
  const [abovePanelShow, setAbovePanelShow] = useState(false);
  const handleAbovePanelShow = () => setAbovePanelShow(!abovePanelShow);
  return (
    <div className="mb-e:hidden bg-black-60 text-white text-center cursor-pointer sticky bottom-0">
      {abovePanelShow && <AbovePanel className="" props={props} />}
      <div
        className={classNames(
          "bg-black-60 text-white py-5 text-center cursor-pointer",
          { "border-primary-50 border-t": !abovePanelShow }
        )}
        onClick={handleAbovePanelShow}
      >
        <h2 className="text-ft38 font-EuroStyleNormal font-black ">Filters</h2>
      </div>
    </div>
  );
};
