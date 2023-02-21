import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CURRENCIES, validationsMessages } from "../../constants";
import { useSelector } from "react-redux";

const ButtonContainer = styled.div`
  background: transparent linear-gradient(270deg, #53c1f6 0%, #51c3f500 100%) 0%
    0% no-repeat padding-box;
  border-radius: 12px;
  width: 100%;
  height: 60px;
  @media (min-width: 767px) {
    margin-bottom: 25px;
  }
`;
const Button = styled.button`
  background: transparent linear-gradient(90deg, #55bff6 0%, #24e4e8 100%) 0% 0%
    no-repeat padding-box !important;
  border-radius: 12px;
  opacity: 1;
  width: 97%;
  height: 47px;
  border: none;
  margin-top: 6px;
  margin-left: 7px;
  color: #ffffff;
`;
const SubHeading = styled.div`
  width: 100%;
  margin: 0px 0px 10px 0px;
  display: flex;
  text-align: left;
  font: normal normal medium 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #c3c3c3;
  opacity: 1;
`;

const ErrorMessage = styled.span`
  text-align: left;
  font: normal normal medium 18px/22px Barlow;
  letter-spacing: 0;
  color: #fa021f;
`;
const SellNowInput = styled.input`
  color: #ffffff;
  width: 74%;
  outline: none !important;
  height: 42px;
  background: #564c7d 0% 0% no-repeat padding-box;
  opacity: 1;
  border-radius: 12px 0 0 12px;
  padding: 0 8px;
  border: 1px solid #181442;
`;
const SellNowDialog = (props) => {
  const currencies = useSelector((state) => state.currency);
  const [token, setToken] = useState("BNB");
  const [arrow, setArrow] = useState(false);
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    setPrice(price || "");
    setCurrency(token || "");
  }, [props?.nftDetails]);

  function validateInformation() {
    let priceError = !price ? validationsMessages.PLEASE_ENTER_PRICE_ERROR : "";
    setPriceError(priceError);
    return !!priceError;
  }

  const onClickHandler = async () => {
    // if (validateInformation()) {
    //   console.log("validation")
    //   return;
    // } else if (userData?.isBlocked === true) {
    //         console.log("block")
    //   CommonToasts.errorToast(validationsMessages.UNABLE_TO_SELL_NFTS);
    // } else if (userData?.isBlocked === false) {
    //   console.log("block false")
    props.sellNowHandler({
      price,
      token,
    });

    // window.reload();
    // }
  };

  const [convertedData, setConvertedData] = useState(currencies?.priceBNBToUSD);

  useEffect(() => {
    if (currency === CURRENCIES.BNB) {
      setConvertedData(price * currencies?.priceBNBToUSD);
    } else if (currency === CURRENCIES.SACREDTALES) {
      setConvertedData(price * currencies?.priceSacredToUSD);
    } else if (
      currency === CURRENCIES.INSTINCTGAMES ||
      currency === CURRENCIES.INSTINCT
    ) {
      setConvertedData(price * currencies?.priceInstinctToUSD);
    }
  }, [price, currency]);

  const [isCoinDropDownVisible, setCoinDropDownVisible] = useState(false);

  return (
    <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
      <div
        open={props.open}
        className="flex relative flex-col w-full min-w-343 max-w-604 polygon-wallet shadow-layout  bg-black-100 h-75 tb:h-87.6"
        onClose={() => {
          props.handleClose(false);
        }}
      >
        <img
          onClick={() => {
            props.handleClose(false);
          }}
          className="w-4 h-4 tb:w-7 tb:h-7 self-end relative top-4 right-5 cursor-pointer"
          src="/images/xIcon.svg"
          alt="close"
        />
        <h1 className="font-EurostileBold text-center text-white text-ft5 tb:text-ft16 pt-8">
          Sell item
        </h1>
        <div className="flex mt-9.5 px-4 justify-center">
          <input
            className="bg-black-300 border border-primary-50 appearance-none rounded-l py-0.5 px-4 mb-2 focus:outline-none w-72.5 tb:w-90 h-11 text-white"
            placeholder="Price"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceError("");
            }}
          />
          <div className="mb-2">
            <div className="flex items-center justify-between bg-black-300 px-4 h-11 rounded border border-primary-50">
              <span>{token}</span>
              <img
                className="cursor-pointer"
                onClick={() => {
                  setArrow((prevState) => !prevState);
                }}
                src={!arrow ? "/images/Dropdown.svg" : "/images/arrow-up.svg"}
              />
            </div>
            {arrow && (
              <ul className="flex flex-col z-20 absolute top-15 ">
                {props.approvedTokens.map((token, index) => (
                  <li
                    className="flex items-center cursor-pointer px-4  h-11 border bg-black-300 text-white border-primary-50"
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
        <div className="text-center mt-9.5 mb-0 tb:mb-15">
          <button
            className="border rounded-full market-button overflow-hidden relative z-10 focus:shadow-outline focus:outline-none text-white font-bold py-1 tb:py-2 px-4 border-blue-80 bg-blue-60 w-25 tb:w-45 text-ft1 tb:text-ft6 tb:h-12"
            type="button"
            onClick={onClickHandler}
          >
            Sell Now
          </button>
        </div>
        {priceError && (
          <ErrorMessage className="m-top-23 m-right-20 m-left-20">
            {priceError}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default SellNowDialog;
