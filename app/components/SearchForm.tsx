"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm({ srchItem }: { srchItem?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (formData: FormData) => {
    const search = formData.get("search")?.toString().trim() || "";
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <form
      role="search"
      action={handleSearch}
      className="mx-auto w-full max-w-xl"
    >
      <label htmlFor="search" className="sr-only">
        Search products
      </label>

      <div className="group relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 hover:border-gray-400 focus-within:border-[#606060] focus-within:shadow-md focus-within:ring-4 focus-within:ring-gray-200/70">
        {/* Search icon */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#606060]"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          key={srchItem}
          type="text"
          id="search"
          name="search"
          placeholder="E.g. dragon"
          autoComplete="off"
          enterKeyHint="search"
          defaultValue={srchItem}
          className="h-12 w-full rounded-full bg-transparent pl-12 pr-24 text-base text-gray-900 placeholder-gray-400 outline-none focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full bg-[#606060] px-5 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}