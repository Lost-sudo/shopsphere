import "dotenv/config";
import prisma from "../src/config/db";

async function main() {
  console.log("Starting seeding...");

  // 1. Clean the database (Order matters due to foreign keys)
  console.log("Cleaning database...");
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Categories
  console.log("Creating categories...");
  const apparel = await prisma.category.create({
    data: {
      name: "Apparel",
      description: "Premium clothing for the modern individual.",
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      description: "Timeless pieces to complement your style.",
    },
  });

  const homeDecor = await prisma.category.create({
    data: {
      name: "Home Decor",
      description: "Curated objects for a refined living space.",
    },
  });

  // 3. Create Products and Variants
  console.log("Creating products...");

  // --- Product 1: Apparel ---
  await prisma.product.create({
    data: {
      name: "Luxe Cotton Tee",
      description: "Indulge in the epitome of comfort. Our Luxe Cotton Tee is crafted from 100% organic long-staple cotton, providing an ultra-soft feel and a perfect drape. A timeless essential for any curated wardrobe.",
      price: 2450.00,
      weight: 200,
      categoryId: apparel.id,
      images: ["/images/products/premium_tshirt.png"],
      variants: {
        create: [
          { name: "Size", value: "Small", sku: "APP-TEE-S", stock: 15, price: 2450.00 },
          { name: "Size", value: "Medium", sku: "APP-TEE-M", stock: 25, price: 2450.00 },
          { name: "Size", value: "Large", sku: "APP-TEE-L", stock: 10, price: 2450.00 },
        ],
      },
      stock: 50,
    },
  });

  // --- Product 2: Accessories ---
  await prisma.product.create({
    data: {
      name: "Aura Chronograph Watch",
      description: "A masterpiece of horology. The Aura Chronograph features a precision Swiss movement housed in a surgical-grade stainless steel case. Minimalist design meets functional excellence.",
      price: 18500.00,
      weight: 150,
      categoryId: accessories.id,
      images: ["/images/products/luxury_watch.png"],
      variants: {
        create: [
          { name: "Strap", value: "Italian Leather", sku: "ACC-WCH-LEA", stock: 5, price: 18500.00 },
          { name: "Strap", value: "Stainless Steel", sku: "ACC-WCH-STL", stock: 8, price: 19500.00 },
        ],
      },
      stock: 13,
    },
  });

  // --- Product 3: Home Decor ---
  await prisma.product.create({
    data: {
      name: "Velvet Lounge Cushion",
      description: "Elevate your living space with the rich texture of our Velvet Lounge Cushion. Each piece is hand-finished with a hidden zipper and filled with premium down-alternative for lasting loft and luxury.",
      price: 3200.00,
      weight: 500,
      categoryId: homeDecor.id,
      images: ["/images/products/velvet_cushion.png"],
      variants: {
        create: [
          { name: "Color", value: "Emerald Green", sku: "HOM-CSH-EMR", stock: 12, price: 3200.00 },
          { name: "Color", value: "Midnight Blue", sku: "HOM-CSH-MID", stock: 12, price: 3200.00 },
          { name: "Color", value: "Charcoal Grey", sku: "HOM-CSH-CHR", stock: 12, price: 3200.00 },
        ],
      },
      stock: 36,
    },
  });

  // --- Product 4: Apparel (Another one) ---
  await prisma.product.create({
    data: {
      name: "Cashmere Blend Sweater",
      description: "Woven from a delicate blend of Mongolian cashmere and fine merino wool, this sweater offers unparalleled warmth without the weight. Designed with a modern silhouette for versatile styling.",
      price: 8900.00,
      weight: 400,
      categoryId: apparel.id,
      images: ["/images/products/premium_tshirt.png"], // Reuse for now
      variants: {
        create: [
          { name: "Size", value: "M", sku: "APP-SWT-M", stock: 8, price: 8900.00 },
          { name: "Size", value: "L", sku: "APP-SWT-L", stock: 5, price: 8900.00 },
        ],
      },
      stock: 13,
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
