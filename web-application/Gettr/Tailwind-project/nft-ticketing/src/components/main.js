import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import DashBoard from "./dashBoard";
import Events from "./events";
import WhiteList from "./whiteList";

const Main = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [sideElements, setSideElements] = useState({
    dashBoard: true,
    events: false,
    whiteList: false,
  });

  return (
    <div className="flex">
      {showSideBar && (
        <Sidebar
          setSideElements={setSideElements}
          sideElements={sideElements}
        />
      )}
      <div className="w-full">
        <Header setShowSideBar={setShowSideBar} />
        {sideElements.dashBoard && <DashBoard />}
        {sideElements.events && <Events />}
        {sideElements.whiteList && <WhiteList />}
      </div>
    </div>
  );
};

export default Main;
