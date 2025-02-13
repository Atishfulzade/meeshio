import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  profileImage: "",
  email: "",
  gender: "", // added new field to store gender information.
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { _id, firstname, lastname, profileImage, email, gender } =
        action.payload || {};
      state.id = _id || state.id;
      state.firstname = firstname || state.firstname;
      state.lastname = lastname || state.lastname;
      state.profileImage = profileImage || state.profileImage;
      state.email = email || state.email;
      state.gender = gender || state.gender;
    },

    clearUserInfo: (state) => {
      state.id = "";
      state.firstname = "";
      state.lastname = "";
      state.profileImage = "";
      state.email = "";
      state.gender = "";
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
