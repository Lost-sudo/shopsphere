function getEnv(key: string, defaultValue: string = "") {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const env = {
    apiBaseUrl: getEnv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:8080/api/v1"),
}