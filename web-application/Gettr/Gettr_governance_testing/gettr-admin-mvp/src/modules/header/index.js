import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import { useOktaAuth } from "@okta/okta-react";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { ClickOutside } from "../../common/components/components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #161616;
`;

const ChildContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: flex-end;
  div {
    font: 500 14px/24px "Roboto";
    color: #ffffff;
    margin-bottom: -8px;
  }
`;
const GroupDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 55px;
  margin-top: 25px;
`;
const ManageTeam = styled.div`
  display: ${(props) => (props.role === "ADMIN" ? `none` : "flex")};
  gap: 15px;
  /* display: flex; */
  align-items: flex-end;
  cursor: pointer;
  p {
    font: 400 14px/22px "Roboto";
    color: #ffffff;
    margin-bottom: -5px !important;
  }
`;

const UserIcon = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  background: #161616;
  border-radius: 50%;
  cursor: pointer;
`;
const UserDetailPopup = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  right: -75%;
  width: 246px;
  height: 204px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 19px;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column !important;
  align-items: center;
  justify-content: space-around;
  padding: 30px 0px 15px 0px;
  div {
    font: normal 400 12px/22px "Roboto";
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
  }
`;
const SignOut = styled.button`
  width: 211px;
  height: 36px;
  background: #000000;
  border-radius: 50px;
  color: #ffffff;
  font: normal 600 15px/22px "Roboto";
`;

const NameandEmail = styled.div`
  display: flex;
  flex-direction: column;
  height: 45px;
  p {
    margin: 0px;
    font: normal 600 16px/22px "Roboto";
    text-align: center;
    color: #000000;
  }
`;
function Header(props) {
  const [dropdown, setDropDown] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const logOut = () => {
    oktaAuth.signOut();
    sessionStorage.clear();
    oktaAuth.tokenManager.clear();
  };
  function closeDrop() {
    setDropDown(false);
  }
  return (
    <MainContainer>
      <ChildContainer>
        <LogoDiv>
          <img src="/images/gettr-logo.svg" alt="" />
          <div>Governance</div>
        </LogoDiv>
        <GroupDiv>
          <ManageTeam
            role={props?.user?.userRole}
            onClick={() => history.push(`/dashboard/team`)}
          >
            <img src="/images/teamIcon.svg" alt="team" />
            <p>Manage Team</p>
          </ManageTeam>
          <UserIcon>
            <img
              onClick={() => setDropDown((pre) => !pre)}
              src="/images/userIcon.svg"
              alt="team"
            />
            {dropdown && (
              <ClickOutside oneClickOutside={closeDrop}>
                <UserDetailPopup>
                  <Content>
                    <div>Logged in as</div>
                    <NameandEmail>
                      <p>
                        {props.user.details !== null
                          ? props?.user?.details?.profile.firstName +
                            " " +
                            props?.user?.details?.profile.lastName
                          : history?.location?.state?.firstName +
                            " " +
                            history?.location?.state?.lastName}
                      </p>
                      <div>
                        {props.user.details !== null
                          ? props?.user?.details?.profile.email
                          : history?.location?.state?.email}
                      </div>
                    </NameandEmail>
                    <SignOut onClick={() => logOut()}>Sign Out</SignOut>
                  </Content>
                </UserDetailPopup>
              </ClickOutside>
            )}
          </UserIcon>
        </GroupDiv>
      </ChildContainer>
    </MainContainer>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Header);
