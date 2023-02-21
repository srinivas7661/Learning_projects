import React from "react";
import { Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import styled from "styled-components";

const MainContainer = styled.div`
width: 100%;
box-shadow: 5px 10px 5px #00000012;
margin-top: 20px;
padding: 10px;
`;
const ViewPDFButton = styled.button`
width: 133px;
height: 34px;
background: #7D84C0;
box-shadow: 0px 4px 5px #0000001C;
border-radius: 5px;
border: none;
text-align: center;
font: normal normal normal 16px/22px Nunito;
color: #FFF4F3;
`;

const surveReportData = [
    {trigger:"Report Ordering Survey",response:"Yes",response_date:"1 Jan 2021"},
    {trigger:"Manual Survey",response:"Pending",response_date:"18 Sep, 2020"},
    {trigger:"Report Ordering Survey",response:"Yes",response_date:"1 Jan 2021"},
    {trigger:"Manual Survey",response:"Pending",response_date:"18 Sep, 2020"},
]

function SurveyReport(props){
    return(
        <>
        <MainContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="fc-blue border-bottom-none">Trigger</TableCell>
                        <TableCell className="fc-blue border-bottom-none">Response</TableCell>
                        <TableCell className="fc-blue border-bottom-none">Response Date</TableCell>
                        <TableCell className="fc-blue border-bottom-none">View Survey Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {surveReportData.map((row)=>(
                        <TableRow>
                            <TableCell>{row.trigger}</TableCell>
                            <TableCell>{row.response}</TableCell>
                            <TableCell>{row.response_date}</TableCell>
                            <TableCell><ViewPDFButton>View as PDF</ViewPDFButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </MainContainer>
        </>
    )
}

export default SurveyReport;