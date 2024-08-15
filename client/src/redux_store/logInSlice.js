import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
};
export const logInSlice = createSlice({
  initialState,
  name: "loggedIn",
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = logInSlice.actions;
export default logInSlice.reducer;
