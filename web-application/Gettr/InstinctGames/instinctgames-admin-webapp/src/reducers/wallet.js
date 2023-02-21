import { cookiesConstants, eventConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

// const userData = sessionManager.getDataFromCookies(cookiesConstants.USER);
const userAddress = sessionManager.getDataFromSessionStorage(
  cookiesConstants.USER_ADDRESS
);
let initialState = {
  userAddress: userAddress,
  isLoggedIn: false,
  loading: false,
  //   userData: null,
};
export default function user(state = initialState, action) {
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

    case eventConstants.CONNECTED_METAMASK:
      // sessionManager.setDataInCookies(action.data ? action.data : state.userDetails, cookiesConstants.USER);
      sessionManager.setDataInSessionStorage(
        action.data ? action.data : state.userAddress,
        cookiesConstants.USER_ADDRESS
      );
      return {
        ...state,
        userAddress: action.data ? action.data : state.userAddress,
      };
    case eventConstants.METAMASK_DISCONNECTED:
      sessionManager.setDataInCookies(false, cookiesConstants.USER_ADDRESS);
      sessionManager.setDataInSessionStorage(
        false,
        cookiesConstants.USER_ADDRESS
      );
      return {
        ...state,
        userAddress: false,
        loading: false,
        isLoggedIn: false,
      };

    // case eventConstants.GET_USER_DATA:
    //   return { ...state, userData: action.data };

    default:
      //   return { ...state, userData: action.data };
      return state;
  }
}
