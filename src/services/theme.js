import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "dark" },
  reducers: {
    setTheme: (state, action) => {
      if (state.value === "dark") {
        return { value: "light" };
      } else if (state.value === "light") {
        return { value: "forest" };
      } else if (state.value === "forest") {
        return { value: "midnight" };
      } else {
        return { value: "dark" };
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
