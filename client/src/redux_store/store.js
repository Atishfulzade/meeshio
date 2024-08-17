import { configureStore } from "@reduxjs/toolkit";
import identifyMobileSlice from "./identifyMobile";
import logInSlice from "./logInSlice";
import userInfoSlice from "./userInfoSlice";
export const store = configureStore({
  reducer: {
    identifyMobile: identifyMobileSlice,
    loggedIn: logInSlice,
    userInfo: userInfoSlice,
  },
});
