import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonComponent from "../components/button";

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 2;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
`;
const PopupDiv = styled.div`
  margin: 83px auto;
  max-width: 460px;
  width: 100%;
  height: 399px;
  background: #ffffff;
  border-radius: 19px;
  border-bottom: 1px solid #eaeaea;
`;
const HeadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;

  h1 {
    font: normal 700 16px/22px "Roboto";
    color: #1e1e1e;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
const InputDiv = styled.div`
  padding: 0 25px;
  width: 100%;
  div {
    gap: 15px;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font: normal 700 16px/22px "Roboto";
    color: #50555c;
    margin-bottom: 0px !important;
  }
  p {
    font: normal 400 16px/22px "Roboto";
    margin-bottom: 0px !important;
    color: #cccccc;
  }
  h2 {
    font: normal 500 18px/22px "Roboto";
    margin-bottom: 0px !important;
    text-align: center;
    margin-top: 40px;
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

const CustomAmount = ({ setCustomMoneyModal }) => {
  const [inputFields, setInputFields] = useState({
    amount: "",
    isBtnDisable: true,
  });
  useEffect(() => {
    if (inputFields.amount.length > 0) {
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
  }, [inputFields.amount]);

  return (
    <Container>
      <PopupDiv>
        <HeadingDiv>
          <h1>Enter Gift Card Amount</h1>
          <img
            onClick={() => {
              setCustomMoneyModal(false);
            }}
            src="/images/closeIcon.svg"
          />
        </HeadingDiv>
        <InputDiv>
          <div>
            <h1>Amount (Required)</h1>
            <input
              onChange={(e) => {
                setInputFields((pre) => ({ ...pre, amount: e.target.value }));
              }}
              placeholder="Enter Amount"
              type="text"
              value={inputFields.amount}
            />
            <p>Enter amount in multiplication of 5. e.g. 210, 320 etc</p>
            <h2>Available reward : 155 GTR</h2>
            <h3>USD 260.00</h3>
            <ButtonComponent
              maxWidth={415}
              type="submit"
              opacity={inputFields.isBtnDisable ? "0.3" : "0"}
              disabled={inputFields.isBtnDisable}
            >
              Redeem Now
            </ButtonComponent>
          </div>
        </InputDiv>
      </PopupDiv>
    </Container>
  );
};

export default CustomAmount;
