import { baseApi } from "@/lib/baseApi";
import type { GetDashboardResponse } from "./dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query<GetDashboardResponse, void>({
            query: () => ({
                url: "/admin/dashboard",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetDashboardDataQuery,
} = dashboardApi;
