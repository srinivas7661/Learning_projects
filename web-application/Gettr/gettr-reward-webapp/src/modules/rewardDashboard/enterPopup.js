import React from "react";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CaraousalComponent from "../modals/caraousal";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: 83,
    width: "460px",
    maxWidth: "460px",
  },
});

const Container = styled.div`
  width: 460px;
  height: 460px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  width: 100%;
  height: 59px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  padding: 26px 0 13px 32px;
`;

const CloseImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 13px 0 0;
`;

const Title = styled.div`
  font: normal normal 600 18px/22px var(--font-roboto);
  color: #000000;
`;

const TopSection = styled.div`
  padding: 22px 30px 27px 34px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 62%;
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 18px 0;
`;

const ScheduleImg = styled.img`
  margin: 0 6.5px 0 0;
  width: 15.44px;
  height: 17.48px;
`;

const StartEndTime = styled.div`
  font: normal normal 400 15px/22px var(--font-roboto);
  color: #000000;
`;

const Time = styled.span`
  font: normal normal 700 15px/22px var(--font-roboto);
  color: #000000;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescHeading = styled.div`
  font: normal normal 600 18px/22px var(--font-roboto);
  color: #000000;
  margin: 0 0 4px 0;
`;

const SubDescription = styled.div`
  font: normal normal 400 15px/17px var(--font-roboto);
  color: #49494a;
`;

const RightSection = styled.div`
  width: 124px;
  height: 68px;
  border: 1px solid #e7e7e7;
  border-radius: 9px;
`;

const EndingIn = styled.div`
  width: 100%;
  height: 22px;
  text-align: center;
  font: normal normal 600 11px/22px var(--font-roboto);
  color: #50555c;
`;

const Timer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  padding: 0 8px 0 10px;
`;

const TimeContainer = styled.div`
  width: 28px;
  height: 22px;
  background: #e7e7e7;
  border-radius: 4px;
  text-align: center;
`;

const HMS = styled.div`
  font: normal normal 600 16px/22px var(--font-roboto);
  color: #000000;
  text-align: center;
`;

const HMSContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HMSText = styled.span`
  width: 23px;
  height: 22px;
  font: normal normal 400 11px/22px var(--font-roboto);
  color: #adb3bc;
  text-align: center;
`;

const CarouselContainer = styled.div`
  width: 100%;
  padding: 0 30px 0 35px;
  margin: 0 0 25px 0;
`;

const EntriesTitle = styled.div`
  font: normal normal 700 17px/22px var(--font-roboto);
  color: #000000;
  letter-spacing: -0.408px;
  padding: 0 0 0 34px;
  margin: 0 0 0px 0;
`;

const EntriesSubTitle = styled.span`
  font: normal normal 600 15px/22px var(--font-roboto);
  color: #000000;
  letter-spacing: -0.408px;
  margin: 0 0 4px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 85px;
  padding: 0 30px 0 35px;
`;

const RowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ index, entries }) =>
    index < entries.length - 1 &&
    `
    border-bottom: 1px solid #e4e4e4;
  `}
`;

const RowLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const Duration = styled.span`
  font: normal normal 400 14px/22px var(--font-roboto);
  color: #898a8d;
  letter-spacing: -0.408px;
`;

const RowRight = styled.div`
  padding: 0 5px 0 0;
`;

const CountContainer = styled.div`
  width: 23px;
  height: 23px;
  background: #000000;
  border-radius: 5px;
  text-align: center;
`;

const Count = styled.span`
  font: normal normal 600 15px/22px var(--font-roboto);
  color: #ffffff;
  letter-spacing: -0.408px;
`;

const EnterSlotModal = ({ enter, setEnter }) => {
  const classes = useStyles();

  const entries = [
    {
      title: "Made a new post.",
      timestamp: "1m ago",
      count: 1,
    },
    {
      title: "Liked a post.",
      timestamp: "12:25 PM",
      count: 1,
    },
    {
      title: "100 likes received on vision.",
      timestamp: "10:33 AM",
      count: 5,
    },
  ];

  return (
    <Dialog
      onClose={() => {
        setEnter(false);
      }}
      // onClose={(_, reason) => {
      //   if (reason !== "backdropClick") {
      //     //  handleClose();
      //     setLive(false);
      //   }
      // }}
      aria-labelledby="simple-dialog-title"
      open={enter}
      PaperProps={{
        style: { borderRadius: 19 },
      }}
      classes={{
        paper: classes.dialog,
      }}
    >
      <Container>
        <Header>
          <CloseImg src="/images/close-grey.svg" />
          <Title>Live Slot</Title>
        </Header>

        <TopSection>
          <LeftSection>
            <ScheduleContainer>
              <ScheduleImg src="/images/schedule-red.svg" />
              <StartEndTime>
                Start <Time>12 PM</Time> - End <Time>2 PM</Time>
              </StartEndTime>
            </ScheduleContainer>

            <DescriptionContainer>
              <DescHeading>Get a chance to win 50 GTR</DescHeading>
              <SubDescription>
                Unlock tasks below to enter the daily reward giveaway
              </SubDescription>
            </DescriptionContainer>
          </LeftSection>

          <RightSection>
            <EndingIn>Ending in</EndingIn>
            <Timer>
              <HMSContainer>
                <TimeContainer>
                  <HMS>01</HMS>
                </TimeContainer>
                <HMSText>Hrs</HMSText>
              </HMSContainer>
              :
              <HMSContainer>
                <TimeContainer>
                  <HMS>44</HMS>
                </TimeContainer>
                <HMSText>Min</HMSText>
              </HMSContainer>
              :
              <HMSContainer>
                <TimeContainer>
                  <HMS>32</HMS>
                </TimeContainer>
                <HMSText>Sec</HMSText>
              </HMSContainer>
            </Timer>
          </RightSection>
        </TopSection>

        <CarouselContainer>
          <CaraousalComponent />
        </CarouselContainer>
      </Container>
    </Dialog>
  );
};

export default EnterSlotModal;
