/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  OtpFormComponent,
} from "../../common/components/components";
import ButtonComponent from "../../common/components/button";
import { history } from "../../managers/history";

const OtpSentToEmail = styled.div`
  font: 400 14px/22px var(--root-font);
  color: #1e1e1e;
  display: flex;
  justify-content: center;
  margin-top: 91px;
  span {
    font-weight: 700;
  }
`;

const PasscodeParent = styled.div`
  margin: 63px auto 0 auto;
  width: 100%;
  max-width: 396px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font: ${(props) => props.font || "700 16px/22px var(--root-font)"};
  color: ${(props) => props.color || "#1e1e1e"};
  margin-top: ${(props) => props.marginTop || ""};
  text-align: ${(props) => props.textAlign || ""};
`;

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
`;
const OtpNotReceived = styled.div`
  font: normal 400 14px/22px "Roboto";
  letter-spacing: -0.408px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0px 0px 0px;
  color: #1e1e1e;
`;

function EnterOtp() {
  const [password, setPassword] = useState(new Array(6).fill(""));
  return (
    <MainContainer>
      <Container>
        <LogoDiv>
          <img src="/images/logo_new.svg" alt="" />
        </LogoDiv>
        <OtpSentToEmail>
          Enter the OTP sent to the email ID : &nbsp;
          <span>johnappleseed@gettr.com</span>
        </OtpSentToEmail>
        <PasscodeParent>
          <Title>Enter OTP</Title>
          <OtpFormComponent
            value={password}
            onChange={(idx, val) =>
              setPassword((prev) =>
                prev.map((item, i) => (String(i) === String(idx) ? val : item))
              )
            }
          />
        </PasscodeParent>
        <OtpNotReceived>
          Haven’t recieve the OTP. &nbsp;<a href="#">Click here</a>&nbsp; to
          send again.
        </OtpNotReceived>
        <ButtonComponent
          clickHandler={() => history.push("/enter-passcode")}
          maxWidth={396}
          margin={"26px 0 0 0"}
          disabled={password.join("").length < 6}
          opacity={password.join("").length < 6 ? "0.3" : ""}
        >
          Next
        </ButtonComponent>
      </Container>
    </MainContainer>
  );
}

export default EnterOtp;
