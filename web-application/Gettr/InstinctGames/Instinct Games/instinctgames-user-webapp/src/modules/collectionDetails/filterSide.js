import React, { useEffect } from "react";
import { getApproveToken } from "../../services/adminConfigMicroservices";
import CommonToasts from "../../common/components/commonToasts";
function FilterSideBar(props) {
  const { collectionNFTAttributes, filterNfts } = props
  const [traitData, setTraitData] = React.useState([])
  const [traitSelectedOptions, setTraitSelectedOptions] = React.useState([])

  useEffect(() => {
    function groupBy(array, property) {
      const object = {}
      for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (item !== undefined && !object[item[property]]) object[item[property]] = {
          trait_type: item[property],
          value: [],
          isView: false,
        }
        if (item !== undefined && !object[item[property]].value.includes(item.value)) {
          object[item[property]].value.push(item.value)
        }
      }

      return Object.values(object)
    }
    const data = groupBy(collectionNFTAttributes, "trait_type")
    data.forEach((item) => {
      if (item.trait_type === "") {
        const index = data.indexOf(item)
        if (index > -1) {
          data.splice(index, 1)
        }
      }
    })
    setTraitData(data)
  }, [collectionNFTAttributes])

  const onClickHandler = (trait_type) => {
    setTraitData((prev) => {
      const list = prev.map((item) => {
        if (item.trait_type === trait_type) item.isView = !item.isView
        return item
      })
      return list

    })
  }

  const onCloseHandler = (trait_type) => {
    setTraitData((prev) => {
      const list = prev.map((item) => {
        if (item.trait_type === trait_type) item.isView = !item.isView
        return item
      })
      return list
    })
  }

  const changeHandler = async (event) => {
    let selectedOptions = []
    const isAvailable = traitSelectedOptions.find(i => i.trait_type === event.target.name)
    if (isAvailable) {
      selectedOptions = traitSelectedOptions.map(item => item.trait_type === event.target.name ? {
        trait_type: event.target.name,
        value: event.target.value
      } : item)
    } else {
      selectedOptions = [...traitSelectedOptions, {
        trait_type: event.target.name,
        value: event.target.value
      }]
    }
    setTraitSelectedOptions(selectedOptions)
    await filterNfts(selectedOptions)
  }
  return (
    <div
      className={`${props.params.state.sideBarStatus
        ? "w-50 xl:w-69.25"
        : "w-11 flex justify-center"
        }  h-227.75 border-b border-r  border-primary-50 text-white bg-black-90 overflow-y-scroll`}
    >
      {props.params.state.sideBarStatus && (
        <div className="w-50 xl:w-69.25">
          <div className="flex p-5 border-b border-primary-50 items-center justify-between">
            <h1 className="text-ft24 font-EurostileExtd font-black">Filters</h1>
            <img
              onClick={() => props.params.changeSidebarStatus()}
              className="w-4 h-6 right-4 top-5 cursor-pointer"
              src="/images/arrow-left.svg"
              alt="leftArrow"
            />
          </div>
          <div
            onClick={() => props.params.changeOpenFilter()}
            className={`p-5 slide_nav relative z-10 ${props.params.state.openFilter
              ? "bg-primary-50 text-black-300"
              : ""
              } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
          >
            <h1 className="text-ft13 font-EurostileMedium ">Price</h1>
          </div>
          {props.params.state.openFilter && <PriceFilter props={props} />}
          {props?.activeTab === "Collected" && traitData.length > 0 ? (
            <div>
              {traitData.map((item) =>
                <div className={`p-5 ${!item.isView ? "slide_nav hover:text-black-300 cursor-pointer" : ""} relative z-10 border-b border-primary-50 border-t`}>
                  {!item.isView && <h1 className="text-ft13 font-EurostileMedium capitalize" onClick={() => onClickHandler(item.trait_type)}>{item.trait_type}</h1>}
                  {item.isView &&
                    <>
                      <div className="flex justify-between gap-x-2 mb-4 font-EurostileMedium text-ft13">
                        <h1 className="rounded pl-2 text-white capitalize focus:outline-none">{item.trait_type}</h1>
                        <img src="/images/arrow-up.svg" className="w-4.5" onClick={() => onCloseHandler(item.trait_type)} />
                      </div>
                      <div>
                        {item.value.map((options) => (
                          <div className="flex items-center py-2" onChange={(event) => changeHandler(event)}>
                            <input type="radio" id={options} name={item.trait_type} value={options} className="mr-2 cursor-pointer" />
                            <label htmlFor={options} className="cursor-pointer">{options}</label> <br />
                          </div>
                        ))}
                      </div>
                    </>
                  }
                </div>
              )}
            </div>
          ) : null}
          {props?.activeTab === "Collected" ? (
            <>
              <div
                onClick={() => {
                  props.params.filterNftBySale("auction");
                  props.params.changeOpenFilter("auction");
                }}
                className={`p-5 slide_nav relative z-10 ${props.params.state.type === "auction"
                  ? "bg-primary-50 text-black-300"
                  : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 border-t`}
              >
                <h1 className="text-ft13 font-EurostileMedium ">On Auction</h1>
              </div>
              <div
                onClick={() => {
                  props.params.filterNftByAdded("new");
                  props.params.changeOpenFilter("new");
                }}
                className={`p-5 slide_nav relative z-10 ${props.params.state.type === "new"
                  ? "bg-primary-50 text-black-300"
                  : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
              >
                <h1 className="text-ft13 font-EurostileMedium ">New</h1>
              </div>
              <div
                onClick={() => {
                  props.params.filterNftByOffers();
                  props.params.changeOpenFilter("offer");
                }}
                className={`p-5 slide_nav relative z-10 ${props.params.state.type === "offer"
                  ? "bg-primary-50 text-black-300"
                  : ""
                  } hover:text-black-300 cursor-pointer border-b border-primary-50 `}
              >
                <h1 className="text-ft13 font-EurostileMedium ">Has Offers</h1>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
      {!props.params.state.sideBarStatus && (
        <img
          onClick={() => props.params.changeSidebarStatus()}
          className="w-4 mt-4 h-6 cursor-pointer"
          src="/images/arrow-right.svg"
          alt="rightArrow"
        />
      )}
    </div>
  );
}

function PriceFilter({ props }) {
  const [tokens, setTokens] = React.useState([]);
  const [arrow, setArrow] = React.useState(true);
  const [isToken, setIsToken] = React.useState(false);
  useEffect(() => {
    // getTokensList();
  }, [props]);

  // async function getTokensList() {
  //   const tokensResponse = await getApproveToken({});
  //   if (tokensResponse && tokensResponse.approvedTokensContent)
  //     setTokens(tokensResponse.approvedTokensContent);
  // }
  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (!isToken) {
        CommonToasts.errorToast("Please select token");
      }
      else {
        props.filterNftByPrice()
      }
    }
  }

  return (
    <div className="pl-7 pr-7 pt-4 pb-4">
      <div>
        <select
          value={props.params.state.priceFilter.selectedToken}
          className={`${arrow ? "" : "arrow-edit"} bg-blue-60 cursor-pointer focus:outline-none w-full pl-1.5 pr-1.5 pt-1 pb-1 border-2 rounded border-blue-60`}
          onChange={(e) => { props.params.changePriceFilter("selectedToken", e.target.value); setArrow(false); setIsToken(true) }
          }
          onClick={() => setArrow((pre) => !pre)}
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
            onKeyDown={handleKeyPress}
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
            onKeyDown={handleKeyPress}
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
export default FilterSideBar;
