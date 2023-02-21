import React, {Component} from "react";
import {v4 as uuid} from "uuid";
import MainNotificationComponent from "./mainNotificationComponent";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import NotificationService from "../../services/notificationService";
import {eventConstants} from "../../constants";
import {connect} from "react-redux";
import { dispatchAction } from "../../utility";
import {history} from "../../managers/history"

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            totalNotificationCount: 0,
            skip: 0,
            limit: 4,
            activePage: 1,
            isLoadMoreDisable: false
        }
    }

    componentDidMount() {
        this.fetchNotification(0, 10);
    }

    handleLoadMoreClick = () => {
        if(this.state.isLoadMoreDisable)
            return;
        this.state.isLoadMoreDisable = true;
        this.fetchNotification()
    }

    fetchNotification = async () => {
        if (!this.props?.walletConnect?.walletConnect.userId) {
            history.push("/wallet-connect")
        }
        const requestData = {
            "queryObj": {
                "postedTo": this.props?.walletConnect?.walletConnect?._id
            },
            "selectionString": "title description isRead",
            "skip": this.state.skip,
            "limit": this.state.limit
        }
        const notifications = await NotificationService.getUserNotifications(requestData).catch(err => {
        });
        if (!notifications || !notifications.notificationList || !notifications.notificationList.length)
            return;
        this.setState({
            notifications: [...this.state.notifications,...notifications.notificationList], totalNotificationCount: notifications.totalCount,
            skip: (this.state.skip + this.state.limit),
            isLoadMoreDisable: false
        })
        this.markNotificationRead(notifications.notificationList)
    }

    markNotificationRead = async (notifications) => {
        const notificationIdsArray = [];
        notifications.map(notification => {
            notificationIdsArray.push(notification._id)
            return notification;
        })
        await NotificationService.markNotificationsRead({notificationIDArray: notificationIdsArray}).catch(err => {
        });
        this.refreshUnreadCount()
    }

    refreshUnreadCount = async () => {
        const requestBody = {
            "queryObj": {
                "postedTo": this.props?.walletConnect?.walletConnect?._id
            }
        }
        const response = await NotificationService.getUserUnReadNotificationCount(requestBody).catch(err => {
        })
        this.props.dispatchAction(eventConstants.UPDATE_NOTIFICATION_UNREAD_COUNT, response)
    }

    toggleActiveNotificationItem = (id) => {
        this.setState((preState) => ({
            notificationList: preState.notificationList.map((item) => {
                if (item.id === id) {
                    item.active = !item.active
                }
                return item
            })
        }))
    }

    render() {
        return (
            <div className="bg-main min-h-screen bg-cover">
                <HeaderComponent/>
                <MainNotificationComponent
                    state={this.state}
                    toggleActiveNotificationItem={this.toggleActiveNotificationItem}
                    handleLoadMoreClick={this.handleLoadMoreClick}
                />
                <FooterComponent/>
            </div>
        );
    }
}

// export default Notifications;
const mapStateToProps = (state) => {
    return {currency: state.currency, walletConnect: state.wallet};
};
export default connect(mapStateToProps, {dispatchAction})(Notifications);