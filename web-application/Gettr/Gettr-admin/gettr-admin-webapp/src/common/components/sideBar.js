import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData, stringConstants } from "../../constants";
import { useLocation } from "react-router-dom";

const SidebarNav = styled.nav`
  max-width: 268px;
  width: 100%;
  display: flex;
  flex-flow: column;
  border-right: solid 1px #e7e7e7;
  padding: 0 32px 0 32px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  list-style: none !important;
  margin-top: 40px;
  height: 25px;
  text-decoration: none !important;
  font: 500 14px/24px var(--root-font);
  &:hover {
    color: #49494a;
    cursor: pointer;
  }
`;

const SidebarTitle = styled.span`
  color: ${(props) => (props.selected ? "#FC223B" : "#49494a")};
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #49494a;
  font: 400 14px/24px var(--root-font);
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "")};

  &:hover {
    color: #49494a;
    cursor: pointer;
  }
`;

const TitleIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SubMenuArrow = styled.img`
  visibility: ${(props) => (props.item ? "visible" : "hidden")};
  transition: ${(props) =>
    props.item && props.menuActive ? "all 0.2s ease" : "all 0.2s ease"};
  transform: ${(props) =>
    props.item && props.menuActive ? "rotate(90deg)" : "rotate(0deg)"};
  margin-left: auto;
`;

const Sidebar = () => {
  return (
    <SidebarNav>
      {SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
    </SidebarNav>
  );
};
const SubMenu = ({ item }) => {
  const [menuActive, setMenuActive] = useState(false);
  const showMenu = () => setMenuActive(!menuActive);
  const { pathname } = useLocation();

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showMenu}>
        {pathname === item.path ||
        (item.title === stringConstants.REWARD_PROGRAM &&
          pathname.split("/")[1] === "reward-program") ||
        menuActive ? (
          <TitleIcon src={item.iconSelected} alt="icon" />
        ) : (
          <TitleIcon src={item.icon} alt="icon" />
        )}
        <SidebarTitle
          selected={
            pathname === item.path ||
            (item.title === stringConstants.REWARD_PROGRAM &&
              pathname.split("/")[1] === "reward-program") ||
            (item.title === stringConstants.TRANSACTIONS &&
              pathname.split("/")[1] === "transactions") ||
            menuActive
          }
        >
          {item.title}
        </SidebarTitle>
        <SubMenuArrow
          src="/images/right-arrow.svg"
          item={item.subNav}
          menuActive={menuActive}
          alt="right-arrow"
        />
      </SidebarLink>
      {menuActive &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} marginTop="27px">
              <SidebarTitle selected={pathname === item.path}>
                {item.title}
              </SidebarTitle>
            </DropdownLink>
          );
        })}
    </>
  );
};
export default Sidebar;
