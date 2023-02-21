import { combineReducers } from "redux";
import user from "./user";
import wallet from "./wallet";
import currency from "./currency";


export default combineReducers({
  user,
  wallet,
  currency
});
