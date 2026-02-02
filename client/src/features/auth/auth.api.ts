import { baseApi } from "@/lib/baseApi";
import { RegisterResponse, LoginResponse } from "./auth.types";
import { RegisterFormValues, LoginFormValues } from "@/schemas/auth/auth.schema";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterFormValues>({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials
            }),
        }),

        login: builder.mutation<LoginResponse, LoginFormValues>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken) {
                        const { cookieManager } = await import("@/lib/cookie-manager");
                        cookieManager.setToken(data.accessToken);
                    }
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
} = authApi;