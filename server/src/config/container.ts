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
export const productService = new ProductService(
  productRepository,
  categoryRepository,
);
export const productController = new ProductController(productService);

// User Dependencies
import { VerificationService } from "../services/verification.service";
import { VerificationController } from "../controllers/verification.controller";
export const verificationService = new VerificationService(
  verificationRepository,
  userRepo,
);
const userService = new UserService(userRepo, verificationService);
export const userController = new UserController(userService);
export const verificationController = new VerificationController(
  verificationService,
  userRepo,
);

// Order Dependencies
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";
import { ShipmentRepository } from "../repositories/shipment.repository";
import { ShipmentService } from "../services/shipment.service";

export const shipmentRepository = new ShipmentRepository();
export const shipmentService = new ShipmentService(shipmentRepository);

export const orderRepository = new OrderRepository();
export const orderService = new OrderService(orderRepository, shipmentService);
export const orderController = new OrderController(orderService);

// Cart Dependencies
import { CartRepository } from "../repositories/cart.repository";
import { CartService } from "../services/cart.service";
import { CartController } from "../controllers/cart.controller";

export const cartRepository = new CartRepository();
export const cartService = new CartService(cartRepository);
export const cartController = new CartController(cartService);

// Payment Dependencies
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";
import { PaymentController } from "../controllers/payment.controller";

export const paymentRepository = new PaymentRepository();
export const paymentService = new PaymentService(
  paymentRepository,
  orderRepository,
);
export const paymentController = new PaymentController(paymentService);
