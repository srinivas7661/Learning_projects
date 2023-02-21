import React from "react";
import styled from "styled-components";
import { analyticsValues, gettrStatsRange } from "../../../constants";
import { Card } from "../../../common/components/components";
import GraphLocation from "./graphLocation";
import EntriesLineGraph from "./entriesLineGraph";
import LocationMap from "./locationMap";
import PopularActivites from "./popularActivites";
import utility from "../../../utility";

const Container = styled.div`
  width: 100%;
  padding: 35px 50px 20px 50px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 37px;
`;

const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
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
const SecondDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 57px;
  gap: 17px;
`;

function RewardAnalytics(props) {
  const { rewardsRange, setRewardsRange, activityList, rewardAnalyticsData } =
    props.propsData;
  return (
    <Container>
      <div>
        <Header>
          <Heading>Reward Analytics</Heading>
          <SwitchTable>
            {gettrStatsRange.map((range, index) => (
              <EachTable
                key={index}
                activeTable={rewardsRange === range.id}
                onClick={() => setRewardsRange(range.id)}
              >
                {range.value}
              </EachTable>
            ))}
          </SwitchTable>
        </Header>
        <CardContainer>
          <Card maxWidth={"293px"} maxHeight={"161px"} padding={"40px 35px"}>
            <CardTitle>Reward Value</CardTitle>
            <Value>{rewardAnalyticsData.rewardValues}</Value>
          </Card>
          <Card maxWidth={"293px"} maxHeight={"161px"} padding={"40px 35px"}>
            <CardTitle>Entries</CardTitle>
            <Value>{rewardAnalyticsData.entries}</Value>
          </Card>
          <Card maxWidth={"293px"} maxHeight={"161px"} padding={"40px 35px"}>
            <CardTitle>User Won</CardTitle>
            <Value>{rewardAnalyticsData.userWon}</Value>
          </Card>
          <Card maxWidth={"293px"} maxHeight={"161px"} padding={"40px 35px"}>
            <CardTitle>User Participated</CardTitle>
            <Value>{rewardAnalyticsData.userParticipated}</Value>
          </Card>
          <Card
            maxWidth={"293px"}
            maxHeight={"161px"}
            padding={"40px 35px"}
            backGround={"#E5F8EF"}
          >
            <CardTitle>Active Slot</CardTitle>
            <Value>{utility.getCurrentSlot().slot}</Value>
          </Card>
        </CardContainer>
      </div>
      <SecondDiv>
        <GraphLocation rewardsRange={rewardsRange} />
        <EntriesLineGraph />
        <LocationMap />
      </SecondDiv>
      <PopularActivites activityList={activityList} />
    </Container>
  );
}

export default RewardAnalytics;
