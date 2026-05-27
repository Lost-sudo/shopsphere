function getEnv(key: string, defaultValue: string = "") {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const isProduction = 
  process.env.NODE_ENV === "production" || 
  process.env.NEXT_PUBLIC_NEXT_ENV === "production" || 
  process.env.NEXT_ENV === "production";

export const env = {
  apiBaseUrl: isProduction
    ? getEnv("NEXT_PUBLIC_API_URL")
    : "http://localhost:5000/api/v1",
};
