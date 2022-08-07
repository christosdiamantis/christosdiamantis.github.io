import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "dark" },
  reducers: {
    setTheme: (state, action) => {
      if (state.value === "dark") {
        return { value: "light" };
      }
      return { value: "dark" };
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
