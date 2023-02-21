import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;
const PopupDiv = styled.div`
  width: 500px;
  height: 800px;
  border-right: 25px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`;
const Result = styled.h1`
  color: ${(props) => props.color};
`;

const ResultPopup = (props) => {
  return (
    <Container>
      <PopupDiv>
        <p
          onClick={() => {
            props.setModal(false);
          }}
        >
          X
        </p>
        <Result color={props.color}>{props.winText}</Result>
      </PopupDiv>
    </Container>
  );
};

export default ResultPopup;
