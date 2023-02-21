import auth0 from 'auth0-js';
import { httpService } from "../utility/httpService";
import { cookiesConstants, httpConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";
import { history } from '../managers/history';

export default class Auth0Service {

    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            scope: 'openid profile email',
            responseType: 'code token id_token',
            grantType: 'password',
            redirectUri: window.location.origin
        });
    }

    signin(email, password) {
        let _this = this;
        return new Promise((resolve, reject) => {
            this.auth0.client.login(
                { realm: process.env.REACT_APP_AUTH0_REALM, username: email, password },
                async (err, authResult) => {
                    if (err) {
                        return reject(err);
                    }

                    console.log(authResult, "")
                    sessionManager.setDataInCookies(authResult.accessToken, cookiesConstants.AUTH0_ACCESS_TOKEN)
                    sessionManager.setDataInCookies(authResult.idToken, cookiesConstants.AUTH0_ID_TOKEN)
                    let userDetail = await _this.getUserInfo(authResult.idToken)
                    resolve(userDetail)
                    // _this.auth0.client.userInfo(
                    //     authResult.accessToken,

                    //     async (err, user) => {
                    //         if (err) {
                    //             return reject(err);
                    //         }
                    //         return resolve({
                    //             ...authResult,
                    //             userDetails: user,
                    //             userMetaData: user,
                    //         });
                    //     }
                    // );
                }
            );

        });
    }


    logout = () => {
        sessionManager.removeDataFromCookies(cookiesConstants.USER);
        sessionManager.removeDataFromCookies(cookiesConstants.SESSION_TOKEN);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_PERMISSION);
        sessionManager.removeDataFromCookies(cookiesConstants.AUTH0_ACCESS_TOKEN);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_DETAIL);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_SUB);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_ROLE);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_PICTURE);
        sessionManager.removeDataFromCookies(cookiesConstants.USER_ID);
        sessionManager.removeDataFromCookies(cookiesConstants.EMAIL_ID);
        sessionManager.removeDataFromCookies(cookiesConstants.AUTH0_ID_TOKEN);
        sessionManager.removeDataFromCookies(cookiesConstants.JWT_TOKEN);
        history.push('/')
        // this.auth0.logout({ returnTo: 'http://atlas-90592714.us-east-1.elb.amazonaws.com:90' })
    }


    getHeaders() {
        return {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON, 'skip': true,
            'Access-Control-Allow-Origin': '*'
        }
    }
    async forgotPassword(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.FORGOT_PASSWORD
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

    // async  addUser(requestData) {
    //     let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.ADD_USER
    //     return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
    //         .then(
    //             response => {
    //                 if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
    //                     return Promise.reject(response);
    //                 return Promise.resolve(response.responseData);
    //             }
    //         ).catch( (err) =>{
    //             return Promise.reject(err);
    //         });
    // };

    async getUsersList(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.GET_USERS_LIST
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async inviteAdminUser(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.INVITE_ADMIN_USER
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async updateUser(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.UPDATE_USER
        return httpService(httpConstants.METHOD_TYPE.PUT, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async getUsersByRole(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.GEY_USERS_BY_ROLE
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

    async getUser(userId) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + `${httpConstants.API_END_POINT.GET_USER}/${userId}`
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

    async getUserInfo(token) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + `${httpConstants.API_END_POINT.GET_USER_INFO}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url, true, token)
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

    async getFamilyMember(userId) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + `${httpConstants.API_END_POINT.GET_FAMILY_MEMBER}/${userId}`
        return httpService(httpConstants.METHOD_TYPE.GET, this.getHeaders(), {}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

    async acceptUser(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.ACCEPT_USER
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


    async rejectUser(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.REJECT_USER
        return httpService(httpConstants.METHOD_TYPE.DELETE, this.getHeaders(), requestData, url)
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
    async resetPassword(requestData) {
        let url = process.env.REACT_APP_USER_SERVICE_URL + httpConstants.API_END_POINT.RESET_PASSWORD
        return httpService(httpConstants.METHOD_TYPE.POST, this.getHeaders(), requestData, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData)
                        return Promise.reject(response);
                    return Promise.resolve(response.responseData);
                }
            ).catch((err) => {
                return Promise.reject(err);
            });
    };

}
