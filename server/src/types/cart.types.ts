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
  quantity: number;
  product?: {
    name: string;
    price: number;
    images: string[];
  };
};
