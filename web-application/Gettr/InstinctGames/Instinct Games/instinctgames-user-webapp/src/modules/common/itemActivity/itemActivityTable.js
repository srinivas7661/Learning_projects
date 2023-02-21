import React, { useState } from "react";
import utility from "../../../utility";

const ItemActivity = (props) => {
  let { itemActivities } = props.itemActivities;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onClickHandler(value);
  };
 
  function modifyUserData(userData) {
    return userData?.slice(0,5) + "..." + userData?.slice(-3);
  }
  const onClickHandler = async (value) => {
    props.activityHandler({ selectedOption: value });
  };

  const options = ["MINT", "SELL", "OFFER"];
  const toggling = () => setIsOpen(!isOpen);
  const bscLink = async (value) => {
    window.location.href = process.env.REACT_APP_BINANCE_EXPLORER_LINK + value;
  };
  return (
    <div className="w-full h-full ">
      <div className="h-110 w-full">
        <div className="p-1.5 text-ft6 text-white  font-bold item-activity-polygon bg-violet-10">
          <div className="flex pl-3">
            <div className="pt-1.5 mr-1 pr-1">
              <img
                className="w-4"
                src="/images/arrow-compare-icon.svg"
                alt="info"
              ></img>
            </div>
            <h1 className="font-black tb:text-ft30 text-ft6">Item Activity</h1>
          </div>
        </div>
        <div className="tablet:relative  mobile:relative border border-violet-10 bg-black-100 border-relative mobile:h-52 tablet:h-52 tablet:overflow-scroll mobile:overflow-scroll">
          <table className="text-ft1  w-full tablet:w-218.75 mobile:w-151 bg-black-100 text-white">
            <thead className="text-grey-120 pt-5  pb-5 tb:text-ft12 text-ft0">
              <tr className="grid grid-cols-7  pb-2 pt-2 tb:pl-5 pl-2 text-tHead justify-items-start relative">
                <th className="font-normal">Event</th>
                <th className="font-normal -ml-fox w-full">Price</th>
                <th className="font-normal">From</th>
                <th className=" whitespace-nowrap font-normal">To</th>
                <th className="font-normal">Date</th>
                <th className="justify-items-start tb:pl-12.5">
                  <div onClick={toggling} className="bg-blue-60 border cursor-pointer border-blue-80 p-0.75 flex justify-between tb:w-35 w-21">
                    <div className="tb:text-ft12 text-ft0 font-normal overflow-x-auto overflow-y-hidden w-full">
                      {selectedOption
                        ? utility.sentenceCase(selectedOption)
                        : "Filter"}
                    </div>
                    <div className="w-3.75 pt-1">
                      <img src="/images/filter.svg" ></img>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="bg-blue-60 border border-blue-80 p-0.75 tb:w-35 w-21 divide-y divide-blue-80 absolute">
                      <div className="bg-black-100">
                        <div
                          onClick={onOptionClicked("All")}
                          className="text-ft3 font-normal text-left hover:text-blue-80 bg-blue-60"
                        >
                          All
                        </div>
                      </div>
                      {props?.options.map((option) => (
                        <div className="bg-black-100">
                          <div
                            onClick={onOptionClicked(option)}
                            className="text-ft3 font-normal text-left hover:text-blue-80 bg-blue-60"
                          >
                            {utility.sentenceCase(option)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="text-white tb:text-ft12 text-ft0">
              <tr className="border-b-2 border-violet-10"></tr>
              {props.itemActivities && props.itemActivities.length ? (
                props.itemActivities.map((data) => {
                  return (
                    <tr className="grid grid-cols-6 tb:grid-cols-7 gap-x-0 justify-items-start items-center tb:text-ft12 text-ft0 border-down font-PoppinsMedium tb:py-1 text-white tb:ml-5 tb:mr-5 ml-2">
                      <td className="border-collapse capitalize w-sfx overflow-hidden">
                        {data.event}
                      </td>
                      <td className="w-full pl-1 mobile:whitespace-nowrap flex justify-start items-center gap-x-1.75 -ml-fox tb:ml-0">
                        <div className="flex w-nex tb:w-full items-center ">
                          {data.price}{" "}
                          {utility.getTokenIcon(data?.currency) ? (
                            <img
                              className="tb:h-3.5 h-2.5 "
                              src={utility.getTokenIcon(data?.currency)}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td
                        className="tb:w-full pl-1  text-blue-80 font-normal -ml-tif tb:ml-0 w-pex whitespace-nowrap overflow-hidden cursor-pointer"
                        onClick={() => bscLink(data.fromAddress)}
                      >
                        {data.from !== "" ? data.from.length > 12 ? modifyUserData(data.from) : data.from : modifyUserData(data.fromAddress)}
                      </td>
                      <td
                        className="tb:w-full w-pex pl-1 text-blue-80 whitespace-nowrap overflow-hidden font-normal -ml-fox tb:ml-0 cursor-pointer"
                        onClick={() => bscLink(data.toAddress)}
                      >
                        {data.event !== "Sell" ? data.to !== "" ? data.to.length > 12 ? modifyUserData(data.to) : data.to : modifyUserData(data.toAddress): "---"}
                      </td>
                      <td className="w-soo pl-1 text-white font-normal -ml-sfx tb:ml-0">
                        {data.date}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="text-center py-10"> No Graph Data</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemActivity;
