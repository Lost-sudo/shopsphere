import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { env } from "./env";
import { cookieManager } from "./cookie-manager";
import { clearUser } from "@/features/auth/auth.slice";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    credentials: "include",
    prepareHeaders: async (headers) => {
        const token = cookieManager.getToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await rawBaseQuery(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as any;

            cookieManager.setToken(accessToken);

            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            cookieManager.removeToken();
            api.dispatch(clearUser());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints: () => ({}),
});
