import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: null,
  reducers: {
    // Renaming the action to camelCase
    addFormData: (state, action) => {
      return action.payload;
    },
  },
});

// Exporting the action creator
export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
