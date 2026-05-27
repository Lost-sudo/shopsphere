import { v2 as cloudinary } from "cloudinary";
import { ImageStorageProvider } from "./storage.interface";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryStorageProvider implements ImageStorageProvider {
  async upload(file: Express.Multer.File): Promise<string> {
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "shopsphere/products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });

    return result.secure_url as string;
  }

  async delete(url: string): Promise<void> {
    try {
      const segments = url.split("/");
      const fileWithExtension = segments[segments.length - 1];
      const publicId = `shopsphere/products/${fileWithExtension.replace(/\.[^.]+$/, "")}`;
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Failed to delete Cloudinary image:", error);
    }
  }
}
