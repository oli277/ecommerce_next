"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import {
  addToCart,
  decrementCartItem,
  removeFromCart,
  clearCart,
} from "@/app/actions/cart";
import { useCart } from "./CartProvider";

export default function CartList() {
  const { items, count, dispatch } = useCart();
  const [isPending, startTransition] = useTransition();

  const run = (
    optimistic: Parameters<typeof dispatch>[0],
    action: () => Promise<void>
  ) => {
    startTransition(async () => {
      dispatch(optimistic);
      await action();
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed bg-white px-6 py-20 text-center">
        <div className="mb-4 text-5xl">🛒</div>
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-1 text-gray-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">

      <ul className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                    {item.category}
                  </p>
                  <h3 className="font-semibold leading-snug">{item.name}</h3>
                </div>
                <button
                  onClick={() =>
                    run({ type: "remove", productId: item.productId }, () =>
                      removeFromCart(item.productId)
                    )
                  }
                  className="rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.35 9m-4.78 0L9.26 9m9.97-3.21c.34.05.68.11 1.02.17m-1.02-.17-1.07 13.9a2.25 2.25 0 0 1-2.24 2.08H8.08a2.25 2.25 0 0 1-2.24-2.08L4.77 5.79m14.46 0a48 48 0 0 0-3.48-.4m-12 .57c.34-.06.68-.12 1.02-.17m0 0a48 48 0 0 1 3.48-.4m7.5 0v-.92c0-1.18-.91-2.16-2.09-2.2a52 52 0 0 0-3.32 0c-1.18.04-2.09 1.02-2.09 2.2v.92m7.5 0a48 48 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 inline-flex w-fit items-center rounded-lg border">
                <button
                  onClick={() =>
                    run({ type: "decrement", productId: item.productId }, () =>
                      decrementCartItem(item.productId)
                    )
                  }
                  className="px-3 py-1.5 text-lg leading-none hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    run({ type: "increment", productId: item.productId }, () =>
                      addToCart(item.productId)
                    )
                  }
                  className="px-3 py-1.5 text-lg leading-none hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Products</dt>
            <dd className="font-medium">{items.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Total items</dt>
            <dd className="font-medium">{count}</dd>
          </div>
        </dl>

        <button
          disabled={isPending}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          Proceed to checkout
        </button>
        <button
          onClick={() => run({ type: "clear" }, () => clearCart())}
          className="mt-3 w-full rounded-lg border py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}