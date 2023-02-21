import React from "react";
import BaseComponent from '../baseComponent'
// import { history } from "../../managers/history";
import Utility, { dispatchAction } from "../../utility";
import UserDetailsComponent from "./userDetails";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import UserService from "../../services/user";
import { connect } from 'react-redux';
import User from "../../models/user";

class UsersDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      userDetails: {},
      familyMembers: []
    }
  }

  componentDidMount() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.getUserDetail(searchParams.get('userId'))
  }

  getUserDetail = async (userId) => {
    let [error, res] = await Utility.parseResponse(new UserService().getUser(
      userId
    ));
    if (error) {
      Utility.apiFailureToast(error.message);
      return;
    }
    let userDetails = new User(res)
    this.setState({ userDetails })
    this.getFamilyDetail(userId)
  }

  getFamilyDetail = async (userId) => {
    let [error, familyMembers] = await Utility.parseResponse(new UserService().getFamilyMember(
      userId
    ));
    if (error) {
      Utility.apiFailureToast(error.message);
      return;
    }
    this.setState({ familyMembers })
  }


  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Column>
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row>
          <Column>
            <Sidebar
              handleChange={this.handleChange}
              open={this.state.menu}
              menuType={"icon"}
            />
          </Column>
          <Column className="w-100-pr">
            <UserDetailsComponent
              state={this.state}
              exportDialog={this.exportDialog} />
          </Column>
        </Row>
      </Column>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { dispatchAction })(UsersDetails);