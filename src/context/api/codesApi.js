import { api } from "./index";

export const codesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCodes: build.query({
      query: (params) => ({
        url: "/dashboard/codes",
        params,
      }),
      providesTags: ["Codes"],
    })
  }),
});

export const {
   useGetCodesQuery,
} = codesApi;