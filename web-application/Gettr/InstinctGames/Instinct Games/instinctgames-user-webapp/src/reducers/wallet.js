import { cookiesConstants, eventConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

// const userData = sessionManager.getDataFromCookies(cookiesConstants.USER);
const walletData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.WALLET_CONNECT
);
const metamaskData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.IS_METAMASK
);
let initialState = {
  walletConnect: walletData,
  isMetamask: metamaskData,
  loading: false,
  notificationUnreadCount:0
};
export default function wallet(state = initialState, action) {
  switch (action.type) {
    case eventConstants.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case eventConstants.HIDE_LOADER:
      return {
        ...state,

        loading: false,
      };
      case eventConstants.SIGN_IN_SUCCESS:
        // sessionManager.setDataInCookies(action.data ? action.data : state.userDetails, cookiesConstants.USER);
        sessionManager.setDataInSessionStorage(
          action.data ? action.data : state.walletConnect,
          cookiesConstants.WALLET_CONNECT
        );
        return {
          ...state,
          walletConnect: action.data ? action.data : state.walletConnect,
          loading: false,
          isLoggedIn: true,
        };
    case eventConstants.WALLET_DATA:
      // sessionManager.setDataInCookies(action.data ? action.data : state.userDetails, cookiesConstants.USER);
      sessionManager.setDataInSessionStorage(
        action.data ? action.data : state.walletConnect,
        cookiesConstants.WALLET_CONNECT
      );
      sessionManager.setDataInSessionStorage(
        false,
        cookiesConstants.IS_METAMASK
      );
      return {
        ...state,
        isMetamask: false,
        walletConnect: action.data ? action.data : state.walletConnect,
      };
    case eventConstants.META_MASK:
      // sessionManager.setDataInCookies(action.data ? action.data : state.userDetails, cookiesConstants.USER);
      sessionManager.setDataInSessionStorage(
        action.data ? action.data : state.walletConnect,
        cookiesConstants.WALLET_CONNECT
      );
      sessionManager.setDataInSessionStorage(
        true,
        cookiesConstants.IS_METAMASK
      );
      return {
        ...state,
        isMetamask: true,
        walletConnect: action.data ? action.data : state.walletConnect,
      };
    case eventConstants.LOGOUT_SUCCESS:
      // sessionManager.setDataInCookies(false, cookiesConstants.USER);
      sessionManager.clearDataInSessionStorage(
        false,
        cookiesConstants.WALLET_CONNECT
      );
      return {
        ...state,
        walletConnect: false,
      };

    case eventConstants.UPDATE_NOTIFICATION_UNREAD_COUNT:
      // sessionManager.setDataInCookies(false, cookiesConstants.USER);
      return {
        ...state,
        notificationUnreadCount: action?.data?.count
      };

    case eventConstants.GET_USER_DATA:
      return { ...state, walletData: action.data };

    default:
      return state;
  }
}
