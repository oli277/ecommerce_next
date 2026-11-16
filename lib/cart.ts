import { getDBConnection } from "./db";
import { cookies } from "next/headers";

export async function getCartCount() {
  const sessionId = (await cookies()).get("sessionId")?.value;
  if (!sessionId) return 0;
  const db = await getDBConnection();
  try {
    const row = await db.get(
      "SELECT COALESCE(SUM(quantity), 0) AS count FROM cart_items WHERE sessionId = ?",
      sessionId
    );
    return row.count as number;
  } finally {
    await db.close();
  }
}

export type CartItem = {
  productId: number;
  name: string;
  image: string;
  category: string;
  quantity: number;
};

export async function getCartItems(): Promise<CartItem[]> {
  const sessionId = (await cookies()).get("sessionId")?.value;
  if (!sessionId) return [];

  const db = await getDBConnection();
  try {
    return await db.all<CartItem[]>(
      `SELECT p.id AS productId, p.name, p.image, p.category, c.quantity
       FROM cart_items c
       JOIN products p ON p.id = c.productId
       WHERE c.sessionId = ?
       ORDER BY c.id ASC`,
      sessionId
    );
  } finally {
    await db.close();
  }
}