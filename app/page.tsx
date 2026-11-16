import { getProducts } from "@/lib/products";
import ProductGrid, { Product } from "./components/ProductGrid";
import CategoriesSlide from "./components/CategoriesSlide";

export default async function Main() {

  const products: Product[] = await getProducts()

  return (
        <>
        <CategoriesSlide/>
        <ProductGrid products={products} title="Products"/>
        </>
        
  );
}
