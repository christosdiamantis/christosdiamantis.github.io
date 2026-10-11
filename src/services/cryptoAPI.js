import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./coingeckoBaseQuery";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery,
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 120,
  endpoints: (builder) => ({
    getGlobalStats: builder.query({ query: () => "/global" }),
    getCoins: builder.query({
      query: ({ currency, perPage, page }) => ({
        url: "/coins/markets",
        params: { vs_currency: currency, order: "market_cap_desc", per_page: perPage,
          page, sparkline: true, price_change_percentage: "1h,24h,7d" },
      }),
    }),
    getMarkets: builder.query({
      query: ({ coin, currency, days }) => ({
        url: `/coins/${encodeURIComponent(coin)}/market_chart`,
        params: { vs_currency: currency, days, interval: "daily" },
      }),
    }),
    getCoin: builder.query({
      query: (coin) => ({
        url: `/coins/${encodeURIComponent(coin)}`,
        params: { localization: false, tickers: false, market_data: true,
          community_data: false, developer_data: false, sparkline: false },
      }),
    }),
    getHistory: builder.query({
      query: ({ coin, date }) => ({
        url: `/coins/${encodeURIComponent(coin)}/history`,
        params: { date, localization: false },
      }),
      keepUnusedDataFor: 3600,
    }),
    getPrice: builder.query({
      query: ({ coins, currency }) => ({
        url: "/simple/price",
        params: { ids: coins, vs_currencies: currency, include_market_cap: true,
          include_24hr_vol: true, include_24hr_change: true, include_last_updated_at: true },
      }),
    }),
  }),
});

export const {
  useGetGlobalStatsQuery, useGetCoinsQuery, useGetMarketsQuery, useGetCoinQuery,
  useGetHistoryQuery, useLazyGetHistoryQuery, useGetPriceQuery,
} = cryptoApi;
