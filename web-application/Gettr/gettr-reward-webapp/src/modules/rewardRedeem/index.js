import React, { useState, useEffect } from "react";
import {
  HeadingContainer,
  MainContainer,
} from "../../common/components/components";
import ButtonComponent from "../../common/components/button";
import styled from "styled-components";

const PasscodeDiv = styled.div`
  width: 100%;
  max-width: 600px;
  > div {
    margin-left: 90px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
  h1 {
    font: normal 700 16px/22px "Roboto";
    color: #50555c;
    margin-bottom: 0px !important;
  }
  input {
    margin-bottom: 30px;
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

const RewardRedeem = () => {
  const [inputFields, setInputFields] = useState({
    phrase: "",
    isBtnDisable: true,
  });
  useEffect(() => {
    if (inputFields.phrase.length > 0) {
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
  }, [inputFields.phrase]);
  return (
    <MainContainer>
      <HeadingContainer>
        <img src="/images/backArrow.svg" alt="backIcon" />
        <p>Passcode Required</p>
      </HeadingContainer>
      <PasscodeDiv>
        <div>
          <h1>Enter Passcode</h1>
          <input
            onChange={(e) => {
              setInputFields((pre) => ({ ...pre, phrase: e.target.value }));
            }}
            type="text"
            value={inputFields.phrase}
          />
          <ButtonComponent
            maxWidth={396}
            type="submit"
            opacity={inputFields.isBtnDisable ? "0.3" : "0"}
            disabled={inputFields.isBtnDisable}
          >
            Redeem Now
          </ButtonComponent>
        </div>
      </PasscodeDiv>
    </MainContainer>
  );
};

export default RewardRedeem;
