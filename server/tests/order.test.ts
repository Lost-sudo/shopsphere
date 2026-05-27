// Mocking Prisma must be at the very top
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    order: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    orderItem: {
      createMany: jest.fn(),
    },
    payment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    shipment: {
      create: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    productVariant: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    cart: {
      findUnique: jest.fn(),
    },
    cartItem: {
      deleteMany: jest.fn(),
    },
  },
}));

import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import { JwtUtil } from "../src/utils/jwt.util";
import { Role, OrderStatus } from "../src/generated/client";

describe("Order API", () => {
  const mockUser = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "customer@example.com",
    role: Role.CUSTOMER,
  };

  const mockOrder = {
    id: "550e8400-e29b-41d4-a716-446655440005",
    userId: mockUser.id,
    totalAmount: 199.98,
    shippingAddress: "123 Street, City",
    paymentMethod: "STRIPE",
    status: OrderStatus.PENDING,
    idempotencyKey: "unique-key-123",
    items: [
      {
        id: "550e8400-e29b-41d4-a716-446655440006",
        orderId: "550e8400-e29b-41d4-a716-446655440005",
        productId: "550e8400-e29b-41d4-a716-446655440007",
        quantity: 2,
        price: 99.99,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let customerToken: string;
  let adminToken: string;

  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret";
    customerToken = JwtUtil.generateAccessToken({
      id: mockUser.id,
      email: mockUser.email,
      role: Role.CUSTOMER as any,
    });
    adminToken = JwtUtil.generateAccessToken({
      id: "admin-id-123",
      email: "admin@example.com",
      role: Role.ADMIN as any,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/orders/create-order", () => {
    it("should create a new order successfully", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.product.findUnique as jest.Mock).mockResolvedValue({
        id: "550e8400-e29b-41d4-a716-446655440007",
        name: "Test Product",
        variants: [],
        price: 99.99,
        stock: 10,
      });
      (prisma.cart.findUnique as jest.Mock).mockResolvedValue({ id: "cart-id" });
      (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.payment.create as jest.Mock).mockResolvedValue({
        id: "payment-id",
        orderId: mockOrder.id,
        method: "COD",
        transactionId: "COD-123",
        amount: 199.98,
        status: "PENDING",
      });
      (prisma.order.update as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .post("/api/v1/orders/create-order")
        .set("Authorization", `Bearer ${customerToken}`)
        .set("x-idempotency-key", "unique-key-123")
        .send({
          userId: mockUser.id,
          items: [
            {
              productId: "550e8400-e29b-41d4-a716-446655440007",
              quantity: 2,
              price: 99.99,
            },
          ],
          totalAmount: 199.98,
          shippingAddress: "123 Street, City",
          paymentMethod: "COD",
        });

      if (response.status !== 201) console.log(response.body);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.order.idempotencyKey).toBe("unique-key-123");
    });

    it("should return existing order if idempotency key matches", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .post("/api/v1/orders/create-order")
        .set("Authorization", `Bearer ${customerToken}`)
        .set("x-idempotency-key", "unique-key-123")
        .send({
          userId: mockUser.id,
          items: [
            {
              productId: "550e8400-e29b-41d4-a716-446655440007",
              quantity: 2,
              price: 99.99,
            },
          ],
          totalAmount: 199.98,
          shippingAddress: "123 Street, City",
          paymentMethod: "STRIPE",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.order.id).toBe(mockOrder.id);
      expect(prisma.order.create).not.toHaveBeenCalled();
    });

    it("should return 400 if no items are provided", async () => {
      const response = await request(app)
        .post("/api/v1/orders/create-order")
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          userId: mockUser.id,
          items: [],
          totalAmount: 0,
          shippingAddress: "Address",
          paymentMethod: "STRIPE",
        });

      // 422 if Zod validates but Service throws 400?
      // Actually, Service throws 400 if items.length === 0.
      // But if userId is missing, it's 422 from middleware.
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Order must contain at least one item.",
      );
    });
  });

  describe("GET /api/v1/orders/get-user-orders", () => {
    it("should fetch orders for the authenticated user", async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([mockOrder]);

      const response = await request(app)
        .get("/api/v1/orders/get-user-orders")
        .set("Authorization", `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.orders).toHaveLength(1);
    });
  });

  describe("GET /api/v1/orders/get-order/:id", () => {
    it("should fetch a specific order by ID", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .get(`/api/v1/orders/get-order/${mockOrder.id}`)
        .set("Authorization", `Bearer ${customerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.order.id).toBe(mockOrder.id);
    });

    it("should return 404 if order does not exist", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get("/api/v1/orders/get-order/550e8400-e29b-41d4-a716-446655440005")
        .set("Authorization", `Bearer ${customerToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Order with the given ID does not exist.",
      );
    });
  });

  describe("PUT /api/v1/orders/update-order/:id", () => {
    it("should update an order successfully", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        status: OrderStatus.SHIPPED,
      });

      const response = await request(app)
        .put(`/api/v1/orders/update-order/${mockOrder.id}`)
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          status: "SHIPPED",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.order.status).toBe("shipped");
    });
  });

  describe("DELETE /api/v1/orders/delete-order/:id", () => {
    it("should delete an order successfully", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.delete as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .delete(`/api/v1/orders/delete-order/${mockOrder.id}`)
        .set("Authorization", `Bearer ${customerToken}`);

      expect(response.status).toBe(204);
    });
  });

  describe("POST /api/v1/orders/process-shipment/:id", () => {
    it("should process shipment successfully", async () => {
      const mockPaidOrder = { ...mockOrder, status: "PAID" };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockPaidOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockPaidOrder,
        status: OrderStatus.SHIPPED,
      });
      (prisma.shipment.create as jest.Mock).mockResolvedValue({
        id: "shipment-1",
        orderId: mockOrder.id,
        trackingNumber: "JNT-12345",
        carrier: "JNT",
        status: "PENDING",
      });

      const response = await request(app)
        .post(`/api/v1/orders/process-shipment/${mockOrder.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          carrier: "JNT",
        });

      if (response.status !== 200) console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.shipment).toBeDefined();
    });

    it("should return 400 if order is not paid", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder); // Default mockOrder is PENDING

      const response = await request(app)
        .post(`/api/v1/orders/process-shipment/${mockOrder.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          carrier: "JNT",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Order must be paid before processing shipment.");
    });
  });
});
