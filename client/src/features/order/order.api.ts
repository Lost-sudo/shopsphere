import { baseApi } from "@/lib/baseApi";
import type {
    CreateOrderRequest,
    CreateOrderResponse,
    GetOrdersResponse,
    GetOrderResponse
} from "./order.types";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
            query: (body) => ({
                url: "/orders/create-order",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart", { type: "Orders", id: "LIST" }],
        }),
        getUserOrders: builder.query<GetOrdersResponse, void>({
            query: () => ({
                url: "/orders/get-user-orders",
                method: "GET",
            }),
            providesTags: (result) => 
                result?.orders 
                    ? [
                        { type: "Orders" as const, id: "LIST" },
                        ...result.orders.map((o) => ({ type: "Orders" as const, id: o.id }))
                    ]
                    : [{ type: "Orders" as const, id: "LIST" }],
        }),
        getOrderById: builder.query<GetOrderResponse, string>({
            query: (id) => ({
                url: `/orders/get-order/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Orders", id }],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetUserOrdersQuery,
    useGetOrderByIdQuery,
} = orderApi;
