import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.margin ? `${props.margin}px` : "48px 0 0 0")};
  padding: 20px 20px;
  width: 100%;
  & > button {
    width: 100%;
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "")};
    height: ${(props) => (props.height ? props.height : "48px")};
    background: ${(props) => (props.whiteButton ? "#fff" : "#1e1e1e")};
    border-radius: 50px;
    color: ${(props) => (props.whiteButton ? "#1e1e1e" : "#fff")};
    font: ${(props) =>
      props.font ? props.font : "600 17px/22px var(--root-font)"};
    line-height: 22px;
    cursor: pointer;
    border: ${(props) => (props.whiteButton ? "1px solid #000000" : "none")};
    letter-spacing: -0.408px;
    &:disabled {
      opacity: ${(props) => (props.opacity ? props.opacity : "")};
    }
    :active {
      border: none;
    }
  }
`;
function ButtonComponent(props) {
  return (
    <ButtonContainer {...props}>
      <button
        onClick={props.clickHandler}
        disabled={props.disabled}
        type={props.type ? props.type : ""}
      >
        {props.children}
      </button>
    </ButtonContainer>
  );
}

export default ButtonComponent;
