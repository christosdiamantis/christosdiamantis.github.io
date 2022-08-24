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
      query: ({ coin, currency, days }) =>
        `/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`,
    }),
    getCoin: builder.query({
      query: (coin) =>
        `coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
    }),
    getHistory: builder.query({
      query: ({ coin, date }) =>
        !!coin && !!date && `coins/${coin}/history?date=${date}&localization=false`
    }),
    getPrice: builder.query({
      query: ({ coins, currency }) =>
        `simple/price?ids=${coins}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    }),
  }),
});

export const {
  useGetGlobalStatsQuery,
  useGetCoinsQuery,
  useGetMarketsQuery,
  useGetCoinQuery,
  useGetHistoryQuery,
  useGetPriceQuery,
} = cryptoApi;
