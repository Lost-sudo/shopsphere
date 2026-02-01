import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { ProductService } from "../services/product.service";
import { ProductInput, ProductQuery, UpdateProductInput } from "../schemas/product.schema";

export class ProductController {
    constructor(private productService: ProductService) { }

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
}
