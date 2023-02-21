import React from "react";
import styled from "styled-components";
import Modal from "../../common/components/modal";

const Container = styled.div`
  width: 613px;
  height: 546px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 19px;
  margin-top:  ${(props) => (props.margin ? props.margin : "")};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 29px 35px 33px;
`;

const Title = styled.div`
  font: normal normal 700 16px/22px var(--font-roboto);
  letter-spacing: -0.408px;
  color: #1e1e1e;
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const DataContaainer = styled.div`
  margin: 0 29px 47px 33px;
  height: max-content;
  max-height: 440px;
  overflow-x: hidden;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  border-radius: 1px;
  ${({ rowIndex, activeAdmins }) =>
    rowIndex < activeAdmins?.length - 1 &&
    `
    border-bottom: 1px solid #e7e7e7;
  `}
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 12px;
`;

const ImgContainer = styled.div`
  width: 41px;
  height: 41px;
  margin: 0 30px 0 0;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const StatusSection = styled.div`
  font: normal normal 400 14px/22px var(--font-roboto);
  color: #50555c;
  padding: 0 15px 0 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  width: max-content;
  height: 21px;
  font: normal normal 500 14px/22px var(--font-roboto);
  color: #000000;
`;

const Role = styled.div`
  width: max-content;
  height: 21px;
  font: normal normal 400 12px/22px var(--font-roboto);
  color: #828282;
`;

const ActiveIcon = styled.img`
  position: absolute;
  left: -1px;
  top: 0;
`;

const ActiveAdmins = ({ handleClose, open }) => {
  const activeAdmins = [
    {
      name: "Alexa Jones",
      picture: "https://i.pravatar.cc/300",
      role: "Admin",
      isActive: true,
      status: "Active Now",
    },
    {
      name: "Jamar Mcgee",
      picture: "https://i.pravatar.cc/30",
      role: "Super Admin",
      isActive: true,
      status: "Active Now",
    },
    {
      name: "Paul Santos",
      picture: "https://i.pravatar.cc/30",
      role: "Admin",
      isActive: true,
      status: "Active Now",
    },
    {
      name: "Lily Samuel",
      picture: "https://i.pravatar.cc/30",
      role: "Super Admin",
      isActive: false,
      status: "Last logged in 8m ago",
    },
    {
      name: "Ric Sam",
      picture: "https://i.pravatar.cc/30",
      role: "Super Admin",
      isActive: false,
      status: "Last logged in Yesterday",
    },
    {
      name: "Jesus Navas",
      picture: "https://i.pravatar.cc/30",
      role: "Admin",
      isActive: false,
      status: "Last logged in 03/12/22",
    },
  ];

  return (
    <Modal marginTop="90px" open={open} handleClose={() => handleClose()}>
      <Container>
        <Header>
          <Title>Admins Active Now</Title>
          <CloseIcon
            src="/images/close.svg"
            alt="close"
            onClick={() => handleClose()}
          />
        </Header>
        <DataContaainer className="active-admin-popup">
          {activeAdmins.map((obj, index) => (
            <Row key={index} rowIndex={index} activeAdmins={activeAdmins}>
              <ProfileSection>
                <ImgContainer>
                  <Image src={obj.picture + index} alt="profile picture" />
                  {obj.isActive && (
                    <ActiveIcon src="/images/active-icon.svg" alt="active" />
                  )}
                </ImgContainer>
                <InfoContainer>
                  <Name>{obj.name}</Name>
                  <Role>{obj.role}</Role>
                </InfoContainer>
              </ProfileSection>
              <StatusSection>{obj.status}</StatusSection>
            </Row>
          ))}
        </DataContaainer>
      </Container>
    </Modal>
  );
};

export default ActiveAdmins;
