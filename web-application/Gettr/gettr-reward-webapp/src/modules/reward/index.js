import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import SimpleAreaChart from "./SimpleAreaChart";
import TimeSlotBarChart from "./TimeSlotBarChart";
import TotalEntriesBarChart from "./TotalEntriesBarChart";
import TopEarnerComponent from "./TopEarnerComponent";
import { Container } from "../../common/component";

import {
  RewardsService,
  TransactionService,
  AnalyticsService,
} from "../../services";
import moment from "moment";
import Utils from "../../utility/index";
import "./index.css";
import { history } from "../../managers/history";

Chart.register([ArcElement, Tooltip]);
const AnalyticComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ceter;
  background-color: #f9f9f9;
  padding-left: 4px;
`;
const AnalyticHeadingDiv = styled.div`
  display: flex;
  color: black;
`;
const BackArrow = styled.img`
  margin-right: 16.25px;
  cursor: pointer;
`;
const AnalyticHeading = styled.div`
  width: 80px;
  height: 22px;
  font: normal 700 20px/22px "Roboto";
`;
const FilterDateDiv = styled.div`
  font: normal 500 12px/16px "Roboto";
  display: flex;
  text-align: center;
  flex-direction: column;
  cursor: pointer;
  width: 100px;
  height: 30px;
  padding: 6px 10px;
  border: 1px solid #eaeaea;
  margin-top: 44px;
  background: ${(props) => (props.activeDate ? "black" : "white")};
  border-radius: 32px;
  color: ${(props) => (props.activeDate ? "white" : "black")};
  margin-right: 8px;
  white-space: nowrap;
`;
const FilterByDateComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopUserAndParticipantComponent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 34px;
`;
const TopUserAndParticipantDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 289px;
  height: 276px;
  background: #ffffff;
  border-radius: 10px;
  margin-right: 24px;
`;

const Heading = styled.div`
  width: 126px;
  height: 34px;
  font: normal 500 17px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #545b66;
  margin: 20px;
  white-space: nowrap;
`;
const TopUserImg = styled.img`
  width: 81px;
  height: 81px;
  border-radius: 50%;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;
const UserName = styled.div`
  display: flex;
  justify-content: center;
  font: normal 600 18px/22px "Roboto";

  display: flex;
  align-items: center;
  margin-top: 23px;
`;
const UserPoints = styled.div`
  display: flex;
  justify-content: center;
  font: normal 600 17px/22px "Roboto";

  display: flex;
  align-items: center;
  color: #50555c;
`;

const TaskParticipantsComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 603px;
  height: 336px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 25px;
`;
const DoughnutChartComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const DoughnutChartValue = styled.div`
  width: 72px;
  height: 34px;
  font: normal 600 25px/22px "Roboto";

  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #000000;
`;

const DoughnutChart = styled.div`
  width: 244.95px;
  height: 240.29px;
`;
const ChartValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-right: 84px;
`;
const ChartValueText = styled.div`
  width: 104px;
  height: 33px;
  font: normal 400 17px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #50555c;
`;
const TotalRewardComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 603px;
  height: 485px;
  background: #ffffff;
  border-radius: 10px;
  margin: 25px 0 25px 0;
`;
const TotalRewardTextComponent = styled.div`
  display: flex;
  width: 166px;
  height: 34px;
  margin: 12px 0 40px 0;
`;

const TotalRewardHeading = styled.div`
  width: 224px;
  height: 33px;
  font: normal 500 17px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #545b66;
`;
const TotalRewardValue = styled.div`
  font: normal 600 25px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #000000;
`;

const TotalRewardCurrency = styled.div`
  font: normal 500 17px/22px "Roboto";
  margin: 4px 0 0 4px;
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #000000;
`;
const TotalComponentInnerDiv = styled.div`
  margin: 17px 20px;
`;
const TimeSlotAnalyticsComponent = styled(TotalRewardComponent)`
  height: 677px;
`;
const TimeSlotHeading = styled(TotalRewardHeading)``;
const TimeSlotAnalyticsInnerDiv = styled(TotalComponentInnerDiv)``;
const TimeSlotAnalyticsUpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TotalEntriesComponent = styled(TotalRewardComponent)``;
const TotalEntriesInnerDiv = styled(TotalComponentInnerDiv)``;
const TotalEntriesHeading = styled(TotalRewardHeading)``;
const TotalEntriesAndReward = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const TotalEntries = styled.div`
  width: 131px;
  height: 27px;
  font: normal 400 11px/22px "Roboto";
  align-items: center;
  color: #000000;
  padding-bottom: 4px;
`;
const TotalReward = styled(TotalEntries)``;
const TotalEntriesDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const TotalRewardDiv = styled(TotalEntriesDiv)``;

const ColorDiv = styled.div`
  background-color: ${(props) => props.color};
  width: 15px;
  height: 15px;
  border-radius: 3px;
  margin-right: 11px;
`;
const TotalEntriesValue = styled.div`
  width: 164px;
  height: 33px;
  font: normal 600 25px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #000000;
