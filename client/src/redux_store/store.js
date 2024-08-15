import { configureStore } from "@reduxjs/toolkit";
import identifyMobileSlice from "./identifyMobile";
import logInSlice from "./logInSlice";
export const store = configureStore({
  reducer: {
    identifyMobile: identifyMobileSlice,
    loggedIn: logInSlice,
  },
});
