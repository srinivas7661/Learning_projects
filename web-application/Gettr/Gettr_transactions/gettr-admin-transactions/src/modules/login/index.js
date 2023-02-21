import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";

export default function ActiveWallet() {
  return (
    <>
      <DashboardDiv>
        <DashboardText>
          Sign-in with your gettr-org-4478798 account to access Okta Dashboard
        </DashboardText>
      </DashboardDiv>
      <ContentContainer>
        <SubContainer>
          <LoginDiv>
            <LoginContainer>
              <LogoDiv>
                <Logo src="/images/logo_new.svg" alt="" />
              </LogoDiv>
              <CenterDiv>
                <Text>Sign In</Text>
              </CenterDiv>
              <Input>
                <Text>Username</Text>
                <EmailDiv />
                <FlexDiv>
                  <CheckBox type="checkbox" />
                  <LightText>Keep me signed in</LightText>
                </FlexDiv>
                <ButtonDiv onClick={() => history.push("/dashboard/gettr-transactions")}>
                  Next
                </ButtonDiv>
                <LightText>Help</LightText>
              </Input>
            </LoginContainer>
          </LoginDiv>
        </SubContainer>
      </ContentContainer>
      <Footer>Privacy Policy</Footer>
    </>
  );
}

const DashboardDiv = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  font-size: 14px;
  font-weight: 400;
  color: #666363;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  font-size: 14px;
  font-weight: 400;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 7px;
  color: #666363;
`;

const DashboardText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  padding-top: 4%;
`;

const CheckBox = styled.input`
  margin-right: 10px;
  margin-left: 1px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #666363;
  padding-bottom: 2%;
`;

const LightText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #666363;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 60px;
  height: 50px;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2%;
  padding-bottom: 5%;
  border-bottom: 1px solid #e7e7e7;
`;

const SubContainer = styled.div`
  width: 100%;
  padding-top: 7%;
  padding-bottom: 8%;
  background-color: #0000000d;
`;

const LoginContainer = styled.div`
  width: 23%;
  min-height: 200px;
  height: 100%;
  background-color: white;
  padding-bottom: 2%;
  filter: drop-shadow(2px 2px 5px #0000000d);
`;

const LoginDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;
const EmailDiv = styled.input`
  display: flex;
  width: 100%;
  height: 25px;
  border: 2px solid #f3f3f4;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 2px;
  &:focus {
    opacity: 1;
    transform: scale(1);
    box-shadow: inset 0 0 0 0.5px #fff, 0 0 0 0.5px #fff,
      0.5px -0.5px 3px #66c0c9, -0.5px 0.5px 3px #108dd1;
    outline: none;
    border: 0px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  color: white;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  background-color: #c7162a;
  margin-top: 9%;
  cursor: pointer;
`;

const Input = styled.div`
  width: 100%;
  padding-top: 5%;
  padding-left: 12%;
  padding-right: 12%;
`;
