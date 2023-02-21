import React from "react";

const Header = (props) => {
  return (
    <div className="h-16 bg-white flex items-center justify-between w-full">
      <img
        src="/images/hamburgerIcon.svg"
        alt="hamburgerIcon"
        className="w-4.5 h-3 ml-12.5 xs:ml-2"
        onClick={() => {
          props.setShowSideBar((prevState) => !prevState);
        }}
      />
      <div className="h-8.5 flex items-center">
        <img
          src="/images/profile-icon.png"
          alt="profileIcon"
          className="w-8.5 h-8.5"
        />
        <h1 className="ml-2.75 mr-2.5 text-ft14 font-OpenSansSemiBold">
          John Doe
        </h1>
        <img src="/images/arrow.png" alt="arrow" />
        <div className="w-0 h-5 border border-grey-150 ml-7.5"></div>
        <div className="">
          <img
            src="/images/notificationIcon.png"
            alt="notificationIcon"
            className="ml-7.5 w-5 h-5 mr-12.5 xs:mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
