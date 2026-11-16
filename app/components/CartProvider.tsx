"use client";

import { createContext, useContext, useOptimistic, ReactNode } from "react";
import type { CartItem } from "@/lib/cart";

type CartAction =
  | { type: "add"; item: Omit<CartItem, "quantity"> }
  | { type: "increment"; productId: number }
  | { type: "decrement"; productId: number }
  | { type: "remove"; productId: number }
  | { type: "clear" };

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const exists = items.some((i) => i.productId === action.item.productId);
      return exists
        ? items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...items, { ...action.item, quantity: 1 }];
    }
    case "increment":
      return items.map((i) =>
        i.productId === action.productId ? { ...i, quantity: i.quantity + 1 } : i
      );
    case "decrement":
      return items
        .map((i) =>
          i.productId === action.productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0);
    case "remove":
      return items.filter((i) => i.productId !== action.productId);
    case "clear":
      return [];
  }
}

type CartContextType = {
  items: CartItem[];
  count: number;
  dispatch: (action: CartAction) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  initialItems,
  children,
}: {
  initialItems: CartItem[];
  children: ReactNode;
}) {
  const [items, dispatch] = useOptimistic(initialItems, cartReducer);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}