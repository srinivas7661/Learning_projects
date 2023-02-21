import React, {Component} from "react";
import NotificationComponent from "./notificationsComponent";
import {connect} from "react-redux";
import Utility, {dispatchAction} from "../../../utility";
import {updateUser} from "../../../services/userMicroservice"
import {eventConstants, validationsMessages} from "../../../constants";
import CommonToasts from "../../../common/components/commonToasts";
import commonToasts from "../../../common/components/commonToasts";

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationPreferences: []
        }
    }

    componentDidMount() {
        if (this?.props?.user?.walletConnect?.notificationPreferences)
            this.setState({notificationPreferences: [...this?.props?.user?.walletConnect?.notificationPreferences]})
    }

    toggleNotificationsRadio = (key) => {
        const _notificationPreferences = this.state.notificationPreferences;
        if (!_notificationPreferences.includes(key))
            _notificationPreferences.push(key)
        else {
            const index = _notificationPreferences.indexOf(key);
            if (index > -1)
                _notificationPreferences.splice(index, 1);
        }
        this.setState({notificationPreferences: _notificationPreferences})
    }

    clearNotifications = () => {
        if (this?.props?.user?.walletConnect?.notificationPreferences)
            this.setState({notificationPreferences: []})
    }

    saveChanges = async () => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const findQuery = {
            _id: this?.props?.user?.walletConnect?._id
        }
        const [err, updateNotificationResponse] = await Utility.parseResponse(updateUser({
            findQuery,
            updateQuery: {notificationPreferences: this.state.notificationPreferences}
        }))
        if (err) {
            CommonToasts.errorToast(err?.message || validationsMessages.UNABLE_TO_UPDATE_USER);
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        commonToasts.successToast(validationsMessages.NOTIFICATIONS_PREFERENCES_UPDATED_SUCCESSFULLY);
        this.props.dispatchAction(eventConstants.META_MASK, updateNotificationResponse);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
    }

    render() {
        console.log(this.state.notificationPreferences,"veda");
        return (
            <div>
                <NotificationComponent
                    state={this.state}
                    toggleNotificationsRadio={this.toggleNotificationsRadio}
                    clearNotifications={this.clearNotifications}
                    saveChanges={this.saveChanges}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.wallet};
};
export default connect(mapStateToProps, {dispatchAction})(Notifications);