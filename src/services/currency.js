import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: { currency: "eur" },
  reducers: {
    setCurrency: (state, action) => {
      return { currency: action.payload };
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
