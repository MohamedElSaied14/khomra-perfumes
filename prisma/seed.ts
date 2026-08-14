// Seeds the Product table from the shared catalog and promotes ADMIN_EMAIL to ADMIN.
// Run with: pnpm db:seed   (Node 24 runs TypeScript directly, no extra tooling needed)
import { PrismaClient } from "@prisma/client";
import { products } from "../lib/catalog.ts";

const prisma = new PrismaClient();

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  for (const product of products) {
    const slug = slugify(product.nameEn);
    await prisma.product.upsert({
      where: { slug },
      update: { name: product.nameEn, price: product.price, image: product.image ?? "" },
      create: { name: product.nameEn, slug, price: product.price, image: product.image ?? "", stock: 25 },
    });
  }
  console.log(`Seeded ${products.length} products.`);

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const updated = await prisma.user.updateMany({ where: { email: adminEmail }, data: { role: "ADMIN" } });
    console.log(updated.count ? `Promoted ${adminEmail} to ADMIN.` : `No user with ${adminEmail} yet — sign in once with Google, then re-run the seed.`);
  }
}

main()
  .catch(error => { console.error(error); process.exit(1); })
  .finally(() => prisma.$disconnect());
