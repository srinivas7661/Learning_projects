import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Select from "./Select";
import StyledDropzone from "./drag";
import { history } from "../../managers/history";

const useStyles = makeStyles({
  root: {
    div: {
      maxWidth: 500,
    },
  },
  media: {
    height: 140,
  },
});

const ButtonWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 30px 0px 20px 0px;
`;
const Button2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  border-color:${(props) => (props.primary ? "#5C4B75" : "#F6CB83")};
  height: 56px;
  width: 298px;
  border:none;
  font: normal normal bold 16px/22px Nunito;
  border-radius: 5px;
`;
const Button = styled.button`
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "white" : "#5C4B75")};
  border-color:${(props) => (props.primary ? "#5C4B75" : "#F6CB83")};
  height:45px;
  width: 170px;
  border:none;
  border-radius: 5px;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;

`;

const CancelButton = styled.button`
  margin-left: auto;
  margin-right:15px;
  font-size: 1em;
  border:none;
  background-color:white;
  font-size:small;
  border-radius: 5px;
  margin-bottom:15px;
`;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 25px;
  padding-top: 22px; ;
`;
const Title = styled.p`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
`;
const RadioLabel = styled.label`
text-align: left;
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
color: #686868;
margin-left: 5px;
`;
const RadioInput = styled.input`
margin-left: 40px;
`;

export default function Addsurvey() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {/* <Button variant="outlined" color="primary" onClick={() => history.push("/kit-ordering-survey")}> */}
        Add Survey
      </Button>
      <Dialog
        className="add-survey-dialog"
        open={open}
        aria-labelledby="form-dialog-title "
        maxWidth="xs"
        height="100%"
      >
        <DialogHeader>
          <Title>Add Survey</Title>

          <CancelButton onClick={handleClose}>
            <img src="images/cut.svg" alt="hi" />
          </CancelButton>
        </DialogHeader>

        <DialogContent>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
            }}
          >
            <label className="addservey">Survey Title</label>
            <input className="inputtag" type="text" placeholder="" />
          </div>

          <label className="question">Upload Survey Question</label>

          <StyledDropzone />

          <div className="margin-top-30-px">
            <RadioInput type="radio" name="survey" value="requiredSurvey" checked />
            <RadioLabel>Required Survey</RadioLabel>
            <RadioInput type="radio" name="survey" value="optionalSurvey" />
            <RadioLabel>Optional Survey</RadioLabel>
          </div>

          <div
            style={{
              flexDirection: "column",
              display: "flex",
            }}
          >
            <label className="surveylabel">Survey Type</label>
            <Select />
          </div>
          <ButtonWrapper>
            <Button2 onClick={() => history.push("/kit-ordering-survey")}>Add</Button2>
          </ButtonWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
