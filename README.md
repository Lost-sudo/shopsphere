# ShopSphere

A full-stack e-commerce platform for clothing and fashion, built with a **fashion-first digital runway** experience — glassmorphism UI, editorial-style product presentation, and premium browsing.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, shadcn/ui, Framer Motion |
| **State** | Redux Toolkit + RTK Query |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | PostgreSQL 15 via Prisma ORM 7 |
| **Cache** | Redis (ioredis) |
| **Validation** | Zod 4 (shared patterns frontend & backend) |
| **Auth** | JWT (access + refresh tokens), bcryptjs, HTTP-only cookies, Redis sessions |
| **Testing** | Jest + Supertest |
| **Infra** | Docker, Docker Compose |

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌────────────┐
│  Next.js 16 │────▶│  Express 5   │────▶│ PostgreSQL │
│  (Frontend) │     │  (Backend)   │     │  (Primary) │
└─────────────┘     └──────┬───────┘     └────────────┘
                           │
                           ▼
                     ┌────────────┐
                     │   Redis    │
                     │ (Sessions  │
                     │  + Cache)  │
                     └────────────┘
```

### Backend Patterns
- **Repository Pattern** — Data access abstraction per domain
- **Service Layer** — Business logic separated from HTTP handling
- **Strategy Pattern** — Payment methods (Card, GCash, COD) and shipping methods (Standard, Express)
- **Factory Pattern** — Payment method, shipping method, and carrier factories

---

## Project Structure

```
shopsphere/
├── .env.example
├── docker-compose.yml
├── Project Documents/
│   ├── DesignDocument.md          # UI/UX design spec
│   ├── ProjectRequirementDocument.md  # PRD
│   ├── TechnologyStack.md         # Tech stack overview
│   ├── DatabaseSchema.md          # Schema & ERD
│   └── APIDocumentation.md        # API reference
├── server/                        # Express backend
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── migrations/            # 11 migrations
│   │   └── seed.ts                # Seed data
│   ├── src/
│   │   ├── controllers/           # HTTP handlers
│   │   ├── services/              # Business logic
│   │   ├── repositories/          # Data access
│   │   ├── routes/                # Route definitions
│   │   ├── schemas/               # Zod validation schemas
│   │   ├── middlewares/           # Auth, validation, error handling
│   │   ├── interfaces/            # TypeScript interfaces
│   │   ├── types/                 # Shared types
│   │   ├── utils/                 # Helpers (JWT, hash, upload)
│   │   ├── factory/               # Factory classes
│   │   ├── payment_methods/       # Payment strategy implementations
│   │   ├── shipping_methods/      # Shipping strategy implementations
│   │   ├── config/                # DB & Redis connection
│   │   ├── app.ts                 # Express app setup
│   │   └── server.ts              # Entry point
│   └── tests/                     # Jest + Supertest
├── client/                        # Next.js frontend
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── (main)/            # Main layout (shop, cart, etc.)
│   │   │   ├── (auth)/            # Auth layout (login, register)
│   │   │   └── (admin)/           # Admin layout
│   │   ├── components/            # UI components (shadcn/ui)
│   │   ├── features/              # RTK Query API slices
│   │   ├── lib/                   # Store, base API, utilities
│   │   └── providers/             # Redux provider
│   └── README.md
```

---

## Database Models (12)

- **User** — Customer/admin accounts with role-based access
- **VerificationToken** — Email verification & password reset tokens
- **Address** — User shipping addresses (Philippines-specific fields)
- **Category** — Product categories
- **Product** — Product catalog with pricing, stock, images
- **ProductVariant** — Variants (size, color) with SKU & stock
- **Order** — Orders with status workflow (PENDING → PAID → PROCESSING → SHIPPED → DELIVERED)
- **OrderItem** — Line items snapshot at purchase time
- **Payment** — Payment transactions (Card, GCash, COD)
- **Cart** — Per-user shopping cart
- **CartItem** — Items in cart with variant support
- **Shipment** — Shipping/tracking info

---

## API Overview

Base URL: `/api/v1`

| Resource | Key Endpoints | Auth |
|---|---|---|
| **Auth** | register, login, logout, refresh, get-me | Mixed |
| **Users** | CRUD, role management, profile update | Admin / Self |
| **Addresses** | CRUD, set default | Authenticated |
| **Categories** | CRUD | Public read, Admin write |
| **Products** | CRUD, search, filter, paginate | Public read, Admin write |
| **Variants** | CRUD nested under products | Public read, Admin write |
| **Cart** | Get, add, update, remove, clear | Authenticated |
| **Orders** | Create, list, process shipment | Authenticated |
| **Payments** | Process, get by order | Authenticated |
| **Verification** | Verify email, reset password | Public (token-based) |

Full API reference: [Project Documents/APIDocumentation.md](./Project%20Documents/APIDocumentation.md)

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (recommended)
- PostgreSQL 15 (if running without Docker)
- Redis (if running without Docker)

### Environment Setup

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Run with Docker (Recommended)

```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker compose up -d

# Run migrations
docker compose exec backend npx prisma migrate dev

# Seed the database
docker compose exec backend npx ts-node prisma/seed.ts
```

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Prisma Studio:** http://localhost:5555

### Run without Docker

```bash
# Backend
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend (in another terminal)
cd client
npm install
npm run dev
```

---

## Scripts

### Server
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run test` | Run Jest tests |
| `npm run seed` | Seed database (local) |
| `npm run studio` | Open Prisma Studio (Docker) |
| `npm run migrate` | Run Prisma migrations (Docker) |

### Client
| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

---

## Testing

```bash
cd server
npm test
```

Test files cover: auth, cart, category, order, payment, and product flows using Jest + Supertest with mocked database and Redis.

---

## Environment Variables

| Variable | Description |
|---|---|
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `BACKEND_PORT` | Backend port (default: 5000) |
| `FRONTEND_PORT` | Frontend port (default: 3000) |
| `JWT_SECRET` | Access token signing secret |
| `JWT_REFRESH_SECRET` | Refresh token signing secret |
| `NEXT_PUBLIC_API_URL` | Client-side API base URL |

---

## Design Philosophy

ShopSphere follows a **fashion-first digital runway** concept:
- **Glassmorphism UI** — blur, transparency, layered depth
- **Editorial presentation** — products displayed like magazine spreads
- **Scroll-driven discovery** — inspired by Instagram/Pinterest
- **Minimal luxury** — calm, premium, aesthetic-driven
- **Micro-interactions** — subtle animations instead of aggressive CTAs

---
