import { eventConstants } from "../constants";

export const handleBNBCurrencyConversion = (data) => ({
  type: eventConstants.BNB_USD_CONVERSION,
  payload: data,
});
export const handleSacredCurrencyConversion = (data) => ({
  type: eventConstants.SACRED_USD_CONVERSION,
  payload: data,
});
export const handleInstinctCurrencyConversion = (data) => ({
  type: eventConstants.INSTINCT_USD_CONVERSION,
  payload: data,
});

