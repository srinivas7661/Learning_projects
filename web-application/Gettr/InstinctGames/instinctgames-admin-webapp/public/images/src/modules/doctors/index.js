import React from "react";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import DoctorsList from "./doctorsList";
import Utility, { dispatchAction } from "../../utility";
import UserService from "../../services/user";
import { roleConstants, eventConstants, statusConstants } from "../../constants";
import { connect } from 'react-redux'
import { history } from "../../managers/history";
import styled from "styled-components";

const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  height: 35px;
  width: 35px;
  align-self: center;
  justify-content: center;
`;
class Doctor extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDoctors: true,

      menu: false,
      tableColumns: [
        "",
        "Doctor Name",
        "Doctor ID",
        "Specialization",
        "Shared Reports",
        "Status",
      ],
      usersList: [],
      pendingDoctorList: [],
      pendingDoctors: [],
      confirmDoctorList: [],
      confirmDoctors: [],
    };
  }

  componentDidMount() {
    this.getUsers()
  }


  getUsers = async () => {

    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, users] = await Utility.parseResponse(new UserService().getUsersList(
      { role: roleConstants.DOCTOR }
    ));
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    let statusOptions = [], specializationOptions = [], pendingDoctorList = [], confirmDoctorList = []
    users = users.map(item => {
      let user = {}

      user['profilePic'] = item.profilePic ? <img src={item.profilePic} className="img" /> : <ProfileImage />
      user['fullName'] = `${item.firstName} ${item.lastName}`
      user['userId'] = item.userId
      user['specialization'] = item.personalInfo.specialization
      user['sharedReports'] = ''
      user['status'] = item.status

      console.log(item.status, "item.status")
      if (item.status === statusConstants.PENDING || item.status === statusConstants.INACTIVE || item.status === statusConstants.INVITED) {
        user['handleClick'] = () => history.push(`/doctor-details?userId=${item.userId}&status=pending`)
        pendingDoctorList.push(user)
      }
      if (item.status === statusConstants.ACTIVE) {
        user['handleClick'] = () => history.push(`/doctor-details?userId=${item.userId}&status=active`)
        confirmDoctorList.push(user)
      }

      if (item && item.status && (statusOptions.findIndex(ite => ite.name === item.status) === -1)) {
        statusOptions.push({ name: item.status, value: item.status })
      }

      if (item.personalInfo && item.personalInfo.specialization && item.personalInfo.specialization.length && (specializationOptions.findIndex(ite => ite.name === item.personalInfo.specialization) === -1)) {
        specializationOptions.push({ name: item.personalInfo.specialization, value: item.personalInfo.specialization })
      }
      return { ...user }
    })
    console.log(pendingDoctorList)
    this.setState({ pendingDoctorList, confirmDoctorList, confirmDoctors: confirmDoctorList, pendingDoctors: pendingDoctorList, specializationOptions, statusOptions })

  }


  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSearchChange = (value) => {
    value = String(value).toLowerCase()
    if (!value) {
      this.setState({ confirmDoctorList: this.state.confirmDoctors, pendingDoctorList: this.state.pendingDoctors })
      return
    }

    let pendingDoctorList = this.state.pendingDoctors.filter(item => {
      return (item.fullName.toLowerCase().includes(value) || item.userId.toLowerCase().includes(value) ||
        item.specialization.toLowerCase().includes(value) || item.status.toLowerCase().includes(value) ||
        String(item.sharedReports).toLowerCase().includes(value))
    })
    let confirmDoctorList = this.state.confirmDoctors.filter(item => {
      return (item.fullName.toLowerCase().includes(value) || item.userId.toLowerCase().includes(value) ||
        item.specialization.toLowerCase().includes(value) || item.status.toLowerCase().includes(value) ||
        String(item.sharedReports).toLowerCase().includes(value))
    })

    this.setState({ confirmDoctorList, pendingDoctorList })

  }


  handleDropDownChange = (value, name) => {

    if (value === 'all') {
      this.setState({ pendingDoctorList: this.state.pendingDoctors, confirmDoctorList: this.state.confirmDoctors })
    } else {
      let pendingDoctorList = this.state.pendingDoctors.filter(item => {
        return item[name] === value
      })
      let confirmDoctorList = this.state.confirmDoctors.filter(item => {
        return item[name] === value
      })
      this.setState({ confirmDoctorList, pendingDoctorList })
    }

  }

  render() {
    return (
      <Column>
        <Column>
          {" "}
          <Header handleChange={this.handleChange} />{" "}
        </Column>
        <Row>
          <Column>
            {" "}
            <Sidebar
              handleChange={this.handleChange}
              open={this.state.menu}
            />{" "}
          </Column>
          <Column className="w-100 P-40">
            <DoctorsList
              state={this.state}
              onSearchChange={this.onSearchChange}
              handleDropDownChange={this.handleDropDownChange} />
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

export default connect(mapStateToProps, { dispatchAction })(Doctor);