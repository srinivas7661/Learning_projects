import React from "react";
import styled from "styled-components";

export default function LoginAuth(props) {
  const Container = styled.div`
    width: 464px;
    height: auto;
    justify-content: center;
    padding-bottom: ${(props) => (props.padding ? props.padding : "")};
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  `;

  const OtpSentToEmail = styled.div`
    font: 400 14px/22px var(--root-font);
    color: #1e1e1e;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
    span {
      font-weight: 700;
    }
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

  return (
    <MainContainer>
      <Container>
        <LogoDiv>
          <img src="/images/logo_new.svg" alt="" />
        </LogoDiv>
        <OtpSentToEmail>
          {
            "User is not authorized to access the portal. Please contact your administrator."
          }
        </OtpSentToEmail>
      </Container>
    </MainContainer>
  );
}
