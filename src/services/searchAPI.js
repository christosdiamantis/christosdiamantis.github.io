import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchAPI = createApi({
  method: "GET",
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery(""),
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (search) =>
        !!search && `https://crypto-app-server.herokuapp.com/coins/${search}`,
    }),
  }),
});

export const { useGetSearchQuery } = searchAPI;
