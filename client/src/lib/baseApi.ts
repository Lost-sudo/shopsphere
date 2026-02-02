import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./env";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: env.apiBaseUrl,
        credentials: "include",
        prepareHeaders: async (headers) => {
            const { cookieManager } = await import("@/lib/cookie-manager");
            const token = cookieManager.getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: [],
    endpoints: () => ({}),
})