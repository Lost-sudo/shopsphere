import { baseApi } from "@/lib/baseApi";
import { RegisterResponse, LoginResponse, User } from "./auth.types";
import {
    RegisterFormValues,
    LoginFormValues,
} from "@/schemas/auth/auth.schema";
import { cookieManager } from "@/lib/cookie-manager";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterFormValues>({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            }),
        }),

        login: builder.mutation<LoginResponse, LoginFormValues>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken) {
                        cookieManager.setToken(data.accessToken);
                    }
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    cookieManager.removeToken();
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },
        }),

        getMe: builder.query<User, void>({
            query: () => ({
                url: "/auth/get-me",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi;
