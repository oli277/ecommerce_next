import ProductCard from "./ProductCard"

export type Product = {
    id: number,
    name: string,
    description: string,
    review: number,
    image: string,
    category: string,
    dateAdded: string
}

export default function ProductGrid({ products, title }: { products: Product[], title:string }) {

    const isPending = false
    
    return (
      <div className="container mx-auto px-4 py-8 md:pl-64">
        <div className="mb-10 mt-8 flex w-full justify-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        </div>

        {isPending ? (
          <div className="py-20 text-center text-lg text-gray-500">Loading models...</div>
        ) : (
          products.length >= 1 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

              {products.map((model)=>(
                <ProductCard
                  key={model.id}
                  product={model}
                />
              ))}

            </div>
          ) : (
            <div className="py-20 text-center text-lg font-medium text-gray-500">NOT FOUND</div>
          )
        )}

      </div>
    )
}