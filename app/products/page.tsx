import ProductGrid from "../components/ProductGrid";
import { getProducts } from "@/lib/products";
import { Product } from "@/lib/types";
import CategoriesNav from "../components/CategoriesNav";
import { getQueryParams } from "@/lib/utils";
import SearchForm from "../components/SearchForm";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string, search?:string }>;
}) {
  const srchparams = await searchParams;
  const { cat, search } = getQueryParams(srchparams);

  const allProducts: Product[] = await getProducts(cat, search);

   const title = () => {
    if(search && cat){
        return `Search results for ${search} in ${cat}`
    } else if(cat){
        return `${cat} Products`
    } else if(search){
        return `Search results for ${search}`
    } else {
        return "All Products"
    }
  }

  return (
    <>
       <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-6 md:py-10">
      <SearchForm srchItem={search} />
      <CategoriesNav />
      
    </div>
    <ProductGrid products={allProducts} title={title()} />
    </>
  );
}