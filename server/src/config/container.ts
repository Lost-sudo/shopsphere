// Dependency Injection Container

// Auth Dependencies
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { RefreshSessionService } from "../services/refreshSession.service";
import { VerificationRepository } from "../repositories/verification.repository";

import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const userRepo = new UserRepository();
const refreshSessionService = new RefreshSessionService();
const verificationRepository = new VerificationRepository();
export const authService = new AuthService(
    userRepo,
    refreshSessionService,
    verificationRepository,
);
export const authController = new AuthController(authService);

// Address Dependencies
import { AddressRepository } from "../repositories/address.repository";
import { AddressService } from "../services/address.service";
import { AddressController } from "../controllers/address.controller";

const addressRepository = new AddressRepository();
export const addressService = new AddressService(addressRepository);
export const addressController = new AddressController(addressService);

// Category Dependencies
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";

const categoryRepository = new CategoryRepository();
export const categoryService = new CategoryService(categoryRepository);
export const categoryController = new CategoryController(categoryService);

// Product Dependencies
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";

const productRepository = new ProductRepository();
export const productService = new ProductService(productRepository, categoryRepository);
export const productController = new ProductController(productService);

// User Dependencies
const userService = new UserService(userRepo);
export const userController = new UserController(userService);
