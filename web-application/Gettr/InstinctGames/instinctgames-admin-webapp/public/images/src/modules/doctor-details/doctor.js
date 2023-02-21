import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CustomTable from "../../common/components/customTable";
import { history } from "../../managers/history";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  /* background-color: #ffffff; */
  flex-direction: row;
  @media (max-width: 1024px) {
    display: flex;
    min-height: fit-content;
    flex-direction: column;
  }
`;
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  height: 100%;
  @media (max-width: 1024px) {
    display: flex;
    max-width: 100%;
    width: 100%;
    height: 350px;
    flex-direction: row;
  }
`;
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 300px;
  width: 100%;
  min-height: 278px;
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

const Content = styled.div`
  padding: 40px 40px 40px 40px;
  display: flex;
  width: 100%;
  flex-flow: column;
  background: #ffffff;
  height: 100%;
  @media (max-width: 1024px) {
    // justify-content: end;
    width: 100%;
    height: 100%;
  }
`;

const LightText = styled.div`
  display: flex;
  font: normal normal normal 16px/22px Nunito;
  color: #acacac;
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
const ButtonParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;
const AcceptButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  height: 45px;
  width: 100px;
  background: #f6cb83;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  color: #5c4b75;
  opacity: 1;
  box-shadow: 0px 4px 5px #0000001c;
  border-radius: 5px;
`;
const RejectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 45px;
  width: 100px;
  background: #5c4b75;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  color: #fff4f3;
  opacity: 1;
  box-shadow: 0px 4px 5px #0000001c;
  border-radius: 5px;
`;
const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  height: 110px;
  width: 110px;
  align-self: center;
  justify-content: center;
`;

const DoctorImageContainer = styled.div`
  border-radius: 50%;
  height: 110px;
  width: 110px;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Records = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
`;
const Document = styled.div`
  display: flex;
  align-items: center;
  color: #acacac;
  justify-content: center;
  padding-top: 10px;
`;
const DocText = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  @media (max-width: 1024px) {
    width: 400px;
  }
`;
const DocumentImage = styled.img`
  height: 160px;
`;

const Navigator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 1025px) {
    display: none;
  }
`;

const DetailComponent = styled.div`
  display: flex;
  padding: 40px 0 0 40px;
  flex-flow: column;
  width: 100%;
  height: 100%;
  @media (min-width: 1025px) {
    padding: 0 0 0 40px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: #ffffff;
  border-radius: 3px;
  width: 238px;
  height: 45px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 15px #00000012;
`;
const SearchBox = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  border-radius: 3px;
`;
const SearchInput = styled.input`
  font-size: 14px;
  min-width: 150px;
  outline: none;
  border: none;
  border-radius: 3px;
  margin-left: 5px;
  background-color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
    border: none;
  }
  &::placeholder {
    color: #5c4b75;
    opacity: 0.5;
  }
`;
const Icon = styled.img`
  height: 17.97px;
  width: 17.97px;
  display: flex;
  margin-left: 35px;
  flex-flow: column nowrap;
`;

const DoctorImage = styled.img`
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  border-radius: 50%;
`;

const doctorList = (props) => {
  const { rejectUser, acceptUser, userDetails } = props;
  return (
    <Container>
      <SideBar>
        <TopBar>
          <Navigator>
            <NavigateBeforeIcon onClick={() => history.push("/doctors")} />
          </Navigator>
            
          <MoreHorizIcon style={{ alignSelf: "end" }}/>
          {userDetails?.profilePic ? (
            <DoctorImageContainer>
              <DoctorImage src={userDetails.profilePic} />
            </DoctorImageContainer>
          ) : (
            <ProfileImage />
          )}
          <UserName>
            <BoldText>{`${userDetails.firstName} ${userDetails.lastName}`}</BoldText>
            <LightText>{userDetails.userId}</LightText>
          </UserName>
          {userDetails.status === "INACTIVE" ? (
            <ButtonParent>
              <AcceptButton onClick={() => acceptUser(userDetails.userId)}>
                Accept
              </AcceptButton>
              <RejectButton onClick={() => rejectUser(userDetails.userId)}>
                Reject
              </RejectButton>
            </ButtonParent>
          ) : (
            ""
          )}
        </TopBar>
        <BottomBar>
          {/* <BottomTextBox> */}
          <Row className="w-100-per justify-content-between flex-flow-column-web">
            <DetailComponent>
              <div>
                <LightText>Status</LightText>
                <BoldText>{userDetails.status}</BoldText>
              </div>
              <div>
                <LightText>Phone Number</LightText>
                <BoldText>{userDetails.personalInfo?.mobileNumber}</BoldText>
              </div>
              <div>
                <LightText>Education</LightText>
                <BoldText>{userDetails.personalInfo?.education}</BoldText>
              </div>
              <div>
                <LightText>Experience</LightText>
                <BoldText>{userDetails.personalInfo?.experience}</BoldText>
              </div>
            </DetailComponent>
            <DetailComponent>
              <div>
                <LightText>Specialization</LightText>
                <BoldText>{userDetails.personalInfo?.specialization}</BoldText>
              </div>
              <div>
                <LightText>Hospital</LightText>
                <BoldText>{userDetails.personalInfo?.clinicName}</BoldText>
                <BoldText>{userDetails.address?.addressLine}</BoldText>
              </div>
            </DetailComponent>
          </Row>
          {/* </BottomTextBox> */}
        </BottomBar>
      </SideBar>
      <Content>
        <DocText>Shared Reports</DocText>
        {userDetails.status === "INACTIVE" ? (
          <Records>
            <DocumentImage
              src="/images/documentIcon.svg"
              alt=""
            ></DocumentImage>
            <Document>No Shared Reports</Document>
          </Records>
        ) : (
          <div className="margin-top-25">
            <SearchContainer>
              <SearchBox>
                <SearchInput
                  placeholder="Search"
                  onChange={(event) => props.onSearchChange(event.target.value)}
                />
                <Icon src="/images/Search.svg" />
              </SearchBox>
            </SearchContainer>
            <div className="margin-top-25">
              <CustomTable
                className="style"
                columns={props.state.reportColumns}
                rows={props.state.reportList}
                tableCellWidth="25%"
              ></CustomTable>
            </div>
          </div>
        )}
      </Content>
    </Container>
  );
};
export default doctorList;
