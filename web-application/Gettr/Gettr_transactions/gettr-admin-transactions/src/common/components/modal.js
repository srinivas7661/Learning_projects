import React from "react";
import styled from "styled-components";
import { ClickOutside } from "./components";

const ParentContainer = styled.div`
  position: fixed;
  z-index: 5;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
`;

const Container = styled.div`
  margin: auto;
  width: fit-content;
  margin-top: ${(props)=> props.marginTop ? props.marginTop : ""};
`;

const Modal = (props) => {
  return props.open ? (
    <ParentContainer>
      <Container marginTop={props.marginTop}>
        <ClickOutside oneClickOutside={props.handleClose}>
          {props.children}
        </ClickOutside>
      </Container>
    </ParentContainer>
  ) : (
    ""
  );
};

export default Modal;
