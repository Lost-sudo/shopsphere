export interface UploadOptions {
  protocol?: string;
  host?: string;
}

export interface ImageStorageProvider {
  upload(file: Express.Multer.File, options?: UploadOptions): Promise<string>;
  delete(url: string): Promise<void>;
}
