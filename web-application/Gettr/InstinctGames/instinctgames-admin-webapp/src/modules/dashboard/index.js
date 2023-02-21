import React from "react";
import BaseComponent from "../baseComponent";
import Dashboard from "./dashboardContent";
import { history } from "../../managers/history";
import { connect } from "react-redux";
import Utils, { dispatchAction } from "../../utility";
import {
  credsConstants,
  eventConstants,
  genericConstants,
  selectionStrings,
  validationsMessages,
} from "../../constants";
import { AuthService } from "../../services";
import { NotificationService } from "../../services";
import CommonToasts from "../../common/components/commonToasts";
import { sessionManager } from "../../managers/sessionManager";

class DashboardComp extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      passwordError: "",
      isFilterOpen: false,
      notifications: [],
      confirmPasswordError: "",
      oldPasswordError: "",
    };
  }

  async componentDidMount() {
    await this.newNotificationsList();
  }

  onMenuClick = (activeMenu) => {
    history.push(activeMenu);
  };
  logoutUser = () => {
    sessionManager.removeDataFromCookies(credsConstants.KEY_PASS);
    this.props.dispatchAction(eventConstants.LOGOUT_SUCCESS);
    return history.push("/");
  };

  isSpecialCharacterAvailable = () => {
    let regex = /^[A-Za-z0-9 ]+$/;
    return regex.test(this.state.newPassword);
  };

  onChangePasswordClick = async () => {
    this.setState({
      passwordError: "",
    });
    if (
      this.state.oldPassword !==
      sessionManager.getDataFromCookies(credsConstants.KEY_PASS)
    ) {
      this.setState({
        oldPasswordError: validationsMessages.INCORRECT_OLD_PASSWORD,
        passwordError: "",
        confirmPasswordError: "",
      });
      return;
    }
    if (
      this.state.newPassword.length < 7 ||
      this.isSpecialCharacterAvailable() === true
    ) {
      this.setState({
        passwordError: validationsMessages.PASSWORD_REGEX_ERROR,
        oldPasswordError: "",
        confirmPasswordError: "",
      });
      return;
    }
    if (this.state.confirmNewPassword !== this.state.newPassword) {
      this.setState({
        confirmPasswordError: validationsMessages.SIMILAR_PASSWORD_ERROR,
        passwordError: "",
        oldPasswordError: "",
      });
      return;
    } else if(this.state.confirmNewPassword === this.state.newPassword){
      this.setState({
        confirmPasswordError: "",
      });
    }

    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    let response = await new AuthService().changePassword(
      this.props?.user?.sub,
      this.state.confirmNewPassword
    );
    if (!response || response?.error) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      CommonToasts.failureMessageSent(validationsMessages.PASSWORD_ERROR);
      return;
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    CommonToasts.successfullySent(validationsMessages.PASSWORD_SUCCESSFULLY);
    history.push("/");
  };

  onCrossBtnClick = () => {
    this.setState({ oldPasswordError: ""})
    this.setState({ passwordError: ""})
    this.setState({ confirmPasswordError: ""})
    this.setState({ oldPassword: ""})
    this.setState({ newPassword: ""})
    this.setState({ confirmNewPassword: ""})
  }

  onChangeEvent = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    if( this.state.oldPassword.length==0){
      this.setState({ oldPasswordError: ""})
    }
    if( this.state.newPassword.length==0){
      this.setState({ passwordError: ""})
    }
    if( this.state.confirmNewPassword.length==0){
      this.setState({ confirmPasswordError: ""})
    }
  };
  changeStateVariable = (key, value) => {
    if(key==="isFilterOpen"){
      this.setState({isFilterOpen: !value })
    }
    
  };

  newNotificationsList = async () => {
    try {
      let data = {
        selectionString: [
          selectionStrings.POSTED_BY,
          selectionStrings.DESCRIPTION,
          selectionStrings.PAYLOAD,
          selectionStrings.ADDED_ON,
          selectionStrings.TITLE,
        ],
        queryObj: {
          userID: selectionStrings.USER_ID,
        },
      };
      const response = await NotificationService.notificationList(data);
      if (response?.length > 0) {
        this.setState({ notifications: response });
      }
    } catch (e) {
      this.setState({ notifications: "" });
    }
  };

  render() {
    return (
      <>
        <Dashboard
          onMenuClick={this.onMenuClick}
          logoutUser={this.logoutUser}
          location={this.props.location}
          permission={this.props.permission}
          user={this.props.user}
          onChangeEvent={this.onChangeEvent}
          onCrossBtnClick={this.onCrossBtnClick}
          state={this.state}
          onChangePasswordClick={this.onChangePasswordClick}
          changeStateVariable={this.changeStateVariable}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    permission: state.user?.permission || [],
    user: state.user?.userDetails || null,
  };
};

export default connect(mapStateToProps, { dispatchAction })(DashboardComp);
