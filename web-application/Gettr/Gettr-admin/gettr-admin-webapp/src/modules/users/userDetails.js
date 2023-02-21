import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  BackIconContainer,
} from "../../common/components/components";
import FilterDropDown from "../../common/components/filterDropdown";
import moment from "moment";
import SearchBar from "../../common/components/searchBar";
import { history } from "../../managers/history";
import { useParams } from "react-router";
import { useEffect } from "react";
import { TransactionService } from "../../services";
import utility from "../../utility";
import { TransactionEvents } from "../../constants";

const apiData = {
  userName: "Alexa Appleseed",
  GTRaddress: "@alexa231",
  ADRaddress: "0x4dee994c2e373f..",
  walletCreatedOn: "19/06/2022",
  location: "NA",
  KYCStatus: "YES",
};

const ActiveConnectedWallets = [
  {
    walletAddress: "0xb84915ve430be93fx4d8159",
    createdOn: "03/11/2022",
    balance: "128 ADR",
  },
  {
    walletAddress: "0xb84915ve430be93fx4d8159",
    createdOn: "03/11/2022",
    balance: "128 ADR",
  },
];

const entries = [
  {
    Name: "Made a comment",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "No",
  },
  {
    Name: "Liked a Post",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "Yes",
  },
  {
    Name: "Created a post",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "No",
  },
  {
    Name: "Shared a Post",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "Yes",
  },
  {
    Name: "Made a comment",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "Yes",
  },
  {
    Name: "Made a comment",
    date: "03/11/2022",
    timeSlot: "12 PM - 2 PM",
    reward: "No",
  },
];

const DetailsContainer = styled.div`
  height: 185px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  /* justify-content: start; */
  align-items: center;
  /* justify-content: space-around; */
`;
const ImageContainer = styled.p`
  border-radius: 60%;
  border: 2px solid #eaeaea;
  margin: auto 0 auto 0;
  height: 121px;
  width: 121px;
  overflow: hidden;
  margin-left: 10px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  span {
    justify-content: space-around;
    display: flex;
    width: 80%;
  }
  div {
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    flex-flow: column wrap;
    gap: 18px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: start;
      div {
        font: normal 600 14px/22px var(--root-font);
        align-items: center;
        color: #50555c;
        margin-bottom: 0px;
      }
      p {
        font: normal 400 14px/22px var(--root-font);
        margin-bottom: 0px;
        text-align: left;
        color: #000000;
      }
    }
  }
`;
const WalletDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      display: flex;
      gap: 14px;
      div {
        font: normal 600 14px/22px var(--root-font);
        color: #50555c;
      }
      p {
        font: normal 700 24px/22px var(--root-font);
        color: #000000;
        margin-bottom: 0px;
        span {
          font: normal 400 14px/22px var(--root-font);
          color: #000000;
        }
      }
    }
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const VerticalLine = styled.hr`
  height: 165px;
  border: 1px solid #e7e7e7;
  border-radius: 1px;
  transform: rotate(-180deg);
  margin: 0;
`;
const UserStatus = styled.div`
  width: 95px;
  height: 30px;
  background: #50555c;
  border-radius: 6px;
  font: normal 400 14px/22px var(--root-font);
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  div {
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background: #03bd64;
  }
`;
const TabSwitchContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  border-bottom: 1px solid;
  border-color: #dadada;
  gap: 16px;
`;
const EachTab = styled.button`
  width: 140px;
  height: 100%;
  background: transparent;
  border: none;
  border-bottom: ${(props) => (props.activeTab ? "4px solid" : "0px solid")};
  border-color: ${(props) => (props.activeTab ? "#FC223B" : "#DADADA")};
  font: ${(props) =>
    props.activeTab
      ? `700 14px/22px  var(--root-font)`
      : `400 14px/22px  var(--root-font)`};
  color: #1e1e1e;
  text-align: left;
`;
const FilterContainer = styled.div`
  display: flex;
  gap: 11px;
