import React from "react";
import BaseComponent from '../baseComponent'
import { history } from "../../managers/history";
import User from "./userList"
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import UserService from "../../services/user";
import { roleConstants, eventConstants } from "../../constants";
import { connect } from 'react-redux'
import Utility, { dispatchAction } from "../../utility";


class UsersList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersList: [],
      menu: false,
      exortDialogOpen: false,
      tableColumns: ["User ID", "Full Name", "Stage", "Subscription", "Kit Ordered", "Family Member", "Zip Code", "Status"],
      stageOptions: [],
      zipCodeOptions: [],
      subscriptionOptions: []
    }
  }

  componentDidMount = () => {
    this.getUsers()
  }

  onSearchChange = (value) => {
    value = String(value).toLowerCase()
    if (!value) {
      this.setState({ users: this.state.usersList })
      return
    }

    let users = this.state.usersList.filter(item => {
      return (item.fullName.toLowerCase().includes(value) || item.userId.toLowerCase().includes(value) ||
        item.subscription.toLowerCase().includes(value) || item.status.toLowerCase().includes(value) ||
        item.stage.toLowerCase().includes(value) ||
        String(item.familyMembers).toLowerCase().includes(value) || String(item.pincode).toLowerCase().includes(value))
    })

    this.setState({ users })

  }

  getUsers = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, users] = await Utility.parseResponse(new UserService().getUsersByRole(
      { role: roleConstants.PATIENT }
    ));
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    let zipCodeOptions = [], subscriptionOptions = [], stageOptions = []
    users = users.map(item => {
      let user = {}

      // user['profilePic'] = item.profilePic ? <img src={item.profilePic} className="img" /> : <ProfileImage />
      user['userId'] = item.userId
      user['fullName'] = `${item.firstName} ${item.lastName}`
      user['stage'] = item.personalInfo.stage
      user['subscription'] = '-'
      user['kitOrdered'] = '-'
      user['familyMember'] = item.personalInfo.familyMembers.length
      user['pincode'] = item.address?.pincode
      user['status'] = item.status
      user['handleClick'] = () => history.push(`/users-details?userId=${item.userId}`)

      if (item.address && item.address.pincode && (zipCodeOptions.findIndex(ite => ite.name === item.address.pincode) === -1)) {
        zipCodeOptions.push({ name: item.address.pincode, value: item.address.pincode })
      }

      if (item.personalInfo && item.personalInfo.stage && item.personalInfo.stage.length && (stageOptions.findIndex(ite => ite.name === item.personalInfo.stage) === -1)) {
        stageOptions.push({ name: item.personalInfo.stage, value: item.personalInfo.stage })
      }
      return { ...user }
    })
    this.setState({ users, usersList: users, stageOptions, zipCodeOptions, subscriptionOptions })

  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };


  exportDialog = () => {
    this.setState({ exortDialogOpen: !this.state.exortDialogOpen })
  }
  userDetails = () => {
    history.push('users-details')
  }

  handleDropDownChange = (value, name) => {
    console.log(value, name)
    let users = []
    if (value === 'all') {
      users = this.state.usersList
    } else {
      users = this.state.usersList.filter(item => {
        return item[name] === String(value)
      })
    }

    this.setState({ users })
  }

  render() {
    return (
      <Column>
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
            <User state={this.state}
              exportDialog={this.exportDialog}
              onSearchChange={this.onSearchChange}
              handleDropDownChange={this.handleDropDownChange}
              userDetails={this.userDetails} />
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

export default connect(mapStateToProps, { dispatchAction })(UsersList);