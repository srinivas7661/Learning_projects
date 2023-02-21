import React from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from '@material-ui/icons/Check';
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";

const ViewReportButton = styled.button`
width: 133px;
height: 34px;
background: #7D84C0 0% 0% no-repeat padding-box;
box-shadow:none;
border:none;
border-radius: 5px;
text-align: center;
font: normal normal normal 16px/22px Nunito;
color: #FFF4F3;
margin-left: 10px;
`;
const CloseButton = styled.button`
width:fit-content;
margin-right:5%;
height:fit-content ;
float: right;
background: transparent;
border: transparent;
`;
const Icon = styled.img`
width: 100%;
height: 100%;
`;
const Report = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
width: 50%;
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  drawer: {
    width: "100%"
  }
});

function creatData(Sample_Id, Event_Type, Timeline_stage, Event_Date_Time, Order_Date_Time, Status) {
  return {
    Sample_Id, Event_Type, Timeline_stage, Event_Date_Time, Order_Date_Time, Status,
    detail: [
      { name: "in transit", status_date: "status updated on 3:40 pm 5 jan 2020", Status },
      { name: "in transit", status_date: "status updated on 3:40 pm 5 jan 2020", Status },
      { name: "in transit", status_date: "status updated on 3:40 pm 5 jan 2020", Status },
      { name: "in transit", status_date: "status updated on 3:40 pm 5 jan 2020", Status },
    ],
  };
}

const info = [
  creatData(
    "Active",
    "Mother's Stool Sample",
    "First Trimester[13th week]",
    "10:00 AM 5 Jan 2020",
    "12:00 PM 6 Jan 2020",
    "Report Pending"
  ),
  creatData(
    "Active",
    "Mother's Stool Sample",
    "First Trimester[13th week]",
    "10:00 AM 5 Jan 2020",
    "12:00 PM 6 Jan 2020",
    "Report Generated",
  ),
]

const ExpandableTableRow = ({ children, expandComponent, open }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton onClick={open ? () => setIsExpanded(!isExpanded) : ""}>
            {isExpanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {expandComponent.map((row) => (
        isExpanded && <TableRow><TableCell><CheckIcon className="fc-Vista-Blue" /></TableCell>
          <TableCell>{row.name}</TableCell><TableCell /><TableCell /><TableCell /><TableCell />
          <TableCell>{row.status_date}</TableCell></TableRow>
      ))}
    </>
  );
};

function UserTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  }
  return (
    <>
      <TableContainer style={{ width: "100%" }}>
        <Table className="min-w-1300-px" aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell className="fc-blue ">Sample Id</TableCell>
              <TableCell className="fc-blue ">Event Type</TableCell>
              <TableCell className="fc-blue ">Timeline stage</TableCell>
              <TableCell className="fc-blue ">Event Date & Time</TableCell>
              <TableCell className="fc-blue ">Order Date & Time</TableCell>
              <TableCell className="fc-blue ">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((row) => (
              <ExpandableTableRow
                key={row.name}
                open={row.Status === "Report Pending" ? false : true}
                expandComponent={row.detail}
              >
                <TableCell>{row.Sample_Id}</TableCell>
                <TableCell>{row.Event_Type}</TableCell>
                <TableCell>{row.Timeline_stage}</TableCell>
                <TableCell>{row.Event_Date_Time}</TableCell>
                <TableCell>{row.Order_Date_Time}</TableCell>
                {row.Status === "Report Pending" ?
                  <TableCell className="fc-Ruddy-Pink">{row.Status}</TableCell> :
                  <TableCell>
                    <TableCell className="fc-Vista-Blue border-bottom-none">{row.Status}</TableCell>
                    <TableCell className="border-bottom-none">
                      <ViewReportButton onClick={toggleDrawer(true)}>View Report</ViewReportButton>
                    </TableCell>
                  </TableCell>}
              </ExpandableTableRow>
            ))}
            <Drawer
              anchor={"right"}
              open={state}
              onClose={toggleDrawer(false)}
              variant={"persistent"}
              classes={{ paper: classes.drawer }}>
              <div>
                <CloseButton onClick={toggleDrawer(false)} className="flex-right margin-t-top-15-px"><Icon src="images/cross.svg"></Icon></CloseButton>
                <Report src="images/tabletuser.svg" ></Report>
              </div>
            </Drawer>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserTable;


