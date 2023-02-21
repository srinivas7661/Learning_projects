import auth0 from 'auth0-js';
import Utils from "../utility";
import {httpService} from "../utility/httpService";
import {adminRoleIdListConstants, httpConstants} from "../constants";
import axios from "axios";

export default class Auth0Service {


    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        audience: process.env.REACT_APP_AUDIENCE,
        redirectUri: window.location.origin,
        scope: 'openid profile email',
        responseType: 'code token id_token',
        grantType: 'password',
    });

    constructor() {
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signout = this.signout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login(username, password, isForPasswordVerify = false) {
        let _this = this;
        return new Promise((resolve, reject) => {
            this.auth0.client.login({realm: process.env.REACT_APP_REALM, username, password},
                function (err, authResult) {
                    if (err) {
                        return reject(err);
                    }
                    if (isForPasswordVerify)
                        return resolve(true)
                    // setSession(authResult);
                    _this.auth0.client.userInfo(authResult.accessToken, async (err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        let userMetaData = await _this.getUserMetaData(user.sub);
                        return resolve({...authResult, userDetails: user, userMetaData: userMetaData});
                    })
                }
            );
        })
    }

    signUp(obj) {
        let _this = this
        return new Promise((resolve, reject) => {
            let {name, email, role, password} = obj
            this.auth0.signup({
                    connection: process.env.REACT_APP_REALM,
                    email: email,
                    password: password,
                    username: name,
                    name: name,
                    user_metadata: {role},
                    given_name: name,
                    family_name: name,
                },
                function (err, authResult) {
                    if (err) {
                        return reject(err);
                    }
                    _this.addUserRole('', "auth0|" + authResult?.Id, Utils.getRoleIdsListFromRoleString(role || ''))
                    return resolve(authResult);
                }
            );
        })
    }

    signout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    return resolve();
                } else if (err) {
                    console.log(err);
                    return reject(err);
                }
            });
        })
    }


    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    async forgotPassword(emailId) {
        if (!emailId)
            return;
        let url = process.env.REACT_APP_MANAGEMENT_DOMAIN + "dbconnections/change_password";
        let raw = JSON.stringify({
            "client_id": process.env.REACT_APP_AUTH0_CLIENT_ID,
            "email": emailId,
            "connection": process.env.REACT_APP_REALM
        });
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: raw
        };
        return fetch(url, request)
            .then(function handleResponse(response) {

                if (!response || !response.ok)
                    return Promise.reject("Unable to fetch data");

                return response.text().then(responseText => {
                    if (!responseText)
                        return Promise.reject(responseText);

                    let data;
                    try {
                        data = typeof responseText === 'object' ? responseText : responseText;

                    } catch (err) {
                        console.log('Class: httpService, Function: fetch ==', err);
                        return Promise.reject(err)
                    }
                    return data;
                });
            }).catch(function (err) {
                console.log('Class: httpService, Function: fetch ==', err);
                return Promise.reject(err);
            })
    }

    async getUserMetaData(userId) {
        if (!userId)
            return;
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})

        let url = process.env.REACT_APP_MANAGEMENT_URL + userId;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + response.access_token);
        const request = {
            method: 'GET',
            headers: myHeaders
        };
        return fetch(url, request)
            .then(function handleResponse(response) {

                if (!response || !response.ok)
                    return Promise.reject("Unable to fetch data");

                return response.text().then(responseText => {
                    if (!responseText)
                        return Promise.reject(responseText);

                    let data;
                    try {
                        data = typeof responseText === 'object' ? responseText : JSON.parse(responseText);

                    } catch (err) {
                        console.log('Class: httpService, Function: fetch ==', err);
                        return Promise.reject(err)
                    }
                    return data;
                });
            }).catch(function (err) {
                console.log('Class: httpService, Function: fetch ==', err);
                return Promise.reject(err);
            })
    }


    async addUserRole(accessToken, userId, roleIdsList) {
        if (!accessToken) {
            let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
            if (error || !response || !response.access_token)
                return Promise.reject({description: 'Unable to generate access token'})
            accessToken = response.access_token
        }
        let url = process.env.REACT_APP_MANAGEMENT_DOMAIN + `api/v2/users/${userId}/roles`;
        return httpService(httpConstants.METHOD_TYPE.POST, {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
            "Authorization": `Bearer ${accessToken}`
        }, {roles: roleIdsList}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject();
                    return Promise.resolve(response.responseData);
                }
            ).catch(function (err) {
                return Promise.reject(err);
            });
    }

    async deleteUserRole(accessToken, userId, roleIdsList) {
        roleIdsList = adminRoleIdListConstants.filter(ite => !roleIdsList.some(item => item === ite))
        let url = process.env.REACT_APP_MANAGEMENT_DOMAIN + `api/v2/users/${userId}/roles`;
        return httpService(httpConstants.METHOD_TYPE.DELETE, {
            'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON,
            "Authorization": `Bearer ${accessToken}`
        }, {roles: roleIdsList}, url)
            .then(
                response => {
                    if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                        return Promise.reject();
                    return Promise.resolve(response.responseData);
                }
            ).catch(function (err) {
                return Promise.reject(err);
            });
    }

    async updateUserMetaData(updateObj, userId) {
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + response.access_token);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(updateObj);

        let requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let _this = this

        return fetch(process.env.REACT_APP_MANAGEMENT_URL + userId, requestOptions)
            .then(response => response.text())
            .then(result => {
                _this.deleteUserRole(response?.access_token, userId, Utils.getRoleIdsListFromRoleString(updateObj?.user_metadata?.role || ''))
                _this.addUserRole(response?.access_token, userId, Utils.getRoleIdsListFromRoleString(updateObj?.user_metadata?.role || ''))
                result = JSON.parse(result)
                if (!result || result.error) {
                    return Promise.reject(result)
                } else {
                    return Promise.resolve(result)
                }
            })
            .catch(error => Promise.reject(error));

    }


    async deleteUser(userId) {
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + response.access_token);
        myHeaders.append("Content-Type", "application/json");


        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };

        return fetch(process.env.REACT_APP_MANAGEMENT_URL + userId, requestOptions)
            .then(response => response.text())
            .then(result => {
                return Promise.resolve(result)
            })
            .catch(error => Promise.reject(error));

    }

    async changePassword(userId, password) {
        if (!userId || !password)
            return;
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + response.access_token);
        myHeaders.append("Content-Type", "application/json");
        let url = process.env.REACT_APP_MANAGEMENT_URL + userId;
        let raw = JSON.stringify({
            "password": password,
            "connection": process.env.REACT_APP_REALM
        });
        const req = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw
        };
        return fetch(url, req)
            .then(function handleResponse(response) {
                if (!response || !response.ok)
                    return Promise.reject("Unable to fetch data");

                return response.text().then(responseText => {
                    if (!responseText)
                        return Promise.reject(responseText);

                    let data;
                    try {
                        data = typeof responseText === 'object' ? responseText : responseText;

                    } catch (err) {
                        console.log('Class: httpService, Function: fetch ==', err);
                        return Promise.reject(err)
                    }
                    return data;
                });
            }).catch(function (err) {
                console.log('Class: httpService, Function: fetch ==', err);
                return Promise.reject(err);
            })
    }

    getUserDetails = async (userId) => {
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})

        let url = `${process.env.REACT_APP_MANAGEMENT_DOMAIN}auth0|${userId}`
        const options = {
            method: 'GET',
            url: url,
            headers: {authorization: `Bearer ${response.access_token}`}
        };
        let [userError, result] = await Utils.parseResponse(axios.request(options))
        if (userError)
            return Promise.reject(userError)
        return Promise.resolve(result)
    }

    getUsersList = async (page = 0, searchQuery = '', per_page = 100) => {
        let [error, response] = await Utils.parseResponse(this.getManagementAPIToken())
        if (error || !response || !response.access_token)
            return Promise.reject({description: 'Unable to generate access token'})
        let url = `${process.env.REACT_APP_MANAGEMENT_DOMAIN}api/v2/users?include_totals=true&per_page=${per_page}&page=${page}&sort=created_at%3A-1&q=(NOT email:"admin@leewayhertz.com")${searchQuery && `name:${searchQuery}* OR email:${searchQuery}*`}`

        const options = {
            method: 'GET',
            url: url,
            headers: {authorization: `Bearer ${response.access_token}`}
        };
        let [userError, result] = await Utils.parseResponse(axios.request(options))
        if (userError)
            return Promise.reject(userError)
        return Promise.resolve(result)

    }

    async getManagementAPIToken() {
        let url = process.env.REACT_APP_MANAGEMENT_DOMAIN + "oauth/token";
        let raw = JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": process.env.REACT_APP_AUTH0_CLIENT_ID_TO_GENERATE_TOKEN,
            "client_secret": process.env.REACT_APP_AUTH0_SECRET_ID_TO_GENERATE_TOKEN,
            "audience": process.env.REACT_APP_MANAGEMENT_DOMAIN + "api/v2/"
        });
        const req = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: raw
        };
        return fetch(url, req)
            .then(function handleResponse(response) {
                console.log("response getManagementAPIToken===", response)

                if (!response || !response.ok)
                    return Promise.reject("Unable to fetch data");

                return response.text().then(responseText => {
                    if (!responseText)
                        return Promise.reject(responseText);

                    let data;
                    try {
                        data = typeof responseText === 'object' ? responseText : JSON.parse(responseText);

                    } catch (err) {
                        console.log('getManagementAPIToken fetch error1 ==', err);
                        return Promise.reject(err)
                    }
                    return data;
                });
            }).catch(function (err) {
                console.log('getManagementAPIToken fetch error2 ==', err);
                return Promise.reject(err);
            })
    }

}
