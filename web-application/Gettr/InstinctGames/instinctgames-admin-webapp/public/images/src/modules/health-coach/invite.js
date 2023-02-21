import React from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { Button } from "./Element";
import { history } from "../../managers/history";


const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const Title = styled.p`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
`;
const CancelButton = styled.button`
  margin-left: auto;
  font-size: 1em;
  border:none;
  background-color:white;
  font-size:small;
  border-radius: 5px;
  margin-bottom:15px;
//   margin-right: 20px;
`;
const Label = styled.div`
width: 400px;
height: 55px;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 0.3px solid #ACACAC;
color: #686868;
margin-top: 20px;
border-radius: 5px;
opacity: 1;
`;
const InLabel = styled.div`
width: 350px;
height: 55px;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: none;
margin-left: 10px;
margin-top: 5px;
margin-right: 20px;
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
color: #686868;
border-radius: 5px;
opacity: 1;
`;
const Text = styled.p`
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
margin-top: 15px;
margin-left: 5px;
color: #686868;
`;
const BigLabel = styled.div`
width: 400px;
height: 140px;
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 0.3px solid #ACACAC;
margin-top: 20px;
border-radius: 5px;
opacity: 1;
`;
const InviteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  border-color:${(props) => (props.primary ? "#5C4B75" : "#F6CB83")};
  height: 56px;
  width: 298px;
  margin-top: 30px;
  margin-left: 50px;
  border:none;
  font: normal normal bold 16px/22px Nunito;
  border-radius: 5px;
`;
const Main = styled.div`
width: 440px;
height: 485px;
background: #FFFFFF;
padding: 20px 10px 10px 20px;
`;

export default function Invite(props) {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Button primary className="border-radius-3-px" onClick={handleClickOpen}>invite</Button>
                <Dialog
                    className="add-survey-dialog"
                    open={open}
                    aria-labelledby="form-dialog-title "
                    maxWidth="xs"
                    height="100%"
                >
                    <Main>
                        <DialogHeader>
                            <Title>Invite Health Coach</Title>
                            <CancelButton onClick={handleClose}>
                                <img src="images/cut.svg" alt="hi" />
                            </CancelButton>
                        </DialogHeader>
                        <Label><Text>Armana Jackson</Text></Label>
                        <Label><Text>amyjackson123@gmail.com</Text></Label>
                        <BigLabel><InLabel>You have been invited to BabyPass as a Health-coach/ Nutritionist. Please install the app and setup your account.</InLabel></BigLabel>
                        <InviteButton onClick={handleClose}>Invite</InviteButton>
                    </Main>
                </Dialog>
            </div>
        </>
    )
}