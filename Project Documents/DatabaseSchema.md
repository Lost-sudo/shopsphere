# ShopSphere Database Schema & ERD

## Overview

ShopSphere uses **PostgreSQL 15** with **Prisma ORM v7** as the data layer. The schema defines 12 models with 2 enums, managed via Prisma migrations.

---

## Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────────────┐
│      User        │1     1│    VerificationToken      │
│──────────────────│───●───│──────────────────────────│
│ id (UUID)        │       │ id (UUID)                │
│ email (unique)   │       │ userId (unique, FK)      │
│ name             │       │ token (unique)           │
│ password         │       │ type (VerificationType)  │
│ role (Role)      │       │ metadata (Json?)         │
│ isActive         │       │ expiresAt?               │
│ emailVerified    │       │ createdAt                │
│ createdAt        │       └──────────────────────────┘
│ updatedAt        │
└───────┬──────────┘
        │
        │ 1
        │
        ├──────────────────┐
        │                  │
        │                  │
   ┌────┴─────┐    ┌──────┴───────┐       ┌───────────────────────┐
   │ Address  │    │    Cart      │1      │      CartItem         │
   │──────────│    │──────────────│───●───│───────────────────────│
   │ id (UUID)│    │ id (UUID)    │       │ id (UUID)             │
   │ userId   │    │ userId (uniq)│       │ cartId (FK)           │
   │ firstName│    │ createdAt    │       │ productId (FK)        │
   │ lastName │    │ updatedAt    │       │ variantId? (FK)       │
   │ phoneNum │    └──────────────┘       │ quantity              │
   │ street   │                           └───────┬───────────────┘
   │ barangay │                                    │
   │ city     │                                    │
   │ province │                            ┌───────┴───────────────┐
   │ region   │                            │      Product          │
   │ country  │                            │───────────────────────│
   │ postal   │        ┌───────────────────│ id (UUID)             │
   │ isDefault│        │                   │ name                  │
   └──────────┘        │                   │ description           │
                       │                   │ price (Decimal)       │
              ┌────────┴────────┐          │ stock                 │
              │   Category      │          │ images (String[])     │
              │────────────────│          │ isActive              │
              │ id (UUID)      │1         │ weight (Decimal)      │
              │ name (unique)  │──●       │ categoryId (FK)       │
              │ description?   │   │       │ createdAt             │
              │ createdAt      │   │       │ updatedAt             │
              │ updatedAt      │   │       └───────┬───────────────┘
              └────────────────┘   │               │
                                   │               │ 1
                                   │               │
                                   │       ┌───────┴───────────────┐
                                   │       │   ProductVariant      │
                                   │       │───────────────────────│
                                   │       │ id (UUID)             │
                                   │       │ productId (FK)        │
                                   │       │ name (e.g. "Size")    │
                                   │       │ value (e.g. "M")      │
                                   │       │ sku (unique)          │
                                   │       │ stock                 │
                                   │       │ price? (Decimal)      │
                                   │       └───────────────────────┘
                                   │
    ┌──────────────────────────────┼──────────────────────────────┐
    │                              │                              │
    │                    ┌─────────┴──────────┐                   │
    │                    │       Order        │                   │
    │                    │────────────────────│                   │
    │                    │ id (UUID)          │                   │
    │                    │ userId (FK)        │                   │
    │                    │ status (OrderSt.)  │                   │
    │                    │  totalAmount (Dec)  │                  │
    │                    │ shippingAddress     │                   │
    │                    │ paymentMethod       │                   │
    │                    │ shippingMethod      │                   │
    │                    │ idempotencyKey?     │                   │
    │                    │  createdAt          │                   │
    │                    │  updatedAt          │                   │
    │                    └──┬───────┬──────────┘                   │
    │                       │       │                              │
    │           1           │       │ 1              1             │
    │    ┌─────────┐        │       │       ┌──────────┐          │
    │    │OrderItem│◄───────┘       └──────►│ Payment  │          │
    │    │─────────│                      │──────────│          │
    │    │ id(UUID)│                      │ id (UUID)│          │
    │    │ orderId │                      │ orderId  │          │
    │    │ product │                      │  (unique) │          │
    │    │ variant?│                      │ method   │          │
    │    │ quantity│                      │ transId  │          │
    │    │ price   │                      │ amount   │          │
    └────┴─────────┘                      │ status   │          │
                                          └──────────┘          │
                                          ┌──────────┐          │
                                          │ Shipment │          │
                                          │──────────│          │
                                          │ id (UUID)│          │
                                          │ orderId  │          │
                                          │  (unique)│          │
                                          │ track#   │          │
                                          │ method   │          │
                                          │ status   │          │
                                          │ fee      │          │
                                          │ sender   │          │
                                          │ recipient│          │
                                          │ weight   │          │
                                          └──────────┘          │
    └────────────────────────────────────────────────────────────┘
