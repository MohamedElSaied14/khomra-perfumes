# Luxury Perfume E-Commerce — Full Development Specification

## 1. Project Overview

Build a production-ready luxury perfume e-commerce website.

The platform must be:

- Premium and modern
- Fully responsive
- SEO-friendly
- Secure
- Scalable
- Maintainable
- Ready for real e-commerce usage

The system will include:

- Customer storefront
- Product catalog
- Search and filtering
- Product details
- Cart
- Wishlist
- Checkout
- Orders
- Reviews
- Coupons
- Authentication
- Admin dashboard
- Inventory management
- Analytics
- Future-ready AI recommendations

---

# 2. Recommended Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Next.js App Router / Route Handlers |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Auth.js |
| Validation | Zod |
| Forms | React Hook Form |
| Client State | Zustand |
| Icons | Lucide React |
| Image Storage | Cloudinary / S3 |
| Email | Resend |
| Deployment | Vercel |
| Database Hosting | Supabase / Neon |

---

# 3. System Architecture

```text
                    ┌─────────────────────┐
                    │      Customer       │
                    │ Mobile / Desktop    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │ Frontend + SSR      │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Authentication     Product API      Order API
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │       Prisma        │
                    │         ORM         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    └─────────────────────┘

                               │
                               ▼
                    ┌─────────────────────┐
                    │   Admin Dashboard   │
                    │ Products / Orders   │
                    │ Users / Analytics   │
                    └─────────────────────┘
```

---

# 4. Project Structure

```text
perfume-store/
│
├── app/
│   ├── (shop)/
│   │   ├── page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   └── account/
│   │       ├── page.tsx
│   │       ├── orders/
│   │       └── profile/
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── coupons/
│   │   └── analytics/
│   │
│   ├── api/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── checkout/
│   │   ├── reviews/
│   │   └── webhooks/
│   │
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   └── terms/
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── footer/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   └── home/
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── validations/
│   ├── services/
│   ├── utils.ts
│   └── constants.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── store/
│   ├── cart-store.ts
│   └── wishlist-store.ts
│
├── types/
├── hooks/
├── middleware.ts
├── .env.example
├── package.json
└── README.md
```

---

# 5. Website Pages

## Home

```text
/
```

Sections:

1. Announcement bar
2. Navbar
3. Hero section
4. Featured perfumes
5. Men's collection
6. Women's collection
7. Unisex collection
8. Best sellers
9. New arrivals
10. Offers
11. Why choose us
12. Customer reviews
13. Newsletter
14. Footer

---

## Shop

```text
/shop
```

Features:

- Product grid
- Search
- Sort
- Price filter
- Gender
- Brand
- Category
- Fragrance family
- Rating
- Availability
- Size
- Pagination

Use URL query parameters:

```text
/shop?gender=men&brand=dior&sort=price_asc
```

---

## Product Details

```text
/shop/[slug]
```

Example:

```text
/shop/dior-sauvage-edp
```

Include:

- Product images
- Product name
- Brand
- Price
- Sale price
- Available sizes
- Stock
- Description
- Fragrance notes
- Top notes
- Heart notes
- Base notes
- Fragrance family
- Longevity
- Sillage
- Reviews
- Related products
- Recommended products
- Add to cart
- Buy now
- Wishlist
- Share

---

## Search

```text
/search
```

Search by:

- Product name
- Brand
- Category
- Fragrance family
- Notes

---

## Cart

```text
/cart
```

Features:

- Product image
- Product name
- Size
- Quantity
- Price
- Remove item
- Update quantity
- Coupon
- Subtotal
- Shipping
- Discount
- Total
- Checkout

---

## Checkout

```text
/checkout
```

Flow:

```text
Customer Information
        ↓
Shipping Address
        ↓
Shipping Method
        ↓
Payment Method
        ↓
Order Review
        ↓
Place Order
```

Payment options can include:

- Cash on Delivery
- Card
- Wallet
- Other payment gateways

All important prices and totals must be recalculated server-side.

---

# 6. Customer Account

```text
/account
/account/orders
/account/orders/[id]
/account/profile
/account/addresses
```

Features:

- Profile
- Orders
- Order details
- Addresses
- Wishlist
- Reviews
- Password management
- Logout

---

# 7. Authentication

Pages:

```text
/login
/register
/forgot-password
/reset-password
```

Support:

- Email/password
- Google OAuth architecture
- Email verification architecture
- Password reset
- Secure sessions

Roles:

```text
CUSTOMER
ADMIN
```

Admin routes must be protected server-side.

---

# 8. Admin Dashboard

```text
/admin
```

Dashboard statistics:

- Total revenue
- Total orders
- Total customers
- Total products
- Pending orders
- Low stock products
- Best sellers
- Recent orders