`;

const HighestRewardComponent = styled(TotalRewardComponent)`
  width: 595px;
  height: 157px;
  background: #ffffff;
  border-radius: 10px;
`;
const HighestRewardInnerDiv = styled(TotalComponentInnerDiv)``;
const HighestRewardHeading = styled(TotalRewardHeading)``;
const RewardInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
const HighestGtrValue = styled.div`
  width: 142px;
  height: 32px;
  font: normal 600 25px/22px "Roboto";
  align-items: center;
  letter-spacing: -0.408px;
  color: #000000;
`;

const HighestUserInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const UserProfileImg = styled.img`
  width: 33px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
`;
const HighestUserName = styled.div`
  width: 102px;
  height: 32px;
  font: normal 600 16px/22px "Roboto";
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`;
const ChartValueComponent = styled.div`
  display: flex;
  flex-direction: row;
`;
const ChartHoverColorDiv = styled.div`
  width: 54px;
  height: 6px;
  border-radius: 1px;
  background: ${(props) => props.color};
  transform: rotate(90deg);
  margin-top: 128px;
`;

const filterDataHeadings = [
  {
    name: "Till Date",
    value: "tillDate",
  },
  {
    name: "Today",
    value: "today",
  },
  {
    name: "Last 30 Days",
    value: "days30",
  },
  {
    name: "Last 3 Months",
    value: "months3",
  },
  {
    name: "Last 6 Months",
    value: "months6",
  },
];

const data = {
  labels: ["data1", "data2", "data3", "data4", "data5"],
  datasets: [
    {
      label: "# of Tomatoes",
      data: [18, 15, 17, 15, 15],
      backgroundColor: [
        "#FDD834",
        "rgba(113, 181, 253, 0.28)",
        "#FC223B",
        "#6AC161",
        "#298FFF",
      ],
      borderWidth: 1,
      hoverBorderWidth: 3,
    },
  ],
};

const getTimeStamp = (active) => {
  const { tillDate, today, days30, months3, months6 } = active;
  const timeStamps = {
    startTime: "",
    endTime: moment().endOf("d").valueOf(),
  };
  if (tillDate) {
    timeStamps.startTime = moment().subtract(1, "Y").startOf("d").valueOf();
    timeStamps.type = "ALL";
  }
  if (today) timeStamps.startTime = moment().startOf("d").valueOf();
  if (days30)
    timeStamps.startTime = moment().subtract(1, "M").startOf("d").valueOf();
  if (months3)
    timeStamps.startTime = moment().subtract(3, "M").startOf("d").valueOf();
  if (months6)
    timeStamps.startTime = moment().subtract(6, "M").startOf("d").valueOf();
  return timeStamps;
};

const RewardAnalytics = () => {
  const [hoverColor, setHoverColor] = useState("#FDD834");
  const [totalEntries, setTotalEntries] = useState("");
  const [taskParticipant, setTaskParticipant] = useState("");

  async function getTotalEntries(timeStamp) {
    const totalEntryResponse = await AnalyticsService.getTotalEntry(timeStamp);
    console.log(totalEntryResponse, "totalentery");
    if (totalEntryResponse) {
      setTotalEntries(totalEntryResponse.data.total);
    }
  }

  async function getTaskParticipants(timeStamp) {
    const taskParticipantResponse = await AnalyticsService.getTotalParticipants(
      timeStamp
    );
    console.log(taskParticipantResponse, "totalentery");
    if (taskParticipantResponse) {
      setTaskParticipant(taskParticipantResponse.data.total);
    }
  }

  const [activeDate, setActiveDate] = useState({
    tillDate: true,
    today: false,
    days30: false,
    months3: false,
    months6: false,
  });

  const [winnerData, setWinnerData] = useState([]);

  async function highestRewardWinner(timeStamp) {
    let [error, data] = await Utils.parseResponse(
      TransactionService.getHighestRewardWinner(timeStamp)
    );
    const response = { data };
    setWinnerData(response);
    if (error || !data) {
    }
  }

  const [performersData, setPerformersData] = useState([]);

  async function topPerformers(timeStamp) {
    let [error, data] = await Utils.parseResponse(
      TransactionService.getTopPerformers(timeStamp)
    );
    const response = { data };
    setPerformersData(response);
    if (error || !data) {
    }
  }

  const [slotData, setSlotData] = useState([]);

  async function slotAnalytics(timeStamp) {
    let [error, data] = await Utils.parseResponse(
      RewardsService.getSlotAnalytics(timeStamp)
    );
    const response = { data };
    setSlotData(response);
    if (error || !data) {
    }
  }

  useEffect(() => {
    const reqObj = getTimeStamp(activeDate);
    highestRewardWinner(reqObj);
    topPerformers(reqObj);
    slotAnalytics(reqObj);
    getTotalEntries(reqObj);
    getTaskParticipants(reqObj);
  }, [activeDate]);

  return (
    <Container>
      <AnalyticComponent>
        {/* Analytics headings */}

        <AnalyticHeadingDiv>
          <BackArrow
            onClick={() => history.goBack()}
            src="/images/back-arrow.svg"
            alt="back-arrow"
          />
          <AnalyticHeading>Analytics</AnalyticHeading>
        </AnalyticHeadingDiv>

        {/* Filter data according to time  */}
        <FilterByDateComponent>
          {filterDataHeadings.map((data, idx) => {
            return (
              <FilterDateDiv
                key={idx}
                activeDate={activeDate[filterDataHeadings[idx].value]}
                onClick={() => {
                  setActiveDate(() => ({
                    ...{
                      tillDate: false,
                      today: false,
                      days30: false,
                      months3: false,
                      months6: false,
                    },
                    [filterDataHeadings[idx].value]: true,
                  }));
                }}
              >
                {data.name}
              </FilterDateDiv>
            );
          })}
        </FilterByDateComponent>

        {/* Top user and participant component */}
        <TopEarnerComponent performersData={performersData} />

        {/* <TopUserAndParticipantComponent>
        {TopUserAndPaticipantData.map((data) => {
          return (
            <TopUserAndParticipantDiv>
              <Heading>{data.heading}</Heading>
              <UserInfo>
                <TopUserImg src={data.img} alt="user-img" />
                <UserName>{data.userName}</UserName>
                <UserPoints>{data.rewardMoney}</UserPoints>
              </UserInfo>
            </TopUserAndParticipantDiv>
          );
        })}
      </TopUserAndParticipantComponent> */}

        {/* Task Participation Component */}

        <TaskParticipantsComponent>
          <Heading>Task Participation</Heading>
          <DoughnutChartComponent>
            <ChartValueComponent>
              <ChartHoverColorDiv color={hoverColor} />
              <ChartValueDiv>
                <DoughnutChartValue>43%{taskParticipant}</DoughnutChartValue>
                <ChartValueText>Create a post</ChartValueText>
              </ChartValueDiv>
            </ChartValueComponent>

            <DoughnutChart>
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          setHoverColor(
                            tooltipItem.dataset.backgroundColor[
                              tooltipItem.dataIndex
                            ]
                          );
                          return "Participation";
                        },
                      },
                      // enabled: true,
                    },
                    title: {
                      display: true,
                      text: "Users Gained between 2016-2020",
                    },
                  },
                  showTooltips: true,
                }}
              />
            </DoughnutChart>
          </DoughnutChartComponent>
        </TaskParticipantsComponent>

        {/* Total rewards win */}

        <TotalRewardComponent>
          <TotalComponentInnerDiv>
            <TotalRewardHeading>Total Rewards Won</TotalRewardHeading>
            <TotalRewardTextComponent>
              <TotalRewardValue>46,200 </TotalRewardValue>
              <TotalRewardCurrency>GTR</TotalRewardCurrency>
            </TotalRewardTextComponent>
            {/* <SimpleChartComponent> */}
            <SimpleAreaChart />
            {/* </SimpleChartComponent> */}
          </TotalComponentInnerDiv>
        </TotalRewardComponent>

        {/* Timeslot Analytics graph */}
        <TimeSlotAnalyticsComponent>
          <TimeSlotAnalyticsInnerDiv className="timeslot_inner_div">
            <TimeSlotAnalyticsUpperDiv>
              <TimeSlotHeading>Timeslot Performance</TimeSlotHeading>
              <TotalEntriesAndReward>
                <TotalEntriesDiv>
                  <ColorDiv color="#FFB752" />
                  <TotalEntries>Total Entries</TotalEntries>
                </TotalEntriesDiv>
                <TotalRewardDiv>
                  <ColorDiv color="#F96D60" />
                  <TotalReward>Total Rewards</TotalReward>
                </TotalRewardDiv>
              </TotalEntriesAndReward>
            </TimeSlotAnalyticsUpperDiv>
            <TimeSlotBarChart slotData={slotData} />
          </TimeSlotAnalyticsInnerDiv>
        </TimeSlotAnalyticsComponent>

        {/* Total Entries bar chart */}
        <TotalEntriesComponent>
          <TotalEntriesInnerDiv>
            <TotalEntriesHeading>Total Entries</TotalEntriesHeading>
            <TotalEntriesValue>{totalEntries}</TotalEntriesValue>
          </TotalEntriesInnerDiv>
          <TotalEntriesBarChart />
        </TotalEntriesComponent>

        {/* Highest reward win */}

        <HighestRewardComponent>
          <HighestRewardInnerDiv>
            <HighestRewardHeading>Highest Reward Won</HighestRewardHeading>
            <RewardInfoDiv>
              <HighestGtrValue>
                {winnerData?.data?.data?.amount} GTR
              </HighestGtrValue>
              <HighestUserInfoDiv>
                <UserProfileImg src={winnerData?.data?.data?.picture} />
                <HighestUserName>
                  {winnerData?.data?.data?.name}
                </HighestUserName>
              </HighestUserInfoDiv>
            </RewardInfoDiv>
          </HighestRewardInnerDiv>
        </HighestRewardComponent>
      </AnalyticComponent>
    </Container>
  );
};

export default RewardAnalytics;
