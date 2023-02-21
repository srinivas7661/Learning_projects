import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";

const Align = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  border: 0.5px solid #ACACAC;
  justify-content: center;
`;
const Box = styled.div`
  width: 515px;
  height: 510px;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 35px;
  box-shadow: 0px 4px 15px #00000012;
`;
const Image = styled.img`
  width: 170px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;
const Heading = styled.p`
width: 170px;
text-align: center;
margin-top: 50px;
margin-left:140px;
font: normal normal bold 25px/34px Nunito;
letter-spacing: 0px;
color: #3E344B;
`;
const Container = styled.div`
width: 435px;
height: 120px;
margin-top: 25px;
`;
const Text = styled.p`
text-align: left;
font: normal normal normal 20px/27px Nunito;
letter-spacing: 0px;
color: #3E344B;
opacity: 1;
`;
const LightText = styled.p`
width: 106px;
height: 20px;
text-align: left;
font: normal normal normal 15px/20px Nunito;
margin-left: 170px;
margin-top: 70px;
letter-spacing: 0px;
color: #ACACAC;
opacity: 1;
`;
const ImageContainer = styled.div`
display: flex;
margin-left: 125px;
margin-top: 25px;
`;
const AppImage = styled.img`
width: 45px;
height: 50px;
`;
const VerticalDivider = styled.div`
width: 1px;
height: 60px;
background-color: #ACACAC;
`;
const HorizontalDivider = styled.div`
width: 600px;
height: 1px;
background-color: #ACACAC;
margin-top: 30px;
`;
const AddressContainer = styled.div`
width: 435px;
height: 120px;
`;
const AddressHead = styled.p`
width: 80px;
height: 25px;
margin-left: 170px;
margin-top: 5px;
text-align: center;
font: normal normal 600 18px/20px Nunito;
letter-spacing: 0px;
color: #ACACAC;
`;
const AddressText = styled.p`
width: 218px;
// height: 20px;
margin-left: 95px;
text-align: center;
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
color: #ACACAC;
`;
const Button = styled.button`
width: 280px;
height: 45px;
border: none;
margin-left: 80px;
margin-top: 80px;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
background: #5C4B75 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
border-radius: 5px;
opacity: 1;
`;

function Invitation(props) {
    const { state } = props
    return (
        <>
            <Align>
                <Box>
                    <Image src="/images/logo.svg"></Image>
                    <Heading>Hello Armana,</Heading>
                    <Container>
                        {state.invitation === "Health-coach" ? <>
                            <Text>You have been invited to BabyPass as a Health-coach/ Nutritionist.</Text>
                            <Text>Please install the app and setup your account.</Text></>
                            : ""}
                        {state.invitation === "admin" ?
                            <>
                                <Text>You have been invited to BabyPass as an admin. </Text>
                                <Text>Please click on the below link to configure your admin account.</Text></>
                            : ""}
                    </Container>
                    {state.invitation === "Health-coach" ? <>
                        <LightText>install app from</LightText>
                        <ImageContainer>
                            <AppImage src="/images/playStore.svg" className="margin-right-50-px" />
                            <VerticalDivider />
                            <AppImage src="/images/iconAppstore.png" className="margin-left-50-px" />
                        </ImageContainer></>
                        : ""}
                    {state.invitation === "admin" ? <Button>Set up account</Button> : ""}
                </Box>
                <HorizontalDivider />
                <AddressContainer>
                    <AddressHead>BabyPass</AddressHead>
                    <AddressText>Unsubscribe & Mail Preferences Terms of Service . Privacy Policy. 122, Rashford Street, UK</AddressText>
                </AddressContainer>
                {/* {setTimeout(fun, 5000)} */}
            </Align>
        </>
    )
}
function fun() {
    history.push("/users")
}
export default Invitation;
