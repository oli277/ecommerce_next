import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Error 404
        </p>

        <h1 className="mt-4 bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-[8rem] font-extrabold leading-none text-transparent sm:text-[10rem]">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-4 text-base text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, renamed, or never existed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10"
              />
            </svg>
            Back to home
          </Link>

        </div>
      </div>
    </main>
  );
}