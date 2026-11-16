import CartList from "../components/CartList";

export const metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping cart</h1>
      <CartList />
    </main>
  );
}