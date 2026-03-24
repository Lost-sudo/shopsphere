import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import { JwtUtil } from "../src/utils/jwt.util";
import { Role } from "../src/generated/client";

// Mocking Prisma
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    category: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Category API", () => {
  const mockUser = {
    id: "user-123",
    email: "admin@example.com",
    role: Role.ADMIN,
  };

  const mockCategory = {
    id: "category-123",
    name: "Electronics",
    description: "Gadgets and devices",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let adminToken: string;
  let customerToken: string;

  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret";
    adminToken = JwtUtil.generateAccessToken({
      id: mockUser.id,
      email: mockUser.email,
      role: Role.ADMIN as any,
    });
    customerToken = JwtUtil.generateAccessToken({
      id: "customer-123",
      email: "customer@example.com",
      role: Role.CUSTOMER as any,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/category/get-all-categories", () => {
    it("should retrieve all categories", async () => {
      (prisma.category.findMany as jest.Mock).mockResolvedValue([mockCategory]);

      const response = await request(app).get(
        "/api/v1/category/get-all-categories",
      );

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.categories).toHaveLength(1);
      expect(response.body.data.categories[0].name).toBe("Electronics");
    });
  });

  describe("GET /api/v1/category/get-category/:id", () => {
    it("should retrieve a specific category", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app).get(
        `/api/v1/category/get-category/${mockCategory.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.category.id).toBe(mockCategory.id);
    });

    it("should return 404 if category does not exist", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get(
        "/api/v1/category/get-category/non-existent",
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Category with the given ID does not exist.",
      );
    });
  });

  describe("POST /api/v1/category/create-category", () => {
    it("should create a new category safely (Admin only)", async () => {
      (prisma.category.create as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post("/api/v1/category/create-category")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Electronics",
          description: "Gadgets and devices",
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data.category.name).toBe("Electronics");
    });

    it("should return 403 if user is not authorized (Customer)", async () => {
      const response = await request(app)
        .post("/api/v1/category/create-category")
        .set("Authorization", `Bearer ${customerToken}`)
        .send({ name: "Testing", description: "Test desc" });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "You do not have permission to perform this action",
      );
    });
  });

  describe("PUT /api/v1/category/update-category/:id", () => {
    it("should update a category successfully (Admin only)", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory);
      (prisma.category.update as jest.Mock).mockResolvedValue({
        ...mockCategory,
        name: "New Name",
      });

      const response = await request(app)
        .put(`/api/v1/category/update-category/${mockCategory.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "New Name",
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.category.name).toBe("New Name");
    });
  });

  describe("DELETE /api/v1/category/delete-category/:id", () => {
    it("should delete a category successfully (Admin only)", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory);
      (prisma.category.delete as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .delete(`/api/v1/category/delete-category/${mockCategory.id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(204);
    });
  });
});
