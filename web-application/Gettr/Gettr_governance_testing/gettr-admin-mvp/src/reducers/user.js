import { reduxType, userConstants } from "../constants";

let initialState = {
  isLoggedIn: false,
  loginFailure: null,
  deviceId: null,
  sessionToken: null,
  loading: false,
  isForgotPasswordSuccess: false,
  details: JSON.parse(sessionStorage.getItem(userConstants.USER_DETAILS)),
  userRole: sessionStorage.getItem(userConstants.USER_ROLE)
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case reduxType.CREATE_WALLET:
      return {
        ...state,
        phraseSeed: action.data.seed,
        walletPassword: action.data.walletPassword,
      };

      case userConstants.USER_DETAILS:
        sessionStorage.setItem(
            userConstants.USER_DETAILS,
            JSON.stringify(action.data)
        );
        return {
          ...state,
          details: action.data
        };
      case userConstants.USER_ROLE:
        sessionStorage.setItem(
            userConstants.USER_ROLE,
            action.data
        );
        return {
          ...state,
          userRole: action.data
        };
    default:
      return state;
  }
}
