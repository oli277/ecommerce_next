import { getDBConnection } from "./db";

export async function getProducts(cat?: string, search?: string) {
  let sql: string = "SELECT * FROM products";
  const placeholders: string[] = [];

  if (search) {
    placeholders.push(`%${search}%`, `%${search}%`);
    sql += " " + "WHERE (name LIKE ? OR description LIKE ?)";

    if (cat) {
      sql += " AND category=?";
      placeholders.push(cat);
    }
  } else if (cat) {
    sql += " WHERE category=?";
    placeholders.push(cat);
  }

  const db = await getDBConnection();

  try {
    return await db.all(sql, placeholders);
  } finally {
    await db.close();
  }
}