Charts:

- Revenue over time
- Orders over time
- Top products
- Sales by category

---

# 9. Admin Products

```text
/admin/products
```

CRUD operations:

- Create
- Read
- Update
- Delete
- Publish/unpublish
- Featured
- Best seller
- New arrival
- Inventory management

Product fields:

- Name
- Slug
- Description
- Brand
- Category
- Gender
- Fragrance family
- Top notes
- Heart notes
- Base notes
- Longevity
- Sillage
- Ingredients
- Price
- Sale price
- SKU
- Stock
- Images
- Sizes
- Featured
- Best seller
- New arrival
- Published
- SEO metadata

---

# 10. Admin Orders

```text
/admin/orders
```

Admin can:

- View orders
- Search orders
- Filter orders
- View order details
- Update order status
- Update payment status
- View customer information

Order statuses:

```text
PENDING
CONFIRMED
PROCESSING
SHIPPED
DELIVERED
CANCELLED
```

Payment statuses:

```text
PENDING
PAID
FAILED
REFUNDED
```

---

# 11. Admin Customers

```text
/admin/customers
```

Display:

- Name
- Email
- Phone
- Number of orders
- Total spending
- Registration date
- Account status

---

# 12. Database Architecture

Main entities:

```text
User
Address
Product
ProductImage
ProductSize
Category
Brand
Cart
CartItem
Wishlist
WishlistItem
Order
OrderItem
Payment
Review
Coupon
CouponUsage
```

Relationship overview:

```text
User
 ├── Addresses
 ├── Orders
 ├── Reviews
 ├── Wishlist
 └── Cart

Product
 ├── Images
 ├── Sizes
 ├── Reviews
 ├── OrderItems
 └── Category

Order
 ├── OrderItems
 ├── Payment
 └── Shipping Address
```

---

# 13. Database Models

## User

```text
id
name
email
password
role
phone
createdAt
updatedAt
```

---

## Address

```text
id
userId
fullName
phone
address
city
postalCode
country
isDefault
createdAt
updatedAt
```

---

## Product

```text
id
name
slug
description

brandId
categoryId

gender
fragranceFamily

price
salePrice

sku
stock

topNotes
heartNotes
baseNotes

longevity
sillage
ingredients

isFeatured
isBestSeller
isNewArrival
isPublished

createdAt
updatedAt
```

---

## ProductSize

```text
id
productId
size
price
stock
sku
```

Example:

```text
30ml
50ml
75ml
100ml
```

---

## ProductImage

```text
id
productId
url
alt
sortOrder
```

---

## Category

```text
id
name
slug
description
image
createdAt
updatedAt
```

Examples:

```text
Men
Women
Unisex
Luxury
Arabian
Niche
```

---

## Brand

```text
id
name
slug
description
logo
createdAt
updatedAt
```

---

## Cart

```text
id
userId
createdAt
updatedAt
```

---

## CartItem

```text
id
cartId
productId
productSizeId
quantity
createdAt
updatedAt
```

---

## Wishlist

```text
id
userId
createdAt
updatedAt
```

---

## WishlistItem

```text
id
wishlistId
productId
createdAt
```

---

## Order

```text
id
userId
orderNumber

status
paymentStatus
paymentMethod

subtotal
shippingCost
discount
total

shippingName
shippingPhone
shippingAddress
shippingCity
shippingPostalCode
shippingCountry

createdAt
updatedAt
```

---

## OrderItem

```text
id
orderId
productId
productSizeId

productName
size
sku

price
quantity
total
```

Store snapshot values such as product name, size, SKU and price so historical orders remain correct even if the product changes later.

---

## Payment

```text
id
orderId
provider
transactionId
amount
currency
status
createdAt
updatedAt
```

---

## Review

```text
id
userId
productId
orderId

rating
title
comment

isApproved

createdAt
updatedAt
```

Customers should only review products they purchased.

---

## Coupon

```text
id
code
type
value
minimumOrder
maxDiscount
expiresAt
usageLimit
usedCount
isActive
createdAt
updatedAt
```

Types:

```text
PERCENTAGE
FIXED
```

---

## CouponUsage

```text
id
couponId
userId
orderId
usedAt
```

---

# 14. Important Features

## Customer Features

- Product browsing
- Search
- Filtering
- Sorting
- Product details
- Wishlist
- Cart
- Checkout
- Coupons
- Order tracking
- Reviews
- Account management
- Multiple addresses
- Responsive design

## Admin Features

- Dashboard
- Product CRUD
- Brand management
- Category management
- Inventory
- Order management
- Customer management
- Coupon management
- Review moderation
- Sales analytics

---

# 15. Advanced Features

## AI Perfume Finder

Ask the customer:

