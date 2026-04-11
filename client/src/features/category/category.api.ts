import { baseApi } from "@/lib/baseApi";
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoriesResponse,
  GetCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "./category.types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: "/category/get-all-categories",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data?.categories
          ? [
              { type: "Categories" as const, id: "LIST" },
              ...result.data.categories.map((c) => ({
                type: "Categories" as const,
                id: c.id,
              })),
            ]
          : [{ type: "Categories" as const, id: "LIST" }],
    }),

    getCategory: builder.query<GetCategoryResponse, string>({
      query: (id) => ({
        url: `/category/get-category/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Categories", id }],
    }),

    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
      query: (body) => ({
        url: "/category/create-category",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    updateCategory: builder.mutation<UpdateCategoryResponse, UpdateCategoryRequest>({
      query: ({ id, ...body }) => ({
        url: `/category/update-category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Categories", id: "LIST" },
        { type: "Categories", id },
      ],
    }),

    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Categories", id: "LIST" },
        { type: "Categories", id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
