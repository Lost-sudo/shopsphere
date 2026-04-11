import { baseApi } from "@/lib/baseApi";
import type {
    GetCartResponse,
    AddItemRequest,
    AddItemResponse,
    UpdateItemRequest,
    UpdateItemResponse,
    RemoveItemResponse
} from "./cart.types";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<GetCartResponse, void>({
            query: () => ({
                url: "/cart/get-cart",
                method: "GET",
            }),
            providesTags: (result) => result?.data?.cart ? [
                { type: "Cart", id: result.data.cart.id },
            ] : [{ type: "Cart", id: "CURRENT" }],
        }),

        addItem: builder.mutation<AddItemResponse, AddItemRequest>({
            query: (body) => ({
                url: "/cart/add-item",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
        }),

        updateItem: builder.mutation<UpdateItemResponse, UpdateItemRequest>({
            query: ({ itemId, ...body }) => ({
                url: `/cart/update-item/${itemId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, { itemId }) => [
                { type: "Cart", id: "CURRENT" },
                {type: "Cart", id: itemId }
            ]
        }),

        removeItem: builder.mutation<RemoveItemResponse, string>({
            query: (itemId) => ({
                url: `/cart/remove-item/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, itemId) => [
                { type: "Cart", id: "CURRENT" },
                { type: "Cart", id: itemId }
            ]
        })
    })
})