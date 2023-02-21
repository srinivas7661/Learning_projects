import React from "react";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import { FormControl, Select, Typography, MenuItem, Box } from "@material-ui/core";
import { Column } from 'simple-flexbox'
import SharedReports from "./sharedReports"
import TimeLine from "./timeLine";
import UserInformation from "./userInformation";
import SampleReports from "./sampleReports";
import Appointments from "./appointments";
import Posts from "./posts";
import Subscription from "./subscription";
import Consents from "./consents";
import SurveyReport from "./surveyReport";

const use = makeStyles(() => ({
  formControl: {
    width: "210px",
    marginTop: "20px",
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Tab = styled.div`
display: flex;
flex-flow: row;
align-items: center;
justify-content: space-evenly;
border-bottom: 2px solid #ccc;
margin: 10px;
@media (max-width: 1024px) {
    display: none !important;
  }
`
const Tabs = styled.div`
display: flex;
flex-flow: column;
align-items: center;
justify-content: center;
margin-bottom:-4px;
min-width: fit-content;
padding: 0 5px 0 5px;
height:35px;
font-size: 14px;
cursor: pointer;
border-bottom:  ${props => props.selected ? "4px solid #5C4B75" : ""};;
color:  ${props => props.selected ? "#5C4B75" : "#5C4B75"};;
font-weight:  ${props => props.selected ? "bold" : ""};;
`
const UserDetailsParent = styled.div`
display: flex;
flex-flow: row;
@media (max-width: 1024px) {
    flex-flow: column !important;
  }
`

const TimeLineTab = styled.div`
padding: 10px;
@media (min-width:1025px){
  display: none;
}
`

export default function UserDetails(props) {
  const classes = use();
  const [value, setValue] = React.useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };



  return (
    <>
      <UserDetailsParent>
        <UserInformation userDetails={props.state?.userDetails} familyMembers={props.state?.familyMembers} />
        <Column className="w-100-per display-none-web">
          <Tab>
            <Tabs selected={value === 0 ? true : false} onClick={() => handleChange(0)}>{"Timeline & Request"}</Tabs>
            <Tabs selected={value === 1 ? true : false} onClick={() => handleChange(1)}>{"Shared Report"}</Tabs>
            <Tabs selected={value === 2 ? true : false} onClick={() => handleChange(2)}>{"Sample Reports"}</Tabs>
            <Tabs selected={value === 3 ? true : false} onClick={() => handleChange(3)}>{"Appointments"}</Tabs>
            <Tabs selected={value === 4 ? true : false} onClick={() => handleChange(4)}>{"Posts"}</Tabs>
            <Tabs selected={value === 5 ? true : false} onClick={() => handleChange(5)}>{"Subscriptions"}</Tabs>
            <Tabs selected={value === 6 ? true : false} onClick={() => handleChange(6)}>{"Consents"}</Tabs>
            <Tabs selected={value === 7 ? true : false} onClick={() => handleChange(7)}>{"Survey Report"}</Tabs>
          </Tab>

          <TabPanel value={value} index={0}>
            <TimeLine familyMembers={props.state.familyMembers} stage={props.state?.userDetails?.personalInfo?.stage} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SharedReports />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SampleReports />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Appointments />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Posts userId={props.state?.userDetails?.userId} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Subscription />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Consents />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <SurveyReport />
          </TabPanel>
        </Column>

      </UserDetailsParent >

      {/* for tab---- */}
      <TimeLineTab>
        <FormControl className={classes.formControl}>
          <Select
            onChange={(event) => handleChange(event.target.value)}
            defaultValue={value}
            label
          >
            <MenuItem value={0}>{"Timeline & Requests"}</MenuItem>
            <MenuItem value={1}>Shared Reports</MenuItem>
            <MenuItem value={2}>Sample Reports</MenuItem>
            <MenuItem value={3}>Appointements</MenuItem>
            <MenuItem value={4}>Posts</MenuItem>
            <MenuItem value={5}>Subscription</MenuItem>
            <MenuItem value={6}>Consents</MenuItem>
            <MenuItem value={7}>Survery Report</MenuItem>
          </Select>
        </FormControl>
        <div style={{ width: "100%" }}>{view(value, props)}</div>
      </TimeLineTab >
    </>
  );
}

function view(selected, props) {
  if (selected === 0) { return (<div><TimeLine familyMembers={props.state.familyMembers} stage={props.state?.userDetails?.personalInfo?.stage} /></div>) }
  if (selected === 1) { return (<div><SharedReports /></div>) }
  if (selected === 2) { return (<div><SampleReports /></div>) }
  if (selected === 3) { return (<div><Appointments /></div>) }
  if (selected === 4) { return (<div><Posts userId={props.state?.userDetails?.userId} /></div>) }
  if (selected === 5) { return (<div><Subscription /></div>) }
  if (selected === 6) { return (<div><Consents /></div>) }
  if (selected === 7) { return (<div><SurveyReport /></div>) }
}