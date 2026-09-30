# Cartzen

Cartzen is a full-stack e-commerce application built as a TypeScript monorepo. It provides a customer-facing storefront and an administrator dashboard backed by a REST API and PostgreSQL database.

The project is organized around three workspaces:

- `apps/frontend` — React storefront and admin dashboard
- `apps/backend` — Express REST API, PostgreSQL access, authentication, business logic, and integrations
- `packages/shared` — Shared Zod schemas and TypeScript types used by both frontend and backend

> **Project status:** This README documents the implementation currently present in the repository. Payment processing is currently implemented through a mock payment provider, while Cloudinary and Nominatim integrations are included for media and geocoding functionality.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Application Architecture](#application-architecture)
- [Core Domain Model](#core-domain-model)
- [Authentication and Authorization](#authentication-and-authorization)
- [Customer Features](#customer-features)
- [Admin Features](#admin-features)
- [Product Catalog](#product-catalog)
- [Cart and Checkout](#cart-and-checkout)
- [Orders and Payments](#orders-and-payments)
- [Shipping and Geocoding](#shipping-and-geocoding)
- [Image Management](#image-management)
- [Validation and Error Handling](#validation-and-error-handling)
- [Rate Limiting](#rate-limiting)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [Database Schema](#database-schema)
- [Shared Package](#shared-package)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Database Initialization](#database-initialization)
- [Seeding](#seeding)
- [Development Workflow](#development-workflow)
- [Production Build](#production-build)
- [Design Decisions](#design-decisions)
- [Potential Improvements](#potential-improvements)

---

## Features

### Customer storefront

- Browse products
- Search products
- Filter products by category, price, stock, and featured status
- Sort products
- Browse categories and subcategories
- View product details
- Add products to cart
- Update cart quantities
- Remove cart items
- View cart item count
- Manage shipping addresses
- Set a default shipping address
- Calculate shipping costs
- Checkout using a selected address
- View order history
- View individual order details
- View order status and timeline
- Make payments through the configured payment provider
- View payment results
- Contact the store

### Authentication

- Customer registration
- Customer login
- Admin login using the same authentication system with role authorization
- Current-user lookup
- Access-token refresh
- Logout
- HTTP-only cookie-based token handling
- Password hashing with bcrypt
- Protected routes
- Role-based authorization

### Administration

- Product management
- Product image upload
- Product activation/deactivation
- Featured-product toggling
- Product statistics
- Category management
- Subcategory management
- Inventory management
- Order management
- Order status advancement
- Order cancellation
- Store configuration
- Shipping configuration

### Backend engineering features

- TypeScript
- Express 5
- PostgreSQL
- Repository pattern
- Controller/router separation
- Shared request validation with Zod
- Centralized error middleware
- Authentication middleware
- Role authorization middleware
- Request validation middleware
- Rate limiting
- Multipart upload handling with Multer
- Cloudinary integration
- Nominatim geocoding integration
- Mock payment integration
- Pagination
- Search and filtering
- Database indexes
- Transaction-oriented order/checkout logic

---

## Architecture

CartZen follows a monorepo architecture:

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         │   React + Vite      │
                         └──────────┬──────────┘
                                    │ HTTP / JSON
                                    │ Cookies
                                    ▼
                         ┌─────────────────────┐
                         │    Express API      │
                         │   apps/backend      │
                         └──────────┬──────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
        │ PostgreSQL   │    │  Cloudinary  │    │  Nominatim   │
        │   Database   │    │    Images    │    │  Geocoding   │
        └──────────────┘    └──────────────┘    └──────────────┘

                         ┌─────────────────────┐
                         │   @cartzen/shared   │
                         │ Zod schemas + types │
                         └─────────────────────┘
```

The shared package is consumed by both applications:

```text
apps/backend  ─────┐
                   ├──> @cartzen/shared
apps/frontend ─────┘
```

This keeps request contracts and domain validation definitions in one place.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI |
| TypeScript | Type safety |
| Vite | Development server and bundling |
| React Router | Client-side routing |
| TanStack React Query | Server-state fetching/caching |
| Axios | HTTP client |
| React Hook Form | Form management |
| Zod | Form/request validation |
| Tailwind CSS | Styling |
| shadcn/ui / Base UI | UI components |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Embla Carousel | Product/hero carousel |
| Geist | Application font |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | REST API |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| `pg` | PostgreSQL client |
| Zod | Request validation |
| JWT | Access/refresh authentication |
| bcryptjs | Password hashing |
| cookie-parser | Cookie parsing |
| CORS | Cross-origin configuration |
| express-rate-limit | API rate limiting |
| Multer | Multipart/form-data uploads |
| Cloudinary | Product image storage |
| Nominatim | Address geocoding |
| dotenv | Environment configuration |

### Shared

| Technology | Purpose |
|---|---|
| TypeScript | Shared types |
| Zod | Shared schemas and inferred types |

---

## Repository Structure

```text
cartzen/
├── apps/
│   ├── backend/
│   │   ├── seed/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   ├── shipping/
│   │   │   ├── stores/
│   │   │   ├── subcategories/
│   │   │   └── users/
│   │   │
│   │   └── src/
│   │       ├── config/
│   │       ├── constants/
│   │       ├── controllers/
│   │       ├── database/
│   │       ├── integrations/
│   │       ├── middlewares/
│   │       ├── repositories/
│   │       └── routers/
│   │
│   └── frontend/
│       └── src/
│           ├── app/
│           ├── components/
│           ├── config/
│           ├── features/
│           ├── hooks/
│           ├── layouts/
│           ├── lib/
│           ├── pages/
│           ├── services/
│           ├── styles/
│           ├── types/
│           └── utils/
│
├── packages/
│   └── shared/
│       └── src/
│           └── schemas/
│
├── package.json
└── package-lock.json
```

---

## Application Architecture

### Backend request flow

A typical request follows this structure:

```text
HTTP Request
     │
     ▼
Express Router
     │
     ├── Rate Limiter
     │
     ├── Authentication Middleware
     │
     ├── Role Authorization
     │
     └── Zod Validation
              │
              ▼
         Controller
              │
              ▼
         Repository
              │
              ▼
         PostgreSQL
```

External services are isolated under:

```text
apps/backend/src/integrations/
├── cloudinary/
├── mockPayment/
└── nominatim/
```

### Backend layers

#### Routers

Routers define the HTTP interface and middleware chain.

```text
src/routers/
├── auth.routes.ts
├── address.routes.ts
├── category.routes.ts
├── subcategory.routes.ts
├── product.routes.ts
├── inventory.routes.ts
├── cart_item.routes.ts
├── order.routes.ts
├── payment.routes.ts
├── shipping.routes.ts
├── store.routes.ts
└── admin/
```

#### Controllers

Controllers handle HTTP-level concerns and coordinate application operations.

```text
src/controllers/
```

There are separate admin controllers for administrative operations:

```text
src/controllers/admin/
```

#### Repositories

Repositories encapsulate database operations:

```text
src/repositories/
├── address.repository.ts
├── auth.repository.ts
├── cart.repository.ts
├── cart_item.repository.ts
├── category.repository.ts
├── inventory.repository.ts
├── order.repository.ts
├── order_item.repository.ts
├── payment.repository.ts
├── product.repository.ts
├── shipping.repository.ts
├── store.repository.ts
└── subcategory.repository.ts
```

This keeps SQL/database access out of controllers.

---

## Frontend Architecture

The frontend is organized primarily by features.

```text
features/
├── addresses/
├── auth/
├── carts/
├── categories/
├── intentories/
├── orders/
├── payments/
├── products/
├── shippings/
├── stores/
└── subcategories/
```

A typical feature contains:

```text
feature/
├── api/
├── components/
└── hooks/
```

The API layer contains HTTP operations, while hooks expose those operations to React components through TanStack Query.

Example:

```text
Product component
      │
      ▼
useProduct()
      │
      ▼
product.api.ts
      │
      ▼
Axios
      │
      ▼
Express API
```

---

# Core Domain Model

CartZen's main business entities are:

```text
User
 │
 ├── Addresses
 ├── Cart
 │    └── Cart Items
 │          └── Products
 │
 └── Orders
       ├── Order Items
       │      └── Products
       └── Payments

Category
 └── Subcategories
       └── Products
              └── Inventory

Store
Shipping
```

---

## Authentication and Authorization

CartZen uses application-managed authentication rather than delegating authentication to a hosted auth system.

### User roles

There are two roles:

```text
customer
admin
```

### Authentication flow

```text
Register/Login
     │
     ▼
Validate credentials
     │
     ▼
Password verification
     │
     ▼
Generate JWT tokens
     │
     ├── Access token
     └── Refresh token
             │
             ▼
        HTTP cookies
```

Protected endpoints use:

```text
protectRoute
```

Administrative endpoints additionally use:

```text
authorizeRoles(["admin"])
```

### Security-related middleware

```text
middlewares/
├── auth.middleware.ts
├── error.middleware.ts
├── multer.middleware.ts
├── rate.limit.middlewares.ts
└── validation.middleware.ts
```

Passwords are stored as bcrypt hashes rather than plaintext.

---

# Customer Features

## Product discovery

Customers can:

- Browse products
- Search by product text
- Filter by category
- Filter by minimum/maximum price
- Filter by stock availability
- Filter featured products
- Sort by:
  - name ascending
  - name descending
  - price ascending
  - price descending
  - newest
  - oldest
- Paginate results

Product details include category/subcategory relationships and inventory quantity.

---

## Categories and subcategories

Categories provide the top-level product classification:

```text
Category
└── Subcategory
    └── Product
```

Category and subcategory slugs are used for public navigation.

Examples of supported public resource patterns:

```text
/categories/:categorySlug
/categories/:categorySlug/subcategories
/categories/:categorySlug/subcategories/:subcategorySlug
```

---

## Cart

Each customer has one cart.

Database constraint:

```text
UNIQUE (user_id)
```

A cart contains multiple cart items:

```text
Cart
├── Product A × 2
├── Product B × 1
└── Product C × 4
```

Cart items use a composite primary key:

```text
(cart_id, product_id)
```

The API supports:

- Add to cart
- Get paginated cart items
- Get all cart items
- Get cart item count
- Get a specific product in the cart
- Update quantity
- Remove item

---

# Checkout

Checkout currently starts from the authenticated user's cart and requires a shipping address.

```text
Cart
 │
 ▼
Select shipping address
 │
 ▼
Calculate shipping
 │
 ▼
Create order
 │
 ▼
Order pending
 │
 ▼
Payment
 │
 ▼
Order paid
```

The checkout request requires:

```json
{
  "address_id": "uuid"
}
```

Orders persist product information in `order_items`, including:

- Product ID
- Product name
- Product thumbnail
- Quantity
- Unit price
- Subtotal

This means an order retains important product snapshot information even if the product later changes.

---

# Orders and Payments

## Order lifecycle

The defined order states are:

```text
pending
   │
   ▼
paid
   │
   ▼
processing
   │
   ▼
shipped
   │
   ▼
delivered
```

An order can also become:

```text
cancelled
```

The order stores timestamps for important transitions:

```text
paid_at
processed_at
shipped_at
delivered_at
cancelled_at
```

This allows the frontend to display an order timeline.

---

## Payments

The current payment provider enum contains:

```text
mock
```

Payment states are:

```text
pending
successful
failed
refunded
```

A payment records:

- Payment ID
- Order ID
- Amount
- Status
- Provider
- Transaction ID
- Creation timestamp

The payment integration is isolated under:

```text
src/integrations/mockPayment/
```

This makes the payment layer replaceable with a real provider later.

---

# Shipping and Geocoding

Shipping configuration contains:

```text
base_fee_cents
fee_per_km_cents
```

Shipping can therefore be calculated based on:

```text
Base shipping fee
+
Distance × fee per kilometer
```

Addresses and the store contain geographic coordinates:

```text
latitude
longitude
```

The backend includes a Nominatim integration:

```text
src/integrations/nominatim/
└── geocoding.ts
```

The application can use geocoded coordinates to determine the distance between the store and the customer's shipping address.

---

# Image Management

Product thumbnails can be uploaded using multipart form data.

The backend uses:

```text
Multer
   │
   ▼
Cloudinary
```

Cloudinary-related functionality is isolated under:

```text
src/integrations/cloudinary/
├── client.ts
├── upload.ts
└── delete.ts
```

Products retain both:

```text
thumbnail_url
thumbnail_public_id
```

The public ID allows the corresponding Cloudinary asset to be managed or deleted later.

---

# Validation and Error Handling

Request validation is centralized through Zod schemas in:

```text
packages/shared/src/schemas/
```

The backend uses:

```text
validate(...)
```

middleware before controllers receive validated request data.

For example, product requests use schemas such as:

```text
ProductQuerySchema
ProductIdParamsSchema
CreateProductBodySchema
UpdateProductBodySchema
```

The same package is available to the frontend, preventing frontend/backend request contracts from drifting apart.

The backend also has centralized error handling:

```text
src/middlewares/error.middleware.ts
```

---

# Rate Limiting

CartZen applies rate limiting at multiple levels.

A global limiter is registered in the Express application:

```text
generalLimiter
```

Routes can additionally use more specific limiters such as:

```text
authLimiter
readLimiter
writeLimiter
```

Authentication endpoints receive stricter protection because login and registration are more sensitive to abuse.

---

# API Reference

Base API path:

```text
/api/v1
```

When running locally with the default configuration:

```text
http://localhost:3000/api/v1
```

## Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/auth/me` | User | Get current user |
| POST | `/auth/register` | Public | Register customer |
| POST | `/auth/login` | Public | Login |
| POST | `/auth/logout` | Public | Logout |
| POST | `/auth/refresh` | Refresh token | Refresh access token |

### Registration body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password",
  "confirm_password": "password"
}
```

### Login body

```json
{
  "email": "john@example.com",
  "password": "password"
}
```

---

## Addresses

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/addresses` | User | Get user's addresses |
| POST | `/addresses` | User | Create address |
| GET | `/addresses/:addressId` | User | Get address |
| PATCH | `/addresses/:addressId` | User | Update address |
| DELETE | `/addresses/:addressId` | User | Delete address |
| PATCH | `/addresses/:addressId/default` | User | Set default address |

Address bodies contain:

```json
{
  "region": "...",
  "province": "...",
  "city": "...",
  "barangay": "...",
  "addressLine": "..."
}
```

---

## Store

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/store` | Public | Get store details |
| POST | `/store` | Admin | Create store |
| PATCH | `/store` | Admin | Update store |
| DELETE | `/store` | Admin | Delete store |

The database enforces a single-store configuration using a unique expression index.

---

## Shipping

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/shipping` | Public | Get shipping configuration |
| POST | `/shipping` | Admin | Create shipping configuration |
| PATCH | `/shipping` | Admin | Update shipping configuration |
| DELETE | `/shipping` | Admin | Delete shipping configuration |
| GET | `/shipping/calculate/:addressId` | User | Calculate shipping for an address |

---

## Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories` | Public | Get paginated categories |
| GET | `/categories/all` | Public | Get all categories |
| GET | `/categories/:categorySlug` | Public | Get category |

### Admin category API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/categories` | Admin | List categories |
| POST | `/admin/categories` | Admin | Create category |
| PATCH | `/admin/categories/:categoryId` | Admin | Update category |
| DELETE | `/admin/categories/:categoryId` | Admin | Delete category |

---

## Subcategories

### Public

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories/subcategories/all` | Public | Get all subcategories |
| GET | `/categories/:categorySlug/subcategories` | Public | List category subcategories |
| GET | `/categories/:categorySlug/subcategories/:subcategorySlug` | Public | Get subcategory |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/subcategories` | Admin | List subcategories |
| POST | `/admin/subcategories` | Admin | Create subcategory |
| PATCH | `/admin/subcategories/:subcategoryId` | Admin | Update subcategory |
| DELETE | `/admin/subcategories/:subcategoryId` | Admin | Delete subcategory |

> The subcategory router is mounted at `/api/v1/categories`, so the public subcategory endpoints intentionally share the category prefix.

---

## Products

### Public

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products` | Public | Search/filter products |
| GET | `/products/:productId` | Public | Get product |

Supported product query parameters include:

```text
page
limit
search
sort
category
minPrice
maxPrice
inStock
featured
```

Supported sorting values:

```text
name_asc
name_desc
price_asc
price_desc
newest
oldest
```

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/products` | Admin | List products |
| POST | `/admin/products` | Admin | Create product |
| GET | `/admin/products/stats` | Admin | Product statistics |
| PATCH | `/admin/products/:productId` | Admin | Update product |
| DELETE | `/admin/products/:productId` | Admin | Delete product |
| PATCH | `/admin/products/:productId/featured` | Admin | Toggle featured status |

Product creation/update supports multipart uploads using the `thumbnail` field.

Example product form fields:

```text
subcategoryId
name
description
rawPrice
currency
weightGrams
isActive
initialQuantity
thumbnail
```

---

## Inventory

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products/:productId/inventory` | Public | Get inventory |
| PUT | `/products/:productId/inventory` | Admin | Add/set inventory |
| PATCH | `/products/:productId/inventory` | Admin | Update inventory |

Inventory quantity cannot be negative.

---

## Cart

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cart/items` | User | Get cart items |
| POST | `/cart/items` | User | Add item |
| GET | `/cart/items/all` | User | Get all cart items |
| GET | `/cart/items/count` | User | Get item count |
| GET | `/cart/items/:productId` | User | Get product cart item |
| PATCH | `/cart/items/:productId` | User | Update quantity |
| DELETE | `/cart/items/:productId` | User | Remove item |

Add-to-cart example:

```json
{
  "product_id": "uuid",
  "quantity": 2
}
```

---

## Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/orders` | User | Get user's orders |
| POST | `/orders/checkout` | User | Create order from cart |
| GET | `/orders/:orderId` | User | Get user's order |

### Admin orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/orders` | Admin | Get orders |
| PATCH | `/admin/orders/:orderId/status` | Admin | Advance order status |
| PATCH | `/admin/orders/:orderId/cancel` | Admin | Cancel order |

---

## Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/orders/:orderId/payments` | User | Get payment for order |
| POST | `/orders/:orderId/payments` | User | Pay order |
| GET | `/payments/:paymentId` | User | Get payment |

The payment routes are mounted at `/api/v1/`, while the first two routes themselves include `/orders/...`.

---

# Frontend Routes

## Public/store routes

| Route | Page |
|---|---|
| `/` | Home |
| `/contact-us` | Contact Us |
| `/products` | Product listing |
| `/products/:productId` | Product details |
| `/categories/:categoryId/subcategories/:subcategoryId` | Subcategory |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/orders` | Customer orders |
| `/orders/:orderId` | Order details |
| `/payments` | Payments |
| `/payments/:orderId` | Order payment |

Checkout and payment pages require an authenticated user.

## Authentication routes

| Route | Page |
|---|---|
| `/auth` | Login |
| `/auth/login` | Login |
| `/auth/signup` | Signup |
| `/admin/auth` | Admin login |

## Admin routes

| Route | Page |
|---|---|
| `/admin` | Admin dashboard/products |
| `/admin/products` | Product management |
| `/admin/categories` | Category/subcategory management |
| `/admin/orders` | Order management |

Admin routes require a user whose role is `admin`.

---

# Database Schema

The database is initialized by:

```text
apps/backend/src/database/init.ts
```

The current schema contains the following tables.

## `users`

Stores application users.

```text
id
username
email
password_hash
role
created_at
updated_at
```

Roles:

```text
customer
admin
```

---

## `addresses`

Stores customer shipping addresses and geographic coordinates.

```text
id
user_id
region
province
city
barangay
address_line
latitude
longitude
is_default
created_at
updated_at
```

Relationship:

```text
users 1 ──── * addresses
```

---

## `stores`

Stores the merchant's physical/store information.

```text
id
name
region
province
city
barangay
address_line
latitude
longitude
created_at
updated_at
```

The schema intentionally restricts the application to one store.

---

## `shipping`

Stores the shipping pricing configuration.

```text
id
name
base_fee_cents
fee_per_km_cents
```

The schema also restricts the application to one shipping configuration.

---

## `categories`

```text
id
name
slug
created_at
```

---

## `subcategories`

```text
id
category_id
name
slug
created_at
```

Relationship:

```text
category 1 ──── * subcategories
```

The database enforces unique category/subcategory name and slug combinations.

---

## `products`

```text
id
subcategory_id
name
description
price_cents
currency
weight_grams
thumbnail_url
thumbnail_public_id
is_active
is_featured
created_at
updated_at
```

Relationship:

```text
subcategory 1 ──── * products
```

---

## `inventory`

Inventory is associated one-to-one with a product:

```text
product_id
quantity
updated_at
```

Relationship:

```text
product 1 ──── 1 inventory
```

---

## `carts`

Each user has one cart:

```text
id
user_id
created_at
updated_at
```

Relationship:

```text
user 1 ──── 1 cart
```

---

## `cart_items`

```text
cart_id
product_id
quantity
created_at
updated_at
```

Composite primary key:

```text
(cart_id, product_id)
```

---

## `orders`

```text
id
user_id
status
subtotal_cents
tax_cents
shipping_fee_cents
shipping_distance_meters
total_cents
paid_at
processed_at
shipped_at
delivered_at
cancelled_at
created_at
updated_at
```

An order can retain its record even if the original user is deleted because `user_id` uses `ON DELETE SET NULL`.

---

## `order_items`

Order items preserve product information at purchase time:

```text
id
order_id
product_id
product_name
product_thumbnail_url
quantity
unit_price_cents
subtotal_cents
```

The product relationship uses `ON DELETE SET NULL`, while the snapshot fields remain.

---

## `payments`

```text
id
order_id
amount_cents
status
provider
transaction_id
```

Payments reference orders with `ON DELETE RESTRICT`.

---

# Database Indexes

The initialization script creates indexes for common relationship lookups:

```text
idx_addresses_user_id
idx_subcategories_category_id
idx_products_subcategory_id
idx_cart_items_product_id
idx_orders_user_id
idx_order_items_order_id
idx_payments_order_id
```

Special unique indexes enforce:

```text
one_store_only
one_shipping_only
```

---

# Shared Package

The shared package is:

```text
@cartzen/shared
```

It contains Zod schemas and inferred TypeScript types.

```text
packages/shared/src/schemas/
├── addresses/
├── auth/
├── carts/
├── cart_items/
├── categories/
├── inventories/
├── orders/
├── order_items/
├── payments/
├── products/
├── shippings/
├── stores/
├── subcategories/
└── users/
```

Examples include:

```text
LoginBodySchema
RegisterBodySchema

ProductQuerySchema
CreateProductBodySchema
UpdateProductBodySchema

CheckoutBodySchema
OrderQuerySchema

AddToCartBodySchema
UpdateCartItemBodySchema

CreateAddressBodySchema
UpdateAddressBodySchema
```

The package exports these schemas through:

```text
packages/shared/src/index.ts
```

This enables both applications to import the same validation contracts:

```ts
import {
  ProductQuerySchema,
  CheckoutBodySchema,
} from "@cartzen/shared";
```

---

# Environment Variables

## Backend

Create:

```text
apps/backend/.env
```

Required variables:

```env
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cartzen
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

Do **not** commit `.env` files or secret values to source control.

## Frontend

Create:

```text
apps/frontend/.env
```

Example:

```env
VITE_APP_NAME=cartzen
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:3000/api
```

The frontend's API base configuration is located under:

```text
apps/frontend/src/config/env.ts
```

---

# Getting Started

## Prerequisites

Install:

- Node.js
- npm
- PostgreSQL
- A Cloudinary account if product image uploads are required

Verify:

```bash
node --version
npm --version
psql --version
```

---

## 1. Clone the repository

```bash
git clone <repository-url>
cd cartzen
```

---

## 2. Install dependencies

CartZen uses npm workspaces.

From the repository root:

```bash
npm install
```

This installs dependencies for the workspace packages.

---

## 3. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE cartzen;
```

Then configure the backend `.env` with the database connection information.

---

## 4. Configure backend environment

Create:

```text
apps/backend/.env
```

Use the variables described in [Environment Variables](#environment-variables).

---

## 5. Configure frontend environment

Create:

```text
apps/frontend/.env
```

Example:

```env
VITE_APP_NAME=cartzen
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:3000/api
```

---

## 6. Start the backend

From the repository root:

```bash
npm run dev:backend
```

The backend uses:

```text
tsx watch src/server.ts
```

By default it listens on:

```text
http://localhost:3000
```

---

## 7. Start the frontend

In another terminal:

```bash
npm run dev:frontend
```

Vite normally exposes the frontend at:

```text
http://localhost:5173
```

---

# Database Initialization

The backend imports:

```text
src/database/init.ts
```

when the server starts.

The initialization process:

1. Connects to PostgreSQL through `pg`
2. Creates tables if they do not already exist
3. Creates indexes if they do not already exist
4. Creates the single-store constraint
5. Creates the single-shipping constraint

The database initialization is therefore currently schema-on-startup rather than a conventional migration system.

For a production system, a migration tool would generally be preferable.

---

# Seeding

Seed scripts are located under:

```text
apps/backend/seed/
```

Available seed areas include:

```text
categories
products
shipping
stores
subcategories
users
```

The root seed entry point is:

```text
apps/backend/seed/index.ts
```

Run:

```bash
npm run seed:db
```

This executes:

```bash
tsx seed/index.ts
```

The seed implementation provides development/demo data for the application's main entities.

---

# Development Workflow

A typical development workflow is:

```text
1. Start PostgreSQL
        │
        ▼
2. Start backend
        │
        ▼
3. Database initializes
        │
        ▼
4. Seed development data
        │
        ▼
5. Start frontend
        │
        ▼
6. Develop against /api/v1
```

Recommended terminals:

### Terminal 1

```bash
npm run dev:backend
```

### Terminal 2

```bash
npm run dev:frontend
```

If changing shared schemas while developing:

### Terminal 3

```bash
npm run watch:shared
```

---

# Workspace Scripts

The root `package.json` provides:

| Command | Purpose |
|---|---|
| `npm run dev:backend` | Start backend in watch mode |
| `npm run dev:frontend` | Start Vite frontend |
| `npm run watch:shared` | Watch/compile shared package |
| `npm run build:backend` | Build backend |
| `npm run build:frontend` | Build frontend |
| `npm run build:shared` | Build shared package |
| `npm run build` | Build all workspaces |

Backend:

```bash
npm run dev -w @cartzen/backend
npm run build -w @cartzen/backend
npm run start -w @cartzen/backend
npm run seed:db -w @cartzen/backend
```

Frontend:

```bash
npm run dev -w @cartzen/frontend
npm run build -w @cartzen/frontend
npm run lint -w @cartzen/frontend
npm run preview -w @cartzen/frontend
```

Shared:

```bash
npm run build -w @cartzen/shared
npm run watch -w @cartzen/shared
```

---

# Production Build

Build all workspaces:

```bash
npm run build
```

This invokes each workspace's build script.

The backend compiles TypeScript using `tsc` and starts from:

```text
dist/server.js
```

The frontend is built through Vite.

The shared package compiles to:

```text
packages/shared/dist/
```

---

# Design Decisions

## Why a monorepo?

The application has multiple independently deployable applications but shares domain contracts.

A monorepo provides:

```text
frontend
    │
    ├── shared validation
    │
backend
    │
    └── shared validation
```

without duplicating schemas.

---

## Why shared Zod schemas?

The API contract is defined once.

Without a shared package:

```text
Frontend validation
       ≠
Backend validation
```

With the shared package:

```text
             @cartzen/shared
              /           \
             /             \
      Frontend             Backend
```

This reduces contract drift.

---

## Why repositories?

Database operations are separated from HTTP controllers.

Instead of:

```text
Controller
   └── SQL
```

the project uses:

```text
Controller
    │
    ▼
Repository
    │
    ▼
PostgreSQL
```

This makes the database layer easier to test, reason about, and replace.

---

## Why store money as cents?

Prices and monetary totals are represented as integer cents:

```text
price_cents
subtotal_cents
tax_cents
shipping_fee_cents
total_cents
amount_cents
```

For example:

```text
₱1,299.50
```

can be represented as:

```text
129950
```

This avoids common floating-point precision problems when performing monetary arithmetic.

---

## Why snapshot product information in order items?

Orders retain:

```text
product_name
product_thumbnail_url
unit_price_cents
```

rather than relying entirely on the current product record.

This preserves historical order information even when:

- A product is renamed
- A product's price changes
- A product is deleted
- A product's image changes

---

# Potential Improvements

The following are natural future improvements based on the current implementation.

## Database migrations

The current schema is initialized at application startup.

A migration system could provide:

```text
001_initial_schema
002_add_x
003_modify_y
...
```

This would make production schema evolution safer.

---

## Automated testing

The repository currently contains the application implementation but would benefit from:

- Unit tests
- Repository tests
- Controller tests
- Integration tests
- API contract tests
- Frontend component tests
- End-to-end checkout tests

A useful target would be to test the complete checkout path:

```text
cart
 → shipping
 → checkout
 → order
 → payment
 → order status
```

---

## Real payment provider

The current payment provider is:

```text
mock
```

The existing integration boundary makes it possible to introduce a real provider later without tightly coupling payment logic to controllers.

---

## Formal migration and transaction strategy

Checkout and inventory operations are business-critical and should remain strongly transaction-oriented.

Future work could make transaction boundaries more explicit and introduce stronger concurrency protections for inventory.

---

## Background jobs

Some operations could eventually move to background workers:

- Email notifications
- Payment reconciliation
- Order notifications
- Image processing
- Shipping updates

---

## Observability

A production deployment would benefit from:

- Structured logging
- Request IDs
- Metrics
- Error tracking
- Health/readiness endpoints
- Database connection monitoring

---

## API documentation

The REST API could be formally documented using OpenAPI/Swagger so that the endpoint contract is browsable and machine-readable.

---

# Security Considerations

The project already includes several useful security mechanisms:

- Password hashing
- JWT authentication
- HTTP cookies
- Role-based authorization
- CORS configuration
- Request validation
- Rate limiting
- Database constraints
- Environment-based secrets

Production deployments should additionally ensure:

- HTTPS is enabled
- Cookies use appropriate `Secure`/`SameSite` settings
- Secrets are stored in a secret manager
- Database credentials are not committed
- Cloudinary credentials are not exposed to the frontend
- Production CORS origins are restricted
- PostgreSQL is not publicly exposed unnecessarily
- Dependency vulnerabilities are regularly audited

---

# Project Summary

CartZen is structured as a practical full-stack e-commerce system rather than a single frontend application.

Its architecture separates concerns across:

```text
                CARTZEN
                   │
       ┌───────────┼───────────┐
       │           │           │
       ▼           ▼           ▼
   Frontend     Backend     Shared
   React        Express      Zod
   Vite         PostgreSQL   Types
       │           │           │
       │           ├── Auth    │
       │           ├── Orders  │
       │           ├── Cart    │
       │           ├── Payment │
       │           ├── Stock   │
       │           └── Media   │
       │                       │
       └───────────┬───────────┘
                   │
                   ▼
             E-commerce
                System
```

The project demonstrates a number of backend and full-stack engineering concepts:

- REST API design
- Layered architecture
- Repository pattern
- PostgreSQL relational modeling
- Authentication and authorization
- JWT access/refresh tokens
- Request validation
- Pagination
- Search/filtering/sorting
- Inventory management
- Cart management
- Checkout workflows
- Order state transitions
- Payment abstraction
- Shipping calculation
- External service integration
- Rate limiting
- Shared frontend/backend contracts
- TypeScript monorepo organization

