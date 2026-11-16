import ProductGrid from "@/app/components/ProductGrid";
import { getCategoriesBySlug } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { Category } from "@/lib/types";
import { Product } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}){

    const {slug} = await params

    const category: Category[] = await getCategoriesBySlug({slug})

    const categoryProducts: Product[] = await getProducts(category[0].name)


    
    return(
        <ProductGrid products={categoryProducts} title={category[0].name} />
    )
}