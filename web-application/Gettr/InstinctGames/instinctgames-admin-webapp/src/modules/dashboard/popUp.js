import React from "react";
import styled from "styled-components";

const PopBox = styled.div`
  width: 171px;
  /* height: 92px; */
  background: #21232a 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000f;
  border: 1px solid #333333;
  border-radius: 6px;
  position: absolute;
  margin-top: 140px;
  margin-right: 178px;
`;
const Box = styled.div`
  position: relative;
`;
const Popup = (props) => {
  return <>{props.content}</>;
};

export default Popup;
