import { getCategories } from "@/lib/categories";
import CategoryCard from "../components/CategoryCard";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-600">
        Categories
      </h1>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            slug={category.slug}
            image={category.image}
          />
        ))}
      </div>
    </main>
  );
}