```

---

## Enums

### `Role`
| Value | Description |
|---|---|
| `CUSTOMER` | Regular customer |
| `ADMIN` | Administrator with product/order management |
| `SUPER_ADMIN` | Super administrator with full system access |

### `OrderStatus`
| Value | Description |
|---|---|
| `PENDING` | Order created, awaiting payment |
| `PAID` | Payment confirmed |
| `PROCESSING` | Order being prepared |
| `SHIPPED` | Dispatched for delivery |
| `DELIVERED` | Successfully delivered |
| `CANCELLED` | Order cancelled |
| `REFUNDED` | Payment refunded |

### `VerificationType`
| Value | Description |
|---|---|
| `EMAIL_VERIFICATION` | New user email verification |
| `EMAIL_UPDATE` | Email change verification |
| `PASSWORD_RESET` | Password reset request |

---

## Models

### User
Represents a platform user (customer or admin).

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| email | String | Unique | User email address |
| name | String? | Nullable | Display name |
| password | String | — | Bcrypt-hashed password |
| role | Role | Default CUSTOMER | User role |
| isActive | Boolean | Default true | Account active status |
| emailVerified | Boolean | Default false | Email verified flag |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated timestamp |

**Relations:** Has one `VerificationToken`, many `Address`es, many `Order`s, one `Cart`

### VerificationToken
Tokens for email verification and password reset.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| userId | String | Unique, FK → User | Owner |
| token | String | Unique | Verification token |
| type | VerificationType | Default EMAIL_VERIFICATION | Token purpose |
| metadata | Json? | Nullable | Additional data |
| expiresAt | DateTime? | Nullable | Expiration timestamp |
| createdAt | DateTime | Default now() | Timestamp |

### Address
User shipping addresses.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| userId | String | FK → User | Owner |
| firstName | String | — | Recipient first name |
| lastName | String | — | Recipient last name |
| phoneNumber | String | — | Contact number |
| street | String | — | Street address |
| barangay | String | — | Barangay/district |
| city | String | — | City |
| province | String | — | Province/state |
| region | String | — | Region |
| country | String | — | Country |
| postalCode | String | — | ZIP/postal code |
| isDefault | Boolean | Default false | Default address flag |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

### Category
Product categories.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| name | String | Unique | Category name |
| description | String? | Nullable | Category description |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

**Relations:** Has many `Product`s

### Product
Product catalog entry.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| name | String | — | Product name |
| description | String | — | Product description |
| price | Decimal(10,2) | — | Current price |
| stock | Int | Default 0 | Available quantity |
| images | String[] | — | Image URLs |
| isActive | Boolean | Default true | Visibility flag |
| weight | Decimal(10,2) | — | Weight in grams |
| categoryId | String | FK → Category | Category assignment |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

**Relations:** Belongs to `Category`, has many `ProductVariant`s, `OrderItem`s, `CartItem`s

### ProductVariant
Product variations (size, color, etc.).

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| productId | String | FK → Product | Parent product |
| name | String | — | Attribute name (e.g. "Size", "Color") |
| value | String | — | Attribute value (e.g. "M", "Red") |
| sku | String | Unique | Stock keeping unit |
| stock | Int | Default 0 | Variant-level stock |
| price | Decimal(10,2)? | Nullable | Optional price override |

**Relations:** Belongs to `Product`, has many `CartItem`s, `OrderItem`s

### Order
Customer order with full lifecycle.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| userId | String | FK → User | Customer |
| status | OrderStatus | Default PENDING | Current status |
| totalAmount | Decimal(10,2) | — | Order total |
| shippingAddress | String | — | Shipping destination |
| paymentMethod | String | — | Payment method used |
| shippingMethod | String | Default "STANDARD" | Shipping tier |
| idempotencyKey | String? | Unique | Deduplication key |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

**Relations:** Belongs to `User`, has many `OrderItem`s, has one `Payment`, has one `Shipment`

### OrderItem
Line item within an order (snapshot of product at purchase time).

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| orderId | String | FK → Order | Parent order |
| productId | String | FK → Product | Product reference |
| variantId | String? | FK → ProductVariant | Variant reference |
| quantity | Int | — | Quantity ordered |
| price | Decimal(10,2) | — | Price at time of purchase |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

### Payment
Payment transaction linked to an order.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| orderId | String | Unique, FK → Order | Associated order |
| method | String | — | Payment method (CARD, GCASH, COD) |
| transactionId | String | Unique | Provider transaction ID |
| amount | Decimal(10,2) | — | Payment amount |
| status | String | — | Payment status |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

### Cart
Per-user shopping cart (one cart per user).

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| userId | String | Unique, FK → User | Owner |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

**Relations:** Belongs to `User`, has many `CartItem`s

### CartItem
Individual item in a shopping cart.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| cartId | String | FK → Cart | Parent cart |
| productId | String | FK → Product | Product reference |
| variantId | String? | FK → ProductVariant | Variant reference |
| quantity | Int | — | Quantity |

### Shipment
Shipping/tracking information for a delivered order.

| Field | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Unique identifier |
| orderId | String | Unique, FK → Order | Associated order |
| trackingNumber | String | Unique | Carrier tracking number |
| shippingMethod | String | — | Shipping method |
| status | String | — | Shipment status |
| shipping_fee | Decimal(10,2) | — | Shipping cost |
| sender | Json | — | Sender address details |
| recipient | Json | — | Recipient address details |
| weight | Decimal(10,2) | — | Package weight |
| createdAt | DateTime | Default now() | Timestamp |
| updatedAt | DateTime | @updatedAt | Auto-updated |

---

## Indexes & Constraints

| Model | Index/Constraint | Fields |
|---|---|---|
| User | Unique | email |
| VerificationToken | Unique | userId, token |
| Address | FK | userId → User |
| Product | FK | categoryId → Category |
| ProductVariant | Unique | sku |
| ProductVariant | FK | productId → Product |
| Order | Unique | idempotencyKey |
| Order | FK | userId → User |
| Payment | Unique | orderId, transactionId |
| Cart | Unique | userId |
| CartItem | FK | cartId → Cart, productId → Product |
| Shipment | Unique | orderId, trackingNumber |

---

## Migrations

11 migration files exist under `server/prisma/migrations/`, covering:
- Initial schema (tables, enums, relations)
- Product variant model
- Payment model additions
- Shipment model with carrier/shipping method fields
- Various field type adjustments and constraint updates

---

## Seed Data

The seed script (`server/prisma/seed.ts`) creates:
- **3 Categories:** Apparel, Accessories, Home Decor
- **4 Products:** Luxe Cotton Tee, Aura Chronograph Watch, Velvet Lounge Cushion, Cashmere Blend Sweater
- Each product includes multiple variants (size/color combinations)
