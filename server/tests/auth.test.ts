import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/db";
import redis from "../src/config/redis";
import { VerificationUtil } from "../src/utils/verification.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mocking Prisma
jest.mock("../src/config/db", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    verificationToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Mocking Redis
jest.mock("../src/config/redis", () => ({
  __esModule: true,
  default: {
    hset: jest.fn(),
    expire: jest.fn(),
    hgetall: jest.fn(),
    del: jest.fn(),
    on: jest.fn(),
  },
}));

// Mocking VerificationUtil
jest.mock("../src/utils/verification.util", () => ({
  VerificationUtil: {
    sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
    generateVerificationToken: jest.fn(() => "mock-token"),
  },
}));

// Mocking bcryptjs
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashedpassword"),
  compare: jest.fn(),
}));

describe("Authentication API", () => {
  const mockUser = {
    id: "user-123",
    email: "test@example.com",
    name: "Test User",
    password: "hashedpassword",
    role: "CUSTOMER",
    isActive: true,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const jwtSecret = "testsecret";
  const refreshSecret = "testrefreshsecret";

  beforeAll(() => {
    process.env.JWT_SECRET = jwtSecret;
    process.env.JWT_REFRESH_SECRET = refreshSecret;
    process.env.SALT_ROUNDS = "10";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.verificationToken.create as jest.Mock).mockResolvedValue({
        userId: mockUser.id,
        token: "mock-token",
      });

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "Password123!",
        name: "Test User",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe("test@example.com");
      expect(VerificationUtil.sendVerificationEmail).toHaveBeenCalled();
    });

    it("should return 400 if user already exists", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "Password123!",
        name: "Test User",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });

    it("should return 422 if not correct input schema or missing fields", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "testexample.com",
        password: "Password",
      });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (redis.hset as jest.Mock).mockResolvedValue("OK");

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "Password123!",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeDefined();
      expect(response.header["set-cookie"]).toBeDefined();
    });

    it("should return 400 with invalid credentials", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "WrongPassword123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("should return 400 if email is not verified", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        emailVerified: false,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "Password123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Email not verified");
    });

    it("should return 422 if not correct input schema or missing fields", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "testexample.com",
        password: "Password",
      });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });
  });

  describe("GET /api/v1/auth/get-me", () => {
    it("should return user profile when authenticated", async () => {
      const token = jwt.sign(
        { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        jwtSecret,
      );

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .get("/api/v1/auth/get-me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe("test@example.com");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app).get("/api/v1/auth/get-me");

      expect(response.status).toBe(401);
    });

    it("should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/get-me")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/v1/auth/logout", () => {
    it("should logout successfully", async () => {
      const refreshToken = jwt.sign(
        { jti: "session123", typ: "refresh" },
        refreshSecret,
      );
      (redis.del as jest.Mock).mockResolvedValue(1);

      const response = await request(app)
        .post("/api/v1/auth/logout")
        .set("Cookie", [`refreshToken=${refreshToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.header["set-cookie"][0]).toContain("refreshToken=;");
    });
  });
});
