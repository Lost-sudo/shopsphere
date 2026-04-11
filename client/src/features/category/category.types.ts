export type Category = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiEnvelope<TData> = {
  status: "success" | string;
  results?: number;
  data: TData;
};

export type GetCategoriesResponse = ApiEnvelope<{ categories: Category[] }>;

export type GetCategoryResponse = ApiEnvelope<{ category: Category }>;

export type CreateCategoryRequest = {
  name: string;
  description?: string | null;
};

export type CreateCategoryResponse = ApiEnvelope<{ category: Category }>;

export type UpdateCategoryRequest = {
  id: string;
  name?: string;
  description?: string | null;
};

export type UpdateCategoryResponse = ApiEnvelope<{ category: Category }>;

export type DeleteCategoryResponse = void;
