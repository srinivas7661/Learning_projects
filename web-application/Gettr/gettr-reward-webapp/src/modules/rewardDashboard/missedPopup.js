import React, { useState } from "react";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CaraousalComponent from "../modals/caraousal";
import EnterSlotModal from "./enterPopup";

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
  height: 247px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
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
  margin: 0 0 30px 0;
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
  width: 311px;
`;

const DescHeading = styled.div`
  font: normal normal 600 18px/22px var(--font-roboto);
  color: #000000;
  margin: 0 0 4px 0;
`;

const SubDescription = styled.div`
  font: normal normal 400 15px/17px var(--font-roboto);
  color: #49494a;
  width: 395px;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: space-evenly;
`;
const TakeButton = styled.div`
  width: 190px;
  height: 44px;
  background: #000000;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
  /* or 129% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.408px;
  justify-content: center;
  color: #ffffff;
`;
const GotItButton = styled.div`
  box-sizing: border-box;
  width: 190px;
  height: 44px;
  border: 1px solid #000000;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
  /* or 129% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.408px;
  justify-content: center;
  color: #000000;
`;

const RewardEnterModal = ({ missed, setMissed, enter, setEnter }) => {
  const classes = useStyles();

  const [take, setTake] = useState(false);

  return (
    <>
      <Dialog
        onClose={() => {
          setMissed(false);
          setEnter(false);
        }}
        // onClose={(_, reason) => {
        //   if (reason !== "backdropClick") {
        //     //  handleClose();
        //     setLive(false);
        //   }
        // }}
        aria-labelledby="simple-dialog-title"
        open={missed}
        PaperProps={{
          style: { borderRadius: 19 },
        }}
        classes={{
          paper: classes.dialog,
        }}
      >
        <Container>
          <TopSection>
            <LeftSection>
              <ScheduleContainer>
                <ScheduleImg src="/images/schedule-red.svg" />
                <StartEndTime>
                  <Time>12 PM</Time> - <Time>2 PM</Time>
                </StartEndTime>
              </ScheduleContainer>

              <DescriptionContainer>
                <DescHeading>You have missed this reward round.</DescHeading>
                <SubDescription>
                  However, you can still participate in the live round.
                </SubDescription>
              </DescriptionContainer>
            </LeftSection>
          </TopSection>

          <Buttons>
            <TakeButton
              onClick={() => {
                setMissed(false);
                setEnter(true);
              }}
            >
              Take me there
            </TakeButton>
            <GotItButton>Got it!</GotItButton>
          </Buttons>
        </Container>
      </Dialog>
    </>
  );
};

export default RewardEnterModal;
