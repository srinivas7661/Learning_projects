import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  & > button {
    width: 100%;
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "")};
    height: ${(props) => (props.height ? props.height : "48px")};
    background: ${(props) => (props.whiteButton ? "#fff" : "#1e1e1e")};
    border-radius: 50px;
    color: ${(props) => (props.whiteButton ? "#1e1e1e" : "#fff")};
    font: ${(props) => (props.font ? props.font : '600 17px/22px "Roboto"')};
    line-height: 22px;
    cursor: pointer;
    border: ${(props) => (props.border ? props.border : "1px solid #000000")};
    &:disabled {
      opacity: ${(props) => (props.opacity ? props.opacity : "")};
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
