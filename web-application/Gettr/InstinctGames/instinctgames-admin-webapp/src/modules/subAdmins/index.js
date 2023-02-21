import React from "react";
import BaseComponent from "../baseComponent";
import SubAdminsComponent from "./subAdmins";
import {AuthService} from "../../services";
import {eventConstants} from "../../constants";
import Utils, {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import CommonToasts from "../../common/components/commonToasts";
import {
  credsConstants,
  pathConstants,
  validationsMessages,
} from "../../constants";

let flag = true;
let timer = 0;

class SubAdmins extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            searchQuery: '',
            skip: 0,
            limit: 10,
            total: 0,
            userName: "",
            email: "",
            profile: "",
            role: "",
            status: "",
            searchQueryValue: '',
            originalList: [],
            filterUserList: "",
        };
    }

    componentDidMount() {
        this.getUsersList({skip: this.state.skip, searchQuery: this.state.searchQuery, limit: this.state.limit})
    }

    getUsersList = async ({skip, searchQuery, isForAdminList, limit}) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let result = await new AuthService().getUsersList(skip, searchQuery, isForAdminList, limit).catch(error => console.error("error to get user list", error))
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (result?.data) {
            this.setState({
                usersList: result.data?.users, total: result.data?.total, originalList: result.data?.users,
                filterUserList: result.data?.users, total: result.data?.total, originalList: result.data?.users 
            })
        }
        
    };

    handleSearchUserList = (param) => {
        const data = this.state.usersList;
        const filterUserListByName = data.filter((item, i) => {
            return( item.name.toLowerCase().indexOf(param.toLowerCase()) !== -1
        )});
        if (param.length > 0) {
            this.setState({
                filterUserList: filterUserListByName,
            });
        } else {
            this.setState({
                filterUserList: data,
            });
        }
    };



    onClickNextPage = () => {
        if (this.state.usersList.length <= this.state.limit && this.state.total <= this.state.limit)
            return false;
        this.setState({skip: this.state.skip + 1})
        this.getUsersList({skip: this.state.skip + 1, searchQuery: this.state.searchQuery, limit: this.state.limit})

    }

    onClickPreviousPage = () => {
        if (this.state.skip <= 0)
            return false;
        this.setState({skip: this.state.skip - 1})
        this.getUsersList({skip: this.state.skip - 1, searchQuery: this.state.searchQuery, limit: this.state.limit})
    };
    onChangeSearchField = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value, skip: 0})
        this.throttling(this.getUsersList, 2000)({skip: 0, searchQuery: event.target.value, limit: this.state.limit})
        this.debouncing(this.getUsersList, 2000)({skip: 0, searchQuery: event.target.value, limit: this.state.limit})
    }
    debouncing = (callback, limit) => {
        return function (requestData) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(requestData)
            }, limit)
        }
    }

    throttling = (callback, limit) => {
        return function (requestData) {
            if (flag) {
                flag = false;
                callback(requestData);
                setTimeout(() => {
                    flag = true;
                }, limit)
            }
        }
    }

    removeSubAdmin = async (data) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, authResponse] = await Utils.parseResponse(new AuthService().deleteUser(data.user_id));
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (error) {
            // Utils.apiFailureToast("Unable to remove admin team member information")
            CommonToasts.failureMessageSent(validationsMessages.UNABLE_REMOVE)
            return
        }
        this.getUsersList({skip: 0, searchQuery: this.state.searchQuery, limit: this.state.limit})
        // Utils.apiSuccessToast("Admin Team Member has been removed Successfully.");
        CommonToasts.successfullySent(validationsMessages.REMOVED_SUCCESSFULLY)

    }
    addSubAdmin = async (data) => {
        let reqObj = {
            "name": data?.name,
            "email": data?.email,
            "role": data?.role || '',
            "password": process.env.REACT_APP_ADD_IG_MEMBER_PASSWORD,
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, authResponse] = await Utils.parseResponse(new AuthService().signUp(reqObj));
        if (error) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            // Utils.apiFailureToast("Email already exist")
            CommonToasts.failureMessageSent(validationsMessages.EMAIL_ALREADY_EXIST)
            return
        }
        let [forgotError, forgotPasswordResponse] = await Utils.parseResponse(new AuthService().forgotPassword(data?.email));
        //
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (forgotError) {
            // Utils.apiFailureToast(error && error.description || "Mail not sent");
            CommonToasts.failureMessageSent(error && error.description || validationsMessages.MAIL_NOT_SENT)
            return
        }
        this.getUsersList({skip: 0, searchQuery: this.state.searchQuery, limit: this.state.limit})
        // Utils.apiSuccessToast("Admin Team Member has been added Successfully.");
        CommonToasts.successfullySent(validationsMessages.ADDED_SUCCESSFULLY)
    }
    updateSubAdmin = async (data) => {
        if (!data.user_id)
            return
        let updateObj = {
            "name": data?.name,
            "email": data?.email,
            user_metadata: {
                "role": data?.role || ''
            }
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, authResponse] = await Utils.parseResponse(new AuthService().updateUserMetaData(updateObj, data.user_id));
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (error) {
            // Utils.apiFailureToast("Unable to update admin team member information")
            CommonToasts.failureMessageSent(validationsMessages.UNABLE_UPDATE)
            return
        }
        this.getUsersList({skip: 0, searchQuery: this.state.searchQuery, limit: this.state.limit})
        // Utils.apiSuccessToast("Admin information has been updated.");
        CommonToasts.successfullySent(validationsMessages.UPDATED_SUCCESSFULLY)

    }

    render() {
        // console.log("this.state.result.data?.users",this.state.result.data?.users)
        return (
            <>
                <SubAdminsComponent
                    state={this.state}
                    removeSubAdmin={this.removeSubAdmin}
                    addSubAdmin={this.addSubAdmin}
                    updateSubAdmin={this.updateSubAdmin}
                    onClickNextPage={this.onClickNextPage}
                    onChangeSearchField={this.onChangeSearchField}
                    onClickPreviousPage={this.onClickPreviousPage}
                    handleSearchUserList={this.handleSearchUserList}    
                    />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps, {dispatchAction})(SubAdmins)
