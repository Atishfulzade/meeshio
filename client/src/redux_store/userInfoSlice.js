import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  fullName: "",
  profileURL: "",
  email: "",
  savedCard: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [], // Initialize from localStorage
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { uid, fullName, profileURL, email, savedCard } =
        action.payload || {};
      state.uid = uid || state.uid;
      state.fullName = fullName || state.fullName;
      state.profileURL = profileURL || state.profileURL;
      state.email = email || state.email;
      state.savedCard = savedCard || state.savedCard;
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

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateCart: (state, action) => {
      state.cart = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Ensure quantity is initialized
      }));
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync with localStorage
    },

    clearUserInfo: (state) => {
      state.uid = "";
      state.fullName = "";
      state.profileURL = "";
      state.email = "";
      state.savedCard = [];
      state.cart = [];

      localStorage.removeItem("cart");
      localStorage.removeItem("userInfo");
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
