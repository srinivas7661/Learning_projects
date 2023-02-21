import React from "react";
import styled from "styled-components";
import moment from "moment";
import { transactionsList } from "../../constants";
import { history } from "../../managers/history";

const Table = styled.table`
  border-spacing: 40px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 13px;
  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      th {
        padding: 15px;
        font: normal 700 14px/22px var(--root-font);
        letter-spacing: -0.408px;
        color: #50555c;
        img {
          margin-left: 15px;
          cursor: pointer;
        }
      }
      td {
        padding: 15px;
        font: normal 400 14px/22px var(--root-font);
        color: #000000;
      }
    }
  }
`;
const TableHeader = styled.thead`
  > tr {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    padding-bottom: 20px;
    & > th,
    td {
      width: 25%;
      &:not(:nth-child(1)) {
        width: 15%;
      }
    }
    & > th {
      color: #50555c;
      font: 700 14px/22px var(--root-font);
      > img {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    & > td {
      font: 400 14px/22px var(--root-font);
      color: #000000;
    }
  }
`;

const TableBody = styled(TableHeader)`
  > tr {
    position: relative;
    padding: 20px 0;
    & > td:first-child {
      color: #298fff;
    }
    &:last-child {
      border-bottom: none;
    }
    & > span {
      width: 10%;
    }
  }
`;
const FunctionalityDiv2 = styled.div`
  display: flex;
  width: 98.5%;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  position: absolute;
  padding: 16px 0px 16px 0px;
`;
const LeftFunctionDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  column-gap: 20px;
`;
const FirstorLastButton = styled.button`
  color: ${(props) => (props.background ? "#000000" : "#FFFFFF")};
  width: 76px;
  height: ${(props) => (props.background ? "30px" : "50px")};
  border-radius: ${(props) => (props.background ? "4px" : "6px")};
  background: ${(props) => (props.background ? props.background : "#161616")};
  border: ${(props) => (props.background ? "none" : "1px solid #414141")}; ;
`;

const RightFunctionDiv = styled.div`
  display: flex;
  width: 50%;
  height: 100%;

  column-gap: 7px;
  flex-direction: row;
  justify-content: flex-end;
`;

const RightorLeftArrowBlack = styled.button`
  color: #000000;
  width: 37px;
  height: 30px;
  border-radius: 4px;
  background: #dadada;
  border: none;
`;
const PageStatus = styled.button`
  color: ${(props) => (props.background ? "#000000" : "#FFFFFF")};
  width: 122px;
  height: ${(props) => (props.background ? "30px" : "50px")};
  border-radius: ${(props) => (props.background ? "4px" : "6px")};
  background: ${(props) => (props.background ? props.background : "#161616")};
  border: ${(props) => (props.background ? "none" : "1px solid #414141")};
`;
const SelectNo = styled.div`
  width: 56px;
  height: 30px;
  border: 1px solid #dadada;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
`;
const NoofTransactions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  font: normal 500 14px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #50555c;
`;
const Status = styled.div`
  font: normal 400 14px/22px var(--root-font);
  color: ${(props) =>
    props.status === "PENDING"
      ? "#FFA629"
      : props.status === "APPROVED"
      ? "#03bd64"
      : "#FC223B"};
  padding: 0 10px 0 6px;
`;

const TableContainer = styled.div`
  padding: 20px 0 0 20px;
  width: 100%;
  height: 100%;
`;

export default function ProposalList() {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <th>Transaction Hash</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </TableHeader>
        <TableBody>
          {transactionsList &&
            transactionsList?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() =>
                    history.push(`/dashboard/transaction-details/${item._id}`)
                  }
                >
                  <td>{item.transactionId}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.amount}&nbsp; {item.currency}
                  </td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{moment(item.timeStamp).startOf("second").fromNow()}</td>
                  <td>
                    <Status status={item.status}>{item?.status}</Status>
                  </td>
                </tr>
              );
            })}
        </TableBody>
      </Table>
      <FunctionalityDiv2>
        <LeftFunctionDiv>
          <NoofTransactions>
            <div>Show</div>
            <SelectNo>
              25
              <div>
                <img src="/images/uparrow.svg" alt="/" />
                <img src="/images/downarrow.svg" alt="/" />
              </div>
            </SelectNo>
            <div>Transactions</div>
          </NoofTransactions>
        </LeftFunctionDiv>
        <RightFunctionDiv>
          <FirstorLastButton background={"#DADADA"}>First</FirstorLastButton>
          <RightorLeftArrowBlack>
            <img src="/images/leftarrowblack.svg" alt="/" />
          </RightorLeftArrowBlack>
          <PageStatus background={"#DADADA"}>Page 1 of 40</PageStatus>
          <RightorLeftArrowBlack>
            <img src="/images/rightarrowblack.svg" alt="/" />
          </RightorLeftArrowBlack>
          <FirstorLastButton background={"#DADADA"}>Last</FirstorLastButton>
        </RightFunctionDiv>
      </FunctionalityDiv2>
    </TableContainer>
  );
}
