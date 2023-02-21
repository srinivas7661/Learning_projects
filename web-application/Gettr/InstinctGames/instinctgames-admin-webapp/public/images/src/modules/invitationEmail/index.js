import React from "react";
import BaseComponent from '../baseComponent'
// import LoginComponent from './loginComponent'
import Invitation from "./invitationEmail";


class InvitationEmail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailError: "",
            // invitation: "Health-coach",
            invitation: "admin",
        }
    }

    render() {
        return (
            <Invitation state={this.state} />
        );

    }
}
export default InvitationEmail;