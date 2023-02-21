import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RewardsService } from "../../../services";
import utility from "../../../utility";
import TimeSlotBarChart from "./timeSlotBarChart";

const TotalRewardComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 507px;
  height: 362px;
  background: #ffffff;
  border-radius: 10px;
  margin: 25px 0 25px 0;
  border: 1px solid #f0f0f0;
  border-radius: 15px;
`;
const TotalComponentInnerDiv = styled.div`
  margin: 17px 20px;
`;

const TimeSlotAnalyticsComponent = styled(TotalRewardComponent)`
  /* height: 677px; */
`;
const TimeSlotAnalyticsInnerDiv = styled(TotalComponentInnerDiv)``;
const TimeSlotAnalyticsUpperDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TotalEntriesAndReward = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 25px;
`;
const TotalEntries = styled.div`
  /* width: 131px; */
  height: 27px;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  /* padding-bottom: 4px; */
`;
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
  margin-top: 3px;
`;
const TotalReward = styled(TotalEntries)``;
const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;

function GraphLocation({ rewardsRange }) {
  const { startTime, endTime } = utility.getTimeStamp(rewardsRange);
  const [slotData, setSlotData] = useState([]);
  useEffect(() => {
    (async () => {
      const [error, response] = await utility.parseResponse(
        RewardsService.getSlotAnalytics({
          startTime,
          endTime,
        })
      );
      if (error || !response || !response.data) {
        setSlotData([]);
        return;
      }
      setSlotData(response.data);
    })();
    // eslint-disable-next-line
  }, [startTime, endTime]);
  return (
    <div>
      {/* Timeslot Analytics graph */}
      <Heading>Time Slot Analytics</Heading>
      <TimeSlotAnalyticsComponent>
        <TimeSlotAnalyticsInnerDiv className="timeslot_inner_div">
          <TimeSlotAnalyticsUpperDiv>
            <TotalEntriesAndReward>
              <TotalEntriesDiv>
                <ColorDiv color="#FFB752" />
                <TotalEntries>Entries</TotalEntries>
              </TotalEntriesDiv>
              <TotalRewardDiv>
                <ColorDiv color="#F96D60" />
                <TotalReward>Rewards</TotalReward>
              </TotalRewardDiv>
            </TotalEntriesAndReward>
          </TimeSlotAnalyticsUpperDiv>
          <TimeSlotBarChart slotData={slotData} />
        </TimeSlotAnalyticsInnerDiv>
      </TimeSlotAnalyticsComponent>
    </div>
  );
}

export default GraphLocation;
