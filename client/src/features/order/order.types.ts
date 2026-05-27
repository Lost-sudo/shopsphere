export interface OrderItem {
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: number;
    product?: {
        name: string;
        images: string[];
    } | null;
}

export interface CreateOrderRequest {
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    shippingMethod: string;
    idempotencyKey?: string;
    status?: string;
}

export interface Shipment {
    id: string;
    orderId: string;
    trackingNumber: string;
    shippingMethod: string;
    status: string;
    shipping_fee: number;
    weight: number;
    sender: any;
    recipient: any;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    shippingMethod: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user?: {
        name: string;
        email: string;
    };
    shipment?: Shipment;
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    order: Order;
}

export interface GetOrdersResponse {
    success: boolean;
    message: string;
    orders: Order[];
}

export interface GetOrderResponse {
    success: boolean;
    message: string;
    order: Order;
}

export interface ProcessShipmentRequest {
    orderId: string;
}

export interface ProcessShipmentResponse {
    success: boolean;
    message: string;
    shipment: any;
}

export interface UpdateOrderStatusRequest {
    orderId: string;
    status: string;
}

export interface UpdateOrderStatusResponse {
    success: boolean;
    message: string;
    order: Order;
}
