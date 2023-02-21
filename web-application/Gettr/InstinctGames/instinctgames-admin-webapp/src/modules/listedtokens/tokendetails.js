import React, { useState, useEffect } from 'react';
import AdminModule from "../../services/adminMicroService";
import { history } from '../../managers/history';
import styled from "styled-components";


const Header = styled.span`
color: #151e58;
font: normal 600 22px Inter;
margin-bottom: none;
padding-left: 5px;
padding-bottom:5px;
`;


const handleChangePage = () => {
    history.push('/dashboard/tokens-list/listed-tokens')
};


function TokenDetails(props) {
    const [token, setToken] = useState([]);

    useEffect(() => {
        getTokenData()
      },[]);
     const getTokenData = async () =>{
    const data= await AdminModule.getToken(props.match.params.id)
    setToken(data)
    
}
const removeToken = async()=>{
    const data= await AdminModule.removeToken(props.match.params.id)

    history.push('/dashboard/tokens-list/listed-tokens')
}
  
    return (
        <div className="p-t-50 p-l-80">
            <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <img onClick={handleChangePage} src="/images/back.svg" />
                    <Header>Token Details</Header>
                </div>
                <div className="main-container">
                    <div class="table-container">
                        <table class="content-table">
                            <thead>
                                <tr>
                                    <th className="details-heading">Request Details</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                <tr>
                                    <td style={{ width: '300px' }} className="details-row">Token name:</td>
                                    <td>{token.tokenName}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Token Symbol:</td>
                                    <td>{token.tokenSymbol}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Contract:</td>
                                    <td>{token.tokenAddress}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Contact Person:</td>
                                    <td>{token.contactPerson}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Email:</td>
                                    <td>{token.email}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Phone:</td>
                                    <td>{token.phone}</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Comment:</td>
                                    <td>{token.comment}</td>
                                </tr>
                                <thead>
                                    <tr>
                                        <th style={{ paddingTop: "50px" }} className="details-heading"> Payment Details</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td className="details-row">Transcation ID:</td>
                                    <td>0xc3147735dd56dfdd555ffgdsgsdhf</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Transaction Amount:</td>
                                    <td>200 BNB</td>
                                </tr>
                                <tr>
                                    <td className="details-row">Transaction date and time:</td>
                                    <td>18 Nov 2021, 1:30PM</td>
                                </tr>
                                <div className="button-container">
                                    <button onClick={removeToken} className="rm-button">Remove Token</button>
                                </div>
                            </tbody>
                        </table>
                    </div>
                    <div className="sub-container">
                        <h1 className="status-heading">Status</h1>
                        <div className="approval-container first-container">
                            <div>
                                <img className="approval-image" src="/images/Request received.svg" />
                                <div>
                                    <img className="line-image" src="/images/colored lines.svg" />
                                </div>
                            </div>
                            <div className="time-container para1">
                                <p className="time-para">19 Nov 2021, 1:30 PM</p>
                                <p>Request received</p>
                            </div>
                        </div>
                        <div className="approval-container">
                            <div>
                                <img className="approval-image" src="/images/Request Approve.svg" />
                                <div>
                                    <img className="line-image" src="/images/colored lines.svg" />
                                </div>
                            </div>
                            <div className="time-container para1">
                                <p className="time-para">19 Nov 2021, 1:30 PM</p>
                                <p>Request Approve</p>
                            </div>
                        </div>
                        <div className="approval-container">
                            <div>
                                <img className="approval-image" src="/images/Payment Verified.svg" />
                            </div>
                            <div className="time-container para1">
                                <p className="time-para">19 Nov 2021, 1:30 PM</p>
                                <p>Payment Verified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TokenDetails;
