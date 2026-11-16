import { getCategories } from "@/lib/categories";
import { Category } from "@/lib/types";
import Link from "next/link";


export default async function CategoriesSlide(){
    const categories: Category[] = await getCategories()

      const loop = [...categories, ...categories];



    return(
        <section className="w-full bg-white px-4 py-8">
      {/* Keyframes live here so no change to globals.css is needed */}
      <style>{`
        @keyframes categories-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .categories-track {
          animation: categories-marquee 40s linear infinite;
        }
        .categories-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <h2 className="mb-5 text-center text-2xl font-bold text-gray-700">
        Shop Popular Categories
      </h2>

      {/* Viewport: 7 items x 144px = 1008px, centered on the page */}
      <div className="mx-auto w-[1008px] max-w-full overflow-hidden">
        <ul className="categories-track flex w-max">
          {loop.map((category, i) => (
            <li
              key={`${category.slug}-${i}`}
              aria-hidden={i >= categories.length}
              className="w-36 shrink-0"
            >
              <Link
                href={`/categories/${category.slug}`}
                tabIndex={i >= categories.length ? -1 : 0}
                className="block"
              >
                <div className="aspect-[217/250] w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <p className="px-1 py-3 text-center text-base text-black">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    )

}