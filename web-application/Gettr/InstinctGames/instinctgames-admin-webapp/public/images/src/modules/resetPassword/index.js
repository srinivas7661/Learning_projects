import React from "react";
import BaseComponent from '../baseComponent'
import ResetPasswordComponent from "./resetPassword";
import { history } from "../../managers/history";
import Utility, { dispatchAction } from "../../utility";
import { genericConstants, eventConstants } from "../../constants"
import AuthService from "../../services/user";
import { connect } from "react-redux";

class ResetPassword extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            email: ''
        }
    }


    handleChange = (name, value) => {
        this.setState({ [name]: value })
    }



    resetPassword = async (event) => {

        event.preventDefault()
        if (!this.state.email || !this.state.password) { Utility.apiFailureToast(genericConstants.ENTER_REQUIRED_FIELD); return; }
        if (this.state.confirmPassword !== this.state.password) { Utility.apiFailureToast(genericConstants.PASSWORD_DID_NOT_MATCH); return; }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);

        this.authObject = new AuthService();
        let [error, res] = await Utility.parseResponse(this.authObject.resetPassword(
            {
                email: this.state.email,
                password: this.state.password
            }
        ));
        if (error) {
            Utility.apiFailureToast(error && error.message ? error.message : error);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        console.log(res)
        Utility.apiSuccessToast(genericConstants.PASSWORD_UPDATE_SUCCESS);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        history.push("/")

    }

    render() {
        return (
            <ResetPasswordComponent
                state={this.state}
                handleChange={this.handleChange}
                resetPassword={this.resetPassword}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps, { dispatchAction })(ResetPassword);