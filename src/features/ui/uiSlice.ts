import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "../../types";

const initialState: UIState = {
  searchQuery: "",
  currentPage: 1,
  pageSize: 10,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setSearchQuery, setCurrentPage } = uiSlice.actions;
export default uiSlice.reducer;
