import classNames from "classnames";
import React, { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../managers/history";

const statsBtn = () => {
  history.push("/stats");
  // window.location.reload();
};
const exploreBtn = () => {
  history.push("/explore");
  // window.location.reload();
};
const resourcesBtn = () => {
  history.push("/resources");
  // window.location.reload();
};
const collectionsBtn = () => {
  history.push("/collections");
  // window.location.reload();
};
const aboutBtn = () => {
  history.push("/about");
  // window.location.reload();
};

const createBtn = () => {
  // history.push("/select-category");
};

export default function FooterComponent() {
  const [marketPlaceData, setMarketPlaceData] = useState(false);
  const [resourcesData, setresourcesData] = useState(false);
  const [companyData, setcompanyData] = useState(false);

  const handleMarketPlaceClick = () => setMarketPlaceData(!marketPlaceData);
  const handleResourceClick = () => setresourcesData(!resourcesData);
  const handleCompanyClick = () => setcompanyData(!companyData);
  const userData = useSelector((state) => state.wallet.walletConnect);
  
  const handleConnect = async () => {
      userData?.userId
        ? history.push("/select-category")
        : history.push("/wallet-connect");
  };

  const settingsRoute = () => {
    userData?.userId
      ? history.push("/settings")
      : history.push("/wallet-connect");
  }
  
  return (
    <div
      className="flex bg-headerColor-50 justify-evenly mb-s:flex-col
    mb-s:text-center mb-e:flex-row  align-center py-6  mb-e:pt-12.5 mb-e:pb-0  drop-shadow-md mb-e:h-87.5"
    >
      <div className="flex mb-4.5 flex-col">
        <div className="w-full flex justify-center  ">
          <img
            src="/images/footer-logo-icon.svg"
            className="w-29 h-3.75 mb-e:h-6 mb-e:w-48.5"
            alt="/"
          />
        </div>

        <a className="mb-5 cursor-pointer text-ft23 sm:text-ft12 tracking-tight text-grey-500 pt-4 font-EurostileExtd mb-e:flex mb-e:flex-col text-center gap-y-2">
          <span>Gaming NFT Marketplace built </span>
          <span>on Binance Smart Chain</span>
        </a>

        <div className="text-ft23 sm:text-ft12 tracking-tight text-grey-500 pt-4 font-EurostileExtd mb-e:flex mb-e:flex-col text-center gap-y-2">
        Copyright © 2021 Hoardable. All Rights Reserved
        </div>
      </div>
      <div className="flex flex-col gap-1  text-ft0 tb:text-ft12   mb-e:flex-row items-center mb-e:items-start justify-around w-full mb-e:w-5/12">
        <div className="flex flex-col flex-nowrap pl-3 mmobile:pl-3.5">
          <div
            className="text-white tracking-tight flex sm:items-center  font-EurostileMedium cursor-pointer"
            onClick={handleMarketPlaceClick}
          >
            <span>Marketplace</span>
            <RiArrowRightSLine
              className={classNames("mb-e:hidden", {
                "transform rotate-90": marketPlaceData,
              })}
            />
          </div>
          <div
            className={classNames(
              "flex flex-col mb-e:flex mb-e:flex-col cursor-pointer",
              {
                "mb-s:hidden": !marketPlaceData,
              }
            )}
          >
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={exploreBtn}
            >
              Explore
            </a>
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={handleConnect}
            >
              Create
            </a>
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={statsBtn}
            >
              Stats
            </a>
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={() => history.push("/profile")}
            >
              Profile
            </a>
            <a
              className="cursor-pointer tracking-tight text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={() => history.push("/token-request")}
            >
              Add your Token
            </a>
          </div>
        </div>
        <div className={resourcesData?"flex flex-col flex-nowrap  mmobile:-ml-2.5":"flex flex-col flex-nowrap mmobile:pl-1.5"}>
          <div
            className="text-white tracking-tight flex sm:items-center text-left font-EurostileMedium cursor-pointer"
            onClick={handleResourceClick}
          >
            <span>Resources</span>
            <RiArrowRightSLine  className={classNames("mb-e:hidden", {
                "transform rotate-90": resourcesData,
              })}/>
          </div>
          <div 
          className={classNames(
            "flex flex-col mb-e:flex mb-e:flex-col cursor-pointer",
            {
              "mb-s:hidden": !resourcesData,
            }
          )}
        >
          {/* className="mb-e:flex mb-e:flex-col flex flex-col"> */}
            <a
              className="cursor-pointer tracking-tight text-left text-grey-100 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={resourcesBtn}
            >
              Help center
            </a>
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={() => history.push("/make-suggestion")}
            >
              Suggestions
            </a>
            <a
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={resourcesBtn}
            >
              FAQs
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap mmobile:pl-0.5">
          <div onClick={handleCompanyClick} className="text-white sm:items-center tracking-tight font-EurostileMedium flex  cursor-pointer">
            <span>Company</span>
            <RiArrowRightSLine className={classNames("mb-e:hidden", {
                "transform rotate-90": companyData,
              })} />
          </div>
          <div className={classNames(
            "flex flex-col mb-e:flex mb-e:flex-col cursor-pointer",
            {
              "mb-s:hidden": !companyData,
            }
          )}>
            <Link
              to="/about"
              className="cursor-pointer text-left tracking-tight text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
            >
              {/* <a className="cursor-pointer tracking-tight text-grey-500 pt-1.75 font-EurostileMedium"> */}
              About
              {/* </a> */}
            </Link>
            <Link
              to="/privacy-policy"
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-nowrap pr-5">
          <div onClick={handleCompanyClick} className="text-white items-center tracking-tight font-EurostileMedium flex  cursor-pointer">
            <span>User</span>
            <RiArrowRightSLine className={classNames("mb-e:hidden", {
                "transform rotate-90": companyData,
              })} />
          </div>
          <div className={classNames(
            "flex flex-col mb-e:flex mb-e:flex-col cursor-pointer",
            {
              "mb-s:hidden": !companyData,
            }
          )}>
            <Link
              to="/profile"
              className="cursor-pointer text-left tracking-tight text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
            >
              {/* <a className="cursor-pointer tracking-tight text-grey-500 pt-1.75 font-EurostileMedium xmobile:text-ft29"> */}
              Profile
              {/* </a> */}
            </Link>
            <ul
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
              onClick={settingsRoute}
            >
              Setting
            </ul>
            <Link
              to="/notifications"
              className="cursor-pointer tracking-tight text-left text-grey-500 pt-1.75 text-ft13 font-EurostileMedium xmobile:text-ft29"
            >
              Notification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
