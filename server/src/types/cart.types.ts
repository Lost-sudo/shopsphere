export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

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
    weight: number;
  };
  variant?: {
    name: string;
    value: string;
    price?: number | null;
  } | null;
};
