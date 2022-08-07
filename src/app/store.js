import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cryptoApi } from 'services/cryptoAPI';
import { searchAPI } from 'services/searchAPI';
import currencyReducer from 'services/currency';
import themeReducer from 'services/theme';
import rootReducer from 'services/index'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['currency', 'theme'],
  blacklist: [cryptoApi.reducerPath],
};
//const combinedReducers = combineReducers({currency: currencyReducer, theme: themeReducer});
//const persistedReducer = persistReducer(persistConfig, combinedReducers);
const persistedCurrencyReducer = persistReducer(persistConfig, currencyReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cryptoApi.middleware).concat(searchAPI.middleware),
});
