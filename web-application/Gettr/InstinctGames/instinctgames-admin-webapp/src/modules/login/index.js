import React from "react";
import BaseComponent from "../baseComponent";
import LoginComponent from "./loginComponent";
import Utils, { dispatchAction } from "../../utility";
import { history } from "../../managers/history";
import {
  adminPermissionConstants,
  cookiesConstants,
  eventConstants,
  genericConstants,
} from "../../constants";
import { AuthService } from "../../services";
import { sessionManager } from "../../managers/sessionManager";
import { connect } from "react-redux";
import ForgotPassword from "../forgotPassword/forgotPassword";
import toast, { Toaster } from "react-hot-toast";
import CommonToasts from "../../common/components/commonToasts";
import {
  credsConstants,
  pathConstants,
  validationsMessages,
} from "../../constants";

class Login extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      forgotEmail: "",
      forgotEmailError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      authError: "",
      isPasswordVisible: false,
      openPasswordPopup: false,
    };
  }

  componentDidMount() {}

  onChangeEvent = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      [`${event.target.id}Error`]: "",
      authError:""
    });
  };

  togglePassword = (event) => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  // validateLoginForm = () => {
  //     this.setState({
  //         emailError: Utils.validateEmail(this.state.email) ? "" : "Please Enter Valid Credential",
  //         passwordError: Utils.isPasswordValid(this.state.password) ? "" : "Please Enter Valid Credential"
  //     });
  //     return Utils.validateEmail(this.state.email) && Utils.isPasswordValid(this.state.password);
  // };

  validateLoginForm = () => {
    if (!this.state.email.length) {
      this.setState({
        emailError: validationsMessages.ENTER_EMAIL_ERROR,
      });
    } else {
      this.setState({
        emailError: Utils.validateEmail(this.state.email)
          ? ""
          : validationsMessages.VALIDATE_EMAIL_ERROR,
      });
    }

    if (!this.state.password.length) {
      this.setState({
        passwordError: validationsMessages.ENTER_PASSWORD_ERROR,
      });
    } else {
      this.setState({
        passwordError: Utils.isPasswordValid(this.state.password)
          ? ""
          : validationsMessages.VALIDATE_PASSWORD_ERROR,
      });
    }

    return (
      Utils.validateEmail(this.state.email) &&
      Utils.isPasswordValid(this.state.password)
    );
  };

  onLoginClicked = async (event) => {
    event.preventDefault();
    if (!this.validateLoginForm()) return;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    this.authObject = new AuthService();
    let [error, authResponse] = await Utils.parseResponse(
      this.authObject.login(this.state.email, this.state.password)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error) {
      // Utils.apiFailureToast(error && error.description || "Unable to login")
      // CommonToasts.failureMessageSent("Wrong Email or Password");
      this.setState({authError:validationsMessages.AUTH_ERROR})

      // this.setState({
      //   emailError: validationsMessages.EMAIL_NOT_VALID,
      //   passwordError: validationsMessages.ENTER_PASSWORD_ERROR,
      // });
      return;
    }
    sessionManager.setDataInCookies(
      authResponse.userMetaData.user_metadata,
      cookiesConstants.USER_META_DATA
    );
    sessionManager.setDataInCookies(
      this.state.password,
      credsConstants.KEY_PASS
    );
    let permission =
      Utils.parseJwt(authResponse.accessToken)?.permissions || [];
    this.props.dispatchAction(eventConstants.SIGN_IN_SUCCESS, {
      ...authResponse,
      permission,
    });

    this.redirectBasedOnPermission(permission);
  };
  redirectBasedOnPermission = (permissionList) => {
    if (permissionList.indexOf(adminPermissionConstants.STORE_FRONT) > -1)
      return history.push(genericConstants.ACTIVE_MENU.COLLECTION);
    else if (permissionList.indexOf(adminPermissionConstants.CONTENT) > -1)
      return history.push(genericConstants.ACTIVE_MENU.MANAGE_CONTENT);
    else if (permissionList.indexOf(adminPermissionConstants.SUB_ADMINS) > -1)
      return history.push(genericConstants.ACTIVE_MENU.SUB_ADMINS);
    else if (permissionList.indexOf(adminPermissionConstants.TOKENS) > -1)
      return history.push(genericConstants.ACTIVE_MENU.LISTED_TOKENS);
    else
      return CommonToasts.failureMessageSent(
        validationsMessages.PERMISSION_ACCESS
      );
    // Utils.apiFailureToast("You do not have any permission to access this portal.")
  };
  togglePasswordPopup = () => {
    this.setState({
      emailError: Utils.validateEmail(this.state.email) ? "" : "",
      passwordError: Utils.isPasswordValid(this.state.password) ? "" : "",
    });
    this.setState({
      forgotEmail: Utils.validateEmail(this.state.forgotEmail) ? "" : "",

      forgotEmailError: Utils.validateEmail(this.state.forgotEmailError)
        ? ""
        : "",
    });
    return this.setState((prevState) => ({
      openPasswordPopup: !prevState.openPasswordPopup,
    }));
  };

  //   validateForgotPasswordForm = () => {
  //     this.setState({
  //       forgotEmailError: Utils.validateEmail(this.state.forgotEmail)
  //         ? ""
  //         : "Please Enter Email Address",
  //     });
  //     return Utils.validateEmail(this.state.forgotEmail);
  //   };

  validateForgotPasswordForm = () => {
    if (!this.state.forgotEmail.length) {
      this.setState({
        forgotEmailError: validationsMessages.ENTER_EMAIL_ERROR,
      });
    } else {
      this.setState({
        forgotEmailError: Utils.validateEmail(this.state.forgotEmail)
          ? ""
          : validationsMessages.EMAIL_NOT_VALID,
      });
    }

    return Utils.validateEmail(this.state.forgotEmail);
  };

  onConfirmForgotPasswordClick = async () => {
    if (!this.validateForgotPasswordForm()) return;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, authResponse] = await Utils.parseResponse(
      new AuthService().forgotPassword(this.state.forgotEmail)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error) {
      CommonToasts.failureMessageSent(
        (error && error.description) || validationsMessages.MAIL_NOT_SENT
      );
      return;
    }
    CommonToasts.successfullySent(validationsMessages.RESET_MAIL);
    this.togglePasswordPopup();
  };

  render() {
    return (
      <div>
        <div>
          <Toaster />
        </div>
        <LoginComponent
          state={this.state}
          onChangeEvent={this.onChangeEvent}
          togglePassword={this.togglePassword}
          onLoginClicked={this.onLoginClicked}
          togglePasswordPopup={this.togglePasswordPopup}
        />
        {this.state.openPasswordPopup ? (
          <ForgotPassword
            state={this.state}
            closePasswordPopup={this.togglePasswordPopup}
            onChangeEvent={this.onChangeEvent}
            onConfirmForgotPasswordClick={this.onConfirmForgotPasswordClick}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Login);
