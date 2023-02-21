
import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { history } from "../../managers/history";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  flex-direction: row;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 350px;
  }
`;
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  width: 100%;
  height: 100%;
  @media (max-width: 1024px) {
    display: flex;
    max-width: 100%;
    width: 100%;
    flex-direction: row;
  }
  /* @media (min-width: 1024px) {
    min-width: 100%;
  } */
`;
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 300px;
  width: 100%;
  min-height: 330px;
  flex-direction: column;
  background-color: #fffaf9;
  padding: 20px;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column row;
    height: 350px;
  }
`;

const BottomBar = styled.div`
  display: flex;
  max-width: 300px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #fff4f3;
  @media (max-width: 1024px) {
    flex-direction: row;
    max-width: 100%;
    height: 350px;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

const LightText = styled.div`
  display: flex;
  font: normal normal normal 16px/22px Nunito;
  color: #7d84c0;
  opacity: 1;
  margin-top: 10px;
  word-break: break-all;
`;
const BoldText = styled.div`
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  color: #5c4b75;
  opacity: 1;
  margin-top: 5px;
  margin-bottom: 15px;
  word-break: break-all;
`;


const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  height: 113.39px;
  width: 113.39px;
  align-self: center;
  justify-content: center;
`;
const Navigator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 1024px){
    display: none;
  }
`

const DetailComponent = styled.div`
display: flex;
padding: 40px 0 0 40px;
flex-flow: column;
width: 100%;
height: 100%;
overflow: auto;
@media (min-width: 1024px){
    padding: 0 0 0 40px;
  }
`

const MemberImage = styled.img`
height: 45px;
border-radius: 50%;
width: 45px;
`;

const MemberDummyImage = styled.div`
height: 45px;
border-radius: 50%;
background: grey;
width: 45px;
`;


const MemberName = styled.div`
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  color: #5c4b75;
  opacity: 1;
  margin-top: 5px;
  font-size: 16px;
  word-break: break-all;
`;

const MemberType = styled.div`
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  color: #ACACAC;
  opacity: 1;
  font-size: 16px;
  word-break: break-all;
`;

const UserDetails = (props) => {
  const { userDetails, familyMembers } = props
  return (
    < Container >
      <SideBar>
        <TopBar>
          <Navigator>
            <NavigateBeforeIcon onClick={() => history.push("/users")} />
            <MoreHorizIcon />
          </Navigator>

          <ProfileImage />
          <UserName>
            <BoldText>{`${userDetails?.firstName} ${userDetails?.lastName}`}</BoldText>
            <LightText>{userDetails?.userId}</LightText>
          </UserName>
        </TopBar>
        <BottomBar>
          <Row className="w-100-per justify-content-between flex-flow-column-web">
            <DetailComponent>
              <LightText>Family</LightText>
              {familyMembers && familyMembers.length ? familyMembers.map(item => {
                return (
                  <Row className="align-items-center margin-top-10-px">
                    <Column>
                      {item.picture ?
                        <MemberImage src={item.picture} /> :
                        <MemberDummyImage />}
                    </Column>
                    <Column className="margin-left-10-px">
                      <MemberName>{item.firstName + " " + item.lastName}</MemberName>
                      <MemberType>{item.memberType.toLowerCase()}</MemberType>
                    </Column>
                  </Row>
                )
              }) : ""}
            </DetailComponent>

            <DetailComponent>
              <div>
                <LightText>Date of birth</LightText>
                <BoldText>{userDetails.personalInfo?.dob}</BoldText>
              </div>
              <div>
                <LightText>Address</LightText>
                <BoldText>{userDetails.address?.addressLine}</BoldText>
              </div>
              <div>
                <LightText>Phone</LightText>
                <BoldText>{userDetails?.mobileNumber}</BoldText>
              </div>
              <div>
                <LightText>Email</LightText>
                <BoldText>{userDetails?.email}</BoldText>
              </div>

            </DetailComponent>
          </Row>
        </BottomBar>
      </SideBar>
    </Container >
  );
};
export default UserDetails;

