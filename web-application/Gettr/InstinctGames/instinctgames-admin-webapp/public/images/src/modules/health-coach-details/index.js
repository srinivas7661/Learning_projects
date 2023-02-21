import React from "react";
import BaseComponent from '../baseComponent'
import Utility, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import Appointment from "./Appointment"
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";

class HealthDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" },
      { userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" },
      { userId: "userId", fullName: "fullName", stage: "stage", subscription: "subscription", kitOrdered: "kitOrdered", familyMember: "familyMember", status: "status" }],
      menu: false,
      menuType: 'icon',

    }
  }
  componentDidMount() {
    console.log("this.props", this.props)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Column>
          <Column>
            <Header handleChange={this.handleChange} />
          </Column>
          <Row>
            <Column>
              <Sidebar
                handleChange={this.handleChange}
                open={this.state.menu}
                menuType={this.state.menuType}
              />
            </Column>
            <Column style={{ width: '100%' }}>
              <Appointment />
            </Column>
          </Row>
        </Column>
      </div>

    );

  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { dispatchAction })(HealthDetails);