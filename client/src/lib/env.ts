export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
};

console.log("Resolved API URL:", env.apiBaseUrl);
