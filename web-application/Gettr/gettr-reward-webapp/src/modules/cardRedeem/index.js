import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  HeadingContainer,
  MainContainer,
} from "../../common/components/components";
import ButtonComponent from "../../common/components/button";
import CustomAmount from "../../common/popups/customAmount";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 30px;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 40px;
  width: 526px;
  height: 192px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  div {
    justify-content: flex-end;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    img {
      width: 40%;
      height: 54%;
    }
    h1 {
      font: normal 600 20px/22px "Roboto" !important;
      color: #50555c;
      text-align: center;
      margin-bottom: 20px !important;
    }
  }
`;
const MoneyList = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 15px;
`;
const MoneyButton = styled.button`
  height: 30px;
  border: 1px solid #eaeaea;
  background: ${(props) => (props.active ? " #1A1A1A" : "#F9F9F9")};
  border-radius: 32px;
  font: normal 500 12px/16px "Roboto" !important;
  color: ${(props) => (props.active ? " #FAFAFA" : "#1A1A1A")};
  padding: 0 24px;
`;
const SelectionDiv = styled.div`
  max-width: 526px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RedeemDiv = styled.div`
  width: 100%;
  > div {
    margin-left: 90px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
  h1 {
    font: normal 700 16px/22px "Roboto";
    color: #50555c;
    margin-bottom: 0px !important;
  }
  h2 {
    font: normal 500 18px/22px "Roboto";
    margin-bottom: 0px !important;
    text-align: center;
    margin-top: 60px;
    color: #898a8d;
  }
  h3 {
    font: normal 400 17px/22px "Roboto";
    text-align: center;
    margin-bottom: 0px !important;
    color: #898a8d;
  }
  input {
    width: 396px;
    border: none;
    margin-top: 20px;
    background-color: transparent;
    cursor: pointer;
    border-bottom: 1px solid #dadada;
    &:focus {
      outline: none;
      border-bottom: 1px solid #52a5ff;
    }
    &:-webkit-autofill {
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
`;

const CardRedeem = (props) => {
  const selectCard = () => {
    history.push("/select-gift-card");
  };
  const { history } = props;
  const { state } = history.location;
  const { item } = state;

  const [moneySelect, setMoneySelect] = useState("20");

  const [inputFields, setInputFields] = useState({
    to: "",
    message: "",
    isBtnDisable: true,
  });
  useEffect(() => {
    if (inputFields.to.length > 0) {
      setInputFields((pre) => ({
        ...pre,
        isBtnDisable: false,
      }));
    } else {
      setInputFields((pre) => ({
        ...pre,
        isBtnDisable: true,
      }));
    }
  }, [inputFields.to]);

  const [customMoneyModal, setCustomMoneyModal] = useState(false);

  return (
    <MainContainer>
      <HeadingContainer>
        <img onClick={selectCard} src="/images/backArrow.svg" alt="backIcon" />
        <p>Redeem</p>
      </HeadingContainer>
      <CardContainer>
        <CardDiv color={item.backgroundColor}>
          <div>
            <img src={item.image} />
            <h1>{item.type}</h1>
          </div>
        </CardDiv>
        <SelectionDiv>
          <MoneyList>
            <MoneyButton
              active={moneySelect === "20"}
              onClick={() => setMoneySelect("20")}
            >
              $20
            </MoneyButton>
            <MoneyButton
              active={moneySelect === "50"}
              onClick={() => setMoneySelect("50")}
            >
              $50
            </MoneyButton>
            <MoneyButton
              active={moneySelect === "100"}
              onClick={() => setMoneySelect("100")}
            >
              $100
            </MoneyButton>
            <MoneyButton
              active={moneySelect === "custom"}
              onClick={() => {
                setMoneySelect("custom");
                setCustomMoneyModal(true);
              }}
            >
              Custom
            </MoneyButton>
          </MoneyList>
          <RedeemDiv>
            <div>
              <h1>To (Required)</h1>
              <input
                onChange={(e) => {
                  setInputFields((pre) => ({ ...pre, to: e.target.value }));
                }}
                placeholder="Enter recipient email address"
                type="text"
                value={inputFields.to}
              />
            </div>
            <div>
              <h1>Message (Optional)</h1>
              <input
                onChange={(e) => {
                  setInputFields((pre) => ({
                    ...pre,
                    message: e.target.value,
                  }));
                }}
                type="text"
                placeholder="Add a message"
                value={inputFields.message}
              />
              <h2>Available reward : 155 GTR</h2>
              <h3>USD 260.00</h3>
              <ButtonComponent
                maxWidth={396}
                type="submit"
                opacity={inputFields.isBtnDisable ? "0.3" : "0"}
                disabled={inputFields.isBtnDisable}
              >
                Redeem Now
              </ButtonComponent>
            </div>
          </RedeemDiv>
        </SelectionDiv>
      </CardContainer>
      {customMoneyModal && (
        <CustomAmount setCustomMoneyModal={setCustomMoneyModal} />
      )}
    </MainContainer>
  );
};

export default CardRedeem;
