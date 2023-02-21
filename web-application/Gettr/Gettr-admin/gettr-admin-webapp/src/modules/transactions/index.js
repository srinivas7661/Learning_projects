import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchComponent from "../../common/searchComponent";
import FilterDropDown from "../../common/filterDropDown";
import { TransactionStatsTitle } from "../../constants";
import { TransactionService } from "../../services/index";
import { history } from "../../managers/history";
import {
  Card,
  Container,
  Heading,
  SearchAndFilter,
} from "../../common/components/components";
import Utils from "../../utility/index";
import TypeDropDown from "../../common/dropDowns/type";
import AmountDropDown from "../../common/dropDowns/amount";
import FromToDropDown from "../../common/dropDowns/fromTo";
import TimeStampDropDown from "../../common/dropDowns/timeStamp";
import moment from "moment";

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
const Thash = styled.td`
  color: #298fff !important;
`;
const Tfrom = styled.td`
  div {
    width: 116px;
    height: 22px;
    background-color: ${(props) => props.color};
    display: flex;
    justify-content: center;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const CardTitle = styled.div`
  font: normal 500 14px/22px var(--root-font);
  color: #50555c;
`;
const Value = styled.div`
  font: normal 700 30px/22px var(--root-font);
  letter-spacing: -0.408px;
  color: #1e1e1e;
  margin-top: 30px;
`;

const Status = styled.div`
  font: normal 400 14px/22px var(--root-font);
  color: ${(props) =>
    props.status === "PENDING"
      ? "#FFA629"
      : props.status === "SUCCESS"
      ? "#03bd64"
      : "#FC223B"};
  padding: 0 10px 0 6px;
  display: flex;
  max-width: 95px;
  align-items: center;
  gap: 6px;
  height: 24px;
  background: ${(props) =>
    props.status === "PENDING"
      ? "#FFEBCF"
      : props.status === "SUCCESS"
      ? "#03bd6424"
      : "#FFE0E4"};
  border-radius: 4px;
`;

const TableHeader = styled.thead`
  > tr {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    padding-bottom: 20px;
    & > th,
    td {
      width: 20%;
      &:not(:nth-child(1), :nth-child(2)) {
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

const RangeContainer = styled.section`
  position: relative;
`;

function TransactionsList() {
  const [filter, setFilter] = useState("");

  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    getTransaction();
  }, []);
  async function getTransaction() {
    let limit = 10;
    let skip = 0;
    let [error, data] = await Utils.parseResponse(
      TransactionService.getTransactions(limit, skip, {})
    );
    if (error || !data) {
      setTransaction([]);
    } else {
      setTransaction(data.data);
    }
  }

  const redirect = (details) => {
    history.push({
      pathname: `/transactions/${details._id}`,
      state: { details },
    });
  };

  let colorSwitch = (type) => {
    switch (type) {
      case "Reward":
        return "#98E4BF6B";
      case "Redeem":
        return "#FDF3D0";
      case "Swap":
        return "#71B5FD47";
      default:
        return "transparent";
    }
  };
  return (
    <Container onClick={() => setFilter("")}>
      <Heading>Transactions</Heading>
      <CardContainer>
        {TransactionStatsTitle.map((item, index) => (
          <Card key={index} maxWidth={"295px"} padding={"40px 35px"}>
            <CardTitle>{item}</CardTitle>
            <Value>{index}</Value>
          </Card>
        ))}
      </CardContainer>
      <SearchAndFilter>
        <SearchComponent />
        <FilterDropDown />
      </SearchAndFilter>
      <RangeContainer>
        <Table>
          <TableHeader>
            <tr>
              <th>Transaction Hash</th>
              <th>
                Transaction Type
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("type");
                  }}
                  src={`/images/${
                    filter === "type" ? "onFilter" : "filter"
                  }.svg`}
                  alt="filter"
                />
              </th>
              <th>
                Amount
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("amount");
                  }}
                  src={`/images/${
                    filter === "amount" ? "onFilter" : "filter"
                  }.svg`}
                  alt="filter"
                />
              </th>
              <th>
                From
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("from");
                  }}
                  src={`/images/${
                    filter === "from" ? "onFilter" : "filter"
                  }.svg`}
                  alt="filter"
                />
              </th>
              <th>
                To
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("to");
                  }}
                  src={`/images/${filter === "to" ? "onFilter" : "filter"}.svg`}
                  alt="filter"
                />
              </th>
              <th>
                Timestamp
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("time");
                  }}
                  src={`/images/${
                    filter === "time" ? "onFilter" : "filter"
                  }.svg`}
                  alt="filter"
                />
              </th>
              <th>
                Status
                <img src="/images/filter.svg" alt="filter" />
              </th>
            </tr>
          </TableHeader>
          <TableBody>
            {transaction?.map((item, index) => {
              return (
                <tr onClick={() => redirect(item)} key={index}>
                  <Thash>{item.transactionId}</Thash>
                  <td>{item.type}</td>
                  <td>
                    {item.amount} {item.currency}
                  </td>
                  <Tfrom color={colorSwitch(item.type)}>
                    <div>{item.sender.substring(0, 13).concat("...")}</div>
                  </Tfrom>
                  <td>{item.receiver.substring(0, 10).concat("...")}</td>
                  <td>{moment(item.addedOn).startOf("second").fromNow()}</td>
                  <td>
                    <Status status={item.status}>
                      <img
                        src={`/images/${item.status.toLowerCase()}.svg`}
                        alt={item.status}
                      />
                      {item?.status.slice(0, 1) +
                        item?.status
                          .slice(1, item?.status.lenght)
                          .toLowerCase()}
                    </Status>
                  </td>
                </tr>
              );
            })}
          </TableBody>
        </Table>
        {filter === "type" && <TypeDropDown close={setFilter} />}
        {filter === "amount" && <AmountDropDown close={setFilter} />}
        {(filter === "from" || filter === "to") && (
          <FromToDropDown id={filter} close={setFilter} />
        )}
        {filter === "time" && <TimeStampDropDown close={setFilter} />}
      </RangeContainer>
    </Container>
  );
}
export default TransactionsList;
