import Link from "next/link";
import NavBarButton from "./NavBarButton";
import { getCartCount } from "@/lib/cart";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart", badge: true },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/wishlist", label: "Wishlist" },
];

function HatLogo() {
  return (
    <svg
      viewBox="0 0 90 50"
      className="h-10 w-[72px] text-orange-400"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* crown */}
      <path d="M24 32C22 18 26 6 36 6c4 0 6 4 9 4s5-4 9-4c10 0 14 12 12 26Z" />
      {/* brim */}
      <path d="M0 30Q10 28 22 32h46q12-4 22-2-2 18-45 18T0 30Z" />
    </svg>
  );
}

export default async function NavBar() {
  const count = await getCartCount();

  return (
    <header className="bg-gray-200">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Gargerko home"
        >
          <HatLogo />
          <span className="text-3xl font-bold text-black">Gargerko</span>
        </Link>

        <ul className="ml-1 flex items-center gap-4 text-lg text-gray-600">
          {links.map(({ href, label, badge }) => (
            <li key={href} className="relative">
              <NavBarButton href={href}>{label}</NavBarButton>
              {badge && (
                <span className="absolute -right-2 -top-4 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-xs font-bold text-black">
                  {count}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
