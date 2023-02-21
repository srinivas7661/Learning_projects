/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  gettrStatsRange,
  gettrPayStatsTables,
  rewardStatsTableList,
} from "../../constants/index";
import { Container } from "../../common/components/components";
import StatsGraph from "./statsGraph";
import { DashboardService } from "../../services";
import moment from "moment";
import utility from "../../utility";
import { history } from "../../managers/history";
import { RewardsService, TransactionService } from "../../services";

let gettrpayStatsData = [
  {
    title: "Total Transactions",
    value: 28500,
    key: "totalTransactions",
  },
  {
    title: "Wallets created",
    value: 5500,
    description: "total users : 77,132",
    key: "walletCreated",
  },
  {
    title: "Redemptions",
    value: "1334600 GTR",
    description: "1.21 M USD",
    key: "redemptions",
  },
  {
    title: "GTR Balance",
    value: 20034500,
    description: "2.24 M USD",
    key: "gtrBalance",
  },
];

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;
const StatsAndGraphContainer = styled.div`
  min-height: 450px;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 17px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin: 20px 0 20px 20px;
`;
const GraphContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin: 20px 20px 20px 0;
  width: 100%;
  div {
    font: normal 600 14px/22px var(--root-font);
    color: #50555c;
  }
`;
const TableAndPeriod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EachStat = styled.div`
  width: 350px;
  height: 100%;
  max-height: 190px;
  background: ${(props) =>
    props.container === "Active Slot" ? "#E5F8EF" : "#fafafa"};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &:first-of-type {
    cursor: pointer;
  }
  cursor: ${(props) => (props.container === "Entries" ? "pointer" : "normal")};
`;
const StatName = styled.div`
  font: normal 600 14px/22px var(--root-font);
  color: #50555c;
`;
const Value = styled.div`
  font: normal 700 30px/22px var(--root-font);
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;
const Description = styled.div`
  font: normal 400 16px/22px var(--root-font);
  letter-spacing: -0.408px;
  color: #898a8d;
`;
const SwitchTable = styled.div`
  height: 30px;
  background: #f0f2f5;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;
const EachTable = styled.button`
  border: none;
  background: ${(props) => (props.activeTable ? "#FFFFFF" : "transparent")};
  font: normal 500 12px/22px "Roboto";
  display: flex;
  align-items: center;
  border-radius: 4px;
  letter-spacing: -0.408px;
  height: 20px;
  color: #5b667c;
  margin: 5px 0 5px 0;
`;
const TimeslotDescription = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;
  p {
    margin-bottom: 0px;
  }
  div {
    display: flex;
    flex-direction: row !important;
    justify-content: flex-start;
  }
`;

