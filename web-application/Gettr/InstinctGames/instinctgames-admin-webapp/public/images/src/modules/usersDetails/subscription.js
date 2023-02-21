import React from "react";
import { Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import styled from "styled-components";

const subscriptionData = [
    {plan:"Top up",cost:"$49.00",purchase_date:"1 Jan 2021",validity:"Single Use",status:"Active"},
    {plan:"Golden Plan",cost:"$549.00",purchase_date:"18 Sep, 2020",validity:"18 Sep 2021",status:"Active"},
    {plan:"Top up",cost:"$49.00",purchase_date:"1 Jan 2021",validity:"Single Use",status:"Active"},
    {plan:"Golden Plan",cost:"$549.00",purchase_date:"18 Sep, 2020",validity:"18 Sep 2021",status:"Active"},
]

const ViewReceipt = styled.button`
width: 133px;
height: 34px;
background: var(--unnamed-color-7d84c0) 0% 0% no-repeat padding-box;
background: #7D84C0 0% 0% no-repeat padding-box;
border: none;
border-radius: 5px;
opacity: 1;
text-align: center;
font: normal normal normal 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
`;
const MainContainer = styled.div`
width: 100%;
box-shadow: 5px 10px 5px #00000012;
margin-top: 20px;
padding: 10px;
`;


function Subscription(props){
    return(
        <>
        <MainContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="fc-blue ">Plan</TableCell>
                        <TableCell className="fc-blue ">Cost</TableCell>
                        <TableCell className="fc-blue ">Purchase Date</TableCell>
                        <TableCell className="fc-blue ">Validity</TableCell>
                        <TableCell className="fc-blue ">Status</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscriptionData.map((row)=>(
                        <TableRow>
                        <TableCell>{row.plan}</TableCell>
                        <TableCell>{row.cost}</TableCell>
                        <TableCell>{row.purchase_date}</TableCell>
                        <TableCell>{row.validity}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell><ViewReceipt>View Receipt</ViewReceipt></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </MainContainer>
        </>
    )
}
export default Subscription;