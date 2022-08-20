import { createSlice } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {},
  reducers: {
    addCoin: (state, action) => {
      //state.portfolio.push(action.payload);
      if (Object.keys(state).includes(action.payload.id)) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            transactions: [
              ...state[action.payload.id].transactions,
              {
                transactionID: action.payload.transactionID,
                date: action.payload.date,
                price: action.payload.price,
                amount: action.payload.amount,
              },
            ],
          },
        };
      } else {
        return {
          ...state,
          [action.payload.id]: {
            id: action.payload.id,
            thumb: action.payload.thumb,
            name: action.payload.name,
            symbol: action.payload.symbol,
            transactions: [
              {
                transactionID: action.payload.transactionID,
                date: action.payload.date,
                price: action.payload.price,
                amount: action.payload.amount,
              },
            ],
          },
        };
      }
    },
    removeCoin: (state, action) => {
      console.log(action.payload);
      if (state[action.payload.id].transactions.length === 1) {
        delete state[action.payload.id];
      } else {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            transactions: state[action.payload.id].transactions.filter(
              (transaction) =>
                transaction.transactionID !== action.payload.transactionID
            ),
          },
        };
      }
    },
  },
});

export const { addCoin, removeCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;
