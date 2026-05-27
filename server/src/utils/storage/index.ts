import { ImageStorageProvider } from "./storage.interface";

let provider: ImageStorageProvider | null = null;

export function getStorageProvider(): ImageStorageProvider {
  if (!provider) {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      const { CloudinaryStorageProvider } = require("./cloudinary.storage");
      provider = new CloudinaryStorageProvider();
    } else {
      const { LocalStorageProvider } = require("./local.storage");
      provider = new LocalStorageProvider();
    }
  }
  return provider!;
}

export function resetStorageProvider(): void {
  provider = null;
}
