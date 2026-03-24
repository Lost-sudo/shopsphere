// Mocking Prisma must be at the very top
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    product: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    productVariant: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
    category: {
        findUnique: jest.fn(),
    }
  },
}));

import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import { JwtUtil } from "../src/utils/jwt.util";
import { Role } from "../src/generated/client";

describe("Product API", () => {
    const mockUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "admin@example.com",
        role: Role.ADMIN,
    };

    const mockProduct = {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "iPhone 15",
        description: "Latest Apple phone, now with USB-C",
        price: 999,
        stock: 10,
        categoryId: "550e8400-e29b-41d4-a716-446655440002",
        images: ["http://example.com/image.jpg"],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockVariant = {
        id: "550e8400-e29b-41d4-a716-446655440003",
        productId: mockProduct.id,
        name: "Color",
        value: "Pro Max",
        price: 1199,
        stock: 5,
        sku: "IPHONE-15-PRO-MAX",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    let adminToken: string;
    let customerToken: string;

    beforeAll(() => {
        process.env.JWT_SECRET = "testsecret";
        adminToken = JwtUtil.generateAccessToken({ id: mockUser.id, email: mockUser.email, role: Role.ADMIN as any });
        customerToken = JwtUtil.generateAccessToken({ id: "550e8400-e29b-41d4-a716-446655440004", email: "customer@example.com", role: Role.CUSTOMER as any });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/products", () => {
        it("should retrieve products with pagination and filters", async () => {
            (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);
            (prisma.product.count as jest.Mock).mockResolvedValue(1);

            const response = await request(app)
                .get("/api/v1/products")
                .query({ page: 1, limit: 10 });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data.products).toHaveLength(1);
            expect(response.body.data.products[0].name).toBe("iPhone 15");
        });
    });

    describe("GET /api/v1/products/:id", () => {
        it("should retrieve a specific product", async () => {
            (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

            const response = await request(app)
                .get(`/api/v1/products/${mockProduct.id}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data.product.id).toBe(mockProduct.id);
        });
    });

    describe("POST /api/v1/products", () => {
        it("should create a new product (Admin only)", async () => {
            (prisma.category.findUnique as jest.Mock).mockResolvedValue({ id: mockProduct.categoryId });
            (prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

            const response = await request(app)
                .post("/api/v1/products")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                    name: "iPhone 15",
                    description: "Latest Apple phone, now with USB-C",
                    price: 999,
                    stock: 10,
                    categoryId: mockProduct.categoryId,
                });

            expect(response.status).toBe(201);
            expect(response.body.status).toBe("success");
            expect(response.body.data.product.name).toBe("iPhone 15");
        });
    });

    describe("PATCH /api/v1/products/:id", () => {
        it("should update a product successfully (Admin only)", async () => {
            (prisma.product.update as jest.Mock).mockResolvedValue({ ...mockProduct, name: "iPhone 15 Pro" });

            const response = await request(app)
                .patch(`/api/v1/products/${mockProduct.id}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                    name: "iPhone 15 Pro",
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data.product.name).toBe("iPhone 15 Pro");
        });
    });

    describe("DELETE /api/v1/products/:id", () => {
        it("should delete a product successfully (Admin only)", async () => {
            (prisma.product.delete as jest.Mock).mockResolvedValue(mockProduct);

            const response = await request(app)
                .delete(`/api/v1/products/${mockProduct.id}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(response.status).toBe(204);
        });
    });

    describe("Variant Routes", () => {
        describe("POST /api/v1/products/:id/variants", () => {
            it("should create a product variant", async () => {
                (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
                (prisma.productVariant.create as jest.Mock).mockResolvedValue(mockVariant);

                const response = await request(app)
                    .post(`/api/v1/products/${mockProduct.id}/variants`)
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({
                        name: "Color",
                        value: "Pro Max",
                        price: 1199,
                        stock: 5,
                        sku: "IPHONE-15-PRO-MAX",
                    });

                if (response.status !== 201) console.log(response.body);
                expect(response.status).toBe(201);
                expect(response.body.status).toBe("success");
                expect(response.body.data.variant.name).toBe("Color");
            });
        });

        describe("GET /api/v1/products/:id/variants", () => {
            it("should list all variants for a product", async () => {
                (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
                (prisma.productVariant.findMany as jest.Mock).mockResolvedValue([mockVariant]);

                const response = await request(app)
                    .get(`/api/v1/products/${mockProduct.id}/variants`);

                if (response.status !== 200) console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body.status).toBe("success");
                expect(response.body.data.variants).toHaveLength(1);
            });
        });
    });
});
