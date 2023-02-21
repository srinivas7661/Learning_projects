import React from 'react';
import styled from "styled-components";
import {OtpFormComponent } from "../../common/components/components";
import ButtonComponent from '../../common/components/button';

const ParentContainer = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 19px;
  width: ${(props) => props.width ? props.width : "613px" };
  height: ${(props) => props.height ? props.height : "307px" };
  padding: 5px;
`;
const MintContainer = styled.div`
    display: flex;
    flex-direction: column;
    `;
const Heading = styled.div`
    font: normal 700 16px/22px 'Roboto';
    `;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 30px 15px 30px;
`;
const Hrline = styled.hr`
  border: 1px solid #E7E7E7;
  border-radius: 1px;
  margin-top: 10px !important;
`;

const CloseImg = styled.img`
cursor: pointer;
`;
const OtpNotReceived = styled.div`
    font: normal 400 14px/22px 'Roboto';
    letter-spacing: -0.408px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0px 0px 0px;
    color: #1E1E1E;
`;
const OtpSentToEmail = styled.div`
  font: 400 14px/22px var(--root-font);
  color: #1e1e1e;
  display: flex;
  justify-content: center;
  margin-top: 26px;
  span{
    font-weight: 700;
  }
`;
const PasscodeParent = styled.div`
  margin: ${(props) => props.margin ? `${props.margin} auto 0 auto` : "63px auto 0 auto"};
  width: 100%;
  max-width: 396px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font: ${(props) => props.font || "700 16px/22px var(--root-font)"};
  color: ${(props) => props.color || "#1e1e1e"};
  margin-top: ${(props) => props.marginTop || ""};
  margin-bottom: ${(props) => props.marginBottom || ""};
  text-align: ${(props) => props.textAlign || ""};
`;
function commonEnterOtp({
      setPopupScreen,
      setMintModal,
      setEnterOTP,
      setOtp,
      otp
    }) {
    return (
        <ParentContainer height="476px" width='507px'>
        <MintContainer>
          <Header>
            <Heading>Enter OTP</Heading>
            <CloseImg src="/images/closeIcon.svg" alt="/" onClick={() => setMintModal((pre) => ({ ...pre, airDrop: false }))}/>
          </Header>
          <Hrline></Hrline>
          <OtpSentToEmail>
              Enter the OTP sent to the email ID : &nbsp;<span>johnappleseed@gettr.com</span>
          </OtpSentToEmail>
          <PasscodeParent>
              <Title>Enter OTP</Title>
              <OtpFormComponent
                  value={otp}
                  onChange={(idx, val) =>
                    setOtp((prev) =>
                      prev.map((item, i) => (String(i) === String(idx) ? val : item))
                      )
                  }
                  />
          </PasscodeParent>
          <OtpNotReceived>
              Haven’t recieve the OTP. &nbsp;<a href='#'>Click here</a>&nbsp; to send again.
          </OtpNotReceived>
          <ButtonComponent
              clickHandler={()=>{setEnterOTP((pre) => !pre); setPopupScreen((pre) => !pre)}}
              maxWidth={396}
              margin={"26px 0 0 0"}
              disabled={ otp.join("").length < 6 }
              opacity={otp.join("").length < 6 ? "0.3" : ""}
              whiteButton={'#FC223B'}
          >
               Next
          </ButtonComponent>
        </MintContainer>
      </ParentContainer>
    );
}

export default commonEnterOtp;