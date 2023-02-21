import React, { useEffect } from "react";
import { getApproveToken, getcategory, getcollection } from "../../services";
import utility from "../../utility";
import CommonToasts from "../../common/components/commonToasts";

function FilterSideBarComponent(props) {
  return (
    <div
      className={`${props.height} bg-black-60 text-white max-w-277 w-full border-r border-primary-50 hidden mb-e:block`}
    >
      <div className="flex pl-7 pt-4 pr-2 pb-4 justify-between">
        <div className="text-ft32 font-EurostileExtd cursor-pointer">
          Filters
        </div>
        <div
          onClick={props.toggleSideBar}
          className="flex flex-col justify-center cursor-pointer"
        >
          <img className="w-2.5" src="/images/arrow-left.svg" />
        </div>
      </div>
      <hr className="text-primary-50" />
      <div
        className={
          "pl-7 pt-2.5 pb-2.5 " +
          (props?.state?.currentOpenFilter.price &&
            "bg-primary-50 cursor-pointer text-grey-30")
        }
        onClick={() => props.openFilter("price")}
      >
        <div className="text-ft13 font-EurostileMedium cursor-pointer">
          Price
        </div>
      </div>
      {props?.state?.currentOpenFilter.price && <PriceFilter props={props} />}
      <hr className="text-primary-50" />
      <div
        className={
          "pl-7 pt-3 pb-3 " +
          (props?.state?.currentOpenFilter.collections &&
            "bg-primary-50 cursor-pointer text-grey-30")
        }
        onClick={() => props.openFilter("collections")}
      >
        <div className="text-ft13 font-EurostileMedium cursor-pointer">
          Collections
        </div>
      </div>
      {props?.state?.currentOpenFilter.collections &&
        <CollectionFilter props={props} />}
      <hr className="text-primary-50" />
      <div
        className={
          "pl-7 pt-3 pb-3 " +
          (props?.state?.currentOpenFilter.categories  &&
            "bg-primary-50 cursor-pointer text-grey-30")
        }
        onClick={() => props.openFilter("categories")}
      >
        <div className="text-ft13 font-EurostileMedium cursor-pointer">
          Categories
        </div>
      </div>
      {props?.state?.currentOpenFilter.categories  &&
        <CategoryFilter props={props} />}
      <hr className="text-primary-50" />
    </div>
  );
}

function PriceFilter({props}) {
  const [tokens, setTokens] = React.useState([]);
  const [arrow, setArrow] = React.useState(true);
  const [isToken,setIsToken]=React.useState(false);
  useEffect(() => {
    getTokensList();
  }, [props.state.currentOpenFilter.price]);

  async function getTokensList() {
    const tokensResponse = await getApproveToken({});
    if (tokensResponse && tokensResponse.approvedTokensContent)
      setTokens(tokensResponse.approvedTokensContent);
  }

  async function handleKeyPress(e){
    if (e.key === 'Enter') {
       if(!isToken){
        CommonToasts.errorToast("Please select token");
       }
       else{
      props.filterNftByPrice()
    }
    }
  }

  return (
    <div className="pl-7 pr-7 pt-4 pb-4">
      <div>
        <select
          value={props?.state?.priceFilter?.selectedToken}
          className={`${arrow?"":"arrow-edit"} bg-blue-60 w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60`}
          onChange={(e) =>
            {props.changePriceFilter("selectedToken", e.target.value);
            setArrow(false);
            setIsToken(true)}
          }
          onClick={()=>setArrow((pre)=>!pre)}
        >
          <option
            value=""
            className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
          >
            Select Token
          </option>
          {/* <option
            value="BNB"
            className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
          >
            BNB
          </option> */}
          {tokens && tokens.length ? (
            tokens.map((token) => {
              return (
                <option
                  value={token.tokenName }
                  
                  className="py-1 tb:py-2.5 px-4 hover:bg-blue-80 bg-blue-150 border-b border-blue-80 w-full tb:h-10.5 h-5"
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
            value={props?.state?.priceFilter?.minTokenValue}
            className="bg-black-50 pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70 text-white w-full"
            type="number"
            placeholder="min"
            min="0"
            onChange={(e) =>
              props.changePriceFilter("minTokenValue", e.target.value)
            }
            onKeyDown={handleKeyPress}
     
          />
        </div>
        <div className="w-2/4">
          <input
            value={props?.state?.priceFilter?.maxTokenValue}
            className="bg-black-50 w-full pl-1.5 pr-1.5 pt-1 pb-1 border rounded border-black-70"
            type="number"
            placeholder="max"
            min="0"
            onChange={(e) =>
              props.changePriceFilter("maxTokenValue", e.target.value)
            }
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      <div className="pt-3 flex gap-3 items-center justify-center">
        <button
          onClick={() => props.filterNftByPrice()}
          className="text-white bg-blue-60 border-2 rounded border-blue-60 w-27 h-7 rounded-2xl pb-0.5"
     
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
}

function CollectionFilter({props}) {
  const [collections, setCollections] = React.useState([]);
  const [id,setID] = React.useState("");
  useEffect(() => {
    getCollectionsList();
  }, [props.state.currentOpenFilter.collections]);

  async function getCollectionsList() {
    const collectionResponse = await getcollection(false);
    if (collectionResponse && collectionResponse.collections)
      setCollections(collectionResponse.collections);
  }

  return (
    <div className="pl-7 pr-4 pt-4 pb-4">
      <div className="max-h-40 custom_scroll overflow-y-auto">
        <div className={`${id === "" ?"text-primary-50 ":""} flex`} onClick={() =>{ props.filterNftByCollection("")
        setID("")
      }} >
          <img className="w-5 h-5  mt-0.25" src="/images/Square.svg" />
          <span className="text-ft5 pl-2.5 pb-3 cursor-pointer">
            All Collections
          </span>
        </div>
        {collections && collections.length ? (
          collections.map((collection,index,array) => {
            return (
              <div
                key={collection._id}
                className={`${collection === array[id]?"text-primary-50":""} flex cursor-pointer`}
                onClick={() =>{ props.filterNftByCollection(collection.collectionAddress)
                setID(index)
                }}
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

function CategoryFilter({props}) {
  const [categories, setCategory] = React.useState([]);
  const [id,setID] = React.useState("");
  useEffect(() => {
    getCategoriesList();
  }, [props.state.currentOpenFilter.categories]);

  async function getCategoriesList() {
    const categoryResponse = await getcategory(false, 100);
    if (categoryResponse && categoryResponse.categoriesContent)
      setCategory(categoryResponse.categoriesContent);
  }

  return (
    <div className="pl-7 pr-4 pt-4 pb-4">
      <div className="max-h-40 custom_scroll overflow-y-auto">
        <div className="flex" onClick={() => props.filterNftByCategory("")}>
          <img className="w-5 h-5  mt-0.25" src="/images/Square.svg" />
          <span className={` ${id === "" ? "text-primary-50" : ""} text-ft5 pl-2.5 pb-3 cursor-pointer `} 
          onClick={() => {
            props.filterNftByCategory("");
            setID("");
            }}>
            All Categories
          </span>
        </div>
        {categories && categories.length ? (
          categories.map((category,index,arr) => {
            return (
              <div
                key={category._id}
                className={`${category === arr[id]? "text-primary-50":""} flex cursor-pointer `}
                onClick={() =>{ 
                  props.filterNftByCategory(category._id)
                  setID(index)
                }}
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
}

export default FilterSideBarComponent;
