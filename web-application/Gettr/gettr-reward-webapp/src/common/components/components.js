import { useEffect, useRef } from "react";
import styled from "styled-components";

export const HeadingContainer = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  img {
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
  p {
    font: normal 700 20px/22px "Roboto" !important;
    color: #000000;
    margin-bottom: 0px !important;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const PopupContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "613px")};
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 19px;
  padding: ${(props) => (props.padding ? props.padding : "")};
`;

export const ClickOutside = (props) => {
  const ref = useRef(null);
  const { oneClickOutside, children } = props;

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      oneClickOutside();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!children) {
    return null;
  }
  return <div ref={ref}>{children}</div>;
};