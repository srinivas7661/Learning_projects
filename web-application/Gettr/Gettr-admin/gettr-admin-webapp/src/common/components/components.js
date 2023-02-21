import { useEffect, useRef } from "react";
import styled from "styled-components";

export const BackIconContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: 11px;
  align-items: center;
  img {
    cursor: pointer;
    height: 12px;
    width: 13px;
  }
  p {
    letter-spacing: -0.408px;
    font: normal 700 20px/22px var(--root-font);
    margin: 0;
    color: #1e1e1e;
  }
`;
export const PopupContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "613px")};
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 19px;
  padding: ${(props) => (props.padding ? props.padding : "")};
`;
export const Container = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-flow: column;
  gap: 35px;
  margin: 35px 50px auto 50px;
`;

export const SearchAndFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 11px;
`;

export const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;

export const Avatar = styled.img`
  height: ${(props) => props.height || "35px"};
  width: ${(props) => props.width || "35px"};
  border-radius: ${(props) => props.borderRadius || "50%"};
`;

export const DummyImage = styled.section`
  height: ${(props) => props.height || "35px"};
  width: ${(props) => props.width || "35px"};
  background: ${(props) => props.background || "#DADADA"};
  border-radius: ${(props) => props.borderRadius || "50%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "350px")};
  width: 100%;
  height: 100%;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "150px")};
  background: ${(props) => (props.backGround ? props.backGround : "#fafafa")};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: ${(props) => props.padding};
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
