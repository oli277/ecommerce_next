"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/actions/cart";
import { useCart } from "./CartProvider";

type Props = {
  product: { id: number; name: string; image: string; category: string };
  className?: string;
};

export default function AddToCartButton({ product, className = "" }: Props) {
  const { dispatch } = useCart();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          dispatch({
            type: "add",
            item: {
              productId: product.id,
              name: product.name,
              image: product.image,
              category: product.category,
            },
          });
          await addToCart(product.id);
        })
      }
      className={className}
    >
      Add to cart
    </button>
  );
}