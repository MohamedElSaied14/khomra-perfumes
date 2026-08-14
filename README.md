<div align="center">

# KHOMRA · خُمرة

**A bilingual (AR/EN), RTL-first luxury perfume storefront — built with Next.js 15, Prisma and Auth.js v5.**

[![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-000?logo=auth0&logoColor=white)](https://authjs.dev)

![Khomra storefront](docs/screenshots/home.png)

</div>

---

## ما هو المشروع

**خُمرة** متجر عطور كامل بواجهة عربية RTL وإنجليزية، مبني على Next.js 15 App Router.
المشروع مش قالب ثابت — فيه سلة، دليل عطور تفاعلي، بحث فوري، شيك أوت بيحفظ الطلب في قاعدة بيانات،
تسجيل دخول بجوجل، وصلاحيات أدمن.

---

## Features

| | |
| --- | --- |
| 🌐 **Bilingual & RTL-first** | Full Arabic/English switch with typography tuned separately for each script — not a mirrored LTR layout. |
| 🔍 **Instant search** | `Ctrl/⌘+K` or `/` opens an overlay that folds Arabic letter forms (`أ/إ/آ→ا`, `ى→ي`, `ة→ه`) and diacritics, so `صيفى` still finds `صيفي`. |
| 🧭 **Scent finder** | A three-question quiz that recommends a fragrance and drops it straight into the bag. |
| 🛒 **Real checkout** | Cash-on-delivery with a calculated deposit, or InstaPay with a transfer reference — persisted through Prisma. |
| 🔐 **Google sign-in** | Auth.js v5 with database sessions and a Prisma adapter. Sign-up, sign-in and a welcome step. |
| 👑 **Role-based admin** | The `ADMIN_EMAIL` account is promoted automatically on first sign-in; the dashboard renders for nobody else. |
| 💸 **Server-side pricing** | The browser sends `productId + size + quantity` only. Every price is recomputed from the server catalog. |
| 🎨 **Ambient gradients** | A drifting amber/oud field with fine paper grain, in matched light and dark palettes. |
| ♿ **Motion-aware** | All animation is disabled under `prefers-reduced-motion`. |

---

## Tech stack

- **Next.js 15** (App Router, Server Actions, RSC) + **React 19**
- **TypeScript** in strict mode
- **Prisma 6** + **PostgreSQL**
- **Auth.js v5** (`next-auth@5`) with the Prisma adapter and database sessions
- **Zod 4** for request validation
- **Resend** for order confirmation emails
- Hand-written CSS — no UI framework

---

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in the values
pnpm db:push           # or: pnpm db:migrate
pnpm db:seed           # seeds products
pnpm dev               # http://localhost:3020
```

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string (Neon / Supabase / Railway / local) |
| `AUTH_SECRET` | ✅ | Session encryption — generate with `npx auth secret` |
| `AUTH_URL` | ✅ | Public app URL, e.g. `http://localhost:3020` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | ✅ | Google OAuth client credentials |
| `ADMIN_EMAIL` | — | This account is promoted to `ADMIN` on first sign-in |
| `RESEND_API_KEY` / `EMAIL_FROM` | — | Order confirmation emails |
| `NEXT_PUBLIC_INSTAPAY_ADDRESS` | — | InstaPay handle shown at checkout |

Without `DATABASE_URL` the storefront still runs — orders return a number but are not persisted.

### Google OAuth

Create a **Web application** OAuth client in the
[Google Cloud Console](https://console.cloud.google.com/apis/credentials) with:

- Authorized JavaScript origin — `http://localhost:3020`
- Authorized redirect URI — `http://localhost:3020/api/auth/callback/google`

---

## Data model

PostgreSQL through Prisma (`prisma/schema.prisma`):

| Model | Purpose |
| --- | --- |
| `User` | Customers and admins, with a `role` enum (`CUSTOMER` / `ADMIN`) |
| `Account`, `Session`, `VerificationToken` | Auth.js tables for Google sign-in |
| `Product` | Catalog |
| `Order`, `OrderItem` | Orders, line items, payment and fulfilment status |

---

## Project structure

```
app/
  page.tsx              storefront (server) → passes the admin flag down
  login/                sign-in page
  register/             sign-up page + welcome step
  actions/auth.ts       server actions for sign-in / sign-out
  api/orders/route.ts   validated, server-priced order endpoint
  api/auth/[...nextauth]
components/
  storefront.tsx        cart, search, scent finder, checkout, admin panel
  auth-fab.tsx          floating account button (server component)
lib/
  catalog.ts            single source of truth for products and pricing
  prisma.ts
prisma/
  schema.prisma, seed.ts
docs/
  architecture.md       original product/architecture spec
```

---

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server on port 3020 |
| `pnpm build` | `prisma generate` + production build |
| `pnpm lint` | Type-check with `tsc --noEmit` |
| `pnpm db:push` / `pnpm db:migrate` | Sync the schema |
| `pnpm db:seed` | Seed products, promote `ADMIN_EMAIL` |
| `pnpm db:studio` | Prisma Studio |

---

## Notes on security

- Prices are **never** trusted from the client — the API re-prices every line from `lib/catalog.ts`.
- The admin dashboard is gated on the database role, not on a client flag.
- Sign-in goes through a server action (POST + CSRF token), never a `GET` link.
- `.env` is git-ignored; only `.env.example` is committed.

---

<div align="center">
<sub>© 2026 KHOMRA PARFUMS · CAIRO</sub>
</div>
