// Mocking Prisma must be at the very top
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    payment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(), // If used
    },
    order: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import { JwtUtil } from "../src/utils/jwt.util";
import { Role, OrderStatus } from "../src/generated/client";

describe("Payment API", () => {
  const mockUser = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "customer@example.com",
    role: Role.CUSTOMER,
  };

  const mockOrder = {
    id: "550e8400-e29b-41d4-a716-446655440005",
    userId: mockUser.id,
    totalAmount: 199.98,
    status: "PENDING",
  };

  const mockPayment = {
    id: "550e8400-e29b-41d4-a716-446655440008",
    orderId: mockOrder.id,
    amount: 199.98,
    method: "STRIPE",
    transactionId: "trans_12345",
    status: "COMPLETED",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let customerToken: string;

  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret";
    customerToken = JwtUtil.generateAccessToken({
      id: mockUser.id,
      email: mockUser.email,
      role: Role.CUSTOMER as any,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/payments/:orderId", () => {
    it("should process payment successfully", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.payment.create as jest.Mock).mockResolvedValue(mockPayment);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        status: "PAID",
      });

      const response = await request(app)
        .post(`/api/v1/payments/${mockOrder.id}`)
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          paymentMethod: "STRIPE",
        });

      if (response.status !== 200) console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.payment.transactionId).toBeDefined();
      expect(prisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: mockOrder.id },
          data: { status: "PAID" },
        })
      );
    });

    it("should return 400 if order is already paid", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue({
        ...mockOrder,
        status: "paid",
      });

      const response = await request(app)
        .post(`/api/v1/payments/${mockOrder.id}`)
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          paymentMethod: "STRIPE",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Order is already paid.");
    });

    it("should return 404 if order does not exist", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post(`/api/v1/payments/non-existent`)
        .set("Authorization", `Bearer ${customerToken}`)
        .send({
          paymentMethod: "STRIPE",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Order not found.");
    });
  });

  describe("GET /api/v1/payments/:orderId", () => {
    it("should fetch payment by order ID", async () => {
        // PaymentRepository uses findFirst or findUnique? 
        // Let's assume it has unique constraint on orderId mapping or uses findFirst
        (prisma.payment.findUnique as jest.Mock).mockResolvedValue(mockPayment);

        const response = await request(app)
            .get(`/api/v1/payments/${mockOrder.id}`)
            .set("Authorization", `Bearer ${customerToken}`);

        if (response.status !== 200) console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.payment.orderId).toBe(mockOrder.id);
    });
  });
});