```text
What type of scent do you prefer?

Fresh
Woody
Sweet
Spicy
Floral
Oriental
Citrus
Amber
```

Then recommend products based on preferences.

---

## Smart Recommendations

Example:

```text
Customer views:
Dior Sauvage

Recommend:
Bleu de Chanel
YSL Y
Acqua di Gio
```

The recommendation engine should eventually consider:

- Viewing history
- Purchases
- Wishlist
- Fragrance family
- Notes
- Gender
- Price range
- Customer preferences

---

## Fragrance Notes Explorer

Display:

```text
Top Notes
    ↓
Heart Notes
    ↓
Base Notes
```

---

## Compare Products

Allow users to compare:

```text
                 Perfume A    Perfume B
Price                $            $$
Longevity           8/10         9/10
Sillage             7/10         9/10
Family              Woody        Fresh
```

---

# 16. UI / UX Direction

Use a luxury minimalist design.

Suggested visual direction:

```text
Background:
Off-white / Cream

Typography:
Elegant Serif + Clean Sans

Cards:
Minimal

Buttons:
Clean and premium

Images:
Large, high-quality product photography

Animations:
Subtle
```

Avoid excessive:

- Gradients
- Shadows
- Animations
- Rounded cards
- Decorative elements

The website should feel like a luxury fragrance brand, not a generic marketplace.

---

# 17. API Architecture

Recommended endpoints:

```text
GET    /api/products
GET    /api/products/[id]
POST   /api/products
PATCH  /api/products/[id]
DELETE /api/products/[id]

GET    /api/categories
POST   /api/categories
PATCH  /api/categories/[id]
DELETE /api/categories/[id]

GET    /api/brands
POST   /api/brands

GET    /api/cart
POST   /api/cart
PATCH  /api/cart
DELETE /api/cart/[itemId]

GET    /api/orders
POST   /api/orders
GET    /api/orders/[id]

POST   /api/reviews
PATCH  /api/reviews/[id]

POST   /api/coupons/validate

POST   /api/checkout

POST   /api/webhooks/payment
```

Use proper authentication and authorization on every protected endpoint.

---

# 18. SEO

Every product page should have:

- Dynamic title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter metadata

Implement:

- sitemap.xml
- robots.txt
- Product structured data
- Breadcrumb structured data where appropriate

Example URL:

```text
/shop/dior-sauvage-eau-de-parfum
```

---

# 19. Performance

Optimize for:

- Core Web Vitals
- Fast initial load
- Image optimization
- Lazy loading
- Server rendering
- Appropriate caching
- Minimal client-side JavaScript

Use Next.js Image.

Use Server Components by default.

Use Client Components only when needed.

---

# 20. Security

Implement:

- Input validation
- Authentication
- Authorization
- Password hashing
- Secure cookies
- Rate limiting architecture
- Server-side validation
- Prisma parameterized queries
- XSS-safe rendering
- Secure environment variables

Never expose:

- Database credentials
- API secrets
- Private keys
- Payment secrets

Never trust client-side price calculations.

---

# 21. Error Handling

Create:

- Loading states
- Empty states
- Error states
- 404 page
- 500 page
- Form validation messages
- API error handling

Do not expose internal stack traces to users.

---

# 22. Reusable Components

Create reusable components:

```text
Navbar
Footer
ProductCard
ProductGrid
ProductGallery
ProductRating
PriceDisplay
SizeSelector
QuantitySelector
AddToCartButton
WishlistButton
SearchBar
FilterSidebar
SortDropdown
Pagination
CartItem
OrderSummary
CheckoutForm
AddressForm
ReviewCard
ReviewForm
AdminSidebar
AdminHeader
DataTable
ConfirmDialog
LoadingSkeleton
EmptyState
```

Avoid duplicated UI and business logic.

---

# 23. State Management

Use Zustand only for suitable client state.

Recommended stores:

```text
cart-store
wishlist-store
ui-store
```

Do not put all server data into global client state.

Use server-side fetching for products, orders and other server-owned data where appropriate.

---

# 24. Image Handling

Create an abstraction for image storage.

Support:

- Product main image
- Product gallery
- Brand logos
- Category images

The implementation should allow Cloudinary or S3 later without spreading provider-specific logic across the application.

---

# 25. Seed Data

Create Prisma seed data containing at least:

- 10 perfume products
- 5 brands
- 6 categories

Suggested fragrance families:

### Men

- Fresh
- Woody
- Spicy

### Women

- Floral
- Sweet
- Fruity

### Unisex

- Woody
- Amber
- Citrus

Do not use copyrighted product images without permission.

Use safe placeholders or local placeholder images.

---

# 26. Environment Variables

Create `.env.example`.

Include:

