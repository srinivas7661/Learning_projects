import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  let homeHistory = useHistory();
  const homeBtn = () => {
    homeHistory.push("/");
  };
  return (
    <div className="bg-violet-50 text-white xs:h-130 sm:h-130 md:h-118 lg:h-75 text-ft15">
      <div className="xl:w-312.5 w-95per ml-auto mr-auto xs:h-130 sm:h-130 md:h-118 lg:h-75">
        <div className="py-3per grid lg:flex justify-between xs:h-130 sm:h-130 md:h-118 lg:h-75">
          <div className="lg:w-1/4 md:w-65per w-90per flex flex-col justify-between">
            <img className="w-57.5" src="/images/main-logo.png" alt="/" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing ibulum gravida
              semper enim vel fermentum. Ty neques odio, tincidunt ut congue ac,
              gravida ut enim.
            </p>
            <p className="lg:block hidden">2022 @ RunCrypto LLC</p>
          </div>
          <div className="md:flex lg:flex justify-between lg:w-65per md:w-80per w-90per lg:pt-0  pt-12.5">
            <div className="md:w-60per lg:w-60per w-90per justify-between flex">
              <div className="grid grid-rows-4">
                <h1 className=" cursor-pointer" onClick={homeBtn}>
                  Projects
                </h1>
                <h1>How it works</h1>
                <h1>Stake</h1>
                <h1>Contact Us</h1>
              </div>
              <div className="grid grid-rows-4">
                <h1> Terms and Conditions</h1>
                <h1>Privacy Policy</h1>
              </div>
            </div>
            <div className="md:w-1/4 lg:w-1/4 xs:mt-10 sm:mt-10 grid md:grid-rows-3 lg:grid-rows-3 ">
              <img className="w-43.5" src="/images/social-icons.png" alt="/" />
              <p className="lg:block hidden">
                Please contact us if you have any query or feedback
              </p>
              <div className="lg:flex hidden">
                <img className="w-5 h-5" src="/images/mail-icon.png" alt="/" />
                <p>support@lte.com</p>
              </div>
            </div>
          </div>
          <p className="flex items-center lg:hidden">2022 @ RunCrypto LLC</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
