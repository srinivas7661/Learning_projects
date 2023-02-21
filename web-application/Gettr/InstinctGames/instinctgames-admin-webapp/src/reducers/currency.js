import { cookiesConstants, eventConstants } from "../constants";
import { sessionManager } from "../managers/sessionManager";

const bnbData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.BNB_TO_USD
);
const sacredData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.SACRED_TO_USD
);
const instinctData = sessionManager.getDataFromSessionStorage(
  cookiesConstants.INSTINCT_TO_USD
);

let initialState = {
  priceBNBToUSD: bnbData,
  priceSacredToUSD: sacredData,
  priceInstinctToUSD: instinctData,
};

export default function currency(state = initialState, action) {
  switch (action.type) {
    case eventConstants.BNB_USD_CONVERSION:
      sessionManager.setDataInSessionStorage(
        action.payload ? action.payload : 0,
        cookiesConstants.BNB_TO_USD
      );
      return {
        ...state,
        priceBNBToUSD: action.payload,
      };
    case eventConstants.SACRED_USD_CONVERSION:
      sessionManager.setDataInSessionStorage(
        action.payload ? action.payload : 0,
        cookiesConstants.SACRED_TO_USD
      );
      return {
        ...state,
        priceSacredToUSD: action.payload,
      };
    case eventConstants.INSTINCT_USD_CONVERSION:
      sessionManager.setDataInSessionStorage(
        action.payload ? action.payload : 0,
        cookiesConstants.INSTINCT_TO_USD
      );
      return {
        ...state,
        priceInstinctToUSD: action.payload,
      };
    default:
      return state;
  }
}
