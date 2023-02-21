import React, { useState } from "react";
import WorldMap from "react-world-map";
import styled from "styled-components";
import "./index.css";

const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
  margin-bottom: 25px;
`;
const Wrapper = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 15px;
  width: 500px;
  height: 362px;
  padding-left:20px;
`;

function LocationMap() {
  const [selected, onSelect] = useState(["as","in"]);
  return (
    <div>
      <Heading>Location</Heading>
      <Wrapper>
        <WorldMap selected={selected} onSelect={onSelect} width="400px" />
      </Wrapper>
    </div>
  );
}

export default LocationMap;
