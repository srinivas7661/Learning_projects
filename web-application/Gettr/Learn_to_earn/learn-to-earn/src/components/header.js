import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const homeBtn = () => {
    history.push("/");
  };
  return (
    <div className="bg-violet-50 text-white h-15 flex items-center">
      <div className="xl:w-312.5 w-95per ml-auto mr-auto">
        <div className="flex justify-between items-center">
          <img className="h-11" src="/images/main-logo.png" alt="/" />
          <nav className="flex lg:w-87.5 w-23 justify-between items-center">
            <p onClick={homeBtn} className="hidden lg:block cursor-pointer">
              Projects
            </p>
            <p className="hidden lg:block">How it works</p>
            <p className="hidden lg:block">Stake</p>

            <img
              className="h-10 w-10 xs:hidden block"
              src="/images/wallet-icon.png"
              alt="/"
            />
            <img
              onClick={homeBtn}
              className="h-8 w-9 lg:hidden block xs:ml-9"
              src="/images/menu-icon.png"
              alt="/"
            />
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Header;
