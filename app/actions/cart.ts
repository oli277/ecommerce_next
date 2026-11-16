"use server";

import { revalidatePath } from "next/cache";
import { getDBConnection } from "@/lib/db";
import { getOrCreateSessionId } from "@/lib/session";

function assertId(productId: number) {
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error("Invalid product id");
  }
}

export async function addToCart(productId: number) {
  assertId(productId);
  const sessionId = await getOrCreateSessionId();
  const db = await getDBConnection();
  try {
    
    await db.run(
      `INSERT INTO cart_items (sessionId, productId, quantity)
       SELECT ?, id, 1 FROM products WHERE id = ?
       ON CONFLICT(sessionId, productId)
       DO UPDATE SET quantity = quantity + 1`,
      sessionId,
      productId
    );
  } finally {
    await db.close();
  }
  revalidatePath("/", "layout");
}

export async function decrementCartItem(productId: number) {
  assertId(productId);
  const sessionId = await getOrCreateSessionId();
  const db = await getDBConnection();
  try {
    await db.run(
      `UPDATE cart_items SET quantity = quantity - 1
       WHERE sessionId = ? AND productId = ?`,
      sessionId,
      productId
    );
    await db.run(
      `DELETE FROM cart_items
       WHERE sessionId = ? AND productId = ? AND quantity <= 0`,
      sessionId,
      productId
    );
  } finally {
    await db.close();
  }
  revalidatePath("/", "layout");
}

export async function removeFromCart(productId: number) {
  assertId(productId);
  const sessionId = await getOrCreateSessionId();
  const db = await getDBConnection();
  try {
    await db.run(
      "DELETE FROM cart_items WHERE sessionId = ? AND productId = ?",
      sessionId,
      productId
    );
  } finally {
    await db.close();
  }
  revalidatePath("/", "layout");
}

export async function clearCart() {
  const sessionId = await getOrCreateSessionId();
  const db = await getDBConnection();
  try {
    await db.run("DELETE FROM cart_items WHERE sessionId = ?", sessionId);
  } finally {
    await db.close();
  }
  revalidatePath("/", "layout");
}