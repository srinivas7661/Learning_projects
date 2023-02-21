import {cookiesConstants, eventConstants} from "../constants";
import {sessionManager} from "../managers/sessionManager";

const permission = sessionManager.getDataFromCookies(cookiesConstants.PERMISSION);
const userData = sessionManager.getDataFromCookies(cookiesConstants.USER);
const userMetadata = sessionManager.getDataFromCookies(cookiesConstants.USER_META_DATA);
const deviceID = sessionManager.getDataFromCookies(cookiesConstants.DEVICE_ID);
const accessToken = sessionManager.getDataFromCookies(cookiesConstants.ACCESS_TOKEN);
const idToken = sessionManager.getDataFromCookies(cookiesConstants.ID_TOKEN);
const expiresAt = sessionManager.getDataFromCookies(cookiesConstants.EXPIRES_AT);

let initialState = {
    permission: permission,
    userDetails: userData,
    userMetadata: userMetadata,
    isLoggedIn: false,
    loading: false,
    deviceID: deviceID,
    accessToken: accessToken,
    idToken: idToken,
    expiresAt: expiresAt,
};
export default function user(state = initialState, action) {
    switch (action.type) {

        case eventConstants.SHOW_LOADER:
            return {
                ...state,
                loading: true
            }
        case eventConstants.HIDE_LOADER:
            return {
                ...state,
                loading: false
            }
        case eventConstants.SIGN_IN_SUCCESS:
            sessionManager.setDataInCookies(action.data ? action.data.permission : state.permission, cookiesConstants.PERMISSION);
            sessionManager.setDataInCookies(action.data ? action.data.userDetails : state.userDetails, cookiesConstants.USER);
            sessionManager.setDataInCookies(action?.data?.userMetaData?.user_metadata, cookiesConstants.USER_META_DATA);

            sessionManager.setDataInCookies(action.data ? action.data.accessToken : state.accessToken, cookiesConstants.ACCESS_TOKEN);
            sessionManager.setDataInCookies(action.data ? action.data.idToken : state.idToken, cookiesConstants.ID_TOKEN);
            sessionManager.setDataInCookies(action.data ? (action.data.expiresIn * 1000) + new Date().getTime() : state.expiresAt, cookiesConstants.EXPIRES_AT);
            return {
                ...state,
                permission: action.data ? action.data.permission : state.permission,
                userDetails: action.data ? action.data.userDetails : state.userDetails,
                userMetadata: action.data ? action.data.userMetaData : state.userMetaData,
                accessToken: action.data ? action.data.accessToken : state.accessToken,
                idToken: action.data ? action.data.idToken : state.idToken,
                expiresAt: action.data ? (action.data.expiresIn * 1000) + new Date().getTime() : state.expiresAt,
                loading: false,
                isLoggedIn: true
            };
        case eventConstants.LOGOUT_SUCCESS:
            sessionManager.setDataInCookies(false, cookiesConstants.USER);
            sessionManager.setDataInCookies(false, cookiesConstants.PERMISSION);
            sessionManager.setDataInCookies(false, cookiesConstants.ACCESS_TOKEN);
            sessionManager.setDataInCookies(false, cookiesConstants.ID_TOKEN);
            sessionManager.setDataInCookies(false, cookiesConstants.EXPIRES_AT);
            sessionManager.setDataInCookies(false, cookiesConstants.USER_META_DATA);
            return {
                ...state,
                permission: null,
                userDetails: false,
                accessToken: null,
                idToken: null,
                expiresAt: null,
                userMetadata: null,
                loading: false,
                isLoggedIn: false
            };
        default:
            return state;
    }
}