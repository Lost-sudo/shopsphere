export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface CreateOrderRequest {
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    idempotencyKey?: string;
    status?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: any[]; // We can refine this later if we have product details
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        order: Order;
    };
}

export interface GetOrdersResponse {
    success: boolean;
    message: string;
    data: {
        orders: Order[];
    };
}

export interface GetOrderResponse {
    success: boolean;
    message: string;
    data: {
        order: Order;
    };
}
