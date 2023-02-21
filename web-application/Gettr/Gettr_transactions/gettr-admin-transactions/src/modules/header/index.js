import React from "react";
import styled from "styled-components";

export default function Header() {
  const Container = styled.div`
    width: 100%;
  `;
  const MainContainer = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #161616;
  `;

  const Logo = styled.img`
    padding-left: 17.5%;
    width: auto;
    max-width: 24%;
  `;

  const GovDiv = styled.div`
    display: flex;
    flex-flow: column-reverse;
    align-items: flex-end;
    padding-bottom: 2px;
  `;

  const GovernanceLogo = styled.img`
    padding-left: 3px;
    width: 60px;
  `;

  return (
    <Container>
      <MainContainer>
        <Logo src="/images/gettr-logo.svg" alt="" />
        <GovDiv>
          <GovernanceLogo src="/images/transactions.svg" alt="gov" />
        </GovDiv>
      </MainContainer>
    </Container>
  );
}
