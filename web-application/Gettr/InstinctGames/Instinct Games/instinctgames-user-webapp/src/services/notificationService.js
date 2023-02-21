import {httpConstants} from "../constants";
import {httpService} from "../utility/httpService";

export default {
    getUserNotifications,getUserUnReadNotificationCount,markNotificationsRead
};

async function getUserNotifications(requestData) {
    const headers = {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-api-key": process.env.REACT_APP_X_API_KEY,
    }

    const url = process.env.REACT_APP_NOTIFICATION_MICROSERVICE + "notification-list"
    return httpService(
        httpConstants.METHOD_TYPE.POST,
        headers,
        requestData,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();

            return Promise.resolve(response.responseData);
        })

        .catch(function (err) {
            return Promise.reject(err);
        });
}

async function getUserUnReadNotificationCount(requestData) {
    const headers = {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-api-key": process.env.REACT_APP_X_API_KEY,
    }

    const url = process.env.REACT_APP_NOTIFICATION_MICROSERVICE + "notification-count"
    return httpService(
        httpConstants.METHOD_TYPE.POST,
        headers,
        requestData,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();

            return Promise.resolve(response.responseData);
        })

        .catch(function (err) {
            return Promise.reject(err);
        });
}

async function markNotificationsRead(requestData) {
    const headers = {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        "x-api-key": process.env.REACT_APP_X_API_KEY,
    }

    const url = process.env.REACT_APP_NOTIFICATION_MICROSERVICE + "mark-bulk-notification-read"
    return httpService(
        httpConstants.METHOD_TYPE.POST,
        headers,
        requestData,
        url
    )
        .then((response) => {
            if (
                !response.success ||
                !response.responseData ||
                response.responseData.length === 0
            )
                return Promise.reject();

            return Promise.resolve(response.responseData);
        })

        .catch(function (err) {
            return Promise.reject(err);
        });
}

