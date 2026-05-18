# ShopSphere API Documentation

**Base URL:** `http://localhost:5000/api/v1`  
**Content-Type:** `application/json`  
**Auth:** Bearer token (JWT) in `Authorization` header or HTTP-only cookie

---

## Common Responses

### Success Response
```json
{
  "status": "success",
  "data": { ... }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

### HTTP Status Codes
| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Authentication

### POST `/auth/register`
Create a new customer account.

**Auth:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "Password123!"
}
```

**Validation Rules:**
- `email`: valid email format
- `name`: 3–255 characters
- `password`: min 8 chars, at least one uppercase, one lowercase, one number, one special char

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "isActive": true,
      "emailVerified": false
    },
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

---

### POST `/auth/login`
Authenticate with email and password.

**Auth:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": { "id": "uuid", "email": "...", "name": "...", "role": "CUSTOMER" },
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

---

### POST `/auth/logout`
Invalidate the current session.

**Auth:** Cookie/Bearer (optional)

**Response (200):** `{ "status": "success", "message": "Logged out successfully" }`

---

### GET `/auth/get-me`
Get the currently authenticated user's profile.

**Auth:** Required

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "isActive": true,
    "emailVerified": true
  }
}
```

---

### POST `/auth/refresh`
Exchange a refresh token for a new access token.

**Auth:** Cookie/Bearer (refresh token)

**Response (200):**
```json
{
  "accessToken": "new-jwt...",
  "refreshToken": "new-refresh-jwt..."
}
```

---

### GET `/auth/verify`
Verify a verification token (email verification, email update, password reset).

**Query Params:** `?token=<token>&type=<type>`

**Response (200):** `{ "status": "success", "message": "Token verified successfully" }`

---

### POST `/auth/request-verification-email`
Request a new email verification email.

**Auth:** Required

**Response (200):** `{ "status": "success", "message": "Verification email sent" }`

---

## Users

### GET `/users`
Get all users (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):**
```json
{
  "status": "success",
  "data": [{ "id": "uuid", "email": "...", "name": "...", "role": "ADMIN" }]
}
```

---

### POST `/users`
Admin creates a new user.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "Password123!",
  "role": "CUSTOMER"
}
```

**Response (201):** `{ "status": "success", "data": { ...user } }`

---

### GET `/users/me`
Get current user's full profile.

**Auth:** Required

**Response (200):** `{ "status": "success", "data": { ...user } }`

---

### GET `/users/:id`
Get user by ID (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "data": { ...user } }`

---

### PUT `/users`
Update current user's name.

**Auth:** Required

**Request Body:**
```json
{ "name": "Updated Name" }
```

**Response (200):** `{ "status": "success", "data": { ...user } }`

---

### PUT `/users/email`
Update current user's email.

**Auth:** Required

**Request Body:**
```json
{ "email": "new@example.com" }
```

**Response (200):** `{ "status": "success", "data": { ...user } }`

---

### PUT `/users/password`
Update current user's password.

**Auth:** Required

**Request Body:**
```json
{ "password": "NewPassword123!" }
```

**Response (200):** `{ "status": "success", "message": "Password updated" }`

---

### PUT `/users/:id/role`
Update user role (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{ "role": "ADMIN" }
```

**Response (200):** `{ "status": "success", "data": { ...user } }`

---

### DELETE `/users/:id`
Delete a user (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "message": "User deleted" }`

---

## Addresses

### POST `/addresses/create-address`
Create a new shipping address.

**Auth:** Required (CUSTOMER, ADMIN, SUPER_ADMIN)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "street": "123 Main St",
  "barangay": "Barangay 1",
  "city": "Manila",
  "province": "NCR",
  "region": "NCR",
  "country": "Philippines",
  "postalCode": "1000",
  "isDefault": true
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "street": "123 Main St",
    "barangay": "Barangay 1",
    "city": "Manila",
    "province": "NCR",
    "region": "NCR",
    "country": "Philippines",
    "postalCode": "1000",
    "isDefault": true
  }
}
```

---

### GET `/addresses/get-user-addresses`
Get all addresses for the authenticated user.

**Auth:** Required

**Response (200):**
```json
{
  "status": "success",
  "data": [{ ...address }]
}
```

---

### GET `/addresses/get-address/:id`
Get a specific address by ID.

**Auth:** Required

**Response (200):** `{ "status": "success", "data": { ...address } }`

---

### PUT `/addresses/update-address/:id`
Update an address (partial update).

