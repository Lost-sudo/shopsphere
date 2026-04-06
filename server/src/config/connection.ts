import prisma from "./db";
import redis from "./redis";

export const connectDBs = async () => {
  try {
    // Test Prisma Connection
    await prisma.$connect();
    console.log("✅[database]: PostgreSQL connected via Prisma");

    // Test Redis Connection
    // ioredis connects automatically, but we can ping to verify
    await redis.ping();
    console.log("✅[redis]: Redis connected and responsive");
  } catch (error) {
    console.error("❌[database]: Connection error:", error);
    process.exit(1);
  }
};

export const disconnectDBs = async () => {
  try {
    await prisma.$disconnect();
    console.log("📶[database]: PostgreSQL disconnected");

    await redis.quit();
    console.log("📶[redis]: Redis connection closed");
  } catch (error) {
    console.error("❌[database]: Error during disconnection:", error);
  }
};
