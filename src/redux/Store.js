import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/CardsSlice";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";

export default configureStore({
  reducer: {
    cards: cardsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
