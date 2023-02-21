import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";

const Image = styled.img`
  width: 160px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const Box = styled.div`
  max-width: 720px;
  min-width: 410px;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 35px;
  margin-top: 35px;
  margin-bottom: 75px;
  box-shadow: 0px 4px 15px #00000012;
`;

const InputBox = styled.input`
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 4px 30px #00000012;
  border: 0.4000000059604645px solid #acacac;
  background-color: #ffffff;
  margin-bottom: 45px;
  padding: 9px 9px;
  // font-size: 12px;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  // letter-spacing: 0px;
  color: #ACACAC;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: #5c4b75;
  padding: 12px 0px;
  // color: #fff4f3;
  box-shadow: 0px 4px 30px #00000012;
  // font-size: 12px;
  margin-bottom: 16px;
  margin-top: 20px;
  background: #5C4B75 0% 0% no-repeat padding-box;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #FFF4F3;
`;

const Text = styled.div`
  margin-bottom: 5px;
  // font-size: 12px;
  // font-weight: 500;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  // letter-spacing: 0px;
  color: #ACACAC;
  // font-family: system-ui;
`;
const SignIn = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #acacac;
  margin-right: auto;
  margin-left: 45px;
`;
const Span = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #5c4b75;
  font-family: system-ui;
  cursor:pointer;
`;
const Heading = styled.h4`
  margin-bottom: 18px;
  // font-weight: 500;
  margin-top: 10px;
  // font-size: 16px;
  font: normal normal normal 16px/22px Nunito;
  color: #3E344B;
  text-align: center;
`;

const ParentContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff4f3;
  justify-content: center;
`;

function ForgotPasswordForm(props) {
  return (
    <ParentContainer>
      <Box>
        <Image src="/images/logo.svg"></Image>
        <Heading>Reset your password here</Heading>
        <Text>Email:</Text>
        <form onSubmit={(event) => props.forgotPassword(event)}>
          <InputBox onChange={(event) => props.handleChange("email", event.target.value)} type="email" name="email" required></InputBox>
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </form>
      </Box>
      <SignIn>
        Return to <Span onClick={() => history.push('/')}>Sign In</Span>
      </SignIn>
    </ParentContainer>
  );
}
export default ForgotPasswordForm;
