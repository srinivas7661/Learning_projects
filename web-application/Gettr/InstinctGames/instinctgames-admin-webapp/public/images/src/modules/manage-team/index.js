import React from "react";
import BaseComponent from '../baseComponent';
import { Row, Column } from 'simple-flexbox';
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import styled from 'styled-components';
import ManageTeam from './manage-team';
import Utility, { dispatchAction } from "../../utility";
import UserService from "../../services/user";
import { roleConstants, eventConstants, cookiesConstants } from "../../constants";
import { connect } from "react-redux";
import { sessionManager } from "../../managers/sessionManager";
import Team from "../../models/team";

const Image = styled.div`
width: 35px;
height: 35px;
border-radius: 50%;
opacity: 1;
background-color: lightgray;
`;

class ManageTeams extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            menu: false,
            teamColumns: [
                "",
                "Team Member",
                "Role",
                "Status",
            ],
            type: "add",
            users: [],
            usersList: [],
            user: new Team()
        };
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {

        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, users] = await Utility.parseResponse(new UserService().getUsersList(
            { "personalInfo.type": roleConstants.TEAM }
        ));
        if (error) {
            Utility.apiFailureToast(error && error.message ? error.message : error);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER);

        users = users.map(item => {
            let user = {}, fullName = `${item.firstName} ${item.lastName}`
            user['profilePic'] = item.profilePic && item.profilePic.length ? <img src={item.profilePic} className="img" /> : <Image />
            user['fullName'] = fullName
            user['role'] = item.role
            user['status'] = item.status
            user['handleClick'] = () => this.handleEditClick({ ...item, fullName, permissions: item.personalInfo?.permissions ? item.personalInfo?.permissions : [] })
            return user
        })

        this.setState({ users, usersList: users })
    }


    handleEditClick = (user) => {
        this.setState({ drawer: true, type: "edit", user })
    }


    handleChange = (name, value) => {
        if (name == "type") {
            this.setState({ drawer: true, user: new Team(), type: value })
            return
        }
        if (name == "role" || name == "email" || name == "fullName" || name == "status") {
            let user = this.state.user
            user[name] = value
            this.setState({ user })
            return
        }
        this.setState({
            [name]: value,
        });
    };

    handlePermissionChange = (permission) => {
        let user = this.state.user
        let index = user.permissions.findIndex(item => item === permission)
        if (index == -1) {
            user.permissions.push(permission)
        } else {
            user.permissions.splice(index, 1)
        }
        this.setState({ user })
    }

    onSearchChange = (value) => {
        value = String(value).toLowerCase()
        if (!value) {
            this.setState({ users: this.state.usersList })
            return
        }
        let users = this.state.usersList.filter(item => {
            return (item.fullName.toLowerCase().includes(value) ||
                item.status.toLowerCase().includes(value) ||
                item.role.toLowerCase().includes(value))
        })
        this.setState({ users })
    }

    updateUser = async () => {
        let user = this.state.user
        let request = {
            status: user.status,
            role: user.role,
            personalInfo: {
                permissions: this.state.user.permissions
            },
            userId: user.userId
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, updateUserRes] = await Utility.parseResponse(new UserService().updateUser(
            request
        ));
        this.setState({ drawer: false })
        if (error) {
            Utility.apiFailureToast(error && error.message ? error.message : error);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        Utility.apiSuccessToast("User Updated Sucessfully");
        this.componentDidMount()
    }

    inviteUser = async () => {
        if (!this.validateUserInfo()) {
            Utility.apiFailureToast("Please enter required fields")
            return
        }
        let inviteeDetail = sessionManager.getDataFromCookies(cookiesConstants.USER_DETAIL);
        inviteeDetail = JSON.parse(inviteeDetail)
        let request = { ...this.state.user, inviteeName: `${inviteeDetail.firstName} ${inviteeDetail.lastName}`, inviteeMail: inviteeDetail.email }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, inviteRes] = await Utility.parseResponse(new UserService().inviteAdminUser(
            request
        ));
        this.setState({ drawer: false })
        if (error) {
            Utility.apiFailureToast(error && error.message ? error.message : error);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        Utility.apiSuccessToast("User invited Sucessfully");
        this.componentDidMount()
    }

    validateUserInfo = () => {
        return this.state.user.email.length && this.state.user.fullName.length && this.state.user.role.length
    }

    render() {
        return (
            <Column>
                <Column>
                    {" "}
                    <Header handleChange={this.handleChange} />
                </Column>
                <Row>
                    <Column>
                        <Sidebar handleChange={this.handleChange}
                            open={this.state.menu}
                        />
                    </Column>

                    <Column className="w-100-per">

                        <ManageTeam
                            handleChange={this.handleChange}
                            onSearchChange={this.onSearchChange}
                            state={this.state}
                            updateUser={this.updateUser}
                            handlePermissionChange={this.handlePermissionChange}
                            inviteUser={this.inviteUser}
                        />

                    </Column>

                </Row>
            </Column>

        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps, { dispatchAction })(ManageTeams);