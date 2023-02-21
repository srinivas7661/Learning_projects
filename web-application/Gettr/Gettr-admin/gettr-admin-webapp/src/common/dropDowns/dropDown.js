import React from "react";
import styled from "styled-components";

const DropContainer = styled.section`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 9px;
  top: ${(props) => props.top};
  z-index: 2;
  left: ${(props) => props.left};
`;

function DropDownComponent({ width, height, top, left, children }) {
  return (
    <DropContainer
      width={width}
      height={height}
      top={top}
      left={left}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </DropContainer>
  );
}

export default DropDownComponent;
