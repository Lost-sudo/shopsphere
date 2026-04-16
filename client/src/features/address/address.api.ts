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
                url: "/addresses/get-user-addresses",
                method: "GET",
            }),
            providesTags: (result) => result?.addresses ? [
                {type: "Addresses" as const, id: "LIST"},
                ...result.addresses.map((a) => ({ 
                    type: "Addresses" as const, id: a.id
                }))
            ] : [{ type: "Addresses" as const, id: "LIST" }],
        }),

        getAddress: builder.query<GetAddressResponse, string>({
            query: (id) => ({
                url: `/addresses/get-address/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Addresses", id}],
        }),

        createAddress: builder.mutation<CreateAddressResponse, CreateAddressRequest>({
            query: (body) => ({
                url: "/addresses/create-address",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Addresses", id: "LIST" }],
        }),

        updateAddress: builder.mutation<UpdateAddressResponse, UpdateAddressRequest>({
            query: ({ id, ...body }) => ({
                url: `/addresses/update-address/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Addresses", id: "LIST"},
                { type: "Addresses", id }
            ]
        }),

        setDefaultAddress: builder.mutation<UpdateAddressResponse, string>({
            query: (id) => ({
                url: `/addresses/set-default-address/${id}`,
                method: "PUT",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Addresses", id: "LIST"},
                { type: "Addresses", id }
            ]
        }),

        deleteAddress: builder.mutation<DeleteAddressResponse, string>({
            query: (id) => ({
                url: `/addresses/delete-address/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Addresses", id: "LIST"},
                { type: "Addresses", id }
            ]
        })
    })
})

export const {
    useGetAddressesQuery,
    useGetAddressQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useSetDefaultAddressMutation,
    useDeleteAddressMutation,
} = addressApi;