**Auth:** Required

**Request Body:** Any subset of address fields

**Response (200):** `{ "status": "success", "data": { ...address } }`

---

### PUT `/addresses/set-default-address/:id`
Set an address as the default.

**Auth:** Required

**Response (200):** `{ "status": "success", "data": { ...address } }`

---

### DELETE `/addresses/delete-address/:id`
Delete an address.

**Auth:** Required

**Response (200):** `{ "status": "success", "message": "Address deleted" }`

---

## Categories

### GET `/category/get-all-categories`
Get all categories.

**Auth:** None

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Apparel",
      "description": "Clothing items",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET `/category/get-category/:id`
Get a category by ID.

**Auth:** None

**Response (200):** `{ "status": "success", "data": { ...category } }`

---

### POST `/category/create-category`
Create a new category.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category description"
}
```

**Response (201):** `{ "status": "success", "data": { ...category } }`

---

### PUT `/category/update-category/:id`
Update a category.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:** Any subset of category fields

**Response (200):** `{ "status": "success", "data": { ...category } }`

---

### DELETE `/category/delete-category/:id`
Delete a category.

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "message": "Category deleted" }`

---

## Products

### GET `/products`
Get paginated, filterable product list.

**Auth:** None

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page (max 100) |
| search | string | — | Text search on name/description |
| minPrice | number | — | Minimum price filter |
| maxPrice | number | — | Maximum price filter |
| categoryId | UUID | — | Filter by category |
| sort | enum | "newest" | `price_asc`, `price_desc`, `newest`, `oldest` |
| isActive | boolean | — | Filter by active status |

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Luxe Cotton Tee",
        "description": "Premium cotton t-shirt...",
        "price": 29.99,
        "stock": 100,
        "images": ["/uploads/image.jpg"],
        "isActive": true,
        "weight": 200,
        "categoryId": "uuid",
        "category": { "id": "uuid", "name": "Apparel" },
        "variants": [
          {
            "id": "uuid",
            "name": "Size",
            "value": "M",
            "sku": "LCT-M",
            "stock": 50,
            "price": null
          }
        ],
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z"
      }
    ],
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### GET `/products/:id`
Get a single product by ID.

**Auth:** None

**Response (200):**
```json
{
  "status": "success",
  "data": { ...product }
}
```

---

### POST `/products`
Create a new product.

**Auth:** ADMIN, SUPER_ADMIN
**Content-Type:** `multipart/form-data`

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| name | string | Product name (3–255 chars) |
| description | string | Min 10 characters |
| price | number | Positive decimal |
| stock | number | Integer, default 0 |
| weight | number | Weight in grams |
| categoryId | UUID | Must exist in DB |
| isActive | boolean | Default true |
| images | files | Up to 5 image files |
| variants | string | JSON string of variant array |

**Variant JSON structure:**
```json
[
  { "name": "Size", "value": "M", "sku": "LCT-M", "stock": 50, "price": null }
]
```

**Response (201):** `{ "status": "success", "data": { ...product } }`

---

### PATCH `/products/:id`
Update a product.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:** Any subset of product fields (excluding variants — use variant endpoints)

**Response (200):** `{ "status": "success", "data": { ...product } }`

---

### DELETE `/products/:id`
Delete a product.

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "message": "Product deleted" }`

---

## Product Variants

### GET `/products/:id/variants`
Get all variants for a product.

**Auth:** None

**Response (200):**
```json
{
  "status": "success",
  "data": [
    { "id": "uuid", "name": "Size", "value": "M", "sku": "LCT-M", "stock": 50, "price": null }
  ]
}
```

---

### GET `/products/:id/variants/:variantId`
Get a specific variant.

**Auth:** None

**Response (200):** `{ "status": "success", "data": { ...variant } }`

---

### POST `/products/:id/variants`
Create a variant for a product.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "name": "Color",
  "value": "Red",
  "sku": "LCT-RED",
  "stock": 30,
  "price": 34.99
}
```

**Response (201):** `{ "status": "success", "data": { ...variant } }`

---

### PATCH `/products/:id/variants/:variantId`
Update a variant.

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:** Any subset of variant fields

**Response (200):** `{ "status": "success", "data": { ...variant } }`

---

