import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchAPI = createApi({
  method: "GET",
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery(""),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (search) =>
        !!search && `https://api.coingecko.com/api/v3/search?query=${search}`,//https://crypto-app-server.herokuapp.com/coins/search-query-from-input Dead API?
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
