// Mocking Prisma must be at the very top
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    cart: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    cartItem: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import { JwtUtil } from "../src/utils/jwt.util";
import { Role } from "../src/generated/client";

describe("Cart API", () => {
    const mockUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "customer@example.com",
        role: Role.CUSTOMER,
    };

    const mockCartItem = {
        id: "550e8400-e29b-41d4-a716-446655440010",
        cartId: "550e8400-e29b-41d4-a716-446655440009",
        productId: "550e8400-e29b-41d4-a716-446655440007",
        quantity: 2,
        product: {
            name: "Test Product",
            price: 100,
            images: ["test.jpg"]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockCart = {
        id: "550e8400-e29b-41d4-a716-446655440009",
        userId: mockUser.id,
        items: [mockCartItem],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    let customerToken: string;

    beforeAll(() => {
        process.env.JWT_SECRET = "testsecret";
        customerToken = JwtUtil.generateAccessToken({ id: mockUser.id, email: mockUser.email, role: Role.CUSTOMER as any });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/cart", () => {
        it("should fetch user's cart (create if not exists)", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue(null);
            (prisma.cart.create as jest.Mock).mockResolvedValue(mockCart);

            const response = await request(app)
                .get("/api/v1/cart")
                .set("Authorization", `Bearer ${customerToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.cart.id).toBe(mockCart.id);
        });

        it("should return existing cart if found", async () => {
             (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart);

             const response = await request(app)
                 .get("/api/v1/cart")
                 .set("Authorization", `Bearer ${customerToken}`);

             expect(response.status).toBe(200);
             expect(prisma.cart.create).not.toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/cart/items", () => {
        it("should add a new item to cart", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart);
            (prisma.cartItem.findFirst as jest.Mock).mockResolvedValue(null);
            (prisma.cartItem.create as jest.Mock).mockResolvedValue(mockCartItem);

            const response = await request(app)
                .post("/api/v1/cart/items")
                .set("Authorization", `Bearer ${customerToken}`)
                .send({
                    productId: "550e8400-e29b-41d4-a716-446655440007",
                    quantity: 2,
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.item.productId).toBe(mockCartItem.productId);
        });

        it("should update quantity if item already exists in cart", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart);
            (prisma.cartItem.findFirst as jest.Mock).mockResolvedValue(mockCartItem);
            (prisma.cartItem.update as jest.Mock).mockResolvedValue({ ...mockCartItem, quantity: 5 });

            const response = await request(app)
                .post("/api/v1/cart/items")
                .set("Authorization", `Bearer ${customerToken}`)
                .send({
                    productId: "550e8400-e29b-41d4-a716-446655440007",
                    quantity: 3,
                });

            expect(response.status).toBe(201);
            expect(response.body.item.quantity).toBe(5);
        });
    });

    describe("PUT /api/v1/cart/items/:itemId", () => {
        it("should update item quantity in cart", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue({ ...mockCart, items: [mockCartItem] });
            (prisma.cartItem.update as jest.Mock).mockResolvedValue({ ...mockCartItem, quantity: 10 });

            const response = await request(app)
                .put(`/api/v1/cart/items/${mockCartItem.id}`)
                .set("Authorization", `Bearer ${customerToken}`)
                .send({
                    quantity: 10,
                });

            expect(response.status).toBe(200);
            expect(response.body.item.quantity).toBe(10);
        });
    });

    describe("DELETE /api/v1/cart/items/:itemId", () => {
        it("should remove an item from the cart", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue({ ...mockCart, items: [mockCartItem] });
            (prisma.cartItem.delete as jest.Mock).mockResolvedValue(mockCartItem);

            const response = await request(app)
                .delete(`/api/v1/cart/items/${mockCartItem.id}`)
                .set("Authorization", `Bearer ${customerToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Item removed from cart");
        });
    });

    describe("DELETE /api/v1/cart", () => {
        it("should clear the user's cart", async () => {
            (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCart);
            (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

            const response = await request(app)
                .delete("/api/v1/cart")
                .set("Authorization", `Bearer ${customerToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Cart cleared");
        });
    });
});
