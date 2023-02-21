import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

export default class FeedAndCommunityService {


    getHeaders() {
        return {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON, 'skip': true,
            'Access-Control-Allow-Origin': '*'
        }
    }

    async getFeeds(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.FEED
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async getDraftedFeed(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.DRAFTED_FEED
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getUsersPost(userId) {
        console.log("getUsersPost", userId)
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + `${httpConstants.API_END_POINT.USERS_POSTS}/${userId}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getUsersFeed(userId) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + `${httpConstants.API_END_POINT.USERS_FEEDS}/${userId}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async getFeedsByStatus(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.FEED_BY_STATUS
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async addFeed(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.FEED
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async updateFeed(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.UPDATE_FEED
        return httpService(httpConstants.METHOD_TYPE.PUT, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getPostByCategory(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.GET_POST_BY_CATEGORY
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };



    async getCommunity(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.COMMUNITY
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };



    async addCommunity(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.COMMUNITY
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async acceptPost(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.ACCEPT_POST
        return httpService(httpConstants.METHOD_TYPE.PUT, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };


    async rejectPost(requestData) {
        let url = process.env.REACT_APP_FEEDS_AND_COMMUNITY_SERVICE_URL + httpConstants.API_END_POINT.REJECT_POST
        return httpService(httpConstants.METHOD_TYPE.PUT, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };



    async uploadFile(requestData) {
        let url = process.env.REACT_APP_FILE_UPLOAD_SERVICE + httpConstants.API_END_POINT.UPLOAD_FILE

        // let header = new Headers();
        // header.append("Authorization", "Bearer " + jwtToken);

        let requestOptions = {
            method: httpConstants.METHOD_TYPE.POST,
            body: requestData,
            // headers: header,
            redirect: 'follow'
        };
        return new Promise(((resolve, reject) => {
            fetch(url, requestOptions).then(
                function handleResponse(response) {

                    if (!response || !response.ok)
                        reject("Unable to fetch data");

                    return response.text().then(responseText => {

                        if (!responseText)
                            reject(responseText);

                        let data;
                        try {
                            data = JSON.parse(responseText);
                            if (data && !data.success)
                                return reject(data);

                        } catch (err) {
                            return Promise.reject(err)
                        }
                        resolve(data)
                    });
                }

            ).catch(function (err) {
                return Promise.reject(err);
            });
        }));
    }

}
