import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./coingeckoBaseQuery";

export const searchAPI = createApi({
  reducerPath: "searchApi",
  baseQuery,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (search) => ({ url: "/search", params: { query: search } }),
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
