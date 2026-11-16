// import { cookies } from "next/headers";
// import { randomUUID } from "node:crypto";

// export async function getSessionId() {
//   const store = await cookies();
//   let id = store.get("sessionId")?.value;
//   if (!id) {
//     id = randomUUID();
//     store.set("sessionId", id, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
//   }
//   return id;
// }

import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

// Use ONLY inside Server Actions / Route Handlers (it may set a cookie)
export async function getOrCreateSessionId() {
  const store = await cookies();
  let id = store.get("sessionId")?.value;
  if (!id) {
    id = randomUUID();
    store.set("sessionId", id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return id;
}