### DELETE `/products/:id/variants/:variantId`
Delete a variant.

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "message": "Variant deleted" }`

---

## Cart

All cart endpoints require authentication (CUSTOMER, ADMIN, SUPER_ADMIN).

### GET `/cart`
Get the current user's cart with items.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "items": [
      {
        "id": "uuid",
        "cartId": "uuid",
        "productId": "uuid",
        "variantId": null,
        "quantity": 2,
        "product": {
          "name": "Luxe Cotton Tee",
          "price": 29.99,
          "images": ["/uploads/image.jpg"],
          "weight": 200,
          "stock": 100
        },
        "variant": null
      }
    ]
  }
}
```

---

### POST `/cart/add-item`
Add an item to the cart.

**Request Body:**
```json
{
  "productId": "uuid",
  "variantId": "uuid (optional)",
  "quantity": 1
}
```

**Response (201):** `{ "status": "success", "data": { ...cart } }`

---

### PUT `/cart/update-item/:itemId`
Update item quantity.

**Request Body:**
```json
{ "quantity": 3 }
```

**Response (200):** `{ "status": "success", "data": { ...cart } }`

---

### DELETE `/cart/items/:itemId`
Remove an item from the cart.

**Response (200):** `{ "status": "success", "data": { ...cart } }`

---

### DELETE `/cart`
Clear all items from the cart.

**Response (200):** `{ "status": "success", "data": { ...cart } }`

---

## Orders

### POST `/orders/create-order`
Create a new order from cart items.

**Auth:** CUSTOMER, ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "userId": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 2, "price": 29.99, "variantId": null }
  ],
  "totalAmount": 59.98,
  "shippingAddress": "123 Main St, Manila",
  "paymentMethod": "GCASH",
  "shippingMethod": "STANDARD",
  "idempotencyKey": "unique-key (optional)"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "status": "PENDING",
    "totalAmount": 59.98,
    "shippingAddress": "123 Main St, Manila",
    "paymentMethod": "GCASH",
    "shippingMethod": "STANDARD",
    "items": [...],
    "createdAt": "2026-01-01T00:00:00Z"
  }
}
```

---

### GET `/orders/get-user-orders`
Get orders for the authenticated user.

**Auth:** CUSTOMER, ADMIN, SUPER_ADMIN

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "status": "PENDING",
      "totalAmount": 59.98,
      "items": [...],
      "payment": { ... },
      "shipment": { ... },
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET `/orders/get-all-orders`
Get all orders (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Response (200):** `{ "status": "success", "data": [ ...orders ] }`

---

### GET `/orders/get-order/:id`
Get a specific order by ID.

**Auth:** Required (own orders for CUSTOMER, all for ADMIN/SUPER_ADMIN)

**Response (200):** `{ "status": "success", "data": { ...order } }`

---

### PUT `/orders/update-order/:id`
Update order (e.g., change status).

**Auth:** Required

**Request Body:** Any subset of order fields

**Response (200):** `{ "status": "success", "data": { ...order } }`

---

### DELETE `/orders/delete-order/:id`
Delete an order.

**Auth:** Required

**Response (200):** `{ "status": "success", "message": "Order deleted" }`

---

### POST `/orders/process-shipment/:id`
Process shipment for an order (admin only).

**Auth:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{ "carrier": "STANDARD" }
```

**Response (200):** `{ "status": "success", "data": { ...order } }`

---

## Payments

### POST `/payments/:orderId`
Process payment for an order.

**Auth:** Required

**Request Body:**
```json
{
  "paymentMethod": "GCASH"
}
```

**Available Methods:** `CARD`, `GCASH`, `COD`

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "orderId": "uuid",
    "method": "GCASH",
    "transactionId": "txn_uuid",
    "amount": 59.98,
    "status": "COMPLETED"
  }
}
```

---

### GET `/payments/:orderId`
Get payment details for an order.

**Auth:** Required

**Response (200):** `{ "status": "success", "data": { ...payment } }`

---

## Verification

### GET `/verification/verify-email`
Verify an email update. Typically called via email link.

**Auth:** None

**Query Params:** `?token=<token>&userId=<userId>&newEmail=<newEmail>`

**Response (200):** `{ "status": "success", "message": "Email verified successfully" }`

---

### POST `/verification/reset-password`
Reset password using a verification token.

**Auth:** None

**Request Body:**
```json
{
  "token": "verification-token",
  "newPassword": "NewPassword123!"
}
```

**Response (200):** `{ "status": "success", "message": "Password reset successfully" }`

---

## Health

### GET `/health`
Health check endpoint.

**Auth:** None

**Response (200):**
```json
{
  "status": "OK",
  "message": "ShopSphere API is running"
}
```
