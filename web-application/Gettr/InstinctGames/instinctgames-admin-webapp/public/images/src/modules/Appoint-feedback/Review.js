import React from "react";
import styled from "styled-components";
import {
  Star,
  Container,
  Img,
  TextBold,
  Text,
  CardRow,
  CardText,
  CardHeader,
  Heading,
  CardImg,
  CardRating,
  CardInfo,
  Text1,
} from "./Cardcss";

const data = {
  1: {
    name: "Lara Jones",
    imagePath: "favicon-228.png",
    appointmentDate: "1:30 PM, 26 Dec 2020",

    rating: 5,
    meetingOn: "Video calls",
  },
  2: {
    name: "Lara Jones",
    imagePath: "favicon-228.png",
    appointmentDate: "1:30 PM, 26 Dec 2020",

    rating: 5,
    meetingOn: "Video calls",
  },
};

export default function Review() {
  const Feedback = styled.p`
    padding-top: 10px;

    font: normal normal normal 16px/22px Nunito;

    color: #3E344B;
    opacity: 1;
    margin-bottom: 1px;
    text-align: justify;
    padding-right: 30px;
  `;

  return (
    <Container>
      {Object.values(data).map((item) => {
        return (
          <CardRow>
            <CardImg>
              <Img path={item.imagePath}></Img>
            </CardImg>
            <CardText>
              <TextBold>{item.name}</TextBold>
              <CardRating>
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
              </CardRating>
              <Feedback className="margin-top-10-px">
                What I find remarkable is that this text has been the industry's
                standard dummy text ever since some printer in the 1500s took a
                galley of type and scrambled it to make a type specimen book; it
                has survived not only four centuries of letter-by-letter
                resetting but even the leap into electronic typesetting,
                essentially unchanged except for an occasional 'ing' or 'y'
                thrown in. It's ironic that when the then-understood Latin was
                scrambled, it became as incomprehensible as Greek; the phrase
                'it's Greek to me' and 'greeking' have common semantic roots!”
                (The editors published his letter in a correction headlined
                “Lorem Oopsum”)
              </Feedback>
              <Text className="margin-top-10-px">{item.appointmentDate}</Text>
            </CardText>
          </CardRow>
        );
      })}
    </Container>
  );
}
