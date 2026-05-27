import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/db";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@shopsphere.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

async function main() {
  console.log("Starting seeding...");

  const existingCategories = await prisma.category.count();

  if (existingCategories > 0) {
    console.log("Database already seeded, skipping product seed.");
  } else {
    console.log("Cleaning database...");
    await prisma.cartItem.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.shipment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    console.log("Creating categories...");
  const newArrivals = await prisma.category.create({
    data: {
      name: "New Arrivals",
      description: "Freshly added premium pieces.",
    },
  });

  const summerDrop = await prisma.category.create({
    data: {
      name: "Summer Drop",
      description: "Breezy and lightweight clothing for warm days.",
    },
  });

  const streetwear = await prisma.category.create({
    data: {
      name: "Streetwear",
      description: "Bold and comfortable urban fashion.",
    },
  });

  const minimalLuxe = await prisma.category.create({
    data: {
      name: "Minimal Luxe",
      description: "Understated luxury and essential silhouettes.",
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      description: "Timeless pieces to complement your style.",
    },
  });

  // 3. Create Products, Categories relations, and Variants
  console.log("Creating products...");

  // --- Product 1: Luxe Cotton Tee ---
  await prisma.product.create({
    data: {
      name: "Luxe Cotton Tee",
      description: "Indulge in the epitome of comfort. Our Luxe Cotton Tee is crafted from 100% organic long-staple cotton, providing an ultra-soft feel and a perfect drape. An essential foundation for any curated wardrobe.",
      price: 2450.00,
      weight: 200,
      images: ["/images/products/luxe_cotton_tee.png"],
      stock: 50,
      categories: {
        create: [
          { categoryId: newArrivals.id },
          { categoryId: summerDrop.id },
          { categoryId: minimalLuxe.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "Small", sku: "APP-TEE-S", stock: 15, price: 2450.00 },
          { name: "Size", value: "Medium", sku: "APP-TEE-M", stock: 25, price: 2450.00 },
          { name: "Size", value: "Large", sku: "APP-TEE-L", stock: 10, price: 2450.00 },
        ],
      },
    },
  });

  // --- Product 2: Aura Chronograph Watch ---
  await prisma.product.create({
    data: {
      name: "Aura Chronograph Watch",
      description: "A masterpiece of modern horology. The Aura Chronograph features a precision Swiss movement housed in a surgical-grade stainless steel case. Minimalist luxury meets outstanding functional excellence.",
      price: 18500.00,
      weight: 150,
      images: ["/images/products/aura_chronograph_watch.png"],
      stock: 13,
      categories: {
        create: [
          { categoryId: minimalLuxe.id },
          { categoryId: accessories.id },
        ],
      },
      variants: {
        create: [
          { name: "Strap", value: "Italian Leather", sku: "ACC-WCH-LEA", stock: 5, price: 18500.00 },
          { name: "Strap", value: "Stainless Steel", sku: "ACC-WCH-STL", stock: 8, price: 19500.00 },
        ],
      },
    },
  });

  // --- Product 3: Oversized Utility Cargo Pants ---
  await prisma.product.create({
    data: {
      name: "Oversized Utility Cargo Pants",
      description: "Designed for urban exploration. Engineered from durable cotton ripstop with a modern relaxed fit. Finished with multiple tactical pockets, custom buckles, and adjustable drawcords.",
      price: 4200.00,
      weight: 650,
      images: ["/images/products/oversized_utility_cargos.png"],
      stock: 35,
      categories: {
        create: [
          { categoryId: streetwear.id },
          { categoryId: newArrivals.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "Small", sku: "STR-CAR-S", stock: 10, price: 4200.00 },
          { name: "Size", value: "Medium", sku: "STR-CAR-M", stock: 15, price: 4200.00 },
          { name: "Size", value: "Large", sku: "STR-CAR-L", stock: 10, price: 4200.00 },
        ],
      },
    },
  });

  // --- Product 4: Sleek Leather Bomber Jacket ---
  await prisma.product.create({
    data: {
      name: "Sleek Leather Bomber Jacket",
      description: "A classic silhouette refined. Handcrafted from buttery-soft premium nappa leather. Features clean lines, ribbed knit trims, custom gunmetal zippers, and a subtle modern satin lining.",
      price: 12500.00,
      weight: 1200,
      images: ["/images/products/sleek_leather_bomber.png"],
      stock: 15,
      categories: {
        create: [
          { categoryId: streetwear.id },
          { categoryId: minimalLuxe.id },
          { categoryId: newArrivals.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "Medium", sku: "APP-BMB-M", stock: 5, price: 12500.00 },
          { name: "Size", value: "Large", sku: "APP-BMB-L", stock: 7, price: 12500.00 },
          { name: "Size", value: "X-Large", sku: "APP-BMB-XL", stock: 3, price: 12900.00 },
        ],
      },
    },
  });

  // --- Product 5: Linen Vacation Shirt ---
  await prisma.product.create({
    data: {
      name: "Linen Vacation Shirt",
      description: "Stay breezy under the sun. Woven from 100% pure Belgian linen, this shirt features a relaxed camp collar and pre-washed softness. Perfect for effortless resort elegance.",
      price: 3500.00,
      weight: 180,
      images: ["/images/products/premium_tshirt.png"],
      stock: 40,
      categories: {
        create: [
          { categoryId: summerDrop.id },
          { categoryId: minimalLuxe.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "S", sku: "SUM-LIN-S", stock: 10, price: 3500.00 },
          { name: "Size", value: "M", sku: "SUM-LIN-M", stock: 20, price: 3500.00 },
          { name: "Size", value: "L", sku: "SUM-LIN-L", stock: 10, price: 3500.00 },
        ],
      },
    },
  });

  // --- Product 6: Premium Fleece Hoodie ---
  await prisma.product.create({
    data: {
      name: "Premium Fleece Hoodie",
      description: "The ultimate cozy essential. Crafted from heavyweight 450gsm organic cotton French terry. Boasts a double-lined hood, dropped shoulders, and a clean minimalist aesthetic.",
      price: 4900.00,
      weight: 750,
      images: ["/images/home/trending_streetwear.png"],
      stock: 25,
      categories: {
        create: [
          { categoryId: streetwear.id },
          { categoryId: minimalLuxe.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "M", sku: "STR-HUD-M", stock: 10, price: 4900.00 },
          { name: "Size", value: "L", sku: "STR-HUD-L", stock: 10, price: 4900.00 },
          { name: "Size", value: "XL", sku: "STR-HUD-XL", stock: 5, price: 4900.00 },
        ],
      },
    },
  });

  // --- Product 7: Breezy Swim Shorts ---
  await prisma.product.create({
    data: {
      name: "Breezy Swim Shorts",
      description: "Resort-ready style and performance. Made from ultra-lightweight, quick-drying recycled nylon. Features an elasticated waistband, custom drawcords, and a mesh-lined interior.",
      price: 2200.00,
      weight: 150,
      images: ["/images/home/trending_summer.png"],
      stock: 30,
      categories: {
        create: [
          { categoryId: summerDrop.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "S", sku: "SUM-SWM-S", stock: 10, price: 2200.00 },
          { name: "Size", value: "M", sku: "SUM-SWM-M", stock: 15, price: 2200.00 },
          { name: "Size", value: "L", sku: "SUM-SWM-L", stock: 5, price: 2200.00 },
        ],
      },
    },
  });

  // --- Product 8: Urban Tech Backpack ---
  await prisma.product.create({
    data: {
      name: "Urban Tech Backpack",
      description: "The ultimate commuter companion. Built with water-resistant ballistic nylon, a padded 16-inch laptop compartment, and sleek magnetic Fidlock closures. Ideal for tech-savvy travelers.",
      price: 6800.00,
      weight: 950,
      images: ["/images/home/featured_masonry_1.png"],
      stock: 20,
      categories: {
        create: [
          { categoryId: streetwear.id },
          { categoryId: accessories.id },
        ],
      },
      variants: {
        create: [
          { name: "Color", value: "Stealth Black", sku: "ACC-BPK-BLK", stock: 12, price: 6800.00 },
          { name: "Color", value: "Slate Grey", sku: "ACC-BPK-GRY", stock: 8, price: 6800.00 },
        ],
      },
    },
  });

  // --- Product 9: Classic Silk Scarf ---
  await prisma.product.create({
    data: {
      name: "Classic Silk Scarf",
      description: "Woven from 100% pure Mulberry silk, this scarf exhibits a luminous sheen and hand-rolled edges. A versatile accent piece that adds effortless sophistication to any outfit.",
      price: 2800.00,
      weight: 50,
      images: ["/images/products/velvet_cushion.png"],
      stock: 15,
      categories: {
        create: [
          { categoryId: minimalLuxe.id },
          { categoryId: accessories.id },
          { categoryId: summerDrop.id },
        ],
      },
      variants: {
        create: [
          { name: "Color", value: "Champagne Gold", sku: "ACC-SCF-GLD", stock: 7, price: 2800.00 },
          { name: "Color", value: "Emerald Green", sku: "ACC-SCF-EMR", stock: 8, price: 2800.00 },
        ],
      },
    },
  });

  // --- Product 10: Vintage Distressed Denim ---
  await prisma.product.create({
    data: {
      name: "Vintage Distressed Denim",
      description: "Reimagined heritage denim. Crafted from 13.5oz Japanese selvedge cotton denim. Hand-distressed with unique vintage washes and subtle paint splatters for an authentic lived-in feel.",
      price: 5400.00,
      weight: 700,
      images: ["/images/home/hero_lookbook.png"],
      stock: 22,
      categories: {
        create: [
          { categoryId: streetwear.id },
          { categoryId: newArrivals.id },
        ],
      },
      variants: {
        create: [
          { name: "Size", value: "30", sku: "STR-DNM-30", stock: 5, price: 5400.00 },
          { name: "Size", value: "32", sku: "STR-DNM-32", stock: 12, price: 5400.00 },
          { name: "Size", value: "34", sku: "STR-DNM-34", stock: 5, price: 5400.00 },
        ],
      },
    },
  });

  }

  // Always ensure admin user exists
  console.log("Seeding admin user...");
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: "Admin",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
        emailVerified: true,
      },
    });
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  } else {
    console.log(`Admin user already exists: ${ADMIN_EMAIL}`);
  }

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
