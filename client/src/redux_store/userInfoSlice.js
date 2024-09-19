import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  profileImage: "",
  email: "",
  cart: [], // No need to initialize from localStorage, redux-persist will handle it
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { id, firstname, lastname, profileImage, email } =
        action.payload || {};
      state.id = id || state.id;
      state.firstname = firstname || state.firstname;
      state.lastname = lastname || state.lastname;
      state.profileImage = profileImage || state.profileImage;
      state.email = email || state.email;
    },

    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity =
          (state.cart[existingProductIndex].quantity || 1) + 1;
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
        });
      }
    },

    updateCart: (state, action) => {
      state.cart = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
    },

    clearUserInfo: (state) => {
      state.id = "";
      state.firstname = "";
      state.lastname = "";
      state.profileImage = "";
      state.email = "";
      state.cart = [];
    },
  },
});

export const {
  setUserInfo,
  addProductToCart,
  updateCart,
  removeFromCart,
  clearUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
