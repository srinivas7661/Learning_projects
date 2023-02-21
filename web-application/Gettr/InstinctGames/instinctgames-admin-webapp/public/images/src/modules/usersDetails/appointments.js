import React from 'react';
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/styles";
import { TableContainer, Table, TableRow, TableCell, Paper } from "@material-ui/core";

const TableHeading = styled.div`
color: var(--unnamed-color-686868);
text-align: left;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #686868;
opacity: 1;
border-bottom: 1px solid #00000012;
margin-top: 10px;
margin-left:20px;
margin-bottom: 30px;
`;
const Time = styled.div`
color: var(--unnamed-color-7d84c0);
text-align: left;
font: normal normal normal 16px/22px Nunito;
letter-spacing: 0px;
color: #7D84C0;
opacity: 1;
`;
const Text = styled.div`
color: var(--unnamed-color-7d84c0);
text-align: left;
font: normal normal normal 16px/22px Nunito;
letter-spacing: 0px;
color: #ACACAC;
opacity: 1;
`;
const Name = styled.div`
color: var(--unnamed-color-5c4b75);
text-align: left;
font: normal normal bold 20px/27px Nunito;
letter-spacing: 0px;
color: #5C4B75;
opacity: 1;
`;

const use = makeStyles(() => ({
    row: {
        marginTop: "20px",
    },
    paper: {
        borderRadius: "7px",
        marginTop: "40px",
        boxShadow: " 0 3px 6px rgba(0,0,0,0.10)",
    },
    right: {
        align: "right",
    }
}));

function Appointments(props) {
    return (
        <>
            {/*for web---- */}
            <div className="display-block display-none-web">
                {upcomingAppointments()}
                {pastAppointmentsWeb()}
            </div>
            {/*for tab---- */}
            <div className="display-none display-block-tab">
                {upcomingAppointments()}
                {pastAppointmentsTab()}
            </div>
        </>
    )
}

function pastAppointmentsWeb(props) {
    const classes = use();
    return (
        <>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TableHeading>Past Appointments</TableHeading>
                    <hr />
                    <TableRow>
                        <Table>
                            <TableRow>
                                <TableCell align="center" className="border-bottom-none"><Avatar></Avatar></TableCell>
                                <TableCell className="border-bottom-none">
                                    <Time>Due in next 10 minutes</Time>
                                    <Name>Holly Higging</Name>
                                    <Text>Holistic Coach</Text>
                                </TableCell>
                                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                <TableCell className="fc-blue ">Completed on 1:48 PM, 26 Dec 2020</TableCell>
                                <TableCell />
                                <TableCell><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></TableCell>
                            </TableRow>
                        </Table>
                    </TableRow>
                </TableContainer>
            </Paper>
        </>
    )
}

function pastAppointmentsTab(props) {
    const classes = use();
    return (
        <>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TableHeading>Past Appointments</TableHeading>
                    <hr />
                    <TableRow>
                        <Table>
                            <TableRow>
                                <TableCell align="center" className="border-bottom-none"><Avatar></Avatar></TableCell>
                                <TableCell className="border-bottom-none">
                                    <Time>Due in next 10 minutes</Time>
                                    <Name>Holly Higging</Name>
                                    <Text>Holistic Coach</Text>
                                </TableCell>
                                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                <TableCell>
                                    <TableRow className="border-bottom-none"><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></TableRow>
                                    <TableRow className="fc-blue ">Completed on 1:48 PM, 26 Dec 2020</TableRow>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableRow>
                </TableContainer>
            </Paper>
        </>
    )
}

function upcomingAppointments(props) {
    const classes = use();
    return (
        <>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TableHeading>Upcoming Appointments</TableHeading>
                    <hr className="hr-display" />
                    <TableRow>
                        <Table>
                            <TableRow>
                                <TableCell align="center" className="border-bottom-none"><Avatar></Avatar></TableCell>
                                <TableCell className="border-bottom-none">
                                    <Time>Due in next 10 minutes</Time>
                                    <Name>Holly Higging</Name>
                                    <Text>Holistic Coach</Text>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableRow>
                </TableContainer>
            </Paper>
        </>
    )
}

export default Appointments;