`;
const TableBlock = styled.table`
  width: 100%;
  max-width: 1552px;
  margin-top: 13px;
  margin-bottom: ${(props) => props.marginBottom};
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
        margin-left: 16px;
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
      color: ${(props) => props.color};
    }
    &:last-child {
      border-bottom: none;
    }
    & > span {
      width: 10%;
    }
  }
`;

const ColorHigh = styled.p`
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

export default function UserDetails() {
  const [activeTab, setActiveTab] = useState({
    transactions: true,
    entries: false,
    rewards: false,
    connectedWallets: false,
  });
  const [transactionList, setTransactionList] = useState([]);
  const [rewardsList, setRewardsList] = useState([]);
  const keyColors = Object.keys(typeColor);
  const { id } = useParams();
  const userId = "gettrId10" || id;
  let limit = 10;
  let skip = 0;
  const getRewardTransactions = async () => {
    const [error, response] = await utility.parseResponse(
      TransactionService.getTransactions(limit, skip, {
        userId,
        event: `${TransactionEvents.REWARD},${TransactionEvents.REDEEM}`,
      })
    );
    if (error || !response || !response.data) {
      setRewardsList([]);
      return;
    }
    setRewardsList(response?.data);
  };
  useEffect(() => {
    (async () => {
      const [error, response] = await utility.parseResponse(
        TransactionService.transactionsByUser(userId)
      );
      if (error || !response || !response.data) {
        setTransactionList([]);
        return;
      }
      const { data } = response;
      setTransactionList(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);


  return (
    <Container>
      <Header>
        <BackIconContainer>
          <img
            onClick={() => history.goBack()}
            src="/images/exit.svg"
            alt="exit"
          />
          <p>User Details</p>
        </BackIconContainer>
        <UserStatus>
          <div></div>
          ACTIVE
        </UserStatus>
      </Header>
      <DetailsContainer>
        <UserInfo>
          <ImageContainer>
            <img
              src={
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              }
              alt="avatar-from"
              height={121}
              width={121}
            />
          </ImageContainer>
          <span>
            <div>
              <div>
                <div>User Name :</div>
                <p>{apiData.userName}</p>
              </div>
              <div>
                <div>GTR address :</div>
                <p>{apiData.gettrId}</p>
              </div>
              <div>
                <div>ADR address :</div>
                <p>{apiData.adrPublicKey}</p>
              </div>
              <div>
                <div>Wallet created on :</div>
                <p>{apiData.walletCreatedOn}</p>
              </div>
            </div>
            <div>
              <div>
                <div>Location :</div>
                <p>{apiData.location}</p>
              </div>
              <div>
                <div>KYC Status :</div>
                <p>{apiData.KYCStatus}</p>
              </div>
            </div>
          </span>
        </UserInfo>
        <VerticalLine></VerticalLine>
        <WalletDetails>
          <div>
            <div>
              <div>GTR Balance</div>
              <p>
                220
                <span> GTR</span>
              </p>
            </div>
            <div>
              <div>ADR Balance</div>
              <p>
                220
                <span> ADR</span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>Total Entries</div>
              <p>220</p>
            </div>
            <div>
              <div>Total Reward won</div>
              <p>
                220
                <span> GTR</span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>Total Transactions</div>
              <p>220</p>
            </div>

            <div>
              <div>Ranking on leaderboard</div>
              <p>220</p>
            </div>
          </div>
        </WalletDetails>
      </DetailsContainer>
      <TabSwitchContainer>
        <EachTab
          activeTab={activeTab.transactions}
          onClick={() => {
            setActiveTab({
              transactions: true,
              entries: false,
              rewards: false,
              connectedWallets: false,
            });
          }}
        >
          Transactions
        </EachTab>
        <EachTab
          activeTab={activeTab.entries}
          onClick={() => {
            setActiveTab({
              transactions: false,
              entries: true,
              rewards: false,
              connectedWallets: false,
            });
          }}
        >
          Entries
        </EachTab>
        <EachTab
          activeTab={activeTab.rewards}
          onClick={() => {
            setActiveTab({
              transactions: false,
              entries: false,
              rewards: true,
              connectedWallets: false,
            });
            getRewardTransactions();
          }}
        >
          Rewards
        </EachTab>
        <EachTab
          activeTab={activeTab.connectedWallets}
          onClick={() => {
            setActiveTab({
              transactions: false,
              entries: false,
              rewards: false,
              connectedWallets: true,
            });
          }}
        >
          Connected Wallets
        </EachTab>
      </TabSwitchContainer>
      <FilterContainer>
        <SearchBar />
        <FilterDropDown />
      </FilterContainer>
      {activeTab.transactions ? (
        <TableBlock>
          <TableHeader>
            <tr>
              <th>Transaction Hash</th>
              <th>
                Transaction Type <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Amount <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                From <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                To <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Timestamp <img src="/images/filter.svg" alt="/" />
              </th>
            </tr>
          </TableHeader>
          <TableBody color={"#298fff"}>
            {transactionList.map((item, index) => (
              <tr key={index}>
                <td>{item.transactionId || "N/A"}</td>
                <td>{item.type || "N/A"}</td>
                <td>{item.amount || "N/A"}</td>
                <td>
                  {keyColors.includes(item.type) ? (
                    <ColorHigh typeHex={typeColor[item.type]}>
                      {item.sender || "N/A"}
                    </ColorHigh>
                  ) : (
                    item.sender || "N/A"
                  )}
                </td>
                <td>{item.receiver || "N/A"}</td>
                <td>{moment(item.addedOn).fromNow()}</td>
              </tr>
            ))}
          </TableBody>
        </TableBlock>
      ) : (
        <></>
      )}
      {activeTab.entries ? (
        <TableBlock>
          <TableHeader>
            <tr>
              <th>
                Activity <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Date <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Time <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Reward <img src="/images/filter.svg" alt="/" />
              </th>
            </tr>
          </TableHeader>
          <TableBody color={"#000000"}>
            {entries.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.date}</td>
                <td>{item.timeSlot}</td>
                <td>{item.reward}</td>
              </tr>
            ))}
          </TableBody>
        </TableBlock>
      ) : (
        <></>
      )}
      {activeTab.rewards ? (
        <TableBlock>
          <TableHeader>
            <tr>
              <th>
                Transaction Hash <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Entry ID <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Date <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Time <img src="/images/filter.svg" alt="/" />
              </th>
              <th>
                Amount <img src="/images/filter.svg" alt="/" />
              </th>
            </tr>
          </TableHeader>
          <TableBody color={"#298fff"}>
            {rewardsList.map((item, index) => (
              <tr key={index}>
                <td>
                  {utility.shortenString(item.transactionId, 12) || "N/A"}
                </td>
                <td>{item?.entryId || "N/A"}</td>
                <td>{moment(item.addedOn).format("L")}</td>
                <td>{moment(item.addedOn).format("LT")}</td>
                <td>{item.amount || "N/A"}</td>
              </tr>
            ))}
          </TableBody>
        </TableBlock>
      ) : (
        <></>
      )}
      {activeTab.connectedWallets ? (
        <div>
          <TableBlock marginBottom="50px">
            <TableHeader>
              <tr>
                <th>Active Wallet Address </th>
                <th>Created On </th>
                <th>Balance </th>
              </tr>
            </TableHeader>
            <TableBody color={"#298fff"}>
              {ActiveConnectedWallets.map((item, index) => (
                <tr key={index}>
                  <td>{item.walletAddress}</td>
                  <td>{item.createdOn}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
            </TableBody>
          </TableBlock>
          <TableBlock>
            <TableHeader>
              <tr>
                <th>Inactive Wallet Address </th>
                <th>Created On </th>
                <th>Balance </th>
              </tr>
            </TableHeader>
            <TableBody color={"#000000"}>
              {ActiveConnectedWallets.map((item, index) => (
                <tr key={index}>
                  <td>{item.walletAddress}</td>
                  <td>{item.createdOn}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
            </TableBody>
          </TableBlock>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
