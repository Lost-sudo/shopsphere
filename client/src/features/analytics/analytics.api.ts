import { baseApi } from "@/lib/baseApi";
import type { GetAnalyticsResponse } from "./analytics.types";

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalyticsData: builder.query<GetAnalyticsResponse, void>({
            query: () => ({
                url: "/admin/analytics",
                method: "GET",
            }),
            providesTags: ["Analytics"],
        }),
    }),
});

export const {
    useGetAnalyticsDataQuery,
} = analyticsApi;
