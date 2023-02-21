import React, { useState } from "react";

const expirationTime = ["1 day", "3 days", "5 days"];

function MakeOfferPopup(props) {
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState("BNB");
  const [daysCount, setDaysCount] = useState(0);
  const [days, setDays] = useState(new Date());
  const [date, setDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [icon, setIcon] = useState(false);
  const [time, setTime] = useState(expirationTime[0]);

  const handleOffer = () => {
    let epochDate;
    if (date) {
      epochDate = new Date(date);
      epochDate = epochDate.getTime();
    } else {
      let number;
      if (time == "1 day") {
        number = 1;
      } else if (time == "3 day's") {
        number = 3;
      } else {
        number = 5;
      }

      const d = new Date();
      d.setDate(d.getDate() + number);
      epochDate = new Date(d);
      epochDate = epochDate.getTime();
    }
    props.offerHandler({ amount, token, epochDate });
  };
  const handleDay = () => {
    if (date) {
      return;
    } else {
      var current = new Date();
      current.setDate(current.getDate() + 1);
      setDays(current);
    }
  };
  return (
    <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
      <div
        open={props.open}
        onClose={() => props.handleClose(false)}
        className="flex flex-col w-full min-w-350 max-w-lg_0 polygon-wallet shadow-layout text-white  bg-black-100"
      >
        <img
          onClick={() => {
            props.handleClose(false);
          }}
          className="w-4 h-4 tb:w-7 tb:h-7 self-end relative top-4 right-5 cursor-pointer"
          src="/images/xIcon.svg"
          alt="close"
        />
        <h1 className="text-ft5 tb:text-ft16 text-center font-Eurostile font-bold">
          Make an offer
        </h1>
        <div className="flex mt-20  justify-center">
          <form className="flex flex-col">
            <div className="flex flex-col tb:flex-row mb-15 items-end gap-4">
              {/* Token */}
              <div className="flex flex-col">
                <label className="text-ft25 tb:text-ft13 mb-1">
                  Offer amount
                </label>
                <div className="relative">
                  <div className="flex items-center  justify-between bg-transparent w-55 tb:w-75.75 px-4 h-11 rounded border border-primary-50">
                    <span>{token}</span>
                    <img
                      className="cursor-pointer"
                      onClick={() => {
                        setArrow((prevState) => !prevState);
                      }}
                      src={
                        !arrow ? "/images/Dropdown.svg" : "/images/arrow-up.svg"
                      }
                    />
                  </div>
                  {arrow && (
                    <ul className="flex flex-col z-20 absolute top-11 ">
                      {props.approvedTokens.map((token, index) => (
                        <li
                          className="flex items-center cursor-pointer pl-4 w-55 tb:w-75.75 h-11 border bg-black-300 text-white border-primary-50"
                          onClick={() => {
                            setToken(token?.tokenName);
                            setArrow(false);
                          }}
                          key={index}
                        >
                          {token?.tokenName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/* Amount  */}
              <div className="flex flex-col relative top-5 items-end text-white">
                <span className="text-ft0 tb:text-ft29 text-right opacity-70">
                  Balance: 0.0015 BNB
                </span>
                <input
                  className="bg-transparent w-55 tb:w-75.75 pl-4 placeholder-opacity-30 placeholder-white h-11 rounded focus:outline-none border border-primary-50 "
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                  type="text"
                  placeholder="Amount"
                />
                <span className="text-ft0 tb:text-ft29 text-right opacity-70">
                  Total offer amount: 0 BNB
                </span>
              </div>
            </div>
            {/* Time & Date */}
            <div className="flex flex-col tb:flex-row items-end gap-4">
              <div className="flex flex-col justify-center ">
                <label className="text-ft25 tb:text-ft13 mb-1">
                  Offer expiration
                </label>
                <div className="relative">
                  <div className="flex items-center  justify-between bg-transparent w-55 tb:w-75.75 px-4 h-11 rounded border border-primary-50">
                    <span>{time}</span>
                    <img
                      className="cursor-pointer"
                      onClick={() => {
                        setIcon((prevState) => !prevState);
                      }}
                      src={
                        !icon ? "/images/Dropdown.svg" : "/images/arrow-up.svg"
                      }
                    />
                  </div>
                  {icon && (
                    <ul className="flex flex-col z-20 absolute top-11 ">
                      {expirationTime.map((time, index) => (
                        <li
                          className="flex items-center cursor-pointer pl-4 w-55 tb:w-75.75 h-11 border bg-black-300 text-white border-primary-50"
                          onClick={() => {
                            setTime(expirationTime[index]);
                            setIcon(false);
                            setIsDisabled(true);
                          }}
                          key={index}
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <input
                className="bg-transparent cursor-pointer appearance-none w-55 tb:w-75.75 px-4 placeholder-opacity-30 placeholder-white h-11 rounded focus:outline-none border border-primary-50 calendar"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                type="datetime-local"
                placeholder={date}
                disabled={isDisabled}
              />
            </div>
            <button
              type="submit"
              className="self-center my-13 market-button overflow-hidden relative z-10 border-2  rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-1 tb:py-2 px-4 border-blue-80 text-ft0 tb:text-ft6 bg-blue-60 w-25 tb:w-45 tb:h-12"
              onClick={() => {
                handleOffer();
                handleDay();
              }}
            >
              Make offer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakeOfferPopup;
