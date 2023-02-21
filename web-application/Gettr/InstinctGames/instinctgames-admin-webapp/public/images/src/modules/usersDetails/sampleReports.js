import React from 'react';
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { FormControl, Select, MenuItem, Paper } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import {ListItemText } from "@material-ui/core";
import Avatar from "material-ui/Avatar";

const ReportChartWeb = styled.div`
width: 286px;
height: 120px;
background: #ACACAC;
margin-top: 20px;
margin-left: 5px;
`;
const ReportChartTab = styled.div`
width: 218px;
height: 120px;
background: #ACACAC;
margin-top: 20px;
margin-left: 2.5px;
`;
const ReportWeb = styled.div`
width: 286px;
height: 95px;
margin-left: 5px;
border-bottom: 0.5px solid #ACACAC;
text-align: left;
font: normal normal normal 12px/18px SF Pro Rounded;
`;
const ReportTab = styled.div`
width: 218px;
height: 105px;
margin-left: 2.5px;
border-bottom: 0.5px solid #ACACAC;
text-align: left;
font: normal normal normal 12px/18px SF Pro Rounded;
`;
const InformationWeb = styled.div`
width: 286px;
height: 95px;
margin-left: 5px;
`;
const InformationTab = styled.div`
width: 218px;
height: 85px;
margin-left: 2.5px;
`;

const use = makeStyles(() => ({
    formControl: {
        width: "150px",
        height: "30px",
    },
    paperWeb: {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "0.4000000059604645px solid #ACACAC",
        borderRadius: "7px",
        opacity: "1",
        width: "296px",
        height: "336px",
        marginTop: "50px",
        marginRight:"30px",
    },
    paperTab:{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "0.4000000059604645px solid #ACACAC",
        borderRadius: "7px",
        opacity: "1",
        width: "228px",
        height: "336px",
        marginTop: "50px",
        marginRight:"30px",
    },
    nameRelation: {
        color: "#5C4B75",
        fontSize: "14px",
    },
}));

function SampleReports(props) {
    const classes = use();
    const [user, setUser] = useState("1");
    const handleUser = e => setUser(e.target.value);
    return (
        <>
            {/* for web--- */}
            <div className="display-block display-none-web">
                <div>
                    <FormControl className={classes.formControl} >
                        <Select 
                        label 
                        className="font-weight-bold text-align-center"
                        onChange={handleUser}
                        defaultValue={user}
                        >
                            <MenuItem value={1}>user 1</MenuItem>
                            <MenuItem value={2}>user 2</MenuItem>
                            <MenuItem value={3}>user 3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="display-flex">
                    <Paper variant="outlined" className={classes.paperWeb}>
                        <div><MoreHorizIcon className="float-right" /></div>
                        <ReportChartWeb></ReportChartWeb>
                        <ReportWeb>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Proin congue est eget ligula egestas vehicula. 
                                Aliquam eget mattis turpis. 
                                Nullam risus turpis, auctor egestas purus eget, 
                                porta dictumet lacus at magna rhoncus tempor.
                            </p>
                        </ReportWeb>
                        <InformationWeb>
                            <table>
                                <tr>
                                    <td><Avatar></Avatar></td>
                                    <td><ListItemText primary="Mother First Trimester Stool Sample Report" /></td>
                                </tr>
                            </table>
                            <ListItemText secondary="Uploaded 8 Oct 2020" className="text-align-center" />
                        </InformationWeb>
                    </Paper>
                    <Paper variant="outlined" className={classes.paperWeb} >
                        <div><MoreHorizIcon className="float-right" /></div>
                        <ReportChartWeb></ReportChartWeb>
                        <ReportWeb>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Proin congue est eget ligula egestas vehicula. 
                                Aliquam eget mattis turpis. 
                                Nullam risus turpis, auctor egestas purus eget, 
                                porta dictumet lacus at magna rhoncus tempor.
                            </p>
                        </ReportWeb>
                        <InformationWeb>
                            <table>
                                <tr>
                                    <td><Avatar></Avatar></td>
                                    <td><ListItemText primary="Mother First Trimester Stool Sample Report" /></td>
                                </tr>
                            </table>
                            <ListItemText secondary="Uploaded 8 Oct 2020" className="text-align-center" />
                        </InformationWeb>
                    </Paper>
                </div>
            </div>
            {/* for tab--- */}
            <div className="display-none display-block-tab">
                <div className="float-right margin-top-80-px">
                    <FormControl className={classes.formControl} style={{marginTop:"-140px"}}>
                        <Select 
                        label 
                        className="font-weight-bold text-align-center"
                        onChange={handleUser}
                        defaultValue={user}
                        >
                            <MenuItem value={1}>user 1</MenuItem>
                            <MenuItem value={2}>user 2</MenuItem>
                            <MenuItem value={3}>user 3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="display-flex">
                    <Paper variant="outlined" className={classes.paperTab}>
                        <div><MoreHorizIcon className="float-right"/></div>
                        <ReportChartTab></ReportChartTab>
                        <ReportTab>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Proin congue est eget ligula egestas vehicula. 
                                Aliquam eget mattis turpis. 
                                Nullam risus turpis, auctor egestas purus eget, 
                                porta dictumet lacus at magna rhoncus tempor.
                            </p>
                        </ReportTab>
                        <InformationTab>
                            <table>
                                <tr>
                                    <td><Avatar></Avatar></td>
                                    <td><ListItemText primary="Mother First Trimester Stool Sample Report" /></td>
                                </tr>
                            </table>
                            <ListItemText secondary="Uploaded 8 Oct 2020" className="text-align-center"/>
                        </InformationTab>
                    </Paper>
                    <Paper variant="outlined" className={classes.paperTab}>
                        <div><MoreHorizIcon className="float-right"/></div>
                        <ReportChartTab></ReportChartTab>
                        <ReportTab>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Proin congue est eget ligula egestas vehicula. 
                                Aliquam eget mattis turpis. 
                                Nullam risus turpis, auctor egestas purus eget, 
                                porta dictumet lacus at magna rhoncus tempor.
                            </p>
                        </ReportTab>
                        <InformationTab>
                            <table>
                                <tr>
                                    <td><Avatar></Avatar></td>
                                    <td><ListItemText primary="Mother First Trimester Stool Sample Report" /></td>
                                </tr>
                            </table>
                            <ListItemText secondary="Uploaded 8 Oct 2020" className="text-align-center"/>
                        </InformationTab>
                    </Paper>
                </div>
            </div>
        </>
    )
}
export default SampleReports;