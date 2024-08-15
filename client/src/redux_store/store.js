import { configureStore } from "@reduxjs/toolkit";
import identifyMobileSlice from "./identifyMobile";
export const store = configureStore({
  reducer: {
    identifyMobile: identifyMobileSlice,
  },
});
