import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; // ✅ ADD THIS

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // ✅ ADD THIS LINE
  },
});