import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.role === "admin";
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
