import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { HeaderMobile } from "../common/header/HeaderMobile";

const MobileMenu = () => {
  const history = useHistory();
  useEffect(() => {
    if (window.screen.width > 875) {
      console.log(window.screen.width);
    }
  }, []);

  const links = [
    { name: "Marketplace", href: "/explore" },
    { name: "Stats", href: "/stats" },
    { name: "Resources", href: "/resources" },
    { name: "Collections", href: "/collections" },
  ];
  return (
    <div className="bg-main bg-black-60 bg-cover h-screen">
      <HeaderMobile />
      <div className="text-white flex flex-col justify-center items-center mt-40">
        <div className="flex flex-col gap-y-12.5 h-full">
          {links.map((link, index) => (
            <span
              key={index}
              className="font-Eurostile font-ft6 cursor-pointer"
              onClick={() => history.push(link.href)}
            >
              {link.name}
            </span>
          ))}
        </div>
        <div
          className="w-full flex justify-center cursor-pointer mt-43.75"
          onClick={() => history.push("/")}
        >
          <img
            src="/images/footer-logo-icon.svg"
            className="h-6 w-48.5"
            alt="/"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
