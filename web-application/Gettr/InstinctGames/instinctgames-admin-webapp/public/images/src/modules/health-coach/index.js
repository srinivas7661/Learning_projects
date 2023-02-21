import React from "react";
import BaseComponent from '../baseComponent'

import { history } from "../../managers/history";
import styled from 'styled-components';
import Utils from "../../utility";
import Feedback from "./Feedback"
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";

const Image = styled.img`
width: 35px;
height: 35px;
background: transparent;
border-radius: 50%;
opacity: 1;
`;
const Star = styled.img`
margin-right: 5px;
`;
const Reinvite = styled.button`
text-align: left;
font: normal normal normal 16px/22px Nunito;
color: #7D84C0;
border: none;
background: none;
`

const pendings = [{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "General Physician", status: "Requested" },
{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "General Physician", status: "Invited", reinvite: <Reinvite>Reinvite</Reinvite>},
{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "General Physician", status: "Invited", reinvite: <Reinvite>Reinvite</Reinvite>},]

const confirmes = [{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "Hollistic", Appointments: "10", Rating: <div><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /></div>, Status: "Active", handleClick: () => history.push(`/health-coach-details`) },
{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "Hollistic", Appointments: "10", Rating: <div><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /></div>, Status: "Active", handleClick: () => history.push(`/health-coach-details`) },
{ image: <Image src="images/avatar.jpg" />, name: "Holly Higgins", id: "BHC0023", type: "Hollistic", Appointments: "10", Rating: <div><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /><Star src="images/star.svg" /></div>, Status: "Active", handleClick: () => history.push(`/health-coach-details`) },]

class FeedbackScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" },
      { userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" },
      { userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" }],
      menu: false,
      pendingColumns: [
        "",
        "Health Coach Name",
        "Health Coach ID",
        "Type",
        "Status",
        "",
      ],
      confirnmedColumns: [
        "",
        "Health Coach Name",
        "Health Coach ID",
        "Type",
        "Appointments",
        "Rating",
        "Status",
      ],
      pendingList: pendings,
      confirnmedList: confirmes,
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Column style={{ overflow: "hidden" }} >
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row>
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per">
            <Feedback state={this.state} />
          </Column>
        </Row>
      </Column>
    );

  }
}

export default FeedbackScreen;