import { Product, ProductListResponse } from "../types/product.types";
import { ProductInput, UpdateProductInput, ProductQuery } from "../schemas/product.schema";

export interface IProductRepository {
    create(data: ProductInput): Promise<Product>;
    findAll(query: ProductQuery): Promise<ProductListResponse>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: Partial<UpdateProductInput>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
}

export interface IProductService {
    createProduct(input: ProductInput): Promise<Product>;
    listProducts(query: ProductQuery): Promise<ProductListResponse>;
    getProduct(id: string): Promise<Product | null>;
    updateProduct(id: string, input: Partial<UpdateProductInput>): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
}
