
export type ProductVariant = {
    id: string;
    productId: string;
    name: string;
    value: string;
    sku: string;
    stock: number;
    price: number | null;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    isActive: boolean;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    variants?: ProductVariant[];
    category?: {
        id: string;
        name: string;
    };
};

export type ProductListResponse = {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
