import { baseApi } from "@/lib/baseApi";
import type {
  CreateProductRequest,
  CreateProductResponse,
  CreateVariantRequest,
  CreateVariantResponse,
  DeleteProductResponse,
  DeleteVariantResponse,
  GetProductResponse,
  GetProductsQuery,
  GetProductsResponse,
  GetVariantResponse,
  GetVariantsResponse,
  UpdateProductResponse,
  UpdateProductRequest,
  UpdateVariantRequest,
  UpdateVariantResponse,
} from "./product.types";

function buildCreateProductFormData(input: CreateProductRequest): FormData {
  const fd = new FormData();

  fd.append("name", input.name);
  fd.append("description", input.description);
  fd.append("price", String(input.price));
  if (input.stock !== undefined) fd.append("stock", String(input.stock));
  if (input.weight !== undefined) fd.append("weight", String(input.weight));
  if (input.isActive !== undefined) fd.append("isActive", String(input.isActive));
  fd.append("categoryIds", JSON.stringify(input.categoryIds));

  if (input.variants?.length) {
    fd.append("variants", JSON.stringify(input.variants));
  }

  if (input.images?.length) {
    for (const file of input.images) {
      fd.append("images", file);
    }
  }

  return fd;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsQuery | void>({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.products
          ? [
              { type: "Products" as const, id: "LIST" },
              ...result.data.products.map((p) => ({ type: "Products" as const, id: p.id })),
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),

    getProduct: builder.query<GetProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<CreateProductResponse, CreateProductRequest>({
      query: (input) => ({
        url: "/products",
        method: "POST",
        body: buildCreateProductFormData(input),
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<UpdateProductResponse, UpdateProductRequest>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: "images" in patch && (patch as any).images?.length
          ? buildCreateProductFormData(patch as any)
          : patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id },
      ],
    }),

    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id },
      ],
    }),

    // ─── Variants (nested) ────────────────────────────────────────────────────

    getVariants: builder.query<GetVariantsResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}/variants`,
        method: "GET",
      }),
      providesTags: (_result, _error, productId) => [
        { type: "ProductVariants", id: productId },
      ],
    }),

    getVariant: builder.query<GetVariantResponse, { productId: string; variantId: string }>(
      {
        query: ({ productId, variantId }) => ({
          url: `/products/${productId}/variants/${variantId}`,
          method: "GET",
        }),
        providesTags: (_result, _error, { variantId }) => [
          { type: "ProductVariants", id: variantId },
        ],
      },
    ),

    createVariant: builder.mutation<CreateVariantResponse, CreateVariantRequest>({
      query: ({ productId, data }) => ({
        url: `/products/${productId}/variants`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "ProductVariants", id: productId },
      ],
    }),

    updateVariant: builder.mutation<UpdateVariantResponse, UpdateVariantRequest>({
      query: ({ productId, variantId, data }) => ({
        url: `/products/${productId}/variants/${variantId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { productId, variantId }) => [
        { type: "ProductVariants", id: productId },
        { type: "ProductVariants", id: variantId },
      ],
    }),

    deleteVariant: builder.mutation<
      DeleteVariantResponse,
      { productId: string; variantId: string }
    >({
      query: ({ productId, variantId }) => ({
        url: `/products/${productId}/variants/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { productId, variantId }) => [
        { type: "ProductVariants", id: productId },
        { type: "ProductVariants", id: variantId },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetVariantsQuery,
  useGetVariantQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = productApi;

