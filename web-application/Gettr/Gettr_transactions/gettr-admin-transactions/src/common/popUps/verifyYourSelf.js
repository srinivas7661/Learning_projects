import React, { useState } from "react";
import styled from "styled-components";
import { OtpFormComponent } from "../components/components";

const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: white;
  height: 369px;
  width: 501px;
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
  color: #1e1e1e; ;
`;
const CloseImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
const AmountInput = styled.input`
  width: 370px;
  height: 48px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  font: normal 700 14px/22px "Roboto";
`;
const ContinueBtn = styled.button`
  border: none;
  font: normal 500 16px/22px "Roboto";
  width: 417px;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  color: white;
  margin: 60px auto 20px auto;
`;
const ParentContainer = styled.div`
  padding-top: 100px;
  position: fixed;
  z-index: 10;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 30px 15px 30px;
`;
const Hrline = styled.hr`
  border: 1px solid #e7e7e7;
  border-radius: 1px;
  margin-top: 10px !important;
`;
const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* padding: 30px; */
`;
const PasscodeParent = styled.div`
  margin: ${(props) =>
    props.margin ? `${props.margin} auto 0 auto` : "63px auto 0 auto"};
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
const WarnText = styled.p`
  font: normal 400 13px/22px "Roboto";
  text-align: center;
  span {
    color: #298fff;
  }
`;
const VerifyYourSelf = ({ setVerifyModal }) => {
  const [passcode, setPasscode] = useState(new Array(6).fill(""));

  return (
    <ParentContainer>
      <MintContainer>
        <Header>
          <Heading>Verify Yourself</Heading>
          <CloseImg
            src="/images/closeIcon.svg"
            alt="/"
            onClick={() => {
              setVerifyModal(false);
            }}
          />
        </Header>
        <Hrline></Hrline>
        <AmountContainer>
          <PasscodeParent margin={"20px"}>
            <Title marginBottom={"15px"}>Enter Passcode</Title>
            <OtpFormComponent
              value={passcode}
              onChange={(idx, val) =>
                setPasscode((prev) =>
                  prev.map((item, i) =>
                    String(i) === String(idx) ? val : item
                  )
                )
              }
            />
          </PasscodeParent>
        </AmountContainer>
        <ContinueBtn
          onClick={() => {
            setVerifyModal(false);
          }}
        >
          Freeze User
        </ContinueBtn>
        <WarnText>
          If you don’t set Passcode yet <span>Click here</span>
        </WarnText>
      </MintContainer>
    </ParentContainer>
  );
};

export default VerifyYourSelf;
