import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coingecko.com/api/v3";

export const cryptoApi = createApi({
  method: "GET",
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getGlobalStats: builder.query({
      query: () => `/global`,
    }),
    getCoins: builder.query({
      query: ({ currency, perPage, page }) =>
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    }),
    getMarkets: builder.query({
      query: ({ coin, currency }) =>
        `/coins/${coin}/market_chart?vs_currency=${currency}&days=30&interval=daily`,
    }),
  }),
});

export const { useGetGlobalStatsQuery, useGetCoinsQuery, useGetMarketsQuery } =
  cryptoApi;