const TimerContainer = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export default function Dashboard() {
  const [rewardStatsGraph, setRewardStatsGraph] = useState([]);
  const [rewardsStatsDateRange, setRewardsStatsDateRange] = useState("D1");
  const [transactionDateRange, setTransactionDateRange] = useState("D1");
  const [gettrPayStatsTable, setGettrPayStatsTable] = useState("Transactions");
  const [rewardStatsTable, setRewardStatsTable] = useState("Rewards");
  const [activeSlotData, setActiveSlotEntries] = useState("");
  const [activeSlot, setActiveSlot] = useState(utility.getCurrentSlot().slot);
  const [totalParticipantData, setTotalParticipantData] = useState("");
  const [totalEntriesData, setTotalEntriesData] = useState("");
  const [state, setState] = useState({
    rewards: 0,
    entries: 0,
    participants: 0,
    activeSlot: 0,
    walletCreated: {
      totalUser: 0,
      walletCreated: 0,
    },
    redemptions: 0,
    gtrBalance: 0,
    totalTransactions: {
      total: 0,
      todayTransactions: 0,
    },
    rewardGraphData: [],
    entriesGraphData: [],
  });

  useEffect(() => {
    const { startTime, endTime } = utility.getTimeStamp(rewardsStatsDateRange);
    getTotalParticipants(startTime, endTime);
    getTotalEntries(startTime, endTime);
    getTotalRewards(startTime, endTime);
    getRewardGraph(startTime, endTime);
    getEntriesGraph(startTime, endTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardsStatsDateRange]);

  useEffect(() => {
    const { startTime, endTime } = utility.getTimeStamp(transactionDateRange);
    getTotalTransaction(startTime, endTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionDateRange]);

  useEffect(() => {
    getActiveSlot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlot]);

  const pageTo = (path) => {
    if (path === gettrpayStatsData[0].title) history.push("/transactions");
    return;
  };

  setInterval(() => {
    const timeLeft = getTimer(setActiveSlot, activeSlot);
    if (document.getElementById("timeLeft")) {
      document.getElementById("timeLeft").innerHTML = timeLeft;
    }
  }, 1000);

  const getActiveSlot = async () => {
    const [error, data] = await utility.parseResponse(
      DashboardService.getActiveSlotService({
        activeSlot: utility
          .getCurrentSlot()
          .slot.replaceAll(" ", "")
          .toLowerCase(),
        date: moment().startOf("day").valueOf(),
      })
    );
    if (error || !data || !data.data) {
      setActiveSlotEntries(0);
      return;
    }
    // setActiveSlotEntries(data.data.entries);
  };

  // Get total reward participants
  const getTotalParticipants = async (startTime, endTime) => {
    const [error, data] = await utility.parseResponse(
      DashboardService.getTotalParticipantService({
        startTime,
        endTime,
      })
    );
    if (error || !data || !data.data) {
      setTotalParticipantData({
        totalUser: 0,
        participants: 0,
      });
      return;
    }
    setTotalParticipantData(data.data);
  };

  // Get total entries
  const getTotalEntries = async (startTime, endTime) => {
    const [error, response] = await utility.parseResponse(
      DashboardService.getTotalEntriesCount({
        startTime,
        endTime,
      })
    );
    if (error || !response || !response.data) {
      setTotalEntriesData({
        total: 0,
        todayEntries: 0,
      });
      return;
    }
    setTotalEntriesData(response.data);
  };

  // Get total rewards api integration
  const getTotalRewards = async (startTime, endTime) => {
    let [error, data] = await utility.parseResponse(
      RewardsService.getTotalRewards({
        startTime,
        endTime,
      })
    );
    if (error || !data || !data.data) {
      setState((pre) => ({ ...pre, rewards: 0 }));
      return;
    }
    setState((pre) => ({ ...pre, rewards: data.data }));
  };

  // Get total rewards api integration
  const getTotalTransaction = async (startTime, endTime) => {
    let [error, data] = await utility.parseResponse(
      TransactionService.getTotalTransaction(startTime, endTime)
    );
    debugger;
    if (error || !data || !data.data) {
      setState((pre) => ({
        ...pre,
        totalTransactions: { total: 0, todayTransactions: 0 },
      }));
      return;
    }
    setState((pre) => ({ ...pre, totalTransactions: data.data }));
    // setTotalRewrds(578);
  };

  // Get reward graph data
  const getRewardGraph = async (startTime, endTime) => {
    const [error, response] = await utility.parseResponse(
      RewardsService.getRewardGraph(startTime, endTime)
    );

    if (error || !response || !response.data) {
      setRewardStatsGraph([]);
      return;
    }
    const { data } = response;
    setState((pre) => ({
      ...pre,
      rewardGraphData: data.map((item) => ({
        x: item.timestamp,
        y: item.rewards,
      })),
    }));
  };
  const getEntriesGraph = async (startTime, endTime) => {
    const [error, response] = await utility.parseResponse(
      RewardsService.getEntriesGraph(startTime, endTime)
    );

    if (error || !response || !response.data) {
      setRewardStatsGraph([]);
      return;
    }
    const { data } = response;
    setRewardStatsGraph(
      data.map((item) => ({
        x: item.timestamp,
        y: item.entries,
      }))
    );
  };
  return (
    <Container>
      <Header>
        <Heading>GETTRPay Stats</Heading>
      </Header>
      <StatsAndGraphContainer>
        <StatsContainer>
          {gettrpayStatsData.map((data, index) => (
            <EachStat onClick={() => pageTo(data.title)} key={index}>
              <StatName>{data.title}</StatName>
              <Value>{getPayStatsValue(data.key, state[data.key])}</Value>
              <Description>
                {getPayStatsDescription(data.key, state[data.key])}
              </Description>
            </EachStat>
          ))}
        </StatsContainer>
        <GraphContainer>
          <TableAndPeriod>
            <SwitchTable>
              {gettrPayStatsTables.map((table, index) => (
                <EachTable
                  key={index}
                  activeTable={table === gettrPayStatsTable}
                  onClick={() => setGettrPayStatsTable(table)}
                >
                  {table}
                </EachTable>
              ))}
            </SwitchTable>
            <SwitchTable>
              {gettrStatsRange.map((range, index) => (
                <EachTable
                  key={index}
                  activeTable={transactionDateRange === range.id}
                  onClick={() => setTransactionDateRange(range.id)}
                >
                  {range.value}
                </EachTable>
              ))}
            </SwitchTable>
          </TableAndPeriod>
          <StatsGraph
            graphData={state.rewardGraphData}
            color={"#03BD64"}
            id={"gettrPayStats"}
          />
        </GraphContainer>
      </StatsAndGraphContainer>
      <Header>
        <Heading>Rewards Stats</Heading>
      </Header>
      <StatsAndGraphContainer>
        <StatsContainer>
          <RewardStatsComponent
            title="Rewards"
            value1={`${state.rewards || 0} GTR`}
            value2={`${state.rewards || 0} USD`}
          />
          <RewardStatsComponent
            title="Entries"
            value1={totalEntriesData.total}
            value2={`Today's Entry : ${totalEntriesData.todayEntries}`}
          />
          <RewardStatsComponent
            title="Participants"
            value1={totalParticipantData.participants || 0}
            value2={`Total user : ${totalParticipantData.totalUser || 0}`}
          />
          <ActiveSlotComponent data={activeSlotData || 0} slot={activeSlot} />
        </StatsContainer>
        <GraphContainer>
          <TableAndPeriod>
            <SwitchTable>
              {rewardStatsTableList.map((table, index) => (
                <EachTable
                  key={index}
                  activeTable={table === rewardStatsTable}
                  onClick={() => setRewardStatsTable(table)}
                >
                  {table}
                </EachTable>
              ))}
            </SwitchTable>
            <SwitchTable>
              {gettrStatsRange.map((range, index) => (
                <EachTable
                  key={index}
                  activeTable={rewardsStatsDateRange === range.id}
                  onClick={() => setRewardsStatsDateRange(range.id)}
                >
                  {range.value}
                </EachTable>
              ))}
            </SwitchTable>
          </TableAndPeriod>
          {rewardStatsGraph.length > 0 ? (
            <StatsGraph
              graphData={rewardStatsGraph}
              color={"#FDD834"}
              id={"rewardsStats"}
            />
          ) : (
            <p>no data found</p>
          )}
        </GraphContainer>
      </StatsAndGraphContainer>
    </Container>
  );
}

function getPayStatsValue(key, value) {
  return key === "totalTransactions"
    ? value.total
    : key === "walletCreated"
    ? value.walletCreated
    : value;
}
function getPayStatsDescription(key, value) {
  return key === "totalTransactions"
    ? `Today's Transaction : ${value.todayTransactions}`
    : key === "walletCreated"
    ? `total users : ${value.totalUser}`
    : `${value} USD`;
}

function getTimer(setActiveSlot, activeSlot) {
  const slotInfo = utility.getCurrentSlot();
  if (slotInfo.slot !== activeSlot) setActiveSlot(slotInfo.slot);
  const timeInMillis = slotInfo.endTime - Date.now();
  const hours = Math.floor((timeInMillis % (1000 * 60 * 60 * 24)) / 3600000);
  const minutes = Math.floor((timeInMillis % 3600000) / 60000);
  if (timeInMillis === 0 || timeInMillis < 0) {
    return `00:00:00`;
  }
  const seconds = Math.floor((timeInMillis % 60000) / 1000);
  return `0${hours}:${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
}
const ActiveSlotComponent = ({ slot, data }) => {
  return (
    <EachStat container={"Active Slot"}>
      <StatName>Active Slot</StatName>
      <Value>{slot}</Value>
      <Description>
        <TimeslotDescription>
          <TimerContainer>
            <img src="/images/timer.svg" alt="/" />
            <p id="timeLeft" />
          </TimerContainer>
          <p>Entries : {data.length ? data[0]?.entries : 0}</p>
        </TimeslotDescription>
      </Description>
    </EachStat>
  );
};
const RewardStatsComponent = (props) => {
  const { value1, value2, title } = props;
  return (
    <EachStat container={"Participants"}>
      <StatName>{title}</StatName>
      <Value>{value1}</Value>
      <Description>{value2}</Description>
    </EachStat>
  );
};
