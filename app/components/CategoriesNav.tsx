import { getCategories } from "@/lib/categories";
import type {Category} from '@/lib/types'
import CatNavButton from "./CatNavButton";
import { AllButton } from "./CatNavButton";


export default async function CategoriesNav() {
  const categories:Category[] = await getCategories();
  return (
    <aside className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white md:fixed md:left-0 md:top-1/2 md:w-64 md:-translate-y-1/2 md:border-none md:px-4">
      <div className="relative">
        <nav
          aria-label="Categories"
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible"
        >
          <ul className="flex items-center gap-2 whitespace-nowrap px-4 py-3 md:flex-col md:items-start md:gap-3 md:p-0">

            <li className="shrink-0">
              <AllButton>All</AllButton>
            </li>

            {categories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <CatNavButton cat={category.name}>{category.name}</CatNavButton>
              </li>
            ))}
            
          </ul>
        </nav>

        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
      </div>
    </aside>
  );
}