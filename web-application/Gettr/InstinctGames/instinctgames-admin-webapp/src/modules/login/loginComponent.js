import React from "react";
import { Column, Row } from "simple-flexbox";
import CustomInput from "../../common/components/CustomInput";
import styled from "styled-components";
import ErrorIcon from "@mui/icons-material/Error";

const MainComponent = styled.div`
  width: 100%;
  height: 100vh;
  background: #f0f0f6 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 236px;
  @media (max-width: 767px) {
    padding-top: 52px;
    padding-left: 23px;
    padding-right: 23px;
  }
`;

const LoginComponent = styled.div`
  padding-top: 236px;
  width: 541px;
  height: 327px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 38px 31px 26px 28px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SignFont = styled.div`
  text-align: center;
  font: normal normal 600 18px/22px Barlow;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
`;
const Button = styled.button`
  top: 236px;
  width: 482px;
  height: 38px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  font: normal normal 16px/19px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  margin: 10px 0px 11px 0px;
  border: none;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ForgotFont = styled.div`
  text-align: right;
  font-style: Barlow;
  letter-spacing: 0px;
  font-size: 12px;
  font-weight: 500;
  color: #6874e8;
  opacity: 1;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 177px;
  height: 39px;
  margin: 0px 0px 32px 0px;
`;
const Error = styled.div`
  // float: right;
  margin-top: -62px;
  margin-right: 5px;
  color: red;
  text-align: end;
  margin-bottom: 30px;
`;
const ErrorBox = styled.div`
  float: right;
  margin-top: -62px;
  margin-right: 5px;
  color: red;
  // text-align: end;
  // margin-bottom: 30px;
`;
const AuthErrorBox = styled.div`
  text-align: center;
  margin-right: 5px;
  color: red;
  // text-align: end;
  // margin-bottom: 30px;
`;
const CustomInputEmail = styled(CustomInput)`
  margin-top: 36px !important;
  border: #dfe1e6 !important;
  padding-left:16px;
`;
const CustomInputPassword = styled(CustomInput)`
  margin-top: 20px !important;
  border: #dfe1e6;
  padding-left:16px;
`;
const ColumnForm = styled(Column)`
  width: 482px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

function LoginForm(props) {
  let { state, onChangeEvent, onLoginClicked } = props;

  return (
    <MainComponent>
      <Icon src="/images/logo (1).svg" className="btn"></Icon>
      <LoginComponent>
        <ColumnForm>
          <form onSubmit={onLoginClicked}>
            <SignFont>Sign in to your account</SignFont>
            <CustomInputEmail
              id="email"
              type="text"
              placeholder="Email"
              value={state ? state.email : ""}
              onChange={onChangeEvent}
              error={state ? state.emailError : ""}
              className="input-box no-autofill-bkg"
            />
            <CustomInputPassword
              id="password"
              placeholder="Password"
              type={state && state.isPasswordVisible ? "text" : "password"}
              value={state ? state.password : ""}
              onChange={onChangeEvent}
              error={state ? state.passwordError : ""}
              className={`${"input-box"} ${
                state.passwordError ? "invalid fontColorRed" : ""
              }`}
            />
            {state.passwordError ? (
              <Error>{state.passwordError ? <ErrorIcon /> : ""}</Error>
            ) : (
              <ErrorBox>{state.passwordError ? <ErrorIcon /> : ""}</ErrorBox>
            )}
            <AuthErrorBox>{state.authError}</AuthErrorBox>
            <Button type="submit">Sign in</Button>
            <ForgotFont onClick={props.togglePasswordPopup}>
              Forgot Password?
            </ForgotFont>
          </form>
        </ColumnForm>
      </LoginComponent>
    </MainComponent>
  );
}

export default LoginForm;
