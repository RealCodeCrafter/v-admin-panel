import { api } from "./index";

export const giftsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGifts: build.query({
      query: (params) => ({
        url: "/dashboard/gifts/codes",
        params,
      }),
      providesTags: ["Gifts"],
    })
  }),
});

export const {
   useGetGiftsQuery
} = giftsApi;