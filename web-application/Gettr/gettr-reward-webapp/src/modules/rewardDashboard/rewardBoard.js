import React, { useState, useEffect } from "react";
import { BackIconContainer, Container } from "../../common/component";
import styled from "styled-components";
import { history } from "../../managers/history";
import LiveSlotModal from "./liveRewardPopup";
import EnterSlotModal from "./enterPopup";
import RewardEnterModal from "./rewardEnteredPopup";
import MissedSlotModal from "./missedPopup";
import moment from "moment";
import { RewardsService } from "../../services";
import utility from "../../utility";
import RewardHome from "../rewardsHome";

const apiData = [
  {
    slot: "12am-2am",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "2am-4am",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "4am-6am",
    totalEntries: 2,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "6am-8am",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "8am-10am",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "10am-12pm",
    totalEntries: 2,
    hasWon: 1,
    activities: [],
  },
  {
    slot: "12pm-2pm",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "2pm-4pm",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "4pm-6pm",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "6pm-8pm",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "8pm-10pm",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
  {
    slot: "10pm-12am",
    totalEntries: 0,
    hasWon: 0,
    activities: [],
  },
];

const RewardContainer = styled.div`
  width: 605px;

  height: 153px;
  margin-top: 45px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  /* transform: matrix(1, 0, 0, -1, 0, 0); */
`;

const RewardGiveaway = styled.div`
  width: 605px;
  height: 112px;
  margin-top: 16px;
  background: #fc223b;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`;

const DailyReward = styled.div`
  width: 605px;
  height: 520px;
  margin-top: 16px;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
`;
const RowSecond = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

const RowThird = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RowTime = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -5px;
  padding-left: 20px;
  padding-right: 20px;
`;
const Reward = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.408px;

  color: #1e1e1e;
`;

const Giveaway = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  display: flex;
  align-items: center;

  color: #ffffff;
`;

const ValueGettr = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 22px;
  /* or 63% */

  display: flex;
  align-items: center;
  letter-spacing: -0.408px;

  color: #1e1e1e;
`;

const ValueUSD = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height, or 120% */

  letter-spacing: -0.078px;

  /* LIGHT/neutral/500 */

  color: #7f7f7f;
  padding-top: 15px;
  padding-left: 20px;
`;

const ValueTime = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 22px;
  /* or 88% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.408px;

  color: #ffffff;
`;

const ReedemButton = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 130px;
  height: 40px;
  background: #000000;
  border: 1px solid #000000;
  border-radius: 19.5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.408px;
  color: #ffffff;
  justify-content: center;
`;
const WinnerButton = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  width: 130px;
  height: 40px;

  border: 1px solid #000000;
  border-radius: 19.5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* or 147% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
  justify-content: center;
  margin-left: 15px;
`;

const RowButton = styled.div`
  display: flex;
  margin-right: 20px;
`;
const EnterButton = styled.div`
  width: 172px;
  height: 40px;
  left: 1026px;
  top: 362px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 69.5px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  /* or 129% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
  justify-content: center;
`;

const ValueHr = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* or 147% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;

  opacity: 0.5;
`;
const Calendar = styled.div`
  width: 94px;
  height: 30px;

  background: rgba(217, 217, 217, 0.31);
  border-radius: 7px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height, or 147% */

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #298fff;
`;
const ImgCalendar = styled.img`
  padding-right: 10px;
`;

const RewardDiv = styled.div`
  box-sizing: border-box;
  width: 121px;
  height: 109px;
  background: ${(props) => (props.live ? "#EAFFF5" : "#FFFFFF")};
  border: ${(props) =>
    props.live ? "1px solid #03BD64" : "1px solid #E7E7E7"};
  border-radius: 10px;
  cursor: pointer;
`;
const BoxDiv = styled.div`
  padding: 20px;
  text-align: center;
`;
const CircleDiv = styled.div`
  width: 22px;
  height: 22px;
  background: ${(props) => (props.live ? "#03BD64" : "#FFFFFF")};
  border: ${(props) =>
    props.live ? "1px solid #03BD64" : "1px solid #E7E7E7"};
  border-radius: 50px;
  margin-top: -30px;
  margin-left: 25px;
  margin-bottom: 15px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  /* display: flex; */
  align-items: center;
  text-align: center;
  color: ${(props) => (props.live ? "#FFFFFF" : "#1e1e1e")};
`;

const DivName = styled.div`
  padding-top: 15px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height, or 147% */

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
`;

const MyDailyRewardDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 25px;
  flex-wrap: wrap;
  height: auto;
`;

function RewardBoard() {
  const [activeTab, setActiveTab] = useState({
    tillDate: true,
    today: false,
    last30Days: false,
    last3Months: false,
    last6Months: false,
  });
  const [viewIntro, setViewIntro] = useState(!localStorage.getItem("INTRO"));

  const [live, setLive] = useState(false);
  const [enter, setEnter] = useState(false);
  const [rewardEnter, setRewardEnter] = useState(false);
  const [missed, setMissed] = useState(false);
  const [dailyRewards, setDailyRewards] = useState(false);

  // let modifiedApiData = []
  let day = moment().valueOf();
  let dayWithoutHrs = new Date().setHours(0, 0, 0, 0);
  let hour = day - dayWithoutHrs;

  function ModifyApiData() {
    let start = 0;
    let end = 2 * 60 * 60 * 1000;
    let twoHrs = 2 * 60 * 60 * 1000;
    apiData.map((data, index) => {
      data["startTime"] = start;
      data["endTime"] = end;
      start = start + twoHrs + (index === 0 ? 1 : 0);
      end = end + twoHrs;
      return data;
    });
    console.log("modifiedApiData", apiData);
  }
  ModifyApiData();

  async function GetDailyRewardsList() {
    let [error, data] = await utility.parseResponse(
      RewardsService.getDailyRewards(dayWithoutHrs)
    );
    if (error || !data) {
      setDailyRewards([]);
    } else {
      setDailyRewards(data.data);
    }
  }

  const [rewardData, setRewardData] = useState({
    totalEarning: 0,
    availableAmount: 0,
  });

  const getUserRewardData = async () => {
    const gettrId = utility.getGettrId();
    const [error, userRewardData] = await utility.parseResponse(
      RewardsService.getUserRewards(gettrId)
    );
    if (error || !userRewardData || !userRewardData.data) {
      setRewardData({
        totalEarning: 0,
        availableAmount: 0,
      });
    }
    setRewardData(userRewardData.data);
  };

  useEffect(() => {
    getUserRewardData();
    GetDailyRewardsList();
  }, []);

  const handleAnalytics = () => {
    history.push("/reward-analytics");
  };
  const handleReedem = () => {
    history.push("/select-gift-card");
  };
  const handleWinnerBoard = () => {
    history.push("/winner-board");
  };
  const handlePopup = (data) => {
    if (data == "Enter") {
      setRewardEnter(true);
    }
    if (data == "Missed") {
      setMissed(true);
    }
    if (data == "Live") {
      setLive(true);
    }
  };
  const SlotStatus = (data) => {
    let state = "";
    if (data.totalEntries === 0) {
      state = "Missed";
    } else if (data.totalEntries !== 0) {
      state = "Enter";
    } else if (data.hasWon !== 0 && data.totalEntries !== 0) {
      state = "Won";
    } else if (DisplayReward(data.startTime, data.endTime) === "Upcoming") {
      state = "Upcoming";
    } else if (DisplayReward(data.startTime, data.endTime) === "Live") {
      state = "Live";
    }
    return state;
  };

  function DisplayReward(startTime, endTime) {
    if (endTime <= hour && startTime <= hour) return "SlotCompleted";
    if (endTime >= hour && startTime <= hour) return "Live";
    if (endTime >= hour && startTime >= hour) return "Upcoming";
  }
  return (
    <>
      <Container>
        <div>
          <BackIconContainer key={"back"}>
            <img src="/images/Back.svg" alt="" />
            <p>Rewards</p>
          </BackIconContainer>
          <RewardContainer>
            <Row>
              <Reward>Reward</Reward>
              <img onClick={handleAnalytics} src="/images/Vector.svg"></img>
            </Row>
            <Row>
              <ValueGettr>{rewardData?.availableAmount} GTR</ValueGettr>
            </Row>
            <RowThird>
              <ValueUSD>USD {rewardData?.totalEarning} GTR</ValueUSD>
              <RowButton>
                <ReedemButton onClick={handleReedem}>Redeem</ReedemButton>
                <WinnerButton onClick={handleWinnerBoard}>
                  Winner Board
                </WinnerButton>
              </RowButton>
            </RowThird>
          </RewardContainer>

          <RewardGiveaway>
            <Row>
              <Giveaway>8th Reward Giveaway ending in</Giveaway>
              {/* <img src="/images/Vector.svg"></img> */}
            </Row>
            <RowSecond>
              <ValueTime>01:12:36</ValueTime>
              <EnterButton onClick={() => setEnter(true)}>Enter</EnterButton>
            </RowSecond>
            <RowTime>
              <ValueHr>Hrs Min Sec</ValueHr>
            </RowTime>
          </RewardGiveaway>

          <DailyReward>
            <Row>
              <Reward>My Daily Rewards</Reward>
              <Calendar>
                <ImgCalendar src="/images/Union.svg"></ImgCalendar>Today
              </Calendar>
            </Row>
            <MyDailyRewardDiv>
              {apiData?.map((data, index) =>
                DisplayReward(data.startTime, data.endTime) !==
                "SlotCompleted" ? (
                  DisplayReward(data.startTime, data.endTime) !== "Live" ? (
                    <RewardDiv key={index}>
                      <BoxDiv>
                        <CircleDiv>{index + 1}</CircleDiv>
                        <img src={"/images/upcoming.svg"}></img>
                        <DivName>Upcoming</DivName>
                      </BoxDiv>
                    </RewardDiv>
                  ) : (
                    <RewardDiv
                      key={index}
                      live={true}
                      onClick={() => setLive(true)}
                    >
                      <BoxDiv live={true}>
                        <CircleDiv live={true}>{index + 1}</CircleDiv>
                        <img src={"/images/live.svg"}></img>
                        <DivName>Live</DivName>
                      </BoxDiv>
                    </RewardDiv>
                  )
                ) : (
                  <RewardDiv
                    key={index}
                    onClick={() =>
                      data?.hasWon !== 0 && data?.totalEntries !== 0
                        ? ""
                        : handlePopup(SlotStatus(data))
                    }
                  >
                    <BoxDiv>
                      <CircleDiv>{index + 1}</CircleDiv>
                      {data?.hasWon === 0 && data?.totalEntries !== 0 ? (
                        <img src={"/images/correct.svg"}></img>
                      ) : (
                        <></>
                      )}
                      {data?.hasWon !== 0 && data?.totalEntries !== 0 ? (
                        <img src={"/images/win.svg"}></img>
                      ) : (
                        <></>
                      )}
                      {data?.hasWon === 0 && data?.totalEntries === 0 ? (
                        <img src={"/images/missed.svg"}></img>
                      ) : (
                        <></>
                      )}
                      <DivName>
                        {data?.hasWon === 0 && data?.totalEntries !== 0
                          ? `Entered -${data?.totalEntries}`
                          : ""}
                        {data?.hasWon !== 0 && data?.totalEntries !== 0
                          ? `Won -${data?.hasWon}`
                          : ""}
                        {data?.hasWon === 0 && data?.totalEntries === 0
                          ? `Missed`
                          : ""}
                      </DivName>
                    </BoxDiv>
                  </RewardDiv>
                )
              )}
            </MyDailyRewardDiv>
          </DailyReward>
        </div>
      </Container>
      <LiveSlotModal live={live} setLive={setLive} />
      <EnterSlotModal enter={enter} setEnter={setEnter} />
      <RewardEnterModal
        rewardEnter={rewardEnter}
        setRewardEnter={setRewardEnter}
      />
      <MissedSlotModal
        missed={missed}
        setMissed={setMissed}
        enter={enter}
        setEnter={setEnter}
      />
      <RewardHome open={viewIntro} closeModal={setViewIntro} />
    </>
  );
}

export default RewardBoard;
