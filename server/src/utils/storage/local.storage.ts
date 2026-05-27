import path from "path";
import fs from "fs";
import { ImageStorageProvider, UploadOptions } from "./storage.interface";

const uploadDir = "public/uploads/products";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export class LocalStorageProvider implements ImageStorageProvider {
  async upload(
    file: Express.Multer.File,
    options?: UploadOptions,
  ): Promise<string> {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const filename = `product-${uniqueSuffix}${ext}`;

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);

    const protocol = options?.protocol || "http";
    const host = options?.host || `localhost:${process.env.BACKEND_PORT || 5000}`;
    return `${protocol}://${host}/public/uploads/products/${filename}`;
  }

  async delete(url: string): Promise<void> {
    try {
      const segments = url.split("/");
      const filename = segments[segments.length - 1];
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Failed to delete local image:", error);
    }
  }
}
