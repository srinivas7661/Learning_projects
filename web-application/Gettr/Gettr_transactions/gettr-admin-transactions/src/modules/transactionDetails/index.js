import React, { useState } from "react";
import styled from "styled-components";

const DetailsContainer = styled.div`
  width: 763px;
  height: 421px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    div {
      display: flex;
      font: normal 700 14px/22px "Roboto";
      h1 {
        width: 25%;
      }

      h2 {
        font: normal 400 14px/22px "Roboto";
        gap: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #03bd64;
        margin-bottom: 0px !important;
        background-color: #03bd6424;
        width: 100px;
        height: 24px;
      }
      p {
        font-weight: 400;
        img {
          margin-left: 10px;
        }
        span {
          color: #298fff;
        }
      }
    }
  }
  h1 {
    font: normal 700 14px/22px "Roboto";
    color: #50555c;
  }
`;
const FromDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  border-top: 1px solid #e7e7e7;
  padding-top: 20px;
  span {
    color: ${(props) =>
      props.color ? `${props.color} !important` : "#298fff"};
  }
`;

const TransactionDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
const ButtonContainer = styled.button`
  margin-top: 33px;
  width: 585px;
  height: 50px;
  background: #fc223b;
  border-radius: 10px;
  border: none;
  font: normal 600 16px/22px "Roboto";
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    gap: 15px;
    p {
      margin-bottom: 0px !important;
    }
  }
`;

export default function TransactionDetails({ setVerifyModal, setFreezeModal }) {
  return (
    <>
      <DetailsContainer>
        <TransactionDiv>
          <div>
            <h1>Transaction Hash:</h1>
            <p>
              <span>
                0x8abe81fb9d2fdca5b502fcc820f4283a76957a4f872b5fc4f3f2c9d3aabd5ff8
              </span>
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
          <div>
            <h1>Status:</h1>

            <h2>
              <img src="/images/greenTick.svg" alt="S" />
              Success
            </h2>
          </div>
          <div>
            <h1>Type:</h1>
            <p>Transfer</p>
          </div>
          <div>
            <h1>Time Stamp:</h1>
            <p>9 mins ago (Nov-07-2022 12:46:23 PM +UTC)</p>
          </div>
        </TransactionDiv>
        <FromDiv>
          <div>
            <h1>From:</h1>
            <p>
              @john_appleseed(<span>0x66754fc8ebcbd585ef9</span>)
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
          <div>
            <h1>To:</h1>
            <p>
              @john_appleseed(
              <span>0x66754fc8egr5fge46g4re</span>)
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
        </FromDiv>
        <FromDiv color="#000000">
          <div>
            <h1>Amount:</h1>
            <p>
              10 <span>GTR</span>
            </p>
          </div>
        </FromDiv>
      </DetailsContainer>
      <ButtonContainer
        onClick={() => {
          setFreezeModal(true);
        }}
      >
        <div>
          <img src="/images/freezeUser.svg" alg="userIcon" />
          <p>Freeze User</p>
        </div>
      </ButtonContainer>
    </>
  );
}
