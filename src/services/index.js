import { combineReducers } from "@reduxjs/toolkit";
import { cryptoApi } from "services/cryptoAPI";
import { searchAPI } from "services/searchAPI";
import portfolioReducer from "services/portfolio";
import currencyReducer from "./currency";
import themeReducer from "./theme";

export default combineReducers({
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
  currency: currencyReducer,
  theme: themeReducer,
  portfolio: portfolioReducer,
});
