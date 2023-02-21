import React from "react";
import styled from "styled-components";
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
const Container = styled.div``;
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopBar = styled.div`
  padding-top: 40px;
  display: flex;
  width: 300px;
  height: 280px;
  flex-direction: column;
  background-color: #fffaf9;
  
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const MainContent = styled.div`
  background: #ffffff;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  border: 0.4px solid var(--unnamed-color-acacac);
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LightText = styled.div`
  font: bold 14px Nunito;
  color: #7d84c0;
  text-align: left;
  font: 16px/22px Nunito;
  margin-top: 45px;
`;
const BoldText = styled.div`
  font: normal normal bold 16px/22px Nunito;
  color: #5c4b75;
  letter-spacing: 0px;
  opacity: 1;
  margin-top: 2px;
`;

const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightblue;
  height: 100px;
  width: 100px;
  align-self: center;
`;
const Heading = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;
const TrackStatus = styled.div`
  color: #3e344b;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  opacity: 1;
  padding-left: 30px;
  height: 67px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.4000000059604645px solid #acacac;
  border-radius: 7px;
  opacity: 1;
  padding-top: 18px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const MiddleBar = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  background-color: #fff4f3;
  padding-left: 30px;
  padding-top: 10px;
`;
const EndBar = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  flex-direction: column;
  background-color: #fff4f3;
  padding-left: 30px;
  padding-top: 10px;
`;
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
const SampleIdDiv = styled.div`
  margin-top: 10px;
  color: #acacac;
`;
const Image = styled.img`
  width: 16px;
  height: 16px;
  margin: 5px 8px 4px 0px;
`;
const ViewReportButton = styled.button`
  background: ${(props) => (props.primary ? "#FFF4F3" : "#7D84C0")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  border-color: ${(props) => (props.primary ? "#5C4B75" : "#F6CB83")};
  color: #fff4f3;
  margin-left: 50px;
  text-align: center;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  opacity: 1;
  width: 133px;
  height: 34px;
  box-shadow: 0px 4px 5px #0000001c;
  border-radius: 5px;
`;
const StatusUpdate = styled.div`
  text-align: right;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #686868;
  opacity: 1;
  padding-right: 25px;
`;
const Processing = styled.div`
  display: flex;
`;
const Backbutton = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 20px;
  
`;
const Threedot = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 20px;
  
`;

const PlanButton = styled.button`
  background: ${(props) => (props.primary ? "#FFF4F3" : "#7D84C0")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  color: #fff4f3;
  text-align: center;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  opacity: 1;
  width: 106px;
  height: 29px;
  border-radius: 25px;
  margin-top: 21px;
  border: none;
`;
const SampleKit = styled.div`
  font-weight: bold;
  width: 160pt;
  display: flex;
  height: 19pt;
  margin-left: 30px;
  padding-top: 10px;
`;
const SampleKitText = styled.div`
  color: #acacac;
  margin-left: 5px;
`;

const PositionButton=styled.div`
display: flex;
justify-content: space-between;

`;
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
// ADDED CSS OF MEDIA QUARY IN ASSETS/STYLE/Custom.CSS
function SurwayRequestComponent() {
  return (
    <Container className="MainContainer">
      <SideBar className="SideBar">
        <Text>
          <TopBar className="TopBar">
            <PositionButton>

            <Backbutton className="Backbutton display-none-1025px" src="/images/backbutton.svg"></Backbutton>
            <Threedot className="Threedot display-none-1025px"  src="/images/threedot.svg"></Threedot>

            </PositionButton>
            
            <ProfileImage />
            <UserName>
              <BoldText>Alexa Appleseed</BoldText>
              <PlanButton className="PlanButton display-none-1025px">Silver Plan</PlanButton>
              <SampleIdDiv className="SampleIdDiv">
                Sample ID BM0325
              </SampleIdDiv>
              <SampleKit className= "SampleKit display-none-1025px" >
                10 <SampleKitText> of 8 Sample Kit Order</SampleKitText>
              </SampleKit>
            </UserName>
          </TopBar>
        </Text>

        <MiddleBar className="MiddleBar">
          <LightText className="LightText ">Sample Type</LightText>
          <BoldText className="BoldText">Mother's Stool Sample</BoldText>
          <LightText className="LightText ">Sample Event</LightText>
          <BoldText className="BoldText">First Trimseter (13th Week)</BoldText>
        </MiddleBar>
        <EndBar className="EndBar">
          <LightText className="LightText ">Event Date</LightText>
          <BoldText className="BoldText">10:00 AM, 5 Jan 2021</BoldText>
          <LightText className="LightText ">Order Date</LightText>
          <BoldText className="BoldText">10:30 AM, 5 Jan 2021</BoldText>
          <LightText className="LightText ">Pickup Address</LightText>
          <BoldText className="BoldText">
            56 Yio Chu Kang Road Singapur - 546080
          </BoldText>
        </EndBar>
      </SideBar>

      <MainContent className="MainContent">
        <Heading className="Heading">
          <BoldText>Status Updates</BoldText>
        </Heading>
        <TrackStatus>
          <Processing>
            <Image src="/images/tick.svg"></Image>
            In Transit
          </Processing>
          <StatusUpdate> Status Updated on 3:40 PM, 5 Jan</StatusUpdate>
        </TrackStatus>
        <TrackStatus>
          <Processing>
            <Image src="/images/tick.svg"></Image>
            Sample Received
          </Processing>
          <StatusUpdate> Status Updated on 3:40 PM, 5 Jan</StatusUpdate>
        </TrackStatus>
        <TrackStatus>
          <Processing>
            <Image src="/images/tick.svg"></Image>
            Processing
          </Processing>
          <StatusUpdate> Status Updated on 3:40 PM, 5 Jan</StatusUpdate>
        </TrackStatus>
        <TrackStatus>
          <Processing>
            <Image src="/images/tick.svg"></Image>
            Report Genrated
            <ViewReportButton>View Report</ViewReportButton>
          </Processing>
          <StatusUpdate> Status Updated on 3:40 PM, 5 Jan</StatusUpdate>
        </TrackStatus>
      </MainContent>
    </Container>
  );
}

export default SurwayRequestComponent;
