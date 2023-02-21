import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BackIconContainer,
  Container,
} from "../../common/components/components";
import { TransactionService } from "../../services/index";
import Utils from "../../utility/index";

const DetailsContainer = styled.div`
  width: 763px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    div {
      display: flex;
      font: normal 700 14px/22px var(--root-font);
      h1 {
        width: 25%;
      }
      h3 {
        font: normal 400 14px/22px var(--root-font);
        background-color: #ffdee2;
        color: #fc223b;
        width: 133px;
        height: 24px;
        margin-bottom: 0px !important;
        gap: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h2 {
        font: normal 400 14px/22px var(--root-font);
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
    font: normal 700 14px/22px var(--root-font);
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

const TransactionDetails = (props) => {
  const transactionId = window.location.href.split("/").pop();
  const [transactionDetails, setTransactionDetails] = useState({});
  const transaction = () => {
    history.push("/transactions");
  };
  async function GetTransaction() {
    let [error, data] = await Utils.parseResponse(
      TransactionService.getTransactionById(transactionId)
    );
    if (error || !data) {
      setTransactionDetails({});
    } else {
      setTransactionDetails(data);
    }
  }
  useEffect(() => {
    GetTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { history } = props;
  return (
    <Container>
      <BackIconContainer>
        <img onClick={transaction} src="/images/arrowLeft.svg" alt="left" />
        <p>Transaction Details</p>
      </BackIconContainer>
      <DetailsContainer>
        <TransactionDiv>
          <div>
            <h1>Transaction Hash:</h1>
            <p>
              <span>
                {transactionDetails?.transactionResponse?.result?.hash}
              </span>
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
          <div>
            <h1>Status:</h1>
            {transactionDetails?.status === "COMPLETED" ? (
              <h2>
                <img src="/images/greenTick.svg" alt="success" />
                {transactionDetails?.status}
              </h2>
            ) : (
              <h3>
                <img src="/images/pendingIcon.svg" alt="pending" />
                {transactionDetails?.status}
              </h3>
            )}
          </div>
          <div>
            <h1>Type:</h1>
            <p>{transactionDetails?.event}</p>
          </div>
          <div>
            <h1>Time Stamp:</h1>
            <p>{Utils.getTimeDifference(transactionDetails?.addedOn)}</p>
          </div>
        </TransactionDiv>
        <FromDiv>
          <div>
            <h1>From:</h1>
            <p>
              {transactionDetails?.sender}(<span>0x66754fc8egr5fge46g4re</span>)
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
          <div>
            <h1>To:</h1>
            <p>
              {transactionDetails?.receiver}(
              <span>0x66754fc8egr5fge46g4re</span>)
              <img src="/images/copyIcon.svg" alt="copy" />
            </p>
          </div>
        </FromDiv>
        <FromDiv color="#000000">
          <div>
            <h1>Amount:</h1>
            <p>
              {transactionDetails?.amount}{" "}
              <span>{transactionDetails?.token}</span>
            </p>
          </div>
        </FromDiv>
      </DetailsContainer>
    </Container>
  );
};

export default TransactionDetails;
