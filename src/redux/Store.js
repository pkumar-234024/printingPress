import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    cards: cardsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
