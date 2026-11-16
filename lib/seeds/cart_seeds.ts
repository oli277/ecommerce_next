import { getDBConnection } from "../db";

async function createCartTable() {
  const db = await getDBConnection();
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionId TEXT NOT NULL,
        productId INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
        UNIQUE (sessionId, productId)
      );
    `);
    console.log("Cart table created");
  } finally {
    await db.close();
  }
}

createCartTable().catch((error) => {
  console.error("Cart table creation failed:", error);
  process.exit(1);
});