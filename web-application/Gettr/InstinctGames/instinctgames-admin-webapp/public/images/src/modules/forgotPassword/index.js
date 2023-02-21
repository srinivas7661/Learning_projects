import React from "react";
import BaseComponent from "../baseComponent";
import ForgotPasswordComponent from "./forgotPassword";
import AuthService from '../../services/user';
import { eventConstants, genericConstants } from '../../constants';
import { connect } from 'react-redux';
import Utility, { dispatchAction } from "../../utility";
import { history } from "../../managers/history";

class Forgot extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  forgotPassword = async (event) => {

    event.preventDefault()
    if (!this.state.email) { Utility.apiFailureToast(genericConstants.ENTER_REQUIRED_FIELD); return; }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    this.authObject = new AuthService();
    let [error, res] = await Utility.parseResponse(this.authObject.forgotPassword(
      {
        email: this.state.email
      }
    ));
    if (error) {
      Utility.apiFailureToast(error && error.message ? error.message : error);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    Utility.apiSuccessToast(genericConstants.RESET_PASSWORD_MAIL_SENT);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    history.push("/")
  }

  render() {
    return (
      <ForgotPasswordComponent
        state={this.state}
        handleChange={this.handleChange}
        forgotPassword={this.forgotPassword}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}
export default connect(mapStateToProps, { dispatchAction })(Forgot);
