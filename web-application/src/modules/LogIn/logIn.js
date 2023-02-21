import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
// import { OtpFormComponent } from "../../common/components/components";

const ParentContainer = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 19px;
  width: ${(props) => (props.width ? props.width : "613px")};
  height: ${(props) => (props.height ? props.height : "307px")};
  padding: 5px;
`;
const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 30px 15px 30px;
`;
const Hrline = styled.hr`
  border: 1px solid #e7e7e7;
  border-radius: 1px;
  margin-top: 10px !important;
`;
const CloseImg = styled.img`
  cursor: pointer;
`;
const PasscodeParent = styled.div`
  margin: ${(props) =>
    props.margin ? `${props.margin} auto 0 auto` : "63px auto 0 auto"};
  width: 100%;
  max-width: 396px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font: ${(props) => props.font || "700 16px/22px var(--root-font)"};
  color: ${(props) => props.color || "#1e1e1e"};
  margin-top: ${(props) => props.marginTop || ""};
  margin-bottom: ${(props) => props.marginBottom || ""};
  text-align: ${(props) => props.textAlign || ""};
`;

const LogIn = () => {
  let Navigate = useNavigate();

  return (
    <div>
      {/* <ParentContainer height={"351px"} width={"501px"}>
        <MintContainer>
          <Header>
            <Heading>Verify Yourself</Heading>
          </Header>
          <Hrline></Hrline>
          <PasscodeParent margin={"20px"}>
            <Title marginBottom={"15px"}>Enter Passcode</Title>
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
          <ButtonComponent
            clickHandler={() => {
              apiCallFunction();
            }}
            maxWidth={396}
            margin={"26px 0 0 0"}
            disabled={passcode.join("").length < 6}
            opacity={passcode.join("").length < 6 ? "0.3" : ""}
            whiteButton={"#FC223B"}
          >
            {verifyLoader ? <Loader white={true} /> : buttonText}
          </ButtonComponent>
        </MintContainer>
      </ParentContainer> */}
      <button onClick={() => Navigate(`/rock-paper`)}>LogIn</button>
    </div>
  );
};

export default LogIn;
