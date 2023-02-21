import React from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingScreen(props) {
  const ParentContainer = styled.div`
    position: fixed;
    z-index: 5;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  `;

  const Container = styled.div`
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-size: 12px;
  `;
  const LoaderDiv = styled.div`
    display: flex;
    width: auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  `;
  return (
    <ParentContainer>
      <Container>
        <LoaderDiv>
          <TailSpin
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </LoaderDiv>
        {"Fetching user details"}
      </Container>
    </ParentContainer>
  );
}
