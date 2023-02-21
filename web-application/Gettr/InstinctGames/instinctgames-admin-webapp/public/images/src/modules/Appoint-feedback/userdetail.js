import React from "react";
import styled from "styled-components";


const Layerp = styled.div`
  display:flex;`;

const Path = styled.div`
 margin-left:210px;
`;
const Layer = styled.div`
margin-left:8px;`;
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1025px)  { 
    flex-direction:row;
    margin:0;
  }
`;
const TopBar = styled.div`
  padding-top: 10px;
  display: flex;
  width:250px;
  height: auto;
  flex-direction: column;
  background-color: #fffaf9;
  @media (max-width: 1025px)  { 
    flex-direction:column;
    width: 32%;
    margin:0;
  }
`;
const BottomBar = styled.div`
  display: flex;
  width: 250px;
  height: px;
  flex-direction: column;
  background-color: #fff4f3;
  justify-content: center;
  padding-left: 30px;
  @media (max-device-width: 1025px) { 
    flex-direction:column;
    justify-content:center;
    width:34%;
  }

 
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 30px;
  padding: 10px;
  color: #5c4b75;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;


const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LightText = styled.div`
  font: bold 14px Nunito;
  color: #5c4b75;
  padding-top: 7%;
  color: #7d84c0;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #7d84c0;
  opacity: 1;
  padding-bottom: 10px;
`;
const Bio = styled.div`
  color: #5c4b75;
  text-align: left;
  font: normal normal normal 12px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  padding-right: 15px;
`;

const Id = styled.div`
  color: #acacac;
  text-align: center;
  font: normal normal normal 14px/22px Nunito;
  letter-spacing: 0px;
  color: #acacac;
  opacity: 1;
  padding-top: 10px;
`;
const BoldText = styled.div`
  font: bold 14px Nunito;

  color: #5c4b75;
  text-align: left;
  font: normal normal bold 13px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;
const Stardiv = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 25px;
`;
const Star = styled.div`
  margin-left: 10px;
`;
const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightblue;
  height: 100px;
  width: 100px;
  align-self: center;
`;
const Header = styled.div`
  padding-top: 30px;
  padding-left: 30px;
`;


const Logo = styled.img`
  height: 100px;
`;

const doctorList = () => {
  return (

    <SideBar className="sidebar">

      <TopBar>

        <Layerp>
          <Layer>
            <img src="images/Layer 2.svg" />
          </Layer>
          <Path>
            <img src="images/path 118.svg" />
          </Path>
        </Layerp>
        <ProfileImage />
        <UserName>
          <BoldText>Dr.John Doe</BoldText>
          <Id>BHC0023</Id>
        </UserName>

        <Stardiv>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
        </Stardiv>

      </TopBar>

      <BottomBar>
        <LightText>Status</LightText>
        <BoldText>Active</BoldText>
        <LightText>Phone Number</LightText>
        <BoldText>+1 857 452 1254</BoldText>
        <LightText>Email</LightText>
        <BoldText>holly.higgins@gmail.com</BoldText>
        <LightText>Website</LightText>
        <BoldText>www.hollyfisherhiggins.com</BoldText>

      </BottomBar>
      <BottomBar>
        <LightText>Specialization</LightText>
        <BoldText>Wellness</BoldText>
        <LightText>Bio</LightText>
        <Bio>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you
          need to be sure there isn't anything embarrassing hidden in the
          middle of text.
        </Bio>
      </BottomBar>
    </SideBar>

  );
};
export default doctorList;
