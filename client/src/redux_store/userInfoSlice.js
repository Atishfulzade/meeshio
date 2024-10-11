import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  profileImage: "",
  email: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { _id, firstname, lastname, profileImage, email } =
        action.payload || {};
      state.id = _id || state.id;
      state.firstname = firstname || state.firstname;
      state.lastname = lastname || state.lastname;
      state.profileImage = profileImage || state.profileImage;
      state.email = email || state.email;
    },

    clearUserInfo: (state) => {
      state.id = "";
      state.firstname = "";
      state.lastname = "";
      state.profileImage = "";
      state.email = "";
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
