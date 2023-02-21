import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import SearchComponent from "../../common/components/searchComponent";
import { Container } from "../../common/components/components";
import TypeDropDown from "../../common/dropDowns/type";
import AmountDropDown from "../../common/dropDowns/amount";
import FromToDropDown from "../../common/dropDowns/fromTo";
import TimeStampDropDown from "../../common/dropDowns/timeStamp";
import { TransactionService } from "../../services/index";
import Utils from "../../utility/index";
import { TransactionEvents } from "../../constants";
import { history } from "../../managers/history";
const poolCategories = [
  {
    category: "Reward Pool",
    amount: 10250,
  },
];

const Heading = styled.h1`
  color: #1e1e1e;
  font: 700 20px/22px var(--root-font);
`;

const CardContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const CardPool = styled.div`
  padding: 25px;
  max-width: 501px;
  width: 100%;
  height: 121px;
  border: 1px solid #e7e7e7;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  * {
    margin-bottom: 0;
  }
  & > div {
    color: #1e1e1e;
    display: flex;
    flex-direction: column;
    gap: 11px;
    & > h3 {
      font: 500 14px/22px var(--root-font);
    }
    & > p {
      font: 700 30px/22px var(--root-font);
      & > span {
        font: 400 25px/22px var(--root-font);
      }
    }
    & > button {
      font: 600 14px/22px var(--root-font);
      width: 180px;
      height: 30px;
      border-radius: 50px;
      background: transparent;
      color: #fc223b;
      border: 1px solid #fc223b;
      &:first-of-type {
        background-color: #fc223b;
        color: #ffffff;
        border: none;
      }
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 11px;
  justify-content: space-between;
`;

const Filter = styled.div`
  padding: 0 20px;
  width: 120px;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  > span {
    font: 400 14px/22px var(--root-font);
    color: #000000;
    &:last-of-type {
      font: 700 14px/22px var(--root-font);
    }
  }
  > img {
    width: 24px;
    height: 24px;
    &:last-of-type {
      margin-left: auto;
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
  }
`;

const TableBlock = styled.table`
  width: 100%;
  max-width: 1552px;
  margin-top: 13px;
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

const ColorHigh = styled.div`
  background-color: ${(props) => props.typeHex};
  width: 110px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const typeColor = {
  Redeem: "#FDF3D0",
  Reward: "#98E4BF6B",
  Swap: "#71B5FD47",
};

const RangeContainer = styled.section`
  position: relative;
`;

function PoolComponent() {
  const keyColors = Object.keys(typeColor);
  const [filter, setFilter] = useState("");
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    getTransaction();
  }, []);
  async function getTransaction() {
    let limit = 10;
    let skip = 0;
    let [error, data] = await Utils.parseResponse(
      TransactionService.getTransactions(limit, skip, {
        event: `${TransactionEvents.REWARD},${TransactionEvents.REDEEM},${TransactionEvents.ADD_TO_POOL},${TransactionEvents.WITHDRAW_FROM_POOL}`,
      })
    );
    if (error || !data) {
      setTransaction([]);
    } else {
      setTransaction(data.data);
    }
  }
  return (
    <Container onClick={() => setFilter("")}>
      <Heading>Pool</Heading>
      <CardContainer>
        {poolCategories.map((item, index) => (
          <CardPool key={index}>
            <div>
              <h3>{item.category}</h3>
              <p>
                {item.amount.toLocaleString("en-US")} <span>GTR</span>
              </p>
            </div>
            <div>
              <button>Add</button>
              <button>Withdraw</button>
            </div>
          </CardPool>
        ))}
      </CardContainer>
      <Heading>Transactions</Heading>
      <FilterContainer>
        <SearchComponent />
        <Filter>
          <span>Filter :</span>
          <span>ALL</span>
        </Filter>
      </FilterContainer>
      <RangeContainer>
        <TableBlock>
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
            </tr>
          </TableHeader>
          <TableBody>
            {transaction.map((item, index) => (
              <tr
                key={index}
                onClick={() => history.push(`transactions/${item._id}`)}
              >
                <td>{Utils.shortenString(item.transactionId, 16) || "N/A"}</td>
                <td>{item.event || "N/A"}</td>
                <td>
                  {item.amount || "N/A"} {item.currency}
                </td>
                <td>
                  {keyColors.includes(item.event) ? (
                    <ColorHigh typeHex={typeColor[item.event]}>
                      {Utils.shortenString(item.sender, 12) || "N/A"}
                    </ColorHigh>
                  ) : (
                    Utils.shortenString(item.sender, 12) || "N/A"
                  )}
                </td>
                <td>{Utils.shortenString(item.receiver, 12) || "N/A"}</td>
                <td>{moment(item.addedOn).startOf("second").fromNow()}</td>
              </tr>
            ))}
          </TableBody>
        </TableBlock>
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

export default PoolComponent;
