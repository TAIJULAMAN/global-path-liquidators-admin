import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://darktechteam.com/api/",
  }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({}),
});
