import { baseApi } from "@/lib/baseApi";
import type {
  GetCartResponse,
  AddItemRequest,
  AddItemResponse,
  UpdateItemRequest,
  UpdateItemResponse,
  RemoveItemResponse,
} from "./cart.types";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    addItem: builder.mutation<AddItemResponse, AddItemRequest>({
      query: (body) => ({
        url: "/cart/add-item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateItem: builder.mutation<UpdateItemResponse, UpdateItemRequest>({
      query: ({ itemId, ...body }) => ({
        url: `/cart/update-item/${itemId}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ itemId, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            if (draft?.data?.cart) {
              const item = draft.data.cart.items.find((i) => i.id === itemId);
              if (item) {
                item.quantity = quantity;
              }
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    removeItem: builder.mutation<RemoveItemResponse, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      async onQueryStarted(itemId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            if (draft?.data?.cart) {
              draft.data.cart.items = draft.data.cart.items.filter(
                (item) => item.id !== itemId,
              );
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useRemoveItemMutation,
} = cartApi;
