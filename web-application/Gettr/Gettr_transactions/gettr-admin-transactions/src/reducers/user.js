import { reduxType } from "../constants";

let initialState = {
  isLoggedIn: false,
  loginFailure: null,
  deviceId: null,
  sessionToken: null,
  loading: false,
  isForgotPasswordSuccess: false,
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case reduxType.CREATE_WALLET:
      return {
        ...state,
        phraseSeed: action.data.seed,
        walletPassword: action.data.walletPassword,
      };
    default:
      return state;
  }
}
