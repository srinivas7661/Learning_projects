import React from "react";
import BaseComponent from "../baseComponent";
import AdminRegisterComponent from "./component";
import Utility, { dispatchAction } from "../../utility";
import UserService from "../../services/user";
import { eventConstants, genericConstants } from "../../constants";
import { connect } from 'react-redux'
import { history } from "../../managers/history";


class AdminRegister extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            confirmPassword: "",
            password: "",
            firstName: "",
            error: ''
        };
    }

    componentDidMount() {
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        this.setState({ email: searchParams.get('email') })
    }

    resetPassword = async () => {
        if (!this.state.email || !this.state.password || !this.state.firstName) {
            this.setState({ error: genericConstants.ENTER_REQUIRED_FIELD });
            return;
        }
        if (this.state.confirmPassword !== this.state.password) {
            this.setState({ error: genericConstants.PASSWORD_DID_NOT_MATCH });
            return;
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);

        let [error, res] = await Utility.parseResponse(new UserService().resetPassword(
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
        await this.updateUser(res.family_name)
    }


    updateUser = async (userId) => {
        let [error, updateUser] = await Utility.parseResponse(new UserService().updateUser(
            { firstName: this.state.firstName, userId }
        ));
        if (error) {
            Utility.apiFailureToast(error && error.message ? error.message : error);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        history.push("/")
    }


    handleChange = (name, value) => {
        this.setState({
            [name]: value,
            error: ""
        });
    };


    render() {
        return (
            <AdminRegisterComponent
                state={this.state}
                resetPassword={this.resetPassword}
                handleChange={this.handleChange} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { dispatchAction })(AdminRegister);