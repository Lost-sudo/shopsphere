function getEnv(key: string, defaultValue: string = "") {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const nextEnv = process.env.NEXT_PUBLIC_NEXT_ENV || process.env.NEXT_ENV || "development";

export const env = {
  apiBaseUrl: nextEnv === "production"
    ? getEnv("NEXT_PUBLIC_API_URL")
    : "http://localhost:5000/api/v1",
};
