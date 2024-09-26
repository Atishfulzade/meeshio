import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage for web
import identifyMobileSlice from "./identifyMobile";
import logInSlice from "./logInSlice";
import userInfoSlice from "./userInfoSlice"; // The slice you want to persist
import supplierInfoSlice from "./supplierInfoSlice";
// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"], // This persists the userInfo slice
};

// Combine persisted reducers with the other reducers
const persistedUserInfoReducer = persistReducer(persistConfig, userInfoSlice);

export const store = configureStore({
  reducer: {
    identifyMobile: identifyMobileSlice,
    loggedIn: logInSlice,
    userInfo: persistedUserInfoReducer, // Persist userInfo slice
    supplierInfo: supplierInfoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Persistor object for the PersistGate
export const persistor = persistStore(store);
