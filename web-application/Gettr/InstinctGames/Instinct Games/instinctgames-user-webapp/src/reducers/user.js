import { cookiesConstants, eventConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

// const userData = sessionManager.getDataFromCookies(cookiesConstants.USER);
const userData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.USER
);
let initialState = {
  userDetails: userData,
  isLoggedIn: false,
  loading: false,
  cardData: null,
  userData: null,
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

  
    case eventConstants.LOGOUT_SUCCESS:
      // sessionManager.setDataInCookies(false, cookiesConstants.USER);
      sessionManager.clearDataInSessionStorage(false, cookiesConstants.USER);
      return {
        ...state,
        userDetails: false,
        loading: false,
        isLoggedIn: false,
      };

    case eventConstants.GET_USER_DATA:
      return { ...state, userData: action.data };

    default:
      return state;
  }
}
