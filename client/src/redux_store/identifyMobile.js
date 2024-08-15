import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMobile: false,
};

export const identifyMobileSlice = createSlice({
  initialState,
  name: "identifyMobile",
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});
export default identifyMobileSlice.reducer;
export const { setIsMobile } = identifyMobileSlice.actions;
