export type ProductVariant = {
  id: string;
  productId: string;
  name: string;
  value: string;
  sku: string;
  stock: number;
  price: number | null;
};

export type ProductCategorySummary = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  weight: number;
  variants?: ProductVariant[];
  categories: ProductCategorySummary[];
};

export type ProductSort = "price_asc" | "price_desc" | "newest" | "oldest";

export type GetProductsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  sort?: ProductSort;
  isActive?: boolean;
};

export type ProductListData = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiEnvelope<TData> = {
  status: "success" | string;
  results?: number;
  data: TData;
};

export type GetProductsResponse = ApiEnvelope<ProductListData>;
export type GetProductResponse = ApiEnvelope<{ product: Product }>;
export type CreateProductResponse = ApiEnvelope<{ product: Product }>;
export type UpdateProductResponse = ApiEnvelope<{ product: Product }>;
// Server returns success envelope on delete.
export type DeleteProductResponse = ApiEnvelope<{ message: string }>;

export type CreateVariantResponse = ApiEnvelope<{ variant: ProductVariant }>;
export type GetVariantsResponse = ApiEnvelope<{ variants: ProductVariant[] }>;
export type GetVariantResponse = ApiEnvelope<{ variant: ProductVariant }>;
export type UpdateVariantResponse = ApiEnvelope<{ variant: ProductVariant }>;
// Server returns success envelope on delete.
export type DeleteVariantResponse = ApiEnvelope<{ message: string }>;

export type ProductVariantInput = {
  name: string;
  value: string;
  sku: string;
  stock?: number;
  price?: number | null;
};

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  stock?: number;
  weight?: number;
  isActive?: boolean;
  categoryIds: string[];
  variants?: ProductVariantInput[];
  images?: File[];
};

export type UpdateProductRequest = Partial<
  Omit<CreateProductRequest, "images" | "variants">
> & {
  id: string;
  variants?: ProductVariantInput[];
};

export type CreateVariantRequest = {
  productId: string;
  data: ProductVariantInput;
};

export type UpdateVariantRequest = {
  productId: string;
  variantId: string;
  data: Partial<ProductVariantInput>;
};
