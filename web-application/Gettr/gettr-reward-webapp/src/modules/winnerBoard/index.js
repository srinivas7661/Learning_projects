import React, { useState } from "react";
import { BackIconContainer, Container } from "../../common/component";
import styled from "styled-components";
import moment from "moment";
import { useEffect } from "react";
import { TransactionService } from "../../services";
import { history } from "../../managers/history";

const TabSwitch = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 44px;
  gap: 8px;
`;
const EachTab = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #eaeaea;
  background: ${(props) => (props.activeTab ? "#1A1A1A" : "#F9F9F9")};
  border-radius: 32px;
  font: normal 500 12px/16px "Roboto";
  color: ${(props) => (props.activeTab ? "#FAFAFA" : "#1A1A1A")};
`;
const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-self: center;
  background: #ffffff;
  padding: 2px;
  margin-bottom: 14px;
  img {
    border-radius: 50%;
    margin: auto;
    height: 49px;
  }
`;
const PositionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 33px;
`;
const Position = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 110px;
  p {
    font: normal 400 16px/22px "Roboto";
    color: #50555c;
    margin-bottom: 0px;
    text-align: center;
  }
  span {
    font: normal 600 18px/22px "Roboto";
    color: #000000;
    text-align: center;
    margin-bottom: 29px;
  }
`;
const Box = styled.div`
  height: ${(props) => props.height};
  width: 110px;
  text-align: center;
  color: #707070;
  font-weight: 700;
  font-size: 30px;
  border: ${(props) => (props.shadow ? "2px solid #FAFAFA" : "none")};
`;
const LeaderBoard = styled.div`
  width: 100%;
`;

const CurrentPosition = styled.div`
  width: 100%;
  padding-left: 27px;
  background-color: #fc223b;
  height: 51px;
  font: normal 600 18px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #ffffff;
  border-radius: 10px 10px 0px 0px;
`;
const RemainingPositions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px;
`;
const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const SerialNo = styled.div`
  font: normal 600 16px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #1e1e1e;
`;
const Image = styled.img`
  height: 47px;
  width: 47px;
  border-radius: 50%;
  margin-left: 15px;
`;
const NameAndUserId = styled.div`
  display: flex;
  flex-direction: column !important;
  justify-content: left !important;
  margin-left: 15px;
  div {
    font: normal 600 16px/22px "Roboto";
    display: flex;
    align-items: center;
    letter-spacing: -0.408px;
    color: #1e1e1e;
  }
  p {
    font: normal 400 15px/22px "Roboto";
    display: flex;
    /* align-items: center; */
    letter-spacing: -0.408px;
    color: #898a8d;
    text-align: left !important;
    margin-bottom: 0px;
  }
`;
const Value = styled.div`
  font: normal 600 16px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #1e1e1e;
  span {
    margin-left: 6px;
    font-weight: 200;
  }
`;
const HrLine = styled.hr`
  border: 0.6px solid #dddddd;
  border-radius: 1px;
  margin: 0px;
`;

const timeTab = [
  "Till Date",
  "Today",
  "Last 30 Days",
  "Last 3 Months",
  "Last 6 Months",
];

const getTimeStamp = (time) => {
  const timeStamps = {
    startTime: "",
    endTime: moment().endOf("d").valueOf(),
  };
  switch (time) {
    case timeTab[0]:
      timeStamps.startTime = moment().startOf("d").valueOf();
      timeStamps.type = "ALL";
      break;
    case timeTab[1]:
      timeStamps.startTime = moment().startOf("d").valueOf();
      break;
    case timeTab[2]:
      timeStamps.startTime = moment().subtract(1, "M").startOf("d").valueOf();
      break;
    default:
      timeStamps.startTime = moment().subtract(6, "M").startOf("d").valueOf();
      break;
  }
  return timeStamps;
};

const NoData = styled.p`
  font: normal 600 16px/22px "Roboto";
  color: #1e1e1e;
`;

function WinnerBoard() {
  const [activeTab, setActiveTab] = useState("Till Date");
  const [winnerBoard, setWinnerBoard] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  useEffect(() => {
    (async () => {
      const requestObject = getTimeStamp(activeTab);
      requestObject.userId = "gettrId35";
      const response = await TransactionService.getWinnerStatsBoard(
        requestObject
      );
      const { winner, currentPosition } = response;
      setCurrentPosition(currentPosition);
      setWinnerBoard(winner);
    })();
  }, [activeTab]);
  return (
    <Container>
      <div>
        <BackIconContainer key={"back"}>
          <img onClick={() => history.goBack()} src="/images/Back.svg" alt="" />
          <p>Winner Board</p>
        </BackIconContainer>
        <TabSwitch key={"tabSwitch"}>
          {timeTab.map((tab, index) => (
            <EachTab
              key={index}
              activeTab={activeTab === timeTab[index]}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </EachTab>
          ))}
        </TabSwitch>
        <PositionContainer key={"topThree"}>
          <Position>
            <ImageContainer>
              <img src={winnerBoard[1]?.picture ?? "N/A"} alt="" />
            </ImageContainer>
            <p>{winnerBoard[1]?.userId ?? "N/A"}</p>
            <span>{winnerBoard[1]?.value ?? "N/A"} GTR</span>
            <img src="/images/PathLeft.svg" alt="/" />
            <Box height={"72px"}>2</Box>
          </Position>
          <Position>
            <ImageContainer>
              <img src={winnerBoard[0]?.picture ?? "N/A"} alt="" />
            </ImageContainer>
            <p>{winnerBoard[0]?.userId ?? "N/A"}</p>
            <span>{winnerBoard[0]?.value ?? "N/A"} GTR</span>
            <img src="/images/PathCenter.svg" alt="/" />
            <Box shadow height={"103px"}>
              1
            </Box>
          </Position>
          <Position>
            <ImageContainer>
              <img src={winnerBoard[2]?.picture ?? "N/A"} alt="" />
            </ImageContainer>
            <p>{winnerBoard[2]?.userId ?? "N/A"}</p>
            <span>{winnerBoard[2]?.value ?? "N/A"} GTR</span>
            <img src="/images/PathRight.svg" alt="/" />
            <Box height={"51px"}>3</Box>
          </Position>
        </PositionContainer>
        <LeaderBoard>
          <CurrentPosition>
            Your Current Position : {currentPosition}
          </CurrentPosition>
          <div>
            {winnerBoard.length > 3 ? (
              winnerBoard.slice(3).map((eachUser, index) => (
                <div key={index}>
                  <RemainingPositions>
                    <User>
                      <SerialNo>{index + 4}.</SerialNo>
                      <Image src={eachUser.picture} alt="" />
                      <NameAndUserId>
                        <div>{eachUser.name}</div>
                        <p>{eachUser.gettrId}</p>
                      </NameAndUserId>
                    </User>
                    <Value>
                      {eachUser.amount}{" "}
                      <span> {eachUser.currency ?? "N/A"}</span>
                    </Value>
                  </RemainingPositions>
                  <HrLine />
                </div>
              ))
            ) : (
              <NoData>No Data </NoData>
            )}
          </div>
        </LeaderBoard>
      </div>
    </Container>
  );
}

export default WinnerBoard;
