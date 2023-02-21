import React, { useState } from "react";
import styled from "styled-components";
import ActiveAdminsDialog from "../popups/activeAdmins";

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 60px 0 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: flex-end;
  span {
    font: 500 14px/12px var(--root-font);
    color: #070731;
  }
`;

const ProfileImg = styled.img`
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveAdminSection = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 38px 0 0;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 21px;
  height: 21px;
`;

const ActiveAdminImg = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
`;

const Header = () => {
  const [isPopup, setIsPopup] = useState(false);

  const activeAdmins = [0, 1];

  return (
    <>
      <Container>
        <Left>
          <img height={"38"} alt="logo" src="/images/admin-header-logo.svg" />
          <span>PC Admin</span>
        </Left>
        <RightContainer>
          <ActiveAdminSection onClick={() => setIsPopup(true)}>
            <Profile>
              {activeAdmins?.map((item, index) => (
                <ImageContainer key={index}>
                  <ActiveAdminImg
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt="profile image"
                  />
                </ImageContainer>
              ))}
            </Profile>
          </ActiveAdminSection>
          <ProfileImg
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt="profile pic"
          />
        </RightContainer>
      </Container>

      {isPopup ? (
        <ActiveAdminsDialog
          handleClose={() => setIsPopup(false)}
          open={isPopup}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
