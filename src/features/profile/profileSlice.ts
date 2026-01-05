import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Profile, ProfileState } from "../../types";

const initialState: ProfileState = {
  data: {
    name: "quantum",
    phone: "011",
    jobTitle: "Frontend Developer",
    experience: 5,
    address: "Maadi",
    workingHours: "8",
  },
  loading: false,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveProfileStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    saveProfileSuccess(state, action: PayloadAction<Profile>) {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    saveProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetProfileFeedback(state) {
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  saveProfileStart,
  saveProfileSuccess,
  saveProfileFailure,
  resetProfileFeedback,
} = profileSlice.actions;

export default profileSlice.reducer;
