import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { IProductService } from "../interfaces/product.interface";
import {
  ProductInput,
  ProductQuery,
  UpdateProductInput,
  ProductVariantInput,
  UpdateVariantInput,
} from "../schemas/product.schema";
import { productService } from "@/services/product.service";

export class ProductController {
  constructor(private productService: IProductService) {}

  // ─── Product handlers ─────────────────────────────────────────────────────────

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data: ProductInput = req.body;

    if (req.files && Array.isArray(req.files)) {
      const protocol = req.protocol;
      const host = req.get("host");
      const files = req.files as Express.Multer.File[];

      const imageUrls = files.map((file) => {
        return `${protocol}://${host}/public/uploads/products/${file.filename}`;
      });

      data.images = imageUrls;
    }

    const product = await this.productService.createProduct(data);
    res.status(201).json({
      status: "success",
      data: { product },
    });
  });

  getProducts = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as unknown as ProductQuery;
    const result = await this.productService.listProducts(query);
    res.status(200).json({
      status: "success",
      results: result.products.length,
      data: result,
    });
  });

  getProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const product = await this.productService.getProduct(id);
    res.status(200).json({
      status: "success",
      data: { product },
    });
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const data: UpdateProductInput = req.body;
    const product = await this.productService.updateProduct(id, data);
    res.status(200).json({
      status: "success",
      data: { product },
    });
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await this.productService.deleteProduct(id);
    res.status(204).json({
      status: "success",
    });
  });

  // ─── Variant handlers ─────────────────────────────────────────────────────────

  createVariant = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id as string;
    const data: ProductVariantInput = req.body;
    const variant = await this.productService.addVariant(productId, data);
    res.status(201).json({
      status: "success",
      data: { variant },
    });
  });

  getVariants = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id as string;
    const variants = await this.productService.getVariants(productId);
    res.status(200).json({
      status: "success",
      results: variants.length,
      data: { variants },
    });
  });

  getVariant = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id as string;
    const variantId = req.params.variantId as string;
    const variant = await this.productService.getVariant(productId, variantId);
    res.status(200).json({
      status: "success",
      data: { variant },
    });
  });

  updateVariant = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id as string;
    const variantId = req.params.variantId as string;
    const data: Partial<UpdateVariantInput> = req.body;
    const variant = await this.productService.updateVariant(
      productId,
      variantId,
      data,
    );
    res.status(200).json({
      status: "success",
      data: { variant },
    });
  });

  deleteVariant = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id as string;
    const variantId = req.params.variantId as string;
    await this.productService.removeVariant(productId, variantId);
    res.status(204).json({
      status: "success",
    });
  });
}

export const productController = new ProductController(productService);
