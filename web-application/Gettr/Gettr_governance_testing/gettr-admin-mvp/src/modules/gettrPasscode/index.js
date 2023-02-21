import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  OtpFormComponent,
} from "../../common/components/components";
import ButtonComponent from "../../common/components/button";
import { history } from "../../managers/history";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import utility from "../../utility";
import { ProposalService } from "../../services";
import md5 from "md5";

const OtpSentToEmail = styled.div`
  font: 400 14px/22px var(--root-font);
  color: #1e1e1e;
  display: flex;
  justify-content: center;
  margin-top: 91px;
  span {
    font-weight: 700;
  }
`;
const PasscodeParent = styled.div`
  margin: 63px auto 0 auto;
  width: 100%;
  max-width: 396px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font: ${(props) => props.font || "700 16px/22px var(--root-font)"};
  color: ${(props) => props.color || "#1e1e1e"};
  margin-top: ${(props) => props.marginTop || ""};
  text-align: ${(props) => props.textAlign || ""};
`;
const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 19px;
`;

const PointsToRemember = styled.ul`
  width: 369px;
  margin: 63px 0px 0px 15px;
  li {
    font: normal 400 14px/22px "Roboto";
    letter-spacing: -0.408px;
    color: #1e1e1e;
  }
`;
const Remember = styled.div`
  font: normal 400 14px/22px "Roboto";
  letter-spacing: -0.408px;
  color: #1e1e1e;
  margin: 22px 0px 0px 34px;
  span {
    font-weight: 700;
  }
`;
function EnterPasscode(props) {
  const [passcode, setPasscode] = useState(new Array(6).fill(""));

  const [confirmPasscode, setConfirmPasscode] = useState(new Array(6).fill(""));

  const [confirmPasscodeUi, setConfirmPasscodeUi] = useState(false);
  const addAdmin = async () => {
    let requestData = {
      email: history.location.state.email,
      name:
        history.location.state.firstName +
        " " +
        history.location.state.lastName,
      passcode: utility.encryptData(md5(confirmPasscode.join(""))),
      role: String(props.user.userRole.replace(" ", "_")).toUpperCase(),
      isProposed: false,
    };
    let [error, response] = await utility.parseResponse(
      ProposalService.createAdmin(requestData)
    );
    if (response) {
      utility.apiSuccessToast("Passcode created successfully");
      history.push("/dashboard/overview");
    }
    if (error) return error;
  };
  return (
    <MainContainer>
      {confirmPasscodeUi ? (
        <Container>
          <LogoDiv>
            <img src="/images/logo_new.svg" alt="" />
          </LogoDiv>
          <OtpSentToEmail>
            Confirm passcode which you set earlier.
          </OtpSentToEmail>
          <PasscodeParent>
            <Title>Confirm Passcode</Title>
            <OtpFormComponent
              value={confirmPasscode}
              onChange={(idx, val) =>
                setConfirmPasscode((prev) =>
                  prev.map((item, i) =>
                    String(i) === String(idx) ? val : item
                  )
                )
              }
            />
            {confirmPasscode.join("").length === 6 &&
              confirmPasscode.join("") !== passcode.join("") &&
              utility.apiFailureToast("Passcode does not match")}
          </PasscodeParent>
          <ButtonComponent
            maxWidth={396}
            margin={"90px 0 0 0"}
            disabled={
              confirmPasscode.join("") !== passcode.join("") ||
              confirmPasscode.join("").length < 6
            }
            opacity={
              confirmPasscode.join("") !== passcode.join("") ||
              confirmPasscode.join("").length < 6
                ? "0.3"
                : ""
            }
            clickHandler={addAdmin}
          >
            Confirm
          </ButtonComponent>
        </Container>
      ) : (
        <Container height={"679px"}>
          <LogoDiv>
            <img src="/images/logo_new.svg" alt="" />
          </LogoDiv>
          <OtpSentToEmail>
            Create a 6 digit passcode to continue.
          </OtpSentToEmail>
          <PasscodeParent>
            <Title>Enter Passcode</Title>
            <OtpFormComponent
              value={passcode}
              onChange={(idx, val) =>
                setPasscode((prev) =>
                  prev.map((item, i) =>
                    String(i) === String(idx) ? val : item
                  )
                )
              }
            />
          </PasscodeParent>
          <PointsToRemember>
            <li>Save a backup in multiple places.</li>
            <li>Never share the passcode with anyone.</li>
            <li>
              Be careful of phishing! GETTR will never spontaneously ask for
              your passcode.
            </li>
            <li>
              If you ever have questions or see something fishy, email
              support@gettr.com.
            </li>
          </PointsToRemember>
          <Remember>
            <span>*GETTR</span>&nbsp; cannot recover your Passcode.
          </Remember>
          <ButtonComponent
            clickHandler={() => setConfirmPasscodeUi(true)}
            maxWidth={396}
            margin={"26px 0 0 0"}
            disabled={passcode.join("").length < 6}
            opacity={passcode.join("").length < 6 ? "0.3" : ""}
          >
            Next
          </ButtonComponent>
        </Container>
      )}
    </MainContainer>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(EnterPasscode);
