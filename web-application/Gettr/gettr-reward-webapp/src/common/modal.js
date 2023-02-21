import React from "react";
import styled from "styled-components";

const ModalBackground = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

const ModalContainer = styled.div`
  margin: 83px auto;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 19px;
`;

export default function Modal({ width, height, children, close }) {
  return (
    <ModalBackground onClick={() => close(false)}>
      <ModalContainer
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContainer>
    </ModalBackground>
  );
}
