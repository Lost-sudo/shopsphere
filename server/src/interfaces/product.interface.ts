import {
  Product,
  ProductListResponse,
  ProductVariant,
} from "../types/product.types";
import {
  ProductInput,
  UpdateProductInput,
  ProductQuery,
  ProductVariantInput,
  UpdateVariantInput,
} from "../schemas/product.schema";

export interface IProductRepository {
  create(data: ProductInput): Promise<Product>;
  findAll(query: ProductQuery): Promise<ProductListResponse>;
  findById(id: string): Promise<Product | null>;
  update(
    id: string,
    data: Partial<UpdateProductInput>,
  ): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  reduceStock(id: string, quantity: number): Promise<void>;
  reduceVariantStock(variantId: string, quantity: number): Promise<void>;

  // Variant operations
  createVariant(
    productId: string,
    data: ProductVariantInput,
  ): Promise<ProductVariant>;
  findVariantsByProductId(productId: string): Promise<ProductVariant[]>;
  findVariantById(variantId: string): Promise<ProductVariant | null>;
  updateVariant(
    variantId: string,
    data: Partial<UpdateVariantInput>,
  ): Promise<ProductVariant | null>;
  deleteVariant(variantId: string): Promise<boolean>;
}

export interface IProductService {
  createProduct(input: ProductInput): Promise<Product>;
  listProducts(query: ProductQuery): Promise<ProductListResponse>;
  getProduct(id: string): Promise<Product | null>;
  updateProduct(
    id: string,
    input: Partial<UpdateProductInput>,
  ): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
  validateVariantSelection(productId: string, variantId?: string): Promise<void>;
  reduceStock(productId: string, quantity: number, variantId?: string): Promise<void>;

  // Variant operations
  addVariant(
    productId: string,
    data: ProductVariantInput,
  ): Promise<ProductVariant>;
  getVariants(productId: string): Promise<ProductVariant[]>;
  getVariant(productId: string, variantId: string): Promise<ProductVariant>;
  updateVariant(
    productId: string,
    variantId: string,
    data: Partial<UpdateVariantInput>,
  ): Promise<ProductVariant>;
  removeVariant(productId: string, variantId: string): Promise<boolean>;
}
