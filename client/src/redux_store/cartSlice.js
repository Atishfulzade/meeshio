import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], // Cart starts empty, redux-persist will restore it if configured
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addProductToCart, updateCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
