import React from "react";
import {Link} from "react-router-dom";
import NotificationService from "../../../services/notificationService"
import {connect} from "react-redux";
import {eventConstants} from "../../../constants";
import {dispatchAction} from "../../../utility";

function NotificationPopup(props) {

    const [notifications, setNotifications] = React.useState([]);
    React.useEffect(() => {
        fetchNotification();
    }, [])

    const fetchNotification = async () => {
        const requestData = {
            "queryObj": {
                "postedTo": props?.walletConnect?.walletConnect?._id
            },
            "selectionString": "title description isRead",
            "skip": 0,
            "limit": 4
        }
        const notifications = await NotificationService.getUserNotifications(requestData).catch(err => {
        });
        if(!notifications || !notifications.notificationList || !notifications.notificationList.length)
            return;
        setNotifications(notifications.notificationList)
        markNotificationRead(notifications.notificationList)
    }

    const markNotificationRead = async (notifications) => {
        const notificationIdsArray = [];
        notifications.map(notification => {
            notificationIdsArray.push(notification._id)
            return notification;
        })
        await NotificationService.markNotificationsRead({notificationIDArray: notificationIdsArray}).catch(err => {
        });
        refreshUnreadCount()
    }

    const refreshUnreadCount = async () => {
        const requestBody = {
            "queryObj": {
                "postedTo": props?.walletConnect?.walletConnect?._id
            }
        }
        const response = await NotificationService.getUserUnReadNotificationCount(requestBody).catch(err => {
        })
        props.dispatchAction(eventConstants.UPDATE_NOTIFICATION_UNREAD_COUNT, response)
    }

    return (
        <div className="tb:w-109.25  w-62.5  bg-grey-30 rounded-10px z-20">
            <div className=" font-Eurostile ">
                <div className="flex flex-col ">
                    {notifications && notifications.length>0 && notifications.map((Item) => (
                        <div className="flex justify-between hover:bg-primary-50">
                            <div
                                className=" flex text-ft0 tb:text-ft4 whitespace-nowrap text-white font-EurostileMedium border-opacity-20 py-4 ">
                                <img
                                    className="ml-5 mr-3"
                                    src="/images/Icon material-notifications.svg"
                                />
                                <ul className="ml-3 text-truncate mob:w-45">{Item.description}</ul>
                            </div>
                            {!Item.isRead ? <div className="purple-dot">
                                <span className=""></span>
                            </div> : ""}
                        </div>
                    ))}
                    {notifications.length === 0 && <p className="text-white text-center">No notification yet</p>}   
                    <div
                        className="text-white bg-primary-50 py-2 cursor-pointer text-ft36 tb:text-ft-16 font-EurostileExtdBlack font-black">
                        <Link to="/notifications">
                            <ul className="text-center">VIEW ALL</ul>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {walletConnect: state.wallet};
};
export default connect(mapStateToProps, {dispatchAction})(NotificationPopup);
// export default NotificationPopup;
