import React from "react";
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
  Text1, TextMeeting,
} from "./CardTableCss";

const data = {
  1: {
    name: "Lara Jones",
    imagePath: "favicon-228.png",
    appointmentDate: "1:30 PM, 26 Dec 2020",
    completedDate: "1:48 PM ,26 Dec 2020",
    rating: 5,
    meetingOn: "Video calls",
  },
  2: {
    name: "Lara Jones",
    imagePath: "favicon-228.png",
    appointmentDate: "1:30 PM, 26 Dec 2020",
    completedDate: "1:48 PM ,26 Dec 2020",
    rating: 5,
    meetingOn: "Video calls",
  },
  3: {
    name: "Lara Jones",
    imagePath: "favicon-228.png",
    appointmentDate: "1:30 PM, 26 Dec 2020",
    completedDate: "1:48 PM ,26 Dec 2020",
    rating: 5,
    meetingOn: "Audio calls",
  },
};

export default function Pastappoint() {
  return (
    <Container>
      <CardHeader>
        <Heading>Past Appointments</Heading>
      </CardHeader>
      <div className="display-block display-none-web">
        {Object.values(data).map((item) => {
          return (
            <CardRow>
              <CardImg>
                <Img path={item.imagePath}></Img>
              </CardImg>
              <CardText>
                <Text>{item.appointmentDate}</Text>
                <TextBold>{item.name}</TextBold>
                <TextMeeting>{item.meetingOn}</TextMeeting>
              </CardText>
              <CardInfo>
                <Text1>Completed on {item.completedDate} </Text1>
              </CardInfo>
              <CardRating>
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
                <Star path="images/star.svg" />
              </CardRating>
            </CardRow>
          );
        })}
      </div>
      <div className="display-none display-block-tab">
        {Object.values(data).map((item) => {
          return (
            <CardRow>
              <CardImg>
                <Img path={item.imagePath}></Img>
              </CardImg>
              <CardText>
                <Text>{item.appointmentDate}</Text>
                <TextBold>{item.name}</TextBold>
                <TextMeeting>{item.meetingOn}</TextMeeting>
              </CardText>
              <div className="margin-left-auto">
                <CardText>
                  <Text1>Completed on {item.completedDate}</Text1>
                  <div className="margin-left-auto margin-right-10-px">
                    <Star path="images/star.svg" />
                    <Star path="images/star.svg" />
                    <Star path="images/star.svg" />
                    <Star path="images/star.svg" />
                    <Star path="images/star.svg" />
                  </div>
                </CardText>
              </div>
            </CardRow>
          );
        })}
      </div>
    </Container>
  );
}
