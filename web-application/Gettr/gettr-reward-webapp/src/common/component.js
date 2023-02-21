import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  justify-content: center;
  margin: 20px auto auto auto;
  padding-bottom: ${(props) => (props.padding ? props.padding : "")};
`;

export const BackIconContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: 11px;
  align-items: center;
  img {
    cursor: pointer;
    height: 30px;
  }
  p {
    letter-spacing: -0.408px;
    font: 700 20px/22px "Roboto";
    color: #000000;
    margin: 0;
  }
`;
