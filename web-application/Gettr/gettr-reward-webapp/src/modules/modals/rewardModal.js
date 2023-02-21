import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Carousel from "react-elastic-carousel";
import Modal from "../../common/modal";

const carouselList = [
  {
    title: "Create new post",
    description:
      "Nullam ut condim urna. Cras dolor justo lorem ipsum dolor sit amet.",
    image: "/images/newFile.svg",
  },
  {
    title: "Create new likes",
    description: "You have to create 5 New post on trending topics",
    image: "/images/newFile.svg",
  },
  {
    title: "Create new vision",
    description: "Number of activities required.",
    image: "/images/newFile.svg",
  },
];

const TitleSection = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  > p {
    font: 400 15px/22px "Roboto";
    > span {
      font: 700 15px/22px "Roboto";
    }
  }
`;

const GridLayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > h3 {
    font: 600 18px/22px "Roboto";
    grid-row: 3;
    grid-column: 1 / span 2;
  }
`;

const TimerContainer = styled.section`
  width: 126px;
  height: 68px;
  border: 1px solid #e7e7e7;
  border-radius: 9px;
  grid-row: 1 / span 3;
  > h3 {
    font: 600 11px/22px "Roboto";
    color: #50555c;
    text-align: center;
  }
  > div {
    display: flex;
    justify-content: space-evenly;
    span {
      width: 28px;
      height: 22px;
      font: 400 11px/22px "Roboto";
      color: #adb3bc;
      text-align: center;
      &:first-of-type {
        background-color: #e7e7e7;
        border-radius: 4px;
        color: #000;
        font: 600 16px/22px "Roboto";
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      &:nth-child(2) {
        position: relative;
      }
      &:nth-child(2):before,
      &:nth-child(2):after {
        content: ":";
        position: absolute;
      }
      &:nth-child(2):before {
        left: -7px;
      }
      &:nth-child(2):after {
        right: -7px;
      }
    }
  }
`;

const CardItem = styled.div`
  margin-top: 20px;
  color: #ffffff;
  background: linear-gradient(
    108.01deg,
    #40d1fe 11.36%,
    #71b5fd 28.08%,
    #9c90ec 62.27%
  );
  border-radius: 14px;
  width: 100%;
  height: 160px;
  padding: 18px 16px 0;
  display: flex;
  align-items: center;
  h3 {
    font: 600 17px/22px "Roboto";
  }
  p {
    font: 400 13px/16px "Roboto";
  }
  button {
    margin-top: 23px;
    width: 115px;
    height: 27px;
    background-color: #000000;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
  }
`;

const DotContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 11px;
  margin-top: 1rem;
`;

const Dot = styled.p`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "#000" : "transparent")};
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 13px;
  padding: 26px 32px 13px;
  border-bottom: 1px solid #e7e7e7;
  h1 {
    font: 600 18px/22px "Roboto";
    color: #000;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const ContentLayer = styled.div`
  padding: 23px 32px;
  > p {
    color: #49494a;
    font: 400 15px/17px "Roboto";
    margin-top: 4px;
    text-align: left;
  }
`;

function UpcomingRewardModal({ setView }) {
  const [timer, setTimer] = useState(20);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((pre) => pre - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const getFormatter = (type) => {
    const time = {
      hour: moment.duration(timer, "s").hours(),
      minute: moment.duration(timer, "s").minutes(),
      second: moment.duration(timer, "s").seconds(),
    };
    if (time[type] < 10) return `0${time[type]}`;
    return time[type];
  };

  return (
    <Modal width={460} height={420} close={setView}>
      <TitleContainer>
        <img
          onClick={() => setView(false)}
          src="/images/close.svg"
          alt="close"
        />
        <h1>Live Slot</h1>
      </TitleContainer>
      <ContentLayer>
        <GridLayer>
          <TitleSection>
            <img src="/images/timer.svg" alt="/" />
            <p>
              Start <span>12 PM</span> - End <span>2 PM</span>
            </p>
          </TitleSection>
          <h3>Get a chance to win 50 GTR</h3>
          <TimerContainer>
            <h3>Ending in</h3>
            <div>
              <div>
                <span>{getFormatter("hour")}</span>
                <span>Hrs</span>
              </div>
              <div>
                <span>{getFormatter("minute")}</span>
                <span>Min</span>
              </div>
              <div>
                <span>{getFormatter("second")}</span>
                <span>Sec</span>
              </div>
            </div>
          </TimerContainer>
        </GridLayer>
        <p>
          Unlock tasks below to enter the daily
          <br /> reward giveaway
        </p>
        <Carousel
          initialActiveIndex={1}
          showArrows={false}
          renderPagination={({ pages, activePage, onClick }) => {
            return (
              <DotContainer direction="row">
                {pages.map((page) => {
                  const isActivePage = activePage === page;
                  return (
                    <Dot
                      key={page}
                      onClick={(e) => {
                        // e.stopPropagation();
                        onClick(page);
                      }}
                      active={isActivePage}
                    />
                  );
                })}
              </DotContainer>
            );
          }}
        >
          {carouselList.map((item, index) => (
            <CardItem key={index}>
              <img src={item.image} alt="/" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button>Create</button>
              </div>
            </CardItem>
          ))}
        </Carousel>
      </ContentLayer>
    </Modal>
  );
}

export default UpcomingRewardModal;
