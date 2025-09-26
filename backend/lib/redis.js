import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let client;
if (process.env.UPSTASH_REDIS_URL) {
  client = new Redis(process.env.UPSTASH_REDIS_URL);
} else if (process.env.REDIS_URL) {
  client = new Redis(process.env.REDIS_URL);
} else {
  const store = new Map();
  console.warn("Redis URL not set. Using in-memory token store (dev only).");
  client = {
    get: async (key) => store.get(key) || null,
    set: async (key, val, mode, ttlSeconds) => {
      store.set(key, val);
      if (mode === "EX" && typeof ttlSeconds === "number") {
        setTimeout(() => store.delete(key), ttlSeconds * 1000);
      }
    },
    del: async (key) => store.delete(key),
  };
}

export const redis = client;


