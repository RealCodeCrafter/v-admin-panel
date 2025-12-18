import { api } from "./index";

export const dashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query({
      query: (params) => ({
        url: "/dashboard/overview",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    SearchDashboards: build.query({
      query: (params) => ({
        url: "/dashboard/clients",
        method: "GET",
        params,
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
   useGetDashboardQuery,
   useSearchDashboardsQuery
} = dashboardApi;