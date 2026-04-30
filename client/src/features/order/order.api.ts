import { baseApi } from "@/lib/baseApi";
import type {
    CreateOrderRequest,
    CreateOrderResponse,
    GetOrdersResponse,
    GetOrderResponse,
    ProcessShipmentRequest,
    ProcessShipmentResponse,
    UpdateOrderStatusRequest,
    UpdateOrderStatusResponse
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
        getAllOrders: builder.query<GetOrdersResponse, void>({
            query: () => ({
                url: "/orders/get-all-orders",
                method: "GET",
            }),
            providesTags: (result) => 
                result?.orders 
                    ? [
                        { type: "Orders" as const, id: "ADMIN_LIST" },
                        ...result.orders.map((o) => ({ type: "Orders" as const, id: o.id }))
                    ]
                    : [{ type: "Orders" as const, id: "ADMIN_LIST" }],
        }),
        getOrderById: builder.query<GetOrderResponse, string>({
            query: (id) => ({
                url: `/orders/get-order/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Orders", id }],
        }),
        processShipment: builder.mutation<ProcessShipmentResponse, ProcessShipmentRequest>({
            query: ({ orderId, ...body }) => ({
                url: `/orders/process-shipment/${orderId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, { orderId }) => [
                { type: "Orders", id: orderId },
                { type: "Orders", id: "LIST" },
                { type: "Orders", id: "ADMIN_LIST" }
            ],
        }),
        updateOrderStatus: builder.mutation<UpdateOrderStatusResponse, UpdateOrderStatusRequest>({
            query: ({ orderId, ...body }) => ({
                url: `/orders/update-order/${orderId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, { orderId }) => [
                { type: "Orders", id: orderId },
                { type: "Orders", id: "LIST" },
                { type: "Orders", id: "ADMIN_LIST" }
            ],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetUserOrdersQuery,
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useProcessShipmentMutation,
    useUpdateOrderStatusMutation,
} = orderApi;
