import { apiSlice } from "./apiSlice";

const Profile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryList: builder.query({
      query: () => ({
        url: "/category/all-categories",
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const { useGetCategoryListQuery } = Profile;
