import { api } from "./index";

export const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query({
      query: (params) => ({
        url: "/dashboard/clients",
        params,
      }),
      providesTags: ["Clients"],
    })
  }),
});

export const {
   useGetClientsQuery,
} = clientsApi;