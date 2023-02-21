import React from "react";
import { Container, Img, TextBold, Text, CardRow, CardText, CardHeader, Heading, CardImg } from "./CardTableCss";

const data = {
  1: {
    column1: "",
    column2: "Due in next 10 minutes",
    column3: "Alexa Appleseed",
  },
  2: {
    column1: "",
    column2: "Due in next 10 minutes",
    column3: "Alexa Appleseed",
  },
};

export default function PendingTable() {
  return (
    <Container>
      <CardHeader>
        <Heading>Upcoming Appointments</Heading>
      </CardHeader>
      {Object.values(data).map((item) => {
        return (
          <CardRow>
            <CardImg>
              <Img path="favicon-228.png"></Img>
            </CardImg>
            <CardText>
              <Text>{item.column2}</Text>
              <TextBold>{item.column3}</TextBold>
            </CardText>
          </CardRow>
        );
      })}
    </Container>
  );
}


