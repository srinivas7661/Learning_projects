import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/styles";
import { Column } from "simple-flexbox";
import styled from "styled-components";
import { DialogActions } from "@material-ui/core";

const Img = styled.img`
  width: 16px;
  height: 16px;
  margin-left: auto;
  margin-top: 6px;
`;

const SubmitButton = styled.button`
  width: 50%;
  border-radius: 4px;
  border: solid 1px #d5d5d5;
  background: #f6cb83 0% 0% no-repeat padding-box;
  padding: 9px 0px;
  color: #5c4b75;
  opacity: 1;
  font: normal normal bold 16px/22px Nunito;
  margin-bottom: 20px;
  box-shadow: 0px 4px 30px #00000012;
`;
const Title = styled.div`
  display: flex;
  font: normal normal bold 20px/27px Nunito;
  padding: 24px 15px 1px 38px;
 
  color: #5c4b75;
`;
const SubTitle = styled.div`
  display: flex;
  font: normal normal normal 15px/20px Nunito;
  padding: 2px 15px 0px 38px;

  color: #acacac;
`;
const Input = styled.input`
  height: 18px;
  width: 15px;
`;
const All = styled.p`
  margin-left: 10px;
  color: #686868;
  font: normal normal normal 15px/20px Nunito;
`;
const Checkbox = styled.div`
  flex-flow: row nowrap;
  display: flex;
  justify-content: flex-end;
  margin-right: 14px;
`;
const Border = styled.hr`
  // border: 0.4000000059604645px solid #acacac;
  width: 96%;
  margin-top: 1px;
`;
const FirstRow = styled.div`
  justify-content: space-between;
  display: flex;
  flex-flow: row nowrap;
`;

const useStyles = makeStyles(() => ({
  dialogContent: {
    padding: "8px 38px 8px 38px",
  },
  paper: {
    width: "33%",
    alignSelf: "baseline",
    marginTop: "60px",
  },
  "@media (max-width: 1024px)": {
    paper: {
      width: "50%",
    },
  },
  styleContainer: {
    display: "flex",
    flexFlow: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  styleSelect1: {
    width: "48%",
  },
  styleText: {
    width: "48%",
  },
  styleText3: {
    width: "43%",
  },
  styleText4: {
    width: "91%",
  },
  stylebtn: {
    justifyContent: "center",
  },
  tab1: {
    width: "13%",
    background: "#009fe0",
    height: "2px",
    borderRadius: "2px",
    minHeight: "0px",
    minWidth: "20px",
    marginLeft: "15px",
    padding: "2px 12px",
  },
  tab2: {
    width: "13%",
    background: "#e0e0e0",
    height: "2px",
    borderRadius: "2px",
    minHeight: "0px",
    minWidth: "20px",
    marginLeft: "15px",
    padding: "2px 12px",
  },
  styleTab: {
    minHeight: "1px",
  },
  selected: {
    backgroundColor: "transparent",
  },
}));

export default function AddDoctorDialog(props) {
  // const { state, onValueChanged } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} open>
        <Title>
          Export Data
          <Img
            style={{ cursor: "pointer" }}
            src="/images/cross.svg"
            onClick={props.click}
          ></Img>
        </Title>
        <SubTitle>Export User Data</SubTitle>
        <Checkbox>
          <Input type="checkbox" />
          <All>All</All>
        </Checkbox>
        <Border />
        <DialogContent className={classes.dialogContent}>
          <FirstRow className="justify-space-between w-100">
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
          </FirstRow>
          <FirstRow className="justify-space-between w-100">
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
          </FirstRow>
          <FirstRow className="justify-space-between w-100">
            <Column>
              <Checkbox>
                <Input type="checkbox" />
                <All>All</All>
              </Checkbox>
            </Column>
            <Column>
             
            </Column>
          </FirstRow>
        </DialogContent>
        <DialogActions className={classes.stylebtn}>
          <SubmitButton
            onClick={props.clicked}
            type="submit"
            style={{ cursor: "pointer" }}
          >
            Export as CSV
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
