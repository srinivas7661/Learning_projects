import React from "react";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import styled from 'styled-components';
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Managesurvey from "./Managesurvey";
import { history } from "../../managers/history";

const Button = styled.button`
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "#FFF4F3" : "#5C4B75")};
  border:none;
  height: 35px;
  width: 135px;  
  border-radius: 5px;
  text-align: center;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #FFF4F3;
  @media(max-width:768px){
    margin:0 10px 0 10px;
  }
`;
const DeleteButton = styled.button`
width: 15px;
height: 20px;
background:transparent;
border: none;
box-shadow: none;
margin: 0px 30px 0px 50px;
`;
const servey = [{ title: "Lorem Ipsum", trigger: "Lorem Ipsum", status: "Active", serveyView: <div className="float-right"><Button primary>View Resposes</Button><DeleteButton><img src="images/delete.svg" /></DeleteButton></div>, handleClick: () => history.push(`/report-ordering-survey`) },
{ title: "Lorem Ipsum", trigger: "Lorem Ipsum", status: "Active", serveyView: <div className="float-right"><Button primary>View Resposes</Button><DeleteButton><img src="images/delete.svg" /></DeleteButton></div>, handleClick: () => history.push(`/report-ordering-survey`) }]
class Manage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      surveyColumns: [
        "Survey Title",
        "Trigger",
        "Status",
        "",
      ],
      surveyList: servey,
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Column className="w-100-per">
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row className="w-100-per">
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per P-40">
            <Managesurvey state={this.state} />
          </Column>
        </Row>
      </Column>
    );
  }
}

export default Manage;
