import React from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

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

const CaraousalComponent = () => {
  const carouselList = [
    {
      title: "Create new post",
      description:
        "Nullam ut condim urna. Cras dolor justo lorem ipsum dolor sit amet.",
      image: "/images/create-post.svg",
    },
    {
      title: "Create new likes",
      description: "You have to create 5 New post on trending topics",
      image: "/images/create-post.svg",
    },
    {
      title: "Create new vision",
      description: "Number of activities required.",
      image: "/images/create-post.svg",
    },
  ];

  return (
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
      className="w-100"
    >
      {carouselList.map((item, index) => (
        <CardItem key={index}>
          <img src={item.image} alt="" />
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button>Create</button>
          </div>
        </CardItem>
      ))}
    </Carousel>
  );
};

export default CaraousalComponent;
