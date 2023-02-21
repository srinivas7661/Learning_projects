import React from "react";
import styled from "styled-components";
import { PopupContainer } from "../../common/components/components";
import Modal from "../../common/components/modal";

const NextButton = styled.button`
  color: #ffffff;
  border: none;
  width: 100%;
  height: 48px;
  background: #1e1e1e;
  border: 1px solid #000000;
  border-radius: 50px;
  font: normal 600 17px/22px "Roboto";
  letter-spacing: -0.408px;
  color: #ffffff;
`;
const Heading = styled.h1`
  font: normal 600 20px/22px "Roboto";
  text-align: center;
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;
const Description = styled.p`
  font: normal 400 16px/22px "Roboto";
  text-align: center;
  color: #50555c;
`;
const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Features = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 27px;
    p {
      font: normal 300 20px/23px "Roboto";
      letter-spacing: -0.408px;
      color: #1e1e1e;
      text-align: center;
    }
    span {
      font-weight: 600;
    }
  }
`;
function RewardHome({ open, closeModal }) {
  return (
    <Modal
      open={open}
      handleClose={() => {
        closeModal(true);
      }}
    >
      <PopupContainer height="522px" width="575px" padding="35px">
        <Content>
          <Heading>Introducing GETTR Rewards</Heading>
          <Description>
            Introducing the GETTR PAY Rewards program, where you can participate
            and have the chance to win 12 times a day! Don't miss out on this
            opportunity to earn rewards and redeem it.
          </Description>
          <Features>
            <div>
              <img src="/images/calender.svg" height={82} width={79} alt="" />
              <p>
                Win upto
                <br />
                <span>12X a day</span>
              </p>
            </div>
            <div>
              <img
                src="/images/scratchCard.svg"
                height={82}
                width={79}
                alt=""
              />
              <p>
                Redeem your
                <br />
                <span>Rewards</span>
              </p>
            </div>
            <div>
              <img src="/images/privacy.svg" height={82} width={79} alt="" />
              <p>
                Maintain your
                <br />
                <span>Privacy</span>
              </p>
            </div>
          </Features>
          <NextButton
            onClick={() => {
              closeModal(false);
              localStorage.setItem("INTRO", true);
            }}
          >
            Get Started
          </NextButton>
        </Content>
      </PopupContainer>
    </Modal>
  );
}

export default RewardHome;
