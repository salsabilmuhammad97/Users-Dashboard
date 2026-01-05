import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "../../types";

const refreshToken = localStorage.getItem("refresh");
const accessToken = localStorage.getItem("access");

const initialState: AuthState = {
  isAuthenticated: !!(refreshToken && accessToken),
  loading: false,
  error: null,
  user: null,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;

      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.loading = false;
      state.error = null;
    },

    restoreAuth(state) {
      const refresh = localStorage.getItem("refresh");
      const access = localStorage.getItem("access");

      if (refresh && access) {
        state.isAuthenticated = true;
        state.access = access;
        state.refresh = refresh;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, restoreAuth } =
  authSlice.actions;
export default authSlice.reducer;
