import React from "react";

const Sidebar = (props) => {
  return (
    <div>
      <div className="w-62.5 h-full tb:flex flex-col items-center bg-white shadow-sm min-h-screen hidden">
        <div className="mt-6">
          <img src="/images/main-logo.svg" alt="nftLogo" className="w-30 h-6" />
        </div>
        <div
          className={`${
            props.sideElements.dashBoard
              ? "bg-grey-250 border-l-4 border-blue-100"
              : ""
          } mt-13.5 flex self-start items-center w-62.5 h-12.5 cursor-pointer`}
          onClick={() => {
            props.setSideElements({
              dashBoard: true,
            });
          }}
        >
          <img src="/images/graph.svg" alt="graph" className=" h-4 w-4 ml-6" />
          <h1
            className={`${
              props.sideElements.dashBoard
                ? "text-black-50 font-OpenSansSemiBold"
                : "text-grey-75 font-OpenSansRegular"
            } ml-5 text-ft14`}
          >
            Dashboard
          </h1>
        </div>
        <div
          className={`${
            props.sideElements.events
              ? "bg-grey-250 border-l-4 border-blue-100"
              : ""
          } mt-2.5 flex self-start items-center w-62.5 h-12.5 cursor-pointer`}
          onClick={() => {
            props.setSideElements({
              events: true,
            });
          }}
        >
          <img
            src="/images/calendar-icon.png"
            alt="graph"
            className=" h-4.5 w-4.5 ml-6 text-blue-100"
          />
          <h1
            className={`${
              props.sideElements.events
                ? "text-black-50 font-OpenSansSemiBold"
                : "text-grey-75 font-OpenSansRegular"
            } ml-5 text-ft14`}
          >
            Events
          </h1>
        </div>
        <div
          className={`${
            props.sideElements.whiteList
              ? "bg-grey-250 border-l-4 border-blue-100"
              : ""
          } mt-2.5 flex self-start items-center w-62.5 h-12.5 cursor-pointer`}
          onClick={() => {
            props.setSideElements({
              whiteList: true,
            });
          }}
        >
          <img
            src="/images/persons.png"
            alt="graph"
            className=" h-4 w-4 ml-6"
          />
          <h1
            className={`${
              props.sideElements.whiteList
                ? "text-black-50 font-OpenSansSemiBold"
                : "text-grey-75 font-OpenSansRegular"
            } ml-5 text-ft14`}
          >
            Whitelist
          </h1>
        </div>
      </div>
      <div className="items-center shadow-sm min-h-screen w-8 tb:hidden flex flex-col  sm:w-12 xs:gap-8 sm:gap-10 pt-20">
        <img
          src="/images/graph.svg"
          alt="graph"
          className={`${
            props.sideElements.dashBoard
              ? " border-b-2 pb-1 border-blue-100"
              : ""
          }h-4 w-4`}
          onClick={() => {
            props.setSideElements({
              dashBoard: true,
            });
          }}
        />
        <img
          src="/images/calendar-icon.png"
          alt="graph"
          className={`${
            props.sideElements.events ? " border-b-2 pb-1 border-blue-100" : ""
          }h-4 w-4`}
          onClick={() => {
            props.setSideElements({
              events: true,
            });
          }}
        />
        <img
          src="/images/persons.png"
          alt="graph"
          className={`${
            props.sideElements.whiteList
              ? " border-b-2 pb-1 border-blue-100"
              : ""
          }h-4 w-4`}
          onClick={() => {
            props.setSideElements({
              whiteList: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
