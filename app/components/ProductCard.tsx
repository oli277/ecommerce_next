"use client";

import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: number;
  name: string;
  description: string;
  review: number;
  image: string;
  category: string;
  dateAdded: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 transition-shadow duration-200 hover:shadow-lg">
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute left-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-yellow-400 shadow-sm transition-all duration-200 hover:text-yellow-500 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="relative h-56 overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-3"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-600">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7 text-gray-900">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-slate-700">
            159 EGP
          </span>
          <span className="flex items-center gap-1 text-base text-slate-500">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.review}
          </span>
        </div>
      </div>

      <AddToCartButton
        product={{
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
        }}
        className="mt-auto w-full rounded-xl bg-yellow-400 py-2 text-lg font-medium text-black transition-all duration-200 hover:bg-yellow-300 active:scale-[0.98] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 disabled:opacity-60 md:opacity-0 md:group-hover:opacity-100"
      />
    </div>
  );
}
