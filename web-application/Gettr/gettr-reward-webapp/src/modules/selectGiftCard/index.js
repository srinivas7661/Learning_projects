import React, { useState, useEffect } from "react";
import {
  HeadingContainer,
  MainContainer,
} from "../../common/components/components";
import styled from "styled-components";
import { history } from "../../managers/history";
import { RewardsService } from "../../services";

const CategoryList = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 15px;
`;
const TabButton = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #eaeaea;
  background: ${(props) => (props.active ? " #1A1A1A" : "#F9F9F9")};
  border-radius: 32px;
  font: normal 500 12px/16px "Roboto" !important;
  color: ${(props) => (props.active ? " #FAFAFA" : "#1A1A1A")};
`;
const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 40px;
`;
const CardDiv = styled.div`
  cursor: pointer;
  position: relative;
  width: 190px;
  height: 192px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  pointer-events: ${(props) => (props.isClickable ? "auto" : "none")};
  &::before {
    position: absolute;
    inset: 0;
    content: "";
    background-color: #e8e8e8;
    opacity: ${(props) => (props.isClickable ? 0 : 0.8)};
    filter: contrast(0.2);
    border-radius: 10px;
  }
  div {
    justify-content: space-around;
    height: 60%;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font: 600 16px/22px var(--font-roboto);
    color: ${(props) => props.text};
    margin-bottom: 25px !important;
    text-align: center;
  }
`;

const categoryType = {
  all: "ALL",
  fashion: "Fashion",
  electronics: "Electronics",
  household: "Household",
};

const SelectGiftCard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [redeemList, setRedeemList] = useState([]);
  useEffect(() => {
    (async () => {
      const requestObject = {
        category: categoryType[activeTab],
      };
      const response = await RewardsService.getRedeemGifts(requestObject);
      const { data } = response;
      setRedeemList(data);
    })();
  }, [activeTab]);
  const redirect = (item) => {
    history.push({
      pathname: `/select-gift-card/${item.name}`,
      state: { item },
    });
  };
  return (
    <MainContainer>
      <HeadingContainer>
        <img
          onClick={() => history.push("/")}
          src="/images/backArrow.svg"
          alt="arrow"
        />
        <p>Select Gift Card</p>
      </HeadingContainer>
      <CategoryList>
        <TabButton
          active={activeTab === "all"}
          id="all"
          onClick={() => setActiveTab("all")}
        >
          All Gift Cards
        </TabButton>
        <TabButton
          active={activeTab === "fashion"}
          id="fashion"
          onClick={() => setActiveTab("fashion")}
        >
          Fashion
        </TabButton>
        <TabButton
          active={activeTab === "electronics"}
          id="electronics"
          onClick={() => setActiveTab("electronics")}
        >
          Electronics
        </TabButton>
        <TabButton
          active={activeTab === "household"}
          id="household"
          onClick={() => setActiveTab("household")}
        >
          Household
        </TabButton>
      </CategoryList>
      <CategoryContent>
        {redeemList.length ? (
          redeemList.map((item) => {
            return (
              <CardDiv
                isClickable={item.isActive}
                onClick={() => redirect(item)}
                color={item.backgroundColor}
                text={item.textColor}
              >
                <div>
                  <img
                    src={item.picture}
                    alt={item.picture.slice(0, 3) || "N/A"}
                  />
                  <h1>{item.type}</h1>
                </div>
              </CardDiv>
            );
          })
        ) : (
          <p>No Data Found</p>
        )}
      </CategoryContent>
    </MainContainer>
  );
};

export default SelectGiftCard;
