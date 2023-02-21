import React from "react";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import DoctorsList from "./doctor";
import Utility, { dispatchAction } from "../../utility";
import UserService from "../../services/user";
import { connect } from "react-redux";
import User from "../../models/user";
import styled from "styled-components";
import { history } from "../../managers/history";

const ViewButton = styled.button`
  width: 135px;
  height: 35px;
  background: #7d84c0 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 5px #0000001c;
  border-radius: 5px;
  float: right;
  margin-right: 20px;
  border: none;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #fff4f3;
  opacity: 1;
`;

const reports = [
  {
    name: "patient 1",
    reportType: "CT scan",
    sharedOn: "11:22 AM ",
    reportView: <ViewButton>View Report</ViewButton>,
  },
];

class DoctorDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDoctors: true,

      menu: false,
      tableColumns: [
        "",
        "Doctor ID",
        "Doctor Name",
        "Specialization",
        "Shared Reports",
        "Status",
      ],
      reportColumns: ["User Name", "Report Type", "Shared On", ""],
      reportList: reports,
      reports: [],
      usersList: [],
      pendingDoctorList: [],
      pendingDoctors: [],
      confirmDoctorList: [],
      confirmDoctors: [],
      userDetails: new User(),
    };
  }

  componentDidMount() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);

    console.log(
      this.props,
      "this.props",
      searchParams.get("userId"),
      searchParams.get("status")
    );
    this.getUserDetail(searchParams.get("userId"));
  }

  getUserDetail = async (userId) => {
    let [error, res] = await Utility.parseResponse(
      new UserService().getUser(userId)
    );
    if (!res || error) {
      Utility.apiFailureToast(error.message);
      return;
    }
    let userDetails = new User(res);
    this.setState({ userDetails });
  };

  acceptUser = async (userId) => {
    let [error, res] = await Utility.parseResponse(
      new UserService().acceptUser({ userId })
    );
    if (!res || error) {
      Utility.apiFailureToast("Failed to reject doctor");
      return;
    }
    Utility.apiSuccessToast("Doctor accepted Successfully");
    this.componentDidMount();
  };

  rejectUser = async (userId) => {
    let [error, res] = await Utility.parseResponse(
      new UserService().rejectUser({ userId })
    );
    if (!res || error) {
      Utility.apiFailureToast("Failed to reject doctor");
      return;
    }
    Utility.apiSuccessToast("Doctor rejected Successfully");
    history.push("/doctors");
  };

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
              menuType="icon"
              handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per">
            <DoctorsList
              state={this.state}
              userDetails={this.state.userDetails}
              onSearchChange={this.onSearchChange}
              rejectUser={this.rejectUser}
              acceptUser={this.acceptUser}
              handleDropDownChange={this.handleDropDownChange}
            />
          </Column>
        </Row>
      </Column>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { dispatchAction })(DoctorDetails);
