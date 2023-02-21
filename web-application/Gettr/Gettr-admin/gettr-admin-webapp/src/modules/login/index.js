import React, { useState, useEffect } from "react";
import styled from "styled-components";
import validator from "validator";
import { history } from "../../managers/history";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;

const LogoDiv = styled.div`
  width: 228px;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: baseline;
  z-index: 10;
  margin-bottom: -30px;
  img {
    width: 96px;
    height: 38px;
  }
  h1 {
    font: 500 16px/22px var(--root-font);
    color: #070731;
    margin-bottom: 0px !important;
  }
`;

const LogDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 492px;
  height: 593px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 15px;
  h1 {
    font: normal 700 20px/22px var(--root-font);
    color: #50555c;
  }
  p {
    font: normal 600 14px/22px var(--root-font);
    color: #1e1e1e;
  }
`;
const MainDiv = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    text-align: center;
  }
`;

const FiledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  & > label {
    font: normal 600 14px/22px var(--root-font);
    color: #1e1e1e;
  }

  & > input {
    font: normal 400 16px/22px var(--root-font);
    color: #000000;

    border: none;
    background-color: transparent;
    cursor: pointer;
    border-bottom: 1px solid #dadada;
    &:focus {
      border: none;
      outline: none;
      border-bottom: 1px solid #52a5ff;
    }
    &:-webkit-autofill {
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
  & > img {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    max-width: 20px;
    height: 17.3px;
    margin-bottom: 5px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
  margin-top: 30px;
  justify-content: flex-end;

  & > h1 {
    font: normal 400 12px/22px var(--root-font);
    margin-bottom: 0px !important;
  }
`;

const ToggleBar = styled.div`
  background-color: ${(props) => (!props.isToggle ? "#52a5ff" : "#dadada")};
  width: 26px;
  height: 14px;
  border-radius: 40px;
  & > img {
    cursor: pointer;
    transform: ${(props) =>
      props.isToggle ? "translateX(-10%)" : "translateX(80%)"};
    display: block;
    background-color: white;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    box-shadow: 4px -4px 5px rgba(0, 0, 0, 0.05);
  }
`;
const ButtonComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 396px;
  background: #1e1e1e;
  border: 1px solid #000000;
  border-radius: 50px;
  font: normal 600 15px/22px var(--root-font);
  text-align: center;
  color: #ffffff;
  width: 396px;
  opacity: ${(props) => props.opacity};
`;

const ForgotPassword = styled.div`
  font: normal 400 12px/22px var(--root-font);
  color: #494949;
  text-align: center;
  margin-top: 15px;
`;

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    opacity: "",
    toggle: true,
    isBtnDisable: true,
  });
  const [viewPass, setViewPass] = useState(false);

  useEffect(() => {
    if (
      validator.isStrongPassword(inputFields.password) &&
      inputFields.email.length > 0
    ) {
      setInputFields((pre) => ({
        ...pre,
        isBtnDisable: true,
      }));
    } else {
      setInputFields((pre) => ({
        ...pre,
        isBtnDisable: false,
      }));
    }
  }, [inputFields.password, inputFields.email]);
  return (
    <Container>
      <LogoDiv>
        <img src="/images/gettrLogo.svg" alt="gettrlogo" />
        <h1>ADMIN</h1>
      </LogoDiv>
      <LogDiv>
        <MainDiv>
          <h1>Login</h1>

          <FiledContainer>
            <label htmlFor="email">Enter your Email ID</label>
            <input
              onChange={(e) => {
                setInputFields((pre) => ({ ...pre, email: e.target.value }));
              }}
              type="text"
              id="email"
              value={inputFields.email}
            />
          </FiledContainer>
          <div>
            <FiledContainer>
              <label htmlFor="password">Enter Password</label>
              <input
                onChange={(e) => {
                  setInputFields((pre) => ({
                    ...pre,
                    password: e.target.value,
                  }));
                }}
                type={viewPass ? "text" : "password"}
                value={inputFields.password}
              />
              {inputFields.password.length > 0 && (
                <img
                  onClick={() => setViewPass((prevState) => !prevState)}
                  src={
                    viewPass ? "/images/eyeOpen.svg" : "/images/eyeClose.svg"
                  }
                  alt="eyeIcon"
                />
              )}
            </FiledContainer>
            <ToggleContainer>
              <ToggleBar isToggle={inputFields.toggle}>
                <img
                  onClick={(e) => {
                    setInputFields((pre) => ({ ...pre, toggle: !pre.toggle }));
                  }}
                  src="/images/toggleCircle.svg"
                  alt="toggleCircle"
                />
              </ToggleBar>
              <h1>Remember me</h1>
            </ToggleContainer>
          </div>

          <div>
            <ButtonComponent
              onClick={() => history.push("/dashboard")}
              type="submit"
              opacity={inputFields.isBtnDisable ? "1" : "0.3"}
            >
              Login
            </ButtonComponent>
            <ForgotPassword>Forget Password</ForgotPassword>
          </div>
        </MainDiv>
      </LogDiv>
    </Container>
  );
};

export default Login;
