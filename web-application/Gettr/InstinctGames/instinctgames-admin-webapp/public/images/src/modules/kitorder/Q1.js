import React from "react";
import Q3 from "./Q3";
import Q4 from "./Q4";
import { Container, Q1, CardHeader, Bold, Light, T2, Image, Select, Card, ImageDiv } from "./cardss";
import { Right } from "./Rightcard";
import styled from "styled-components";
import { Q2 } from "./Q2";

const Card1 = () => {
  return (
    <Card>
      <ImageDiv>
        <Image className="grid" src="images/grid.svg"></Image>
      </ImageDiv>

      <CardHeader>
        <Q1 className="Q1css">
          <Bold>
            <text>Q1</text>
          </Bold>
          <Light className="Light">
            <T2 className="T2"> Lorem ipsum dolor amet, consectetur adipiscing elit?</T2>
          </Light>

          <Select className="select" data-img_src="images/file.svg">
            <img src="images/add.svg" />
            <option value="" hidden>
              Short Answer &emsp;
            </option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option data-icon="glyphicon-glass">Option3</option>
          </Select>
        </Q1>
      </CardHeader>
    </Card>
  );
};

export default function Pastappoint() {
  const Secdiv = styled.div`
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: "20px"
  marginLeft:20px;
  
  `;
  return (
    <div className="sec-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent:"center",
        }}
      >
        <Container>
          <Card1 />
          <Q2 />
          <Q3 />
          <Q4 />
        </Container>
        <div>
          <Right />
        </div>

      </div>
    </div>
  );
}
