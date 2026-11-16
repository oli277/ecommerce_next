import { getDBConnection } from "@/lib/db";
import products from "@/lib/data/products.json";

async function seedProducts() {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    review INTEGER NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    dateAdded TEXT NOT NULL
    );
    `);

  const insertProduct = await db.prepare(`
      INSERT OR REPLACE INTO products(
    id,
    name,
    description,
    review,
    image,
    category,
    dateAdded
      ) VALUES(?,?,?,?,?,?,?)
      `);

  for(const product of products){
    await insertProduct.run(
      product.id,
      product.name,
      product.description,
      product.review,
      product.image,
      product.category,
      product.dateAdded
    )
  }

  await insertProduct.finalize()
  await db.close()

  console.log("Products tables seeded")
}

seedProducts().catch((error) => {
  console.error("Seeding failed:", error);
});
