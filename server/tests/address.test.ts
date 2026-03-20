import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import jwt from "jsonwebtoken";

// Mocking Prisma
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    address: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

describe("Address API", () => {
    const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "CUSTOMER",
    };

    const mockAddress = {
        id: "address-123",
        userId: mockUser.id,
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        postalCode: "94105",
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const jwtSecret = "testsecret";

    beforeAll(() => {
        process.env.JWT_SECRET = jwtSecret;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const token = jwt.sign({ id: mockUser.id, email: mockUser.email, role: mockUser.role }, jwtSecret);

    describe("POST /api/v1/addresses/create-address", () => {
        it("should create a new address successfully", async () => {
            (prisma.address.create as jest.Mock).mockResolvedValue(mockAddress);

            const response = await request(app)
                .post("/api/v1/addresses/create-address")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    street: "123 Main St",
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    postalCode: "94105",
                    isDefault: false,
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.address.street).toBe("123 Main St");
        });

        it("should return 422 if validation fails", async () => {
            const response = await request(app)
                .post("/api/v1/addresses/create-address")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    street: "", // Invalid
                    city: "San Francisco",
                });

            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        });

        it("should return 401 if not authenticated", async () => {
            const response = await request(app)
                .post("/api/v1/addresses/create-address")
                .send({
                    street: "123 Main St",
                });

            expect(response.status).toBe(401);
        });
    });

    describe("GET /api/v1/addresses/get-user-addresses", () => {
        it("should retrieve all addresses for the user", async () => {
            (prisma.address.findMany as jest.Mock).mockResolvedValue([mockAddress]);

            const response = await request(app)
                .get("/api/v1/addresses/get-user-addresses")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.addresses).toHaveLength(1);
            expect(response.body.addresses[0].id).toBe(mockAddress.id);
        });
    });

    describe("GET /api/v1/addresses/get-address/:id", () => {
        it("should retrieve a specific address", async () => {
            (prisma.address.findUnique as jest.Mock).mockResolvedValue(mockAddress);

            const response = await request(app)
                .get(`/api/v1/addresses/get-address/${mockAddress.id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.address.id).toBe(mockAddress.id);
        });
    });

    describe("PUT /api/v1/addresses/update-address/:id", () => {
        it("should update an address successfully", async () => {
            (prisma.address.findUnique as jest.Mock).mockResolvedValue(mockAddress);
            (prisma.address.update as jest.Mock).mockResolvedValue({ ...mockAddress, street: "456 Oak St" });

            const response = await request(app)
                .put(`/api/v1/addresses/update-address/${mockAddress.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    street: "456 Oak St",
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.address.street).toBe("456 Oak St");
        });
    });

    describe("PUT /api/v1/addresses/set-default-address/:id", () => {
        it("should set an address as default successfully", async () => {
            (prisma.address.findUnique as jest.Mock).mockResolvedValue(mockAddress);
            (prisma.address.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
            (prisma.address.update as jest.Mock).mockResolvedValue({ ...mockAddress, isDefault: true });

            const response = await request(app)
                .put(`/api/v1/addresses/set-default-address/${mockAddress.id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });

    describe("DELETE /api/v1/addresses/delete-address/:id", () => {
        it("should delete an address successfully", async () => {
            (prisma.address.delete as jest.Mock).mockResolvedValue(mockAddress);

            const response = await request(app)
                .delete(`/api/v1/addresses/delete-address/${mockAddress.id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Address deleted successfully");
        });
    });
});
