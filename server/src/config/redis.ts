import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

const redis = new Redis(redisUrl!);

redis.on("connect", () => {
    console.log("📶[redis]: Connected to Redis");
});

redis.on("error", (err) => {
    console.error("❌[redis]: Redis connection error:", err);
});

export default redis;
