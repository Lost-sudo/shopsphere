import { baseApi } from "@/lib/baseApi";
import type {
    CreateAddressRequest,
    CreateAddressResponse,
    GetAddressResponse,
    GetAddressesResponse,
    UpdateAddressRequest,
    UpdateAddressResponse,
    DeleteAddressResponse
} from "./address.types";

export const addressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query<GetAddressesResponse, void>({
            query: () => ({
                url: "/address/get-all-addresses",
                method: "GET",
            }),
            providesTags: (result) => result?.data?.addresses ? [
                {type: "Addresses" as const, id: "LIST"},
                ...result.data.addresses.map((a) => ({ 
                    type: "Addresses" as const, id: a.id
                }))
            ] : [{ type: "Addresses" as const, id: "LIST" }],
        }),

        getAddress: builder.query<GetAddressResponse, string>({
            query: (id) => ({
                url: `/address/get-address/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Addresses", id}],
        })
    })
})