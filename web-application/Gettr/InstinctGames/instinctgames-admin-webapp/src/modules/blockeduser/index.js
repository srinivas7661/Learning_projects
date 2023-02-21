import BaseComponent from "../baseComponent";
import React from "react";
import {ContentService, UserService} from "../../services";
import Utility, {dispatchAction} from "../../utility";
import {
    apiFailureConstants,
    apiSuccessConstants,
    eventConstants,
    validationsMessages,
} from "../../constants";
import {connect} from "react-redux";
import moment from "moment";
import BlockedUserComponent from "./blockedUserComponent";
import CommonToasts from "../../common/components/commonToasts";
import toast, {Toaster} from "react-hot-toast";

let flag = true;
let timer = 0;

class BlockedUser extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            removedNftList: [],
            skip: 0,
            limit: 10,
            total: 0,
            duration: "oneDay",
            searchField: "",
            searchKeys: ["name"],
            searchByName: "",
            selectedDaysFilter: 1,

        };
    }

    componentDidMount() {
        let requestData = {
            limit: this.state.limit || 10,
            skip: this.state.skip || 0,
            searchByName: this.state.searchByName || "",
            duration: this.state.duration || "oneDay"
        }
        this.getBlockedUserList(requestData);
    }

    onSearch = (searchByName) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        this.setState({searchByName, skip:0})
        let requestData = {
            limit: this.state.limit || 10,
            skip: this.state.skip || 0,
            searchByName: searchByName || "",
            duration: this.state.duration,
        }
        this.getBlockedUserList(requestData)
    }

    getBlockedUserList = async (requestData) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let [error, removedNftListResponse] = await Utility.parseResponse(
            ContentService.getBlockedUserList(requestData)
        );
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (error)
            return CommonToasts.failureMessageSent(
                validationsMessages.GET_BLOCKED_USER_LIST
            );
        if (
            removedNftListResponse?.blockedUsers?.length === 0 ||
            removedNftListResponse?.blockedUsers === undefined
        ) {
            this.setState({
                removedNftList: [],
            });
        } else if (removedNftListResponse?.blockedUsers?.length > 0) {
            this.setState({
                    removedNftList: removedNftListResponse.blockedUsers,
                    total: removedNftListResponse.count,
                }
            );
        }
    };

    onSelectDaysFilter = (event) => {
        event.preventDefault();
        console.log('event.target.name', event.target.name)
        console.log('event.target.value', event.target.value)
        this.setState({"duration": event.target.value, skip: 0});
        let requestData = {
            limit: this.state.limit,
            skip: 0,
            duration: event.target.value,
            searchByName: this.state.searchByName || "",

        };
        // if (this.state.searchField) {
        //     requestData["searchValue"] = this.state.searchField;
        //     requestData["searchKeys"] = this.state.searchKeys;
        // }
        this.getBlockedUserList(requestData);
    };

    onClickPreviousPage = () => {
        if (this.state.skip <= 0) return false;
        this.setState({skip: this.state.skip - this.state.limit});

        let requestData = {
            limit: this.state.limit,
            skip: this.state.skip - this.state.limit,
            duration: this.state.selectedDaysFilter,
            searchByName: this.state.searchByName || "",
        };

        if (this.state.searchField) {
            requestData["searchValue"] = this.state.searchField;
            requestData["searchKeys"] = this.state.searchKeys;
        }
        this.getBlockedUserList(requestData);
    };

    onClickNextPage = () => {
        if (this.state.removedNftList <= this.state.limit) return false;
        if (this.state.skip + this.state.removedNftList.length >= this.state.total)
            return false
        let requestData = {
            limit: this.state.limit,
            skip: this.state.skip + this.state.limit,
            duration: this.state.selectedDaysFilter,
            searchByName: this.state.searchByName || "",
        };
        // if (this.state.searchField) {
        //     requestData["searchValue"] = this.state.searchField;
        //     requestData["searchKeys"] = this.state.searchKeys;
        // }
        this.setState({skip: this.state.skip + this.state.limit});
        this.getBlockedUserList(requestData);
    };
    onChangeSearchField = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value, skip: 0});

        let requestData = {
            limit: this.state.limit,
            skip: this.state.skip || 0,
            duration: this.state.selectedDaysFilter,
            searchByName: this.state.searchByName || "",
        };
        if (event.target.value) {
            var text = event.target.value;
            var searchHash = text.replace(/\s/g, "");
            requestData["searchValue"] = searchHash;
            requestData["searchKeys"] = this.state.searchKeys;
        }
        this.throttling(this.getBlockedUserList, 2000)(requestData);
        this.debouncing(this.getBlockedUserList, 2000)(requestData);
    };

    debouncing = (callback, limit) => {
        return function (requestData) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(requestData);
            }, limit);
        };
    };

    throttling = (callback, limit) => {
        return function (requestData) {
            if (flag) {
                flag = false;
                callback(requestData);
                setTimeout(() => {
                    flag = true;
                }, limit);
            }
        };
    };

    unblockUser = async (data) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let req = {
            findQuery: {_id: data?._id || ""},
            updateQuery: {isBlocked: false},
        };
        let [error, response] = await Utility.parseResponse(
            UserService.updateUser(req)
        );
        this.props.dispatchAction(eventConstants.HIDE_LOADER);

        if (error || !response)
            return CommonToasts.failureMessageSent(validationsMessages.UN_BLOCK_USER);
        // Utility.apiFailureToast(apiFailureConstants.UN_BLOCK_USER);

        let requestData = {
            limit: this.state.limit,
            skip: this.state.skip,
            searchByName: this.state.searchByName || "",
            duration: this.state.selectedDaysFilter,
        };
        if (this.state.searchField) {
            requestData["searchValue"] = this.state.searchField;
            requestData["searchKeys"] = this.state.searchKeys;
        }
        this.getBlockedUserList(requestData);
        // Utility.apiSuccessToast(apiSuccessConstants.UN_BLOCK_USER);
        CommonToasts.successfullySent(validationsMessages.UN_BLOCKED_USER);
    };

    render() {
        return (
            <BlockedUserComponent
                state={this.state}
                getBlockedUserList={this.getBlockedUserList}
                onSelectDaysFilter={this.onSelectDaysFilter}
                onClickNextPage={this.onClickNextPage}
                onClickPreviousPage={this.onClickPreviousPage}
                onChangeSearchField={this.onChangeSearchField}
                unblockUser={this.unblockUser}
                onSearch={this.onSearch}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user};
};

export default connect(mapStateToProps, {dispatchAction})(BlockedUser);
