export type Cart = {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export type CartItem = {
    id: string;
    cartId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    product?: {
        name: string;
        price: number;
        images: string[];
    }
    variant?: {
        name: string;
        value: string;
        price: number | null;
    } | null;
}

export type ApiEnvelope<TData> = {
    success: boolean;
    message?: string;
    data: TData;
}

export type GetCartResponse = ApiEnvelope<{ cart: Cart }>;
export type AddItemRequest = {
    productId: string;
    variantId?: string;
    quantity: number;
}
export type AddItemResponse = ApiEnvelope<{ cart: Cart }>;
export type UpdateItemRequest = {
    itemId: string;
    quantity: number;
}
export type UpdateItemResponse = ApiEnvelope<{ cart: Cart }>;
export type RemoveItemResponse = ApiEnvelope<{
    success: boolean;
    message?: string;
}>;