```env
DATABASE_URL=

AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_APP_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYMENT_SECRET_KEY=

EMAIL_API_KEY=

ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Never expose private secrets using `NEXT_PUBLIC_`.

Do not hardcode real production credentials.

---

# 27. Responsive Requirements

Test the UI at:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Mobile UX is extremely important.

On mobile:

- Filters become a drawer
- Navbar becomes a mobile menu
- Product grid adapts
- Checkout is easy to use
- Buttons remain touch-friendly
- Images remain optimized

---

# 28. Accessibility

Implement:

- Semantic HTML
- Keyboard navigation
- Proper form labels
- Focus states
- Alt text
- ARIA attributes where needed
- Sufficient color contrast

Interactive icons must have accessible labels.

---

# 29. Testing

Create tests for:

- Authentication
- Product creation
- Product search
- Product filtering
- Cart calculations
- Coupon validation
- Checkout
- Order creation
- Authorization
- Admin access
- Inventory changes

Especially test all server-side price and discount calculations.

---

# 30. Code Quality

Use:

- TypeScript strict mode
- ESLint
- Prettier
- Clear naming
- Reusable components
- Service layer where appropriate
- Proper error handling

Avoid:

- `any` unless absolutely necessary
- Duplicated logic
- Huge components
- Hardcoded business logic
- Unnecessary dependencies

---

# 31. Development Phases

## Phase 1 — Foundation

- Next.js setup
- TypeScript
- Tailwind
- shadcn/ui
- PostgreSQL
- Prisma
- Database schema
- Migrations
- Authentication
- Base layout

## Phase 2 — Storefront

- Home
- Shop
- Categories
- Brands
- Search
- Product details

## Phase 3 — Shopping

- Cart
- Wishlist
- Checkout
- Coupons

## Phase 4 — Orders

- Order creation
- Order history
- Order details
- Order status

## Phase 5 — Admin

- Dashboard
- Products
- Categories
- Brands
- Orders
- Customers
- Coupons
- Reviews
- Analytics

## Phase 6 — Production

- SEO
- Performance
- Security
- Testing
- Error handling
- Deployment

## Phase 7 — Advanced

- AI Perfume Finder
- Smart Recommendations
- Product Comparison
- Advanced analytics
- Loyalty system
- Notifications

---

# 32. Important Implementation Rules

Do not create fake buttons.

Every major button must:

- Perform the intended action
- Navigate to a real page
- Or clearly indicate that it is a future integration point

Do not simulate successful payment.

If no payment gateway is configured yet, implement Cash on Delivery as a working payment method and create a clean payment-provider abstraction for future integrations.

Never trust client-side totals.

Always recalculate:

- Product prices
- Discounts
- Shipping
- Taxes if applicable
- Final order total

on the server.

---

# 33. Final Deliverables

The final project must include:

- Complete source code
- Prisma schema
- Database migrations
- Seed data
- Authentication
- Customer storefront
- Admin dashboard
- API/server actions
- Responsive UI
- Validation
- Error handling
- Loading states
- SEO
- Security
- Tests
- `.env.example`
- README
- Setup instructions
- Database setup instructions
- Seed instructions
- Development commands
- Production deployment instructions

---

# 34. README Requirements

Create a professional README containing:

1. Project overview
2. Features
3. Tech stack
4. Architecture
5. Project structure
6. Installation
7. Environment variables
8. Database setup
9. Prisma migration
10. Seed database
11. Development server
12. Admin configuration
13. Testing
14. Production build
15. Deployment
16. Future improvements

---

# 35. AI Development Instructions

You are the senior engineer responsible for implementing the project.

Before writing large amounts of code:

1. Analyze the architecture.
2. Create the project structure.
3. Create the Prisma schema.
4. Create migrations.
5. Create seed data.
6. Implement authentication.
7. Implement backend logic.
8. Implement storefront pages.
9. Implement cart and checkout.
10. Implement orders.
11. Implement admin dashboard.
12. Add validation and security.
13. Add SEO.
14. Add performance optimizations.
15. Add tests.
16. Run lint/type checks.
17. Fix errors.
18. Update README.

Do not skip database relationships.

Do not skip server-side validation.

Do not skip authorization.

Do not skip responsive design.

The final result should feel like a real premium perfume e-commerce platform, not a tutorial project.

---

# 36. MVP Priority

The first working version should prioritize:

```text
Home
  ↓
Shop
  ↓
Product Details
  ↓
Cart
  ↓
Checkout
  ↓
Order
```

Admin:

```text
Dashboard
Products
Categories
Orders
Customers
```

After the MVP is stable, add:

```text
Wishlist
Reviews
Coupons
Payment Gateway
AI Perfume Finder
Recommendations
Analytics
```

This approach keeps the initial implementation manageable while preserving a scalable architecture